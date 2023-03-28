import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { addHoursToDateTime } from '../../../helper/helperFunctions';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        try {
            // POST Create event /api/events
            if (req.method === 'POST') {
                const {
                    title,
                    info,
                    date,
                    timeLimit,
                    costs,
                    capacity,
                    dishes,
                } = req.body;

                const dateTimeDate = addHoursToDateTime(new Date(date), 2);
                const dateTimeTimeLimit = addHoursToDateTime(
                    new Date(timeLimit),
                    2
                );
                const floatCosts = parseFloat(costs);
                const intCapacity = parseInt(capacity);
                const session = await getSession({ req });

                const event = await prisma.event.create({
                    data: {
                        title: title,
                        info: info,
                        host: { connect: { email: session?.user?.email } },
                        date: dateTimeDate,
                        timeLimit: dateTimeTimeLimit,
                        costs: floatCosts,
                        capacity: intCapacity,
                        menu: {
                            create: dishes,
                        },
                        image: 'https://firebasestorage.googleapis.com/v0/b/studentenfutter-dba6a.appspot.com/o/profile%2Fpexels-cats-coming-920220.jpg?alt=media&token=fde91666-3d24-471b-9bd3-8a1825edde79',
                    },
                });
                res.status(200).json(event.id);
            }
            // GET events /api/events
            else if (req.method === 'GET') {
                const today = new Date();

                const { dormitoryFilter, dateFilter } = req.query;
                console.log(dormitoryFilter, 'dormitoryfilter');
                console.log(dateFilter, 'dateFilter');

                const dataQuery = {
                    host: {
                        select: {
                            firstName: true,
                            lastName: true,
                            image: true,
                            dormitory: true,
                            id: true,
                        },
                    },
                    menu: true,
                    requests: true,
                };

                const timeLimitCondition = { timeLimit: { gte: today } };
                const filter = [];
                filter.push(timeLimitCondition);

                if (dormitoryFilter && dormitoryFilter !== 'undefined') {
                    const dormitoryCondition = {
                        host: {
                            dormitory: dormitoryFilter as string,
                        },
                    };
                    filter.push(dormitoryCondition);
                }

                if (dateFilter && dateFilter !== 'undefined') {
                    let from = new Date();
                    from.setHours(today.getHours() + 2);
                    let until;
                    if (dateFilter === 'Today') {
                        until = new Date();
                        until.setHours(2, 0, 0, 0);
                        until.setDate(until.getDate() + 1);
                    } else if (dateFilter === 'Tomorrow') {
                        from = new Date();
                        from.setHours(2, 0, 0, 0);
                        from.setDate(from.getDate() + 1);
                        until = new Date();
                        until.setHours(2, 0, 0, 0);
                        until.setDate(until.getDate() + 2);
                    } else if (dateFilter === 'This week') {
                        const date = new Date();
                        const day = date.getDay(); // get day of week

                        // day of month - day of week (-6 if Sunday), otherwise +1
                        const diff =
                            date.getDate() - day + (day === 0 ? -6 : 1);

                        let firstDay = new Date(date.setDate(diff));
                        until = new Date(firstDay);
                        until.setDate(until.getDate() + 7);
                        until.setHours(2, 0, 0, 0);
                    } else if (dateFilter === 'This month') {
                        until = new Date(
                            from.getFullYear(),
                            from.getMonth() + 1,
                            0
                        );
                        until.setHours(2, 0, 0, 0);
                    } else {
                        if (isNaN(Date.parse(dateFilter as string))) {
                            res.status(500);
                        }
                        from = new Date(dateFilter as string);
                        until = new Date(dateFilter as string);
                        until.setDate(from.getDate() + 1);
                    }

                    const dateCondition = {
                        date: {
                            gte: from,
                            lt: until,
                        },
                    };
                    filter.push(dateCondition);
                }

                const events = await prisma.event.findMany({
                    orderBy: [
                        {
                            date: 'asc',
                        },
                    ],
                    include: dataQuery,
                    where: {
                        AND: filter,
                    },
                });

                res.status(200).json({ events: events });
            } else {
                res.status(405).end('Method Not Allowed');
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
}
