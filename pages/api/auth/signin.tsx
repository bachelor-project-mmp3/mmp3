import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (!session.user.roomNumber) {
            res.redirect(`/profile/create`);
        } else {
            res.redirect(`/my-events`);
        }
    } else {
        res.redirect(`/`);
    }
}
