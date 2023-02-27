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
       headline: "2.5em",
       headline2: "2em",
       headline3: "1.8em",
       headline4: "1.7em",
       headline5: "1.3em", 
       paragraph: "1.2em",
       smallParagraph: "1em",
       info: "0.8em",
       caption: "0.7em"
    }
};

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: HankenGrotesk;
    src: url("/fonts/hanken-grotesk-v5-latin-regular.woff2");
    format: ("woff2");
    font-display: swap;
  }
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: HankenGrotesk, Arial, Roboto, sans-serif;
  }
  a {
    color: ${({ theme }) => theme.text};
  }
  a:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
