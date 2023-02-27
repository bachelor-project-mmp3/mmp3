import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from '../themeConfig';

const App = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
    {
        return (
            <SessionProvider session={session}>
                <ThemeProvider theme={theme}>
                    <GlobalStyles />

                    <Component {...pageProps} />
                </ThemeProvider>
            </SessionProvider>
        );
    }
};

export default App;
