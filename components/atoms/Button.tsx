import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
    variant: 'primary' | 'secondary';
    onClick?: (e: any) => void;
    children: ReactNode;
    disabled?: boolean;
}

export const Button = ({
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
    variant: 'primary' | 'secondary';
    disabled: boolean;
}

const StyledButton = styled.button<ButtonStyleProps>`
    background-color: ${(props) =>
        props.variant === 'primary' ? 'red' : 'white'};
    color: ${(props) => (props.disabled ? 'pink' : 'lime')};
    padding: 10px;
`;
