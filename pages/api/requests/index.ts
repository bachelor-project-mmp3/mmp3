import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

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
                res.status(200).json(request.id);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
}
