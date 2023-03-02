import { RequestStatus } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';
import { getEmailTemplate } from '../../helper/mailTemplaes';
import { getNodeMailerTransporter } from '../../helper/nodemailer';

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
                        status: status,
                        Event: {
                            update: { currentParticipants: { increment: 1 } },
                        },
                    };
                }
                if (status === RequestStatus.DECLINED) {
                    data = {
                        status: status,
                    };
                }

                const request = await prisma.request.update({
                    where: {
                        id: String(req.query.id),
                    },
                    include: {
                        Event: {
                            select: {
                                currentParticipants: true,
                                id: true,
                                title: true,
                                host: { select: { firstName: true, id: true } },
                            },
                        },
                        User: {
                            select: { firstName: true, id: true, email: true },
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
                            res.status(500).json({
                                statusCode: 500,
                                success: false,
                                message: err,
                            });
                        } else {
                            console.log(info);
                            res.status(200).json({ request });
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
                            res.status(500).json({
                                statusCode: 500,
                                success: false,
                                message: err,
                            });
                        } else {
                            console.log(info);
                            res.status(200).json({ request });
                        }
                    });
                }

                res.status(200).json({ request });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
}
