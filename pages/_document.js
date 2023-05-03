import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head></Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
