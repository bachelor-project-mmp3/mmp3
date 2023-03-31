import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// this cron job does:
// - delete notifications from yesterday which says that event takes place tomorrow (so today)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { authorization } = req.headers;

            if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
                const todayBeginning = new Date();
                todayBeginning.setHours(0, 0, 0, 0);

                const todayEnding = new Date(todayBeginning);
                todayEnding.setDate(todayEnding.getDate() + 1);

                await prisma.notification.deleteMany({
                    where: {
                        AND: [
                            { message: 'takes place tomorrow' },
                            {
                                Event: {
                                    date: {
                                        gte: todayBeginning,
                                        lte: todayEnding,
                                    },
                                },
                            },
                        ],
                    },
                });
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
