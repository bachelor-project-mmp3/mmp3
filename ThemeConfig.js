import { createGlobalStyle } from 'styled-components';

const size = {
    tablet: '768px',
};

export const theme = {
    body: '#FFFFFF',
    text: '#343434',
    red: '#EF4B4B',
    hoverRed: '#8a0606',
    primary: '#F3B151',
    hoverPrimary: '#e68a05',
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
            headline: '2.5em', //30pt
            headline2: '2em', //24pt
            headline3: '1.8em', //22pt
            headline4: '1.7em', // 20pt
            headline5: '1.3em', // 16pt
            paragraph: '1.2em', // 14pt
            smallParagraph: '1em', // 12pt
            info: '0.8em', // 10pt
            caption: '0.7em', // 8pt
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
    breakpoint: {
        tablet: `(min-width: ${size.tablet})`,
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
    @media ${({ theme }) => theme.breakpoint.tablet} {
      font-size: ${({ theme }) => theme.fonts.normal.paragraph};
  }
    color: ${({ theme }) => theme.text};
    font-family: HankenGrotesk, Arial, Roboto, sans-serif;
    background-image: url("images/background_mobile.png");
    background-repeat: no-repeat;
    background-size: cover;
    @media ${({ theme }) => theme.breakpoint.tablet} {
      background-image: url("images/background_desktop.png");
  }
  }
  a {
    color: ${({ theme }) => theme.text};
  }
  a:hover {
    color: ${({ theme }) => theme.primary};
  }
  textarea, input{
    font-family: HankenGrotesk, Arial, Roboto, sans-serif;
  }
`;
