import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

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

                const dateTimeDate = new Date(date);
                const dateTimeTimeLimit = new Date(timeLimit);
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
            // TODO extend with query parameters for filtering later
            // GET events /api/events
            else if (req.method === 'GET') {
                const today = new Date();
                const events = await prisma.event.findMany({
                    orderBy: [
                        {
                            date: 'asc',
                        },
                    ],
                    include: {
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
                    },
                    where: {
                        timeLimit: { gte: today },
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
