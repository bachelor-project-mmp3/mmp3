// creating review
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';
import prisma from '../../../../../lib/prisma';
import { getEmailTemplate } from '../../../../../helper/mailTemplaes';
import { getNodeMailerTransporter } from '../../../../../helper/nodemailer';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        try {
            if (req.method === 'POST') {
                const { userId, eventId, dish, environment, text } = req.body;
                const total = Math.round((dish + environment) / 2);
                const review = await prisma.review.create({
                    data: {
                        Event: { connect: { id: eventId } },
                        User: { connect: { id: userId } },
                        dish,
                        environment,
                        text: text,
                        total: total,
                    },
                    include: { User: true, Event: { include: { host: true } } },
                });

                // send mail to host
                const mailData = getEmailTemplate({
                    hostFirstName: review.Event.host.firstName,
                    eventTitle: review.Event.title,
                    guestName: review.User.firstName,
                    type: 'newReview',
                });

                const mail = {
                    from: 'studentenfuttermmp3@gmail.com',
                    to: review.Event.host.email,
                    ...mailData,
                };

                const transporter = getNodeMailerTransporter();

                transporter.sendMail(mail, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(info);
                    }
                });

                //create notification for host
                await prisma.notification.create({
                    data: {
                        User: {
                            connect: { id: review.Event.host.id },
                        },
                        Event: { connect: { id: eventId } },
                        UserFrom: { connect: { id: userId } },
                        type: 'EVENT',
                        message: `${review.User.firstName} added a review`,
                    },
                });

                //set notification to seen from guest
                await prisma.notification.updateMany({
                    where: { AND: [{ userId: userId }, { eventId: eventId }] },
                    data: { seen: true },
                });

                res.status(200).json(review);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
}
