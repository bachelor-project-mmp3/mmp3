import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { authorization } = req.headers;

            if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
                // get user's mail addresses from database
                const users = await prisma.user.findMany({
                    select: { email: true },
                });
                let emailArray = users.map((user) => user.email);

                //setup nodemailer for sending mails
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

                // prepare mail
                const mailData = {
                    from: 'studentenfuttermmp3@gmail.com',
                    to: emailArray,
                    subject: 'Testmail',
                    text: 'Testmail aus der Studentenfutter App mit CRON Job.',
                    html: `<div>Studentenfutter</div><p>Sent from:
          studentenfuttermmp3@gmail.com</p>`,
                };

                transporter.sendMail(mailData, function (err, info) {
                    if (err) {
                        console.log(err);
                        res.status(200).json({
                            statusCode: 200,
                            success: false,
                            message: err,
                        });
                    } else {
                        console.log(info);
                        res.status(200).json({
                            statusCode: 200,
                            success: true,
                        });
                    }
                });
            } else {
                res.status(401).json({ statusCode: 401, success: false });
            }
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
