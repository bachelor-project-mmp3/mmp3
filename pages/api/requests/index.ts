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
            // POST Create event /api/requests
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
                                firstName: true,
                                lastName: true,
                                image: true,
                                email: true,
                                dormitory: true,
                                id: true,
                            },
                        },
                        menu: true,
                        requests: true,
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
                        res.status(500).json({
                            statusCode: 500,
                            success: false,
                            message: err,
                        });
                    } else {
                        console.log(info);
                        res.status(200).json({ requestId: request.id });
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
                        AND: [{ Event: { date: { gte: today } } }],
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
