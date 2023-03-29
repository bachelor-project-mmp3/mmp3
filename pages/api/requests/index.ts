import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getEmailTemplate } from '../../../helper/mailTemplaes';
import { getSession } from 'next-auth/react';
import { getNodeMailerTransporter } from '../../../helper/nodemailer';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        try {
            // POST Create request /api/requests
            if (req.method === 'POST') {
                const { userId, eventId } = req.body;

                const request = await prisma.request.create({
                    data: {
                        Event: { connect: { id: eventId } },
                        User: { connect: { id: userId } },
                    },
                });

                const event = await prisma.event.findUnique({
                    where: { id: eventId },
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
                        menu: true,
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

                const guest = await prisma.user.findUnique({
                    where: { id: userId },
                    select: { firstName: true },
                });

                //send mail to host
                const transporter = getNodeMailerTransporter();

                const mailData = getEmailTemplate({
                    hostFirstName: event.host.firstName,
                    eventTitle: event.title,
                    guestName: guest.firstName,
                    guestId: userId,
                    type: 'join',
                });

                const mail = {
                    from: 'studentenfuttermmp3@gmail.com',
                    to: event.host.email,
                    ...mailData,
                };

                transporter.sendMail(mail, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(info);
                    }
                });

                res.status(200).json(event);
            }
            if (req.method === 'GET') {
                const session = await getSession({ req });
                const userId = session?.user?.userId;
                const today = new Date();

                const requests = await prisma.request.findMany({
                    orderBy: [
                        {
                            createdAt: 'desc',
                        },
                    ],
                    include: {
                        User: {
                            select: {
                                firstName: true,
                                lastName: true,
                                image: true,
                                id: true,
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
                    where: {
                        OR: [
                            { Event: { host: { id: userId } } },
                            { userId: userId },
                        ],
                        AND: [
                            { Event: { date: { gte: today } } },
                            { NOT: { status: 'CANCELLED' } },
                        ],
                    },
                });

                res.status(200).json({ requests });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
}
