import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export const Footer = () => {
    const router = useRouter();
    return (
        <>
            <Wrapper>
                <StyledText>Join the mix</StyledText>
                <LinksWrapper>
                    <StyledText>&copy; 2023 Studentenfutter</StyledText>
                    <StyledText onClick={() => router.push('/imprint')}>
                        Imprint
                    </StyledText>
                    <StyledText onClick={() => router.push('/privacy')}>
                        Privacy
                    </StyledText>
                </LinksWrapper>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    padding: 60px 30px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        padding: 60px;
    }
`;

const LinksWrapper = styled.div`
    border-top: 1px solid ${({ theme }) => theme.darkGrey};
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 20px;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        gap: 40px;
        padding-top: 40px;
        font-size: ${({ theme }) => theme.fonts.normal.info};
`;

const StyledText = styled.p`
    color: ${({ theme }) => theme.darkGrey};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fonts.mobile.info};
    :first-child {
        cursor: initial;
    }
    @media ${({ theme }) => theme.breakpoint.tablet} {
      font-size: ${({ theme }) => theme.fonts.normal.info};
`;
