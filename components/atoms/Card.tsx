import { ReactNode } from 'react';
import styled from 'styled-components';
import React from 'react';

interface CardProps {
    variant?: 'no-padding';
    height?: string;
    width?: string;
    children: ReactNode;
}

export const Card: React.FC<CardProps> = ({
    variant,
    children,
    height,
    width,
}: CardProps) => {
    return (
        <StyledCard variant={variant} style={{ height: height, width: width }}>
            {children}
        </StyledCard>
    );
};

interface CardStyleProps {
    variant: 'no-padding';
}

const StyledCard = styled.div<CardStyleProps>`
    border-radius: 40px;
    box-shadow: 17px 17px 35px -11px ${({ theme }) => theme.darkGrey};
    margin: 40px 0;
    background: white;
    padding: 10px 20px 20px 20px;
    ${(props) =>
        props.variant === 'no-padding' &&
        `
        padding: 0;
    `}
`;
