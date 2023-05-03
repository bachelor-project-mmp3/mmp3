import React, { ReactNode } from 'react';
import styled from 'styled-components';
import GoBackIcon from '../../public/icons/goBack.svg';
import { useRouter } from 'next/router';

export const Header = () => {
    const router = useRouter();

    return (
        <StyledHeader onClick={router.back}>
            <StyledBackButton onClick={router.back} />
            Go back
        </StyledHeader>
    );
};

export interface HeaderStyleProps {
    backButton: boolean;
}

export const StyledHeader = styled.div<HeaderStyleProps>`
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
    cursor: pointer;
    margin-left: 18px;

    font-size: ${({ theme }) => theme.fonts.mobile.info};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
    }
`;

const StyledBackButton = styled(GoBackIcon)`
    height: 16px;
    width: 16px;
    stroke-width: 20px;
`;
