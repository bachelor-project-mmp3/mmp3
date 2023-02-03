import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // TODO: check authentication
    // POST /api/events
    if (req.method === 'POST') {
        try {
            const { title, info, date, timeLimit, costs, capacity } = req.body;

            const dateTimeDate = new Date(date);
            const dateTimeTimeLimit = new Date(timeLimit);
            const floatCosts = parseFloat(costs);
            const intCapacity = parseInt(capacity);
            const session = await getSession({ req });

            const event = await prisma.event.create({
                data: {
                    title: title,
                    info: info,
                    host: { connect: { email: session?.user?.email } },
                    date: dateTimeDate,
                    timeLimit: dateTimeTimeLimit,
                    costs: floatCosts,
                    capacity: intCapacity,
                    image: 'default image',
                },
            });
            res.status(200).json(event.id);
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
