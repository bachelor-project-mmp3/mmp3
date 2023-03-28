import React, { ReactNode } from 'react';
import styled from 'styled-components';
import GoBackIcon from '../../public/icons/goBack.svg';
import { useRouter } from 'next/router';

interface HeaderProps {
    backButton?: boolean;
    children: ReactNode;
}

export const Header = ({ backButton, children }: HeaderProps) => {
    const router = useRouter();

    return (
        <StyledHeader>
            <StyledBackButton backButton={backButton} onClick={router.back} />
            {children}
        </StyledHeader>
    );
};

export interface HeaderStyleProps {
    backButton: boolean;
}

export const StyledHeader = styled.div<HeaderStyleProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    padding-bottom: 20px;
    font-size: ${({ theme }) => theme.fonts.mobile.headline3};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.headline3};
    }
    font-weight: 800;
`;

const StyledBackButton = styled(GoBackIcon)<HeaderStyleProps>`
    display: ${(props) => (props.backButton ? 'inline' : 'none')};
    height: 16px;
    width: 16px;
    stroke-width: 20px;
    cursor: pointer;

    @media ${(props) => props.theme.breakpoint.tablet} {
        height: 24px;
        width: 24px;
    }
`;
