import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { theme, device } from '../../ThemeConfig';
import GoBackIcon from '../../public/icons/goBack.svg';
import { router } from 'next/client';

interface HeadProps {
    backButton?: boolean;
    children: ReactNode;
}

export const Head = ({ backButton, children }: HeadProps) => {
    return (
        <StyledHead>
            <StyledBackButton backButton={backButton} onClick={router.back} />
            {children}
        </StyledHead>
    );
};

export interface HeadStyleProps {
    backButton: boolean;
}

export const StyledHead = styled.div<HeadStyleProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    font-size: ${theme.fonts.mobile.headline};
    @media ${device.tablet} {
        font-size: ${theme.fonts.normal.headline};
    }
    font-weight: bold;
`;

const StyledBackButton = styled(GoBackIcon)<HeadStyleProps>`
    display: ${(props) => (props.backButton ? 'inline' : 'none')};
    height: 16px;
    width: 16px;
    stroke-width: 20px;
    cursor: pointer;
`;
