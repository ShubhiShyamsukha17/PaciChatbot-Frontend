import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import authOptions from '@/providers/auth';
import User from '@/models/userModel';

const sessionCheck =
    (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const session = await getServerSession(req, res, authOptions);

            if (!session) {
                return res.status(401).json({
                    status: 'error',
                    message: 'You are not logged in.',
                });
            }

            req.session = session;

            const user = await User.findById(session.user.id);

            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Cannot perform this action, log in again.',
                });
            }

            return handler(req, res);
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    };

export default sessionCheck;
