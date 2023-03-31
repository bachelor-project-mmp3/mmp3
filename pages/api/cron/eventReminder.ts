import { NextApiRequest, NextApiResponse } from 'next';
import { getNodeMailerTransporter } from '../../../helper/nodemailer';
import prisma from '../../../lib/prisma';
import { getEmailTemplate } from '../../../helper/mailTemplaes';

// this cron job does:
// - creates notification for host
// - creates notification for guests
// - sends email to host that event takes place tomorrow
// - sends email to accepted guests that event takes place tomorrow

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { authorization } = req.headers;

            if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
                const tomorrowBeginning = new Date();
                tomorrowBeginning.setDate(tomorrowBeginning.getDate() + 1);
                tomorrowBeginning.setHours(0, 0, 0, 0);

                const tomorrowEnding = new Date(tomorrowBeginning);
                tomorrowEnding.setDate(tomorrowEnding.getDate() + 1);

                const transporter = getNodeMailerTransporter();

                // get all events that take place tomorrow and event was not cancelled
                const events = await prisma.event.findMany({
                    where: {
                        AND: [
                            {
                                date: {
                                    gte: tomorrowBeginning,
                                    lte: tomorrowEnding,
                                },
                            },
                            { NOT: { status: 'CANCELLED' } },
                        ],
                    },
                    include: {
                        requests: {
                            where: { status: 'ACCEPTED' },
                            include: {
                                User: {
                                    select: {
                                        id: true,
                                        email: true,
                                        firstName: true,
                                    },
                                },
                            },
                        },
                        host: { select: { firstName: true, email: true } },
                    },
                });

                for (const event of events) {
                    // mail to host
                    const mailData = getEmailTemplate({
                        hostFirstName: event.host.firstName,
                        eventTitle: event.title,
                        type: 'reminder-host',
                        eventId: event.id,
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

                    //notification for host
                    await prisma.notification.create({
                        data: {
                            Event: { connect: { id: event.id } },
                            User: { connect: { id: event.authorId } },
                            type: 'EVENT',
                            message: 'takes place tomorrow',
                        },
                    });

                    // mail to each guest and notification
                    for (const request of event.requests) {
                        const mailData = getEmailTemplate({
                            hostFirstName: event.host.firstName,
                            eventTitle: event.title,
                            guestName: request.User.firstName,
                            eventId: event.id,
                            type: 'reminder-guest',
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
                                message: 'takes place tomorrow',
                            },
                        });
                    }
                }
                res.status(200).json({ statusCode: 200, success: true });
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
