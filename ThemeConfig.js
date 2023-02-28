import { createGlobalStyle } from 'styled-components';

export const theme = {
    body: '#FFFFFF',
    text: '#343434',
    red: '#EF4B4B',
    primary: '#F3B151',
    green: '#A9E6A6',
    orange: '#FCC372',
    backgroundLightGreen: '#DBFFB7',
    backgroundLighterGreen: '#F1FFE2',
    backgroundLightOrange: '#FDD192',
    backgroundLighterOrange: '#FEE6C4',
    backgroundLightestOrange: '#FEF8EE',
    darkGrey: '#707070',
    midGrey: '#A2A2A2',
    lightGrey: '#DDDDDD',
    cremeDark: '#FFF6A9',
    cremeLight: '#FFFACD',
    fonts: {
        normal: {
            headline: '2.5em',
            headline2: '2em',
            headline3: '1.8em',
            headline4: '1.7em',
            headline5: '1.3em',
            paragraph: '1.2em',
            smallParagraph: '1em',
            info: '0.8em',
            caption: '0.7em',
        },
        mobile: {
            headline: '26px',
            headline2: '24px',
            headline3: '22px',
            headline4: '20px',
            headline5: '18px',
            paragraph: '16px',
            smallParagraph: '16px',
            info: '16px',
            caption: '16px',
        },
    },
};

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: HankenGrotesk;
    src: url("/fonts/hanken-grotesk-v5-latin-regular.woff2");
    format: ("woff2");
    font-display: swap;
  }
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
      box-sizing: inherit;
  }

  button {
      cursor: pointer;
  }
  body {
    margin: 0;
    padding: 0;
    font-size: ${({ theme }) => theme.fonts.mobile.paragraph};
    color: ${({ theme }) => theme.text};
    font-family: HankenGrotesk, Arial, Roboto, sans-serif;
    background: rgb(219,255,183);
    background: linear-gradient(173deg, rgba(219,255,183,1) 0%, rgba(241,255,226,1) 35%, rgba(255,255,255,1) 65%, rgba(255,250,205,1) 86%, rgba(255,246,169,1) 100%);
  }
  a {
    color: ${({ theme }) => theme.text};
  }
  a:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
