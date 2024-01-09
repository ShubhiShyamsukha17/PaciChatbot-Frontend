import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import envHandler from '@/managers/envHandler';
import User from '@/models/userModel';
import { connectToDB } from '@/managers/DB';
import logger from '@/utils/logger';

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: envHandler('GOOGLE_CLIENT_ID'),
            clientSecret: envHandler('GOOGLE_CLIENT_SECRET'),
            authorization:
                'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&hd=vitstudent.ac.in',
        }),
    ],
    secret: envHandler('JWT_KEY'),
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                await connectToDB();
                const dbUser = await User.findOne({ email: user.email });
                if (!dbUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        profilePic: user.image,
                        admin: false,
                    });
                }
                return true;
            } catch (err) {
                // logger.error('Error while operating with the user database.');
                console.log(err);
                return false;
            }
        },
        session: async ({ session }) => {
            await connectToDB();
            const user = await User.findOne({ email: session.user.email });

            //! if(!user) throw error for this

            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                },
            };
        },
    },
};

export default authOptions;
