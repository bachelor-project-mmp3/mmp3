import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        try {
            // UPDATE api/notification/{id}
            if (req.method === 'PATCH') {
                const request = await prisma.notification.update({
                    where: {
                        id: String(req.query.id),
                    },
                    data: {
                        seen: true,
                    },
                });
                res.status(200).json(request);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
}
