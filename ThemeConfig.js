import { createGlobalStyle } from 'styled-components';

const size = {
    tablet: '768px',
    desktop: '1200px',
};

export const theme = {
    body: '#FFFFFF',
    text: '#343434',
    red: '#EF4B4B',
    hoverRed: '#8a0606',
    primary: '#3d754c',
    hoverPrimary: '#306145',
    secondary: '#B3F0A8',
    green: '#a7dbbc',
    backgroundLightGreen: '#c5f7bc',
    darkGrey: '#696969',
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
            bubble: '12px',
        },
    },
    breakpoint: {
        tablet: `(min-width: ${size.tablet})`,
        desktop: `(min-width: ${size.desktop})`,
    },
};

export const GlobalStyles = createGlobalStyle`
  

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
    overflow-x: hidden;
    background: ${({ theme }) => theme.backgroundLightGreen};
    font-size: ${({ theme }) => theme.fonts.mobile.paragraph};
    @media ${({ theme }) => theme.breakpoint.tablet} {
      font-size: ${({ theme }) => theme.fonts.normal.paragraph};
  }
    color: ${({ theme }) => theme.text};
    font-family: HankenGrotesk, Arial, Roboto, sans-serif;
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

  .swiper-pagination-bullet-active{
    background-color: ${({ theme }) => theme.primary};
  }
  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal {
    position: unset;
    margin-top: 20px;
}
`;
