import { ReactNode } from 'react';
import styled from 'styled-components';
import React from 'react';

interface CardProps {
    height?: string;
    width?: string;
    children: ReactNode;
}

export const Card: React.FC<CardProps> = ({
    children,
    height,
    width,
}: CardProps) => {
    return (
        <StyledCard style={{ height: height, width: width }}>
            {children}
        </StyledCard>
    );
};

const StyledCard = styled.div`
    border-radius: 40px;
    box-shadow: 17px 17px 35px -11px ${({ theme }) => theme.darkGrey};
    padding: 10px 20px 20px 20px;
    margin: 40px 0;
    background: white;
`;
