// creating review
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';
import prisma from '../../../../../lib/prisma';

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
                    include: { User: true },
                });

                //TODO send email to host

                //TODO create notification for host
                res.status(200).json(review);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
}
