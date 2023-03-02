import React, { ReactNode } from 'react';
import styled from 'styled-components';
import GoBackIcon from '../../public/icons/goBack.svg';
import { useRouter } from 'next/router';

interface HeadProps {
    backButton?: boolean;
    children: ReactNode;
    onClick: (e: any) => void;
}

export const Head = ({ backButton, children, onClick }: HeadProps) => {
    const router = useRouter();

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
    font-size: ${({ theme }) => theme.fonts.mobile.headline};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.headline};
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
