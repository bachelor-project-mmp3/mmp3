// get all notifications for user
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.status(200).json({
        statusCode: 200,
        info: 'TODO',
    });
}