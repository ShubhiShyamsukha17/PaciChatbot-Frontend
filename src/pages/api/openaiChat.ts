import logger from '@/utils/logger';
import { connectToDB, disconnectFromDB } from '@/managers/DB';
import sessionCheck from '@/middlewares/sessionCheck';
import Log from '@/models/logModel';
import { NextApiRequest, NextApiResponse } from 'next';
import openai from '@/providers/openai';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';

type Message = {
    role: ChatCompletionRequestMessageRoleEnum;
    content: string;
};

const chat = async (req: NextApiRequest, res: NextApiResponse) => {
    const messageHistory: Message[] = req.body.messageHistory;
    const content: String = req.body.content;
    if (!messageHistory || !content) {
        return res.status(400).json({
            status: 'error',
            message: 'Payload Validation Failed',
        });
    }

    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo-0613',
            messages: [
                {
                    role: 'system',
                    content: 'You are VIT Chatbot.',
                },
                {
                    role: 'user',
                    content: 'Hello GPT', //our initial prompt
                },
                ...messageHistory,
            ],
        });

        const result = completion.data.choices[0].message;

        if (completion.status !== 200 || !result) {
            return res.status(completion.status).json({
                status: 'error',
                message: 'Model API Error',
                data: completion.data,
            });
        }

        await Log.create({
            request: content,
            response: result,
            userID: req.session.user.id,
            ip: req.socket.remoteAddress,
            createdAt: Date.now(),
        });

        const response = {
            role: 'assistant',
            content: result,
        };

        return res.status(200).json({
            status: 'success',
            message: '',
            response,
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
