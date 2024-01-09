import logger from '@/utils/logger';
import { connectToDB, disconnectFromDB } from '@/managers/DB';
import sessionCheck from '@/middlewares/sessionCheck';
import Log from '@/models/logModel';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';

const chat = async (req: NextApiRequest, res: NextApiResponse) => {
    const content: string = req.body.content;
    if (!content) {
        return res.status(400).json({
            status: 'error',
            message: 'Payload Validation Failed',
        });
    }

    const URL = `${process.env.NEXT_PUBLIC_API_URL}/response/${content}`;

    try {
        const APIres = await axios.get(URL);

        if (APIres.status !== 200) {
            return res.status(APIres.status).json({
                status: 'error',
                message: 'Model API Internal Error',
                data: APIres.data,
            });
        }

        const result = APIres.data.Bot;
        const score = APIres.data.Score;

        if (!result || !score) {
            return res.status(APIres.status).json({
                status: 'error',
                message: 'Model API Response Error',
                data: APIres.data,
            });
        }

        const ip = requestIp.getClientIp(req);

        await Log.create({
            request: content,
            response: result,
            score: score,
            userID: req.session.user.id,
            ip: ip,
            createdAt: Date.now(),
        });

        return res.status(200).json({
            status: 'success',
            message: '',
            response: result,
        });
    } catch (err) {
        // logger.error('Error while handling request.');
        console.log(err);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error.',
            data: err,
        });
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDB();
    switch (req.method) {
        case 'POST':
            await chat(req, res);
            break;
    }
};

export default sessionCheck(handler);
