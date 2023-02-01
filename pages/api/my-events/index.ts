// get all events where I joined or where I'm the host, separated by past and future events
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
