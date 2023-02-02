import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        try {
            const eventId = req.query.id.toString();
            const event = await prisma.event.delete({
                where: { id: eventId },
            });
            res.json(event);
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.status(200).json({
            statusCode: 200,
            info: 'TODO',
        });
    }
}
