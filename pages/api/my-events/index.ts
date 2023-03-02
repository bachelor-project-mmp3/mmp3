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
            // GET /api/my-events/
            if (req.method === 'GET') {
                console.log(req.body);
                const session = await getSession({ req });
                const userId = session?.user?.userId;

                const events = await prisma.event.findMany({
                    include: {
                        host: {
                            select: {
                                image: true,
                            },
                        },
                        menu: true,
                        requests: true,
                    },
                    where: {
                        host: {
                            id: userId,
                        },
                    },
                });

                res.status(200).json({ events: events });
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
