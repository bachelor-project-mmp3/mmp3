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
                const session = await getSession({ req });
                const userId = session?.user?.userId;
                const today = new Date();

                const { upcomingEventsPage, pastEventsPage } = req.query;
                const entriesPerPage = 6;
                const upcomingEventsSkipValue =
                    (Number(upcomingEventsPage) - 1) * entriesPerPage;
                const upcomingEventsCount = await prisma.event.count({
                    where: {
                        OR: [
                            { host: { id: userId } },
                            {
                                requests: {
                                    some: {
                                        AND: [
                                            { userId: userId },
                                            {
                                                OR: [
                                                    { status: 'ACCEPTED' },
                                                    { status: 'CANCELLED' },
                                                ],
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                        AND: [{ date: { gte: today } }],
                    },
                });
                const upcomingEventsPageCount = Math.ceil(
                    upcomingEventsCount / entriesPerPage
                );

                const upcomingEvents = await prisma.event.findMany({
                    skip: upcomingEventsSkipValue, // How many rows to skip
                    take: entriesPerPage, // Page size
                    include: {
                        host: {
                            select: {
                                firstName: true,
                                lastName: true,
                                image: true,
                                dormitory: true,
                                id: true,
                            },
                        },
                        menu: true,
                        requests: true,
                    },
                    where: {
                        OR: [
                            { host: { id: userId } },
                            {
                                requests: {
                                    some: {
                                        AND: [
                                            { userId: userId },
                                            {
                                                OR: [
                                                    { status: 'ACCEPTED' },
                                                    { status: 'CANCELLED' },
                                                ],
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                        AND: [{ date: { gte: today } }],
                    },
                    orderBy: [
                        {
                            date: 'desc',
                        },
                    ],
                });

                const pastEventsSkipValue =
                    (Number(pastEventsPage) - 1) * entriesPerPage;

                const pastEventsCount = await prisma.event.count({
                    where: {
                        OR: [
                            { host: { id: userId } },
                            {
                                requests: {
                                    some: {
                                        AND: [
                                            { userId: userId },
                                            {
                                                OR: [
                                                    { status: 'ACCEPTED' },
                                                    { status: 'CANCELLED' },
                                                ],
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                        AND: [
                            {
                                date: { lte: today },
                                NOT: { status: 'CANCELLED' },
                            },
                        ],
                    },
                });
                const pastEventsPageCount = Math.ceil(
                    pastEventsCount / entriesPerPage
                );
                const pastEvents = await prisma.event.findMany({
                    skip: pastEventsSkipValue, // How many rows to skip
                    take: entriesPerPage, // Page size
                    include: {
                        host: {
                            select: {
                                image: true,
                                firstName: true,
                                lastName: true,
                                dormitory: true,
                            },
                        },
                        menu: true,
                        requests: true,
                    },
                    where: {
                        OR: [
                            { host: { id: userId } },
                            {
                                requests: {
                                    some: {
                                        AND: [
                                            { userId: userId },
                                            {
                                                OR: [
                                                    { status: 'ACCEPTED' },
                                                    { status: 'CANCELLED' },
                                                ],
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                        AND: [
                            {
                                date: { lte: today },
                                NOT: { status: 'CANCELLED' },
                            },
                        ],
                    },
                });

                res.status(200).json({
                    upcomingEvents: upcomingEvents,
                    pastEvents: pastEvents,
                    upcomingEventsPageCount: upcomingEventsPageCount,
                    pastEventsPageCount: pastEventsPageCount,
                });
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
