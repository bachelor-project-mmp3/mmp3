import { render, screen } from '@testing-library/react';
import { ToolTip } from '../components/atoms/ToolTip';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom/extend-expect';

const size = {
    tablet: '768px',
    desktop: '1200px',
};

const theme = {
    body: '#FFFFFF',
    text: '#343434',
    red: '#DB1F1F',
    hoverRed: '#8a0606',
    primary: '#22853c',
    hoverPrimary: '#1a6d30',
    secondary: '#B3F0A8',
    green: '#a7dbbc',
    backgroundLightGreen: '#c5f7bc',
    darkGrey: '#696969',
    midGrey: '#717171',
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

describe('ToolTip', () => {
    it('renders ToolTip open correctly with information', () => {
        render(
            <ThemeProvider theme={theme}>
                <ToolTip open>Zucchini, Tomaten, Melanzani</ToolTip>
            </ThemeProvider>
        );

        const children = screen.getByText('Zucchini, Tomaten, Melanzani');

        expect(children).toBeInTheDocument();
    });
});

describe('ToolTip', () => {
    it('renders ToolTip closed correctly with information', () => {
        render(
            <ThemeProvider theme={theme}>
                <ToolTip open={false}>Zucchini, Tomaten, Melanzani</ToolTip>
            </ThemeProvider>
        );

        const children = screen.getByText('Zucchini, Tomaten, Melanzani');

        expect(children).not.toBeVisible();
    });
});
