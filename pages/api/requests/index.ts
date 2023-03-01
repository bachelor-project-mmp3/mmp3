import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getEmailTemplate } from '../helper/mailTemplaes';

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
                        host: { select: { firstName: true, email: true } },
                    },
                });

                const guest = await prisma.user.findUnique({
                    where: { id: userId },
                    select: { firstName: true },
                });

                //send mail to host
                let nodemailer = require('nodemailer');
                const transporter = nodemailer.createTransport({
                    port: 465,
                    host: 'smtp.gmail.com',
                    auth: {
                        user: 'studentenfuttermmp3@gmail.com',
                        pass: `${process.env.PASSWORD}`,
                    },
                    secure: true,
                });

                const mailData = getEmailTemplate(
                    event.host.firstName,
                    event.title,
                    guest.firstName,
                    userId
                );

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

                res.status(200).json({ requestId: request.id });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
}
