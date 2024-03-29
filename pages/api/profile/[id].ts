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
            // PATCH /api/profile/${id}
            if (req.method === 'PATCH') {
                try {
                    const {
                        imageUrl,
                        firstName,
                        lastName,
                        dormitory,
                        roomNumber,
                        aboutYou,
                        instagram,
                        phone,
                    } = req.body;

                    const session = await getSession({ req });
                    const userId = session?.user?.userId;

                    const result = await prisma.user.update({
                        where: {
                            id: userId,
                        },
                        data: {
                            image: imageUrl,
                            firstName: firstName,
                            lastName: lastName,
                            dormitory: dormitory ? dormitory : 'Campus Urstein',
                            roomNumber: roomNumber,
                            interests: aboutYou,
                            phone: phone,
                            instagram: instagram,
                        },
                    });

                    res.json(result);
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
            // GET /api/profile/${id}
            else if (req.method === 'GET') {
                const { page, id } = req.query;

                if (page) {
                    const entriesPerPage = 6;
                    const skipValue = (Number(page) - 1) * entriesPerPage;
                    const profile = await prisma.user.findUnique({
                        where: {
                            id: String(req.query.id),
                        },
                        include: {
                            events: {
                                skip: skipValue, // How many rows to skip
                                take: entriesPerPage, // Page size
                                select: {
                                    id: true,
                                    title: true,
                                    image: true,
                                    date: true,
                                    reviews: { select: { total: true } },
                                },
                                where: {
                                    AND: [
                                        {
                                            date: { lte: new Date() },
                                            NOT: { status: 'CANCELLED' },
                                        },
                                    ],
                                },
                                orderBy: [
                                    {
                                        date: 'desc',
                                    },
                                ],
                            },
                        },
                    });

                    const hostedEventsCount = await prisma.event.count({
                        where: {
                            AND: [
                                {
                                    host: { id: String(req.query.id) },
                                    date: { lte: new Date() },
                                    NOT: { status: 'CANCELLED' },
                                },
                            ],
                        },
                    });

                    const pageCount = Math.ceil(
                        hostedEventsCount / entriesPerPage
                    );

                    if (profile) {
                        res.status(200).json({
                            profile: profile,
                            pageCount: pageCount,
                        });
                    } else {
                        res.status(404).json({ message: 'No profile found' });
                    }
                } else {
                    const profile = await prisma.user.findUnique({
                        where: {
                            id: String(req.query.id),
                        },
                        include: {
                            events: {
                                select: {
                                    reviews: { select: { total: true } },
                                    id: true,
                                    title: true,
                                    image: true,
                                    date: true,
                                },
                                where: {
                                    date: {
                                        lte: new Date(),
                                    },
                                },
                            },
                        },
                    });

                    res.status(200).json({
                        profile: profile,
                    });
                }
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
