import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // PATCH /api/profile/${id}
    if (req.method === 'PATCH') {
        try {
            const { uploadResult } = req.body;
            const session = await getSession({ req });
            const userId = session?.user?.userId;

            const result = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    image: uploadResult,
                },
            });
            res.json(result);
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    }
}
