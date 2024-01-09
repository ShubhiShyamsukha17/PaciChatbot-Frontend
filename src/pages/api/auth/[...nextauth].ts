import authOptions from '@/providers/auth';
import NextAuth from 'next-auth/next';

export default NextAuth(authOptions);
