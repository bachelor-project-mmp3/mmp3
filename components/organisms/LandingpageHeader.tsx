import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Logo from '../../public/icons/logo.svg';
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
                                alt="Drawn hands and bubbles with chef hat"
                                fill
                                sizes="100"
                                style={{
                                    objectFit: 'fill',
                                }}
                            />
                        </MobileImageWrapper>
                        <TabletImageWrapper>
                            <TabletImage
                                src={'/images/hands_tablet.svg'}
                                alt="Drawn hands and bubbles with chef hat"
                                fill
                                sizes="100"
                                style={{
                                    objectFit: 'fill',
                                }}
                            />
                        </TabletImageWrapper>
                        <DesktopImageWrapper>
                            <DesktopImage
                                src={'/images/hands_desktop.svg'}
                                alt="Drawn hands and bubbles with chef hat"
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

const Navbar = styled.nav`
    display: flex;
    justify-content: center;
    padding-top: 30px;
    height: 20vh;
    position: relative;
    @media ${(props) => props.theme.breakpoint.tablet} {
        height: 10vh;
        justify-content: flex-end;
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
    width: 200px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        position: absolute;
        left: 60px;
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
    height: 80vh;
    @media ${(props) => props.theme.breakpoint.tablet} {
        height: 90vh;
    }
`;

const WrapperContentItem = styled.div`
    width: 100%;
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 50%;
        align-self: center;
        &:nth-child(2) {
            width: 49%;
        }
    }

    @media ${(props) => props.theme.breakpoint.desktop} {
        width: 40%;
        &:nth-child(2) {
            align-self: flex-end;
            width: 60%;
        }
        &:nth-child(1) {
            align-self: auto;
        }
    }
`;

const MobileImage = styled(Image)`
    display: block;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: none;
    }
`;

const TabletImage = styled(Image)`
    display: none;

    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: block;
    }

    @media ${({ theme }) => theme.breakpoint.desktop} {
        display: none;
    }
`;

const DesktopImage = styled(Image)`
    display: none;
    @media ${({ theme }) => theme.breakpoint.desktop} {
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

const TabletImageWrapper = styled.div`
    display: none;

    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: block;
        position: relative;
        width: 100%;
        height: 60vh;
    }

    @media ${({ theme }) => theme.breakpoint.desktop} {
        display: none;
    }
`;

const DesktopImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: none;
    @media ${({ theme }) => theme.breakpoint.desktop} {
        display: block;
    }
`;
