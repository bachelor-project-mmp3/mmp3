import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../../ThemeConfig';
import React from 'react';
import css from 'styled-jsx/css';

interface ButtonProps {
    variant: 'primary' | 'secondary' | 'red';
    onClick?: (e: any) => void;
    children: ReactNode;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    variant,
    children,
    onClick,
    disabled,
}: ButtonProps) => {
    return (
        <StyledButton onClick={onClick} disabled={disabled} variant={variant}>
            {children}
        </StyledButton>
    );
};

interface ButtonStyleProps {
    variant: 'primary' | 'secondary' | 'red';
    disabled: boolean;
}

const StyledButton = styled.button<ButtonStyleProps>`
    padding: 8px 10px;
    border-radius: 20px;
    font-weight: 600;
    ${({ variant }) =>
        variant === 'primary' &&
        `
        background-color: ${theme.primary};
        border: 2px solid ${theme.primary};
        color: white;
        :hover {
            background-color: ${theme.hoverPrimary};
            border: 2px solid ${theme.hoverPrimary};
        }
    `}
    ${({ variant }) =>
        variant === 'secondary' &&
        `
        background-color: white;
        color:  ${theme.primary};
        border: 2px solid ${theme.primary};
        :hover {
            color: ${theme.hoverPrimary};
            border: 2px solid ${theme.hoverPrimary};
        }
    `}
    ${({ variant }) =>
        variant === 'red' &&
        `
        background-color: white;
        color: ${theme.red};
        border: 2px solid ${theme.red};
        :hover {
            color: ${theme.hoverRed};
            border: 2px solid ${theme.hoverRed};
        }
    `}
    ${({ disabled }) =>
        disabled &&
        `
    opacity: 0.5;
    cursor: not-allowed;
    `}
`;
