import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // UPDATE university count in database
        if (req.method === 'PATCH') {
            const { university } = req.body;

            await prisma.university.update({
                where: {
                    name: university,
                },
                data: {
                    count: { increment: 1 },
                },
            });
            res.status(200).json({ success: true });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
