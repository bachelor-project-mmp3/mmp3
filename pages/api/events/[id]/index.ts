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
                await prisma.event.delete({
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
                                    { status: 'DECLINED' },
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
                const cancelFlag = req.headers.cancel;
                const uploadFlag = req.headers.upload;
                const transporter = getNodeMailerTransporter();

                // event photo upload
                if (uploadFlag) {
                    try {
                        const { imageUrl } = req.body;

                        const result = await prisma.event.update({
                            where: {
                                id: eventId,
                            },
                            data: {
                                image: imageUrl,
                            },
                        });

                        res.json(result);
                    } catch (err) {
                        res.status(500).json({ message: err.message });
                    }
                } else if (cancelFlag === 'false') {
                    // sent in http header for edit or cancel event as host
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
                                            id: true,
                                        },
                                    },
                                },
                            },
                        },
                    });

                    for (const request of event.requests) {
                        const mailData = getEmailTemplate({
                            hostFirstName: event.host.firstName,
                            eventId: event.id,
                            eventTitle: event.title,
                            guestName: request.User.firstName,
                            type: 'edit',
                        });

                        const mail = {
                            from: 'studentenfuttermmp3@gmail.com',
                            to: request.User.email,
                            ...mailData,
                        };

                        transporter.sendMail(mail, function (err, info) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(info);
                            }
                        });

                        // notifications to guests
                        await prisma.notification.create({
                            data: {
                                Event: { connect: { id: event.id } },
                                User: { connect: { id: request.User.id } },
                                type: 'EVENT',
                                message: 'was edited',
                            },
                        });
                    }

                    res.json(result);
                } else {
                    await prisma.event.update({
                        where: {
                            id: eventId,
                        },
                        data: {
                            status: 'CANCELLED',
                        },
                    });

                    const event = await prisma.event.findUnique({
                        where: {
                            id: eventId,
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
                                            email: true,
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

                    await prisma.request.updateMany({
                        where: {
                            eventId: eventId,
                        },
                        data: {
                            status: 'CANCELLED',
                        },
                    });

                    for (const request of event.requests) {
                        const mailData = getEmailTemplate({
                            hostFirstName: event.host.firstName,
                            eventTitle: event.title,
                            guestName: request.User.firstName,
                            type: 'cancel',
                        });

                        const mail = {
                            from: 'studentenfuttermmp3@gmail.com',
                            to: request.User.email,
                            ...mailData,
                        };

                        transporter.sendMail(mail, function (err, info) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(info);
                            }
                        });

                        //notification for guest
                        await prisma.notification.create({
                            data: {
                                Event: { connect: { id: event.id } },
                                User: { connect: { id: request.User.id } },
                                type: 'EVENT',
                                message: 'is cancelled',
                            },
                        });
                    }

                    res.status(200).json(event);
                }
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
