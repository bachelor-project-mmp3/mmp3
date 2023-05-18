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
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <SessionProvider session={session}>
                    <Head>
                        <link
                            rel="apple-touch-icon"
                            sizes="180x180"
                            href="/apple-touch-icon.jpg"
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
                        <title>{'Studentenfutter'}</title>
                        <meta name="theme-color" content="#ffffff" />
                        <style>{`
                        @font-face {
                            font-family: HankenGrotesk;
                            src: url(/fonts/hanken-grotesk-v5-latin-regular.woff2);
                            format: ('woff2');
                            font-display: swap;
                            font-weight:400;
                        }

                        @font-face {
                            font-family: HankenGrotesk;
                            src: url(/fonts/hanken-grotesk-v7-latin-800.woff2);
                            format: ('woff2');
                            font-display: swap;
                            font-weight:800;
                        }
                        `}</style>
                    </Head>
                    <Component {...pageProps} />
                </SessionProvider>
            </ThemeProvider>
        );
    }
};

export default App;
