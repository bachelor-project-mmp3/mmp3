import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // TODO: check authentication
    // DELETE api/events/{id}
    if (req.method === 'DELETE') {
        try {
            const eventId = req.query.id.toString();
            const event = await prisma.event.delete({
                where: { id: eventId },
            });
            res.status(200).json({ message: 'Deleted event successfully' });
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

// TODO: implement edit function -> method = patch
