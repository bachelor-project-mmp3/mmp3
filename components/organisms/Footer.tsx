import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import FhsLogo from '../../public/icons/fhs.svg';
import Link from 'next/link';

export const Footer = () => {
    const router = useRouter();
    const { status } = useSession();
    return (
        <>
            <Wrapper>
                <StyledText
                    onClick={() =>
                        status === 'authenticated'
                            ? router.push('/events')
                            : signIn('fhs', {
                                callbackUrl: '/api/auth/signin',
                            })
                    }>
                    Join the mix
                </StyledText>
                <LinksWrapper>
                    <FhsSign
                        href="https://www.fh-salzburg.ac.at/"
                        target="_blank">
                        <StyledFHLogo />
                        <FhsText>FH Salzburg</FhsText>
                    </FhsSign>

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
    }
`;

const StyledText = styled.p`
    color: ${({ theme }) => theme.darkGrey};
    cursor: pointer;
    &:nth-child(2){
        cursor: default;
    }
    font-size: ${({ theme }) => theme.fonts.mobile.info};
    @media ${({ theme }) => theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
    }
`;

const FhsSign = styled(Link)`
    margin-right: auto;
    flex-direction: column;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    text-decoration: none;
`;

const FhsText = styled.span`
    display: none;

    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: block;
        font-size: ${({ theme }) => theme.fonts.normal.info};
        color: ${({ theme }) => theme.darkGrey};
    }
`;

const StyledFHLogo = styled(FhsLogo)`
    width: 20px;

    @media ${({ theme }) => theme.breakpoint.tablet} {
        width: 30px;
    }
`;
