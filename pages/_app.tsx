import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from '../ThemeConfig';
import Head from 'next/head';

const App = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
    {
        return (
            <SessionProvider session={session}>
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <Head>
                        <link
                            rel="apple-touch-icon"
                            sizes="180x180"
                            href="/apple-touch-icon.svg"
                        />
                        <link
                            rel="icon"
                            type="image/svg"
                            sizes="32x32"
                            href="/favicon-32x32.svg"
                        />
                        <link
                            rel="icon"
                            type="image/svg"
                            sizes="16x16"
                            href="/favicon-16x16.svg"
                        />
                        <link rel="manifest" href="/site.webmanifest" />
                        <link
                            rel="mask-icon"
                            href="/safari-pinned-tab.svg"
                            color="#5bbad5"
                        />
                        <meta
                            name="msapplication-TileColor"
                            content="#da532c"
                        />
                        <meta name="theme-color" content="#ffffff" />
                    </Head>
                    <Component {...pageProps} />
                </ThemeProvider>
            </SessionProvider>
        );
    }
};

export default App;
