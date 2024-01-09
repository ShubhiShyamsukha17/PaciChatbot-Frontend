import { TeamDocument } from '@/models/teamModel';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next' {
    interface NextApiRequest {
        session: Session;
    }
}
