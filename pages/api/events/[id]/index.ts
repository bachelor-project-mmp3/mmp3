import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { getNodeMailerTransporter } from '../../../../helper/nodemailer';
import { getEmailTemplate } from '../../../../helper/mailTemplaes';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        try {
            // DELETE api/events/{id}
            if (req.method === 'DELETE') {
                const eventId = req.query.id.toString();
                const event = await prisma.event.delete({
                    where: { id: eventId },
                });
                res.status(200).json({ message: 'Deleted event successfully' });
            }
            // GET event detail api/events/{id}
            else if (req.method === 'GET') {
                //TODO: add pending requests to see if current user is pending on event
                const event = await prisma.event.findUnique({
                    where: {
                        id: String(req.query.id),
                    },
                    include: {
                        host: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                                dormitory: true,
                                roomNumber: true,
                                image: true,
                                phone: true,
                            },
                        },
                        menu: {
                            select: {
                                id: true,
                                title: true,
                                description: true,
                                link: true,
                            },
                        },
                        requests: {
                            where: {
                                OR: [
                                    { status: 'ACCEPTED' },
                                    { status: 'PENDING' },
                                ],
                            },
                            select: {
                                User: {
                                    select: {
                                        id: true,
                                        firstName: true,
                                        lastName: true,
                                        image: true,
                                    },
                                },
                                status: true,
                                userId: true,
                                id: true,
                            },
                        },
                    },
                });
                res.status(200).json({ event: event });
            } else if (req.method === 'PATCH') {
                const eventId = req.query.id.toString();
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

                await prisma.dish.deleteMany({
                    where: {
                        eventId: eventId,
                    },
                });

                const result = await prisma.event.update({
                    where: {
                        id: eventId,
                    },
                    data: {
                        title: title,
                        info: info,
                        date: dateTimeDate,
                        timeLimit: dateTimeTimeLimit,
                        costs: floatCosts,
                        capacity: intCapacity,
                        menu: {
                            create: dishes,
                        },
                    },
                });

                const event = await prisma.event.findUnique({
                    where: {
                        id: eventId,
                    },
                    include: {
                        host: {
                            select: {
                                firstName: true,
                                email: true,
                            },
                        },
                        requests: {
                            where: {
                                OR: [{ status: 'ACCEPTED' }],
                            },
                            select: {
                                User: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                });

                const transporter = getNodeMailerTransporter();

                event.requests.forEach((guest) => {
                    const mailData = getEmailTemplate({
                        hostFirstName: event.host.firstName,
                        eventTitle: event.title,
                        guestName: guest.User.firstName,
                        type: 'edit',
                    });

                    const mail = {
                        from: 'studentenfuttermmp3@gmail.com',
                        to: guest.User.email,
                        ...mailData,
                    };

                    transporter.sendMail(mail, function (err, info) {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                statusCode: 500,
                                success: false,
                                message: err,
                            });
                        } else {
                            console.log(info);
                            res.status(200).json({
                                eventId: event.id,
                                acceptedRequests: event.requests,
                            });
                        }
                    });
                });

                res.json(result);
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

// TODO: implement edit function -> method = patch
