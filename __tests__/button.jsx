import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/atoms/Button';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom/extend-expect';
import { theme } from '../ThemeConfig';

describe('Button', () => {
    it('renders with correct primary styles', () => {
        const onClickMock = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <Button variant="primary" onClick={onClickMock}>
                    Click me
                </Button>
            </ThemeProvider>
        );

        const button = screen.getByText('Click me');
        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle(`
            background-color: #22853c;
            border: 2px solid #22853c;
            color: white;
            font-size: 16px;
        `);
    });
    it('calls onClick callback when clicked', () => {
        const onClickMock = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <Button variant="secondary" onClick={onClickMock}>
                    Click me
                </Button>
            </ThemeProvider>
        );

        const button = screen.getByText('Click me');
        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('renders with correct styles for "red" variant', () => {
        render(
            <ThemeProvider theme={theme}>
                <Button variant="red" disabled={false}>
                    Red Button
                </Button>
            </ThemeProvider>
        );

        const button = screen.getByText('Red Button');
        expect(button).toHaveStyle(`
          background-color: white;
          color: #DB1F1F;
          border: 2px solid #DB1F1F;
          font-size: 16px;
        `);
    });
    it('renders with correct styles for "secondary" variant', () => {
        render(
            <ThemeProvider theme={theme}>
                <Button variant="secondary" disabled={false}>
                    Secondary Button
                </Button>
            </ThemeProvider>
        );

        const button = screen.getByText('Secondary Button');
        expect(button).toHaveStyle(`
          background-color: white;
          color: #22853c;
          border: 2px solid #22853c;
          font-size: 16px;
        `);
    });
    it('renders with correct width', () => {
        render(
            <ThemeProvider theme={theme}>
                <Button variant="primary" width={50}>
                    Wide Button
                </Button>
            </ThemeProvider>
        );

        const button = screen.getByText('Wide Button');
        expect(button).toHaveStyle('width: 50%;');
    });
    it('renders a disabled button', () => {
        render(
            <ThemeProvider theme={theme}>
                <Button variant="primary" disabled>
                    Disabled Button
                </Button>
            </ThemeProvider>
        );

        const button = screen.getByText('Disabled Button');
        expect(button).toHaveAttribute('disabled');
        expect(button).toHaveStyle(`
            background-color: #22853c;
            border: 2px solid #22853c;
            color: white;
            opacity: 0.5;
            cursor: not-allowed;
            font-size: 16px;
        `);
    });
});
