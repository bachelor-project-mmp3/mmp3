import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Logo from '../../public/images/logo.svg';
import { signIn, signOut, useSession } from 'next-auth/react';

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
                {children}
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
