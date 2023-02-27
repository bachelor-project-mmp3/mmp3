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
            // POST Create event /api/events
            if (req.method === 'POST') {
                const {
                    title,
                    info,
                    date,
                    timeLimit,
                    costs,
                    capacity,
                    dishes,
                } = req.body;

                const dateTimeDate = new Date(date);
                const dateTimeTimeLimit = new Date(timeLimit);
                const floatCosts = parseFloat(costs);
                const intCapacity = parseInt(capacity);
                const session = await getSession({ req });

                await prisma.dish.create({
                    data: {
                        title: dishes.dishName,
                        link: dishes.dishUrl,
                        description: dishes.dishInfo,
                    },
                });
                const event = await prisma.event.create({
                    data: {
                        title: title,
                        info: info,
                        host: { connect: { email: session?.user?.email } },
                        date: dateTimeDate,
                        timeLimit: dateTimeTimeLimit,
                        costs: floatCosts,
                        capacity: intCapacity,
                        // menu: {connect: {}}
                        image: 'default image',
                    },
                });
                res.status(200).json(event.id);
            }
            // TODO extend with query parameters for filtering later
            // GET events /api/events
            else if (req.method === 'GET') {
                const events = await prisma.event.findMany({
                    include: {
                        host: {
                            select: { firstName: true },
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
