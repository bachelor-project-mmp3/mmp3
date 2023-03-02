import { ReactNode } from 'react';
import styled from 'styled-components';
import React from 'react';

interface ButtonProps {
    variant: 'primary' | 'secondary' | 'red';
    onClick?: (e: any) => void;
    children: ReactNode;
    card?: boolean;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    variant,
    children,
    onClick,
    card,
    disabled,
}: ButtonProps) => {
    return (
        <StyledButton
            onClick={onClick}
            disabled={disabled}
            variant={variant}
            card={card}>
            {children}
        </StyledButton>
    );
};

interface ButtonStyleProps {
    variant: 'primary' | 'secondary' | 'red';
    disabled: boolean;
    card: boolean;
}

const StyledButton = styled.button<ButtonStyleProps>`
    padding: 8px 20px;
    border-radius: 20px;
    font-weight: 600;
    width: ${(props) => (props.card ? 'auto' : '45%')};
    ${(props) =>
        props.variant === 'primary' &&
        `
        background-color: ${props.theme.primary};
        border: 2px solid  ${props.theme.primary};
        color: white;
    `}
    ${(props) =>
        props.variant === 'primary' &&
        !props.disabled &&
        `

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
    `}
    ${(props) =>
        props.variant === 'secondary' &&
        !props.disabled &&
        `
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

    `}
    ${(props) =>
        props.variant === 'red' &&
        !props.disabled &&
        `
       
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
        padding: 10px 30px;
        border-radius: 24px;
    }
`;
