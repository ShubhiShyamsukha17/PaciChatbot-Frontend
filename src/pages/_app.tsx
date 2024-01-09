import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth/core/types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AppPropsWithSession extends AppProps {
    session: Session;
}

export default function App({
    Component,
    pageProps,
    session,
}: AppPropsWithSession) {
    return (
        <SessionProvider session={session}>
            <ToastContainer />
            <Component {...pageProps} />
        </SessionProvider>
    );
}
