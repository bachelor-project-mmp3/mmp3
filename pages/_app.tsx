import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

const App = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
    {
        return (
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        );
    }
};

export default App;
