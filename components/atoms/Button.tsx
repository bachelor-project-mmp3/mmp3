import { ReactNode } from 'react';
import styled from 'styled-components';
import React from 'react';

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
    ${(props) =>
        props.variant === 'primary' &&
        `
        background-color: ${props.theme.primary};
        border: 2px solid  ${props.theme.primary};
        color: white;
        :hover {
            background-color: ${props.theme.hoverPrimary};
            border: 2px solid ${props.theme.hoverPrimary};
        }
    `}
    ${(props) =>
        props.variant === 'secondary' &&
        `
        background-color: white;
        color:  ${props.theme.primary};
        border: 2px solid ${props.theme.primary};
        :hover {
            color: ${props.theme.hoverPrimary};
            border: 2px solid ${props.theme.hoverPrimary};
        }
    `}
    ${(props) =>
        props.variant === 'red' &&
        `
        background-color: white;
        color:  ${props.theme.red};
        border: 2px solid  ${props.theme.red};
        :hover {
            color: ${props.theme.hoverRed};
            border: 2px solid ${props.theme.hoverRed};
        }
    `}
    ${({ disabled }) =>
        disabled &&
        `
    opacity: 0.5;
    cursor: not-allowed;
    `}
    font-size: ${({ theme }) => theme.fonts.mobile.paragraph};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.paragraph};
        padding: 10px 12px;
        border-radius: 24px;
    }
`;
