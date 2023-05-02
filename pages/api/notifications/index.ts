import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        try {
            // GET /api/notifications/
            if (req.method === 'GET') {
                const session = await getSession({ req });
                const userId = session?.user?.userId;

                const notification = await prisma.notification.findMany({
                    include: {
                        Event: {
                            select: {
                                id: true,
                                title: true,
                                host: true,
                            },
                        },
                        UserFrom: {
                            select: { image: true },
                        },
                    },
                    where: {
                        AND: [{ userId: userId }, { seen: false }],
                    },
                    orderBy: [
                        {
                            createdAt: 'desc',
                        },
                    ],
                });
                res.status(200).json({ notification: notification });
            } else {
                res.status(405).end('Method Not Allowed');
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
}
