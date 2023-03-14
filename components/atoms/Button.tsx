import { ReactNode } from 'react';
import styled from 'styled-components';
import React from 'react';

interface ButtonProps {
    variant: 'primary' | 'secondary' | 'red';
    onClick?: (e: any) => void;
    children: ReactNode;
    width?: number;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    variant,
    children,
    onClick,
    width,
    disabled,
}: ButtonProps) => {
    return (
        <StyledButton
            onClick={onClick}
            disabled={disabled}
            variant={variant}
            width={width}>
            {children}
        </StyledButton>
    );
};

interface ButtonStyleProps {
    variant: 'primary' | 'secondary' | 'red';
    disabled: boolean;
    width?: number;
}

const StyledButton = styled.button<ButtonStyleProps>`
    padding: 8px 20px;
    border-radius: 20px;
    font-weight: 600;
    box-shadow: 8px 8px 20px -11px ${({ theme }) => theme.darkGrey};
    width: ${(props) => (props.width ? `${props.width}%` : 'auto')};
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
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
        padding: 10px 30px;
        border-radius: 24px;
    }
`;
