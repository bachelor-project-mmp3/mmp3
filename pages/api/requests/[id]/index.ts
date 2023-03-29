import { RequestStatus } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';
import { getEmailTemplate } from '../../../../helper/mailTemplaes';
import { getNodeMailerTransporter } from '../../../../helper/nodemailer';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        try {
            // PATCH Join event /api/requests
            if (req.method === 'PATCH') {
                const { status } = req.body;
                let data;

                if (status === RequestStatus.ACCEPTED) {
                    data = {
                        status,
                        Event: {
                            update: { currentParticipants: { increment: 1 } },
                        },
                    };
                }
                if (status === RequestStatus.DECLINED) {
                    data = {
                        status,
                    };
                }

                const request = await prisma.request.update({
                    where: {
                        id: String(req.query.id),
                    },
                    include: {
                        User: {
                            select: {
                                firstName: true,
                                lastName: true,
                                image: true,
                                id: true,
                                email: true,
                            },
                        },
                        Event: {
                            select: {
                                title: true,
                                id: true,
                                host: true,
                                timeLimit: true,
                                currentParticipants: true,
                                capacity: true,
                            },
                        },
                    },
                    data,
                });
                const transporter = getNodeMailerTransporter();

                if (status === RequestStatus.ACCEPTED) {
                    //send mail to guest
                    const mailData = getEmailTemplate({
                        hostFirstName: request.Event.host.firstName,
                        eventTitle: request.Event.title,
                        guestName: request.User.firstName,
                        guestId: request.User.id,
                        type: 'accepted',
                        eventId: request.Event.id,
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
                }

                if (status === RequestStatus.DECLINED) {
                    //send mail to guest
                    const mailData = getEmailTemplate({
                        hostFirstName: request.Event.host.firstName,
                        eventTitle: request.Event.title,
                        guestName: request.User.firstName,
                        type: 'declined',
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
                }

                res.status(200).json(request);
            } else if (req.method === 'DELETE') {
                // decrement event's currentParticipants
                const request = await prisma.request.findUnique({
                    where: { id: String(req.query.id) },
                    include: { Event: { include: { host: true } }, User: true },
                });

                let event;
                // Leave event
                if (request.status === 'ACCEPTED') {
                    event = await prisma.event.update({
                        where: {
                            id: request.Event.id,
                        },
                        data: {
                            currentParticipants: { decrement: 1 },
                        },
                        include: {
                            host: true,
                            menu: true,
                            // for response in eventdetail
                            requests: {
                                where: {
                                    OR: [
                                        { status: 'ACCEPTED' },
                                        { status: 'PENDING' },
                                    ],
                                    NOT: { id: String(req.query.id) },
                                },
                                include: { User: true },
                            },
                        },
                    });

                    // delete the request
                    const deleteRequest = await prisma.request.delete({
                        where: {
                            id: String(req.query.id),
                        },
                    });

                    // send mail to host
                    const transporter = getNodeMailerTransporter();

                    const mailData = getEmailTemplate({
                        hostFirstName: request.Event.host.firstName,
                        eventTitle: request.Event.title,
                        guestName: request.User.firstName,
                        type: 'leave',
                    });

                    const mail = {
                        from: 'studentenfuttermmp3@gmail.com',
                        to: request.Event.host.email,
                        ...mailData,
                    };

                    transporter.sendMail(mail, function (err, info) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(info);
                        }
                    });
                }

                // Withdraw event
                if (request.status === 'PENDING') {
                    event = await prisma.event.findUnique({
                        where: {
                            id: request.Event.id,
                        },
                        include: {
                            host: true,
                            menu: true,
                            // for response in eventdetail
                            requests: {
                                where: {
                                    OR: [
                                        { status: 'ACCEPTED' },
                                        { status: 'PENDING' },
                                    ],
                                    NOT: { id: String(req.query.id) },
                                },
                                include: { User: true },
                            },
                        },
                    });

                    // delete the request
                    const deleteRequest = await prisma.request.delete({
                        where: {
                            id: String(req.query.id),
                        },
                    });
                }

                res.status(200).json(event);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
}
