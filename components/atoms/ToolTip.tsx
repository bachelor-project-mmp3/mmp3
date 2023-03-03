import styled from 'styled-components';
import React, { ReactNode } from 'react';

interface ToolTipProps {
    children: ReactNode;
    open: boolean;
}
export const ToolTip: React.FC<ToolTipProps> = ({
    children,
    open,
}: ToolTipProps) => {
    return <StyledToolTipText open={open}>{children}</StyledToolTipText>;
};

interface ToolTipStyleProps {
    open: boolean;
}

const StyledToolTipText = styled.span<ToolTipStyleProps>`
    display: ${(props) => (props.open ? 'initial' : 'none')};
    width: 120px;
    background-color: ${({ theme }) => theme.cremeLight};
    color: #000;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
`;
