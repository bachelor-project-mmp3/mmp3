import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Logo from '../../public/images/logo.svg';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

interface LandingPageHeaderProps {
    children: ReactNode;
    hideLogin?: boolean;
}

export const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({
    children,
    hideLogin,
}) => {
    const { data: session, status } = useSession();

    return (
        <>
            <Wrapper>
                <Navbar>
                    <StyledLogo />
                    {!hideLogin && (
                        <>
                            {status != 'authenticated' ? (
                                <StyledLog
                                    onClick={() =>
                                        signIn('fhs', {
                                            callbackUrl: '/api/auth/signin',
                                        })
                                    }>
                                    Log in
                                </StyledLog>
                            ) : (
                                <StyledLog
                                    onClick={() =>
                                        signOut({ callbackUrl: '/' })
                                    }>
                                    Log out
                                </StyledLog>
                            )}
                        </>
                    )}
                </Navbar>
                <WrapperContent>
                    <WrapperContentItem>{children}</WrapperContentItem>
                    <WrapperContentItem>
                        <MobileImageWrapper>
                            <MobileImage
                                src={'/images/hands_mobile.svg'}
                                alt="Image"
                                fill
                                sizes="100"
                                style={{
                                    objectFit: 'fill',
                                }}
                            />
                        </MobileImageWrapper>
                        <DesktopImageWrapper>
                            <DesktopImage
                                src={'/images/hands_desktop.svg'}
                                alt="Image"
                                fill
                                sizes="100"
                                style={{
                                    objectFit: 'fill',
                                }}
                            />
                        </DesktopImageWrapper>
                    </WrapperContentItem>
                </WrapperContent>
            </Wrapper>
        </>
    );
};

const Navbar = styled.div`
    display: flex;
    justify-content: center;
    padding: 40px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        justify-content: space-between;
        padding: 30px 60px 0px 60px;
    }
`;

const StyledLog = styled.p`
    display: none;
    @media ${(props) => props.theme.breakpoint.tablet} {
        display: block;
        cursor: pointer;
        text-decoration: none;
        color: ${({ theme }) => theme.primary};
        :hover {
            color: ${({ theme }) => theme.hoverPrimary};
        }
    }
`;

const StyledLogo = styled(Logo)`
    width: 250px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 300px;
    }
`;

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const WrapperContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 90vh;
`;

const WrapperContentItem = styled.div`
    width: 100%;
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 40%;
        &:nth-child(2) {
            align-self: flex-end;
            width: 60%;
        }
    }
    &:nth-child(2) {
        display: flex;
        align-self: flex-end;
    }
`;

const MobileImage = styled(Image)`
    display: block;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: none;
    }
`;

const DesktopImage = styled(Image)`
    display: none;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: block;
        height: 10vh;
    }
`;

const MobileImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 60vh;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: none;
    }
`;

const DesktopImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: none;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: block;
    }
`;
