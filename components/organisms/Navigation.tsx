import React from 'react';
import styled from 'styled-components';
import EventsIcon from '../../public/icons/menu_events.svg';
import CreateIcon from '../../public/icons/menu_create.svg';
import ProfileIcon from '../../public/icons/menu_pro.svg';
import MyEventsIcon from '../../public/icons/fork-knife.svg';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navigation: React.FC = () => {
    const router = useRouter();
    console.log(router, 'router');
    const { data: session } = useSession();

    return (
        <>
            {router?.pathname === '/' ? (
                <></>
            ) : (
                <>
                    <DesktopNavigation>
                        <LogoText>
                            <Link href="/">Studentenfutter</Link>
                        </LogoText>
                        <DesktopNavigationItems>
                            <DesktopNavigationItem
                                isActive={
                                    router?.pathname === '/my-events' ||
                                    router?.pathname === '/requests'
                                }
                                onClick={() => router.push('/my-events')}>
                                <StyledMyEventsIcon
                                    isActive={
                                        router?.pathname === '/my-events' ||
                                        router?.pathname === '/requests'
                                    }
                                />
                                <NavText>My Events</NavText>
                            </DesktopNavigationItem>
                            <DesktopNavigationItem
                                isActive={
                                    router?.pathname === '/events' ||
                                    router?.pathname === '/events/[id]'
                                }
                                onClick={() => router.push('/events')}>
                                <StyledEventIcon
                                    isActive={
                                        router?.pathname === '/events' ||
                                        router?.pathname === '/events/[id]'
                                    }
                                />
                                <NavText>All Events</NavText>
                            </DesktopNavigationItem>
                            <DesktopNavigationItem
                                isActive={router?.pathname === '/events/create'}
                                onClick={() => router.push('/events/create')}>
                                <StyledCreateIcon
                                    isActive={
                                        router?.pathname === '/events/create'
                                    }
                                />
                                <NavText>Create Event</NavText>
                            </DesktopNavigationItem>
                            <DesktopNavigationItem
                                isActive={router?.pathname === '/profile/[id]'}
                                onClick={() =>
                                    router.push(
                                        `/profile/${session?.user.userId}`
                                    )
                                }>
                                <StyledProfileIcon
                                    isActive={
                                        router?.pathname === '/profile/[id]'
                                    }
                                />
                                <NavText>Profile</NavText>
                            </DesktopNavigationItem>
                        </DesktopNavigationItems>
                        <DesktopFooter>
                            <Link href="/imprint">Imprint</Link>
                            <Link href="/privacy">Data Privacy</Link>
                            <DesktopLogout
                                onClick={() => signOut({ callbackUrl: '/' })}>
                                Logout
                            </DesktopLogout>
                        </DesktopFooter>
                    </DesktopNavigation>
                    <MobileNavigation>
                        <StyledMyEventsIcon
                            isActive={
                                router?.pathname === '/my-events' ||
                                router?.pathname === '/requests'
                            }
                            onClick={() => router.push('/my-events')}
                        />
                        <StyledEventIcon
                            isActive={
                                router?.pathname === '/events' ||
                                router?.pathname === '/events/[id]'
                            }
                            onClick={() => router.push('/events')}
                        />
                        <StyledCreateIcon
                            isActive={router?.pathname === '/events/create'}
                            onClick={() => router.push('/events/create')}
                        />
                        <StyledProfileIcon
                            isActive={router?.pathname === '/profile/[id]'}
                            onClick={() =>
                                router.push(`/profile/${session?.user.userId}`)
                            }
                        />
                    </MobileNavigation>
                </>
            )}
        </>
    );
};

export default Navigation;

const MobileNavigation = styled.div`
    height: 70px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 100;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
    box-shadow: 0px 10px 25px 2px ${({ theme }) => theme.darkGrey};

    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: none;
    }
`;

interface NavProps {
    isActive: boolean;
}

const StyledEventIcon = styled(EventsIcon)<NavProps>`
    height: 32px;
    width: 32px;
    color: ${(props) =>
        props.isActive ? props.theme.primary : props.theme.text};

    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const StyledCreateIcon = styled(CreateIcon)<NavProps>`
    height: 32px;
    width: 32px;
    color: ${(props) =>
        props.isActive ? props.theme.primary : props.theme.text};
    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const StyledProfileIcon = styled(ProfileIcon)<NavProps>`
    height: 32px;
    width: 32px;
    color: ${(props) =>
        props.isActive ? props.theme.primary : props.theme.text};
    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const StyledMyEventsIcon = styled(MyEventsIcon)<NavProps>`
    height: 32px;
    width: 32px;
    color: ${(props) =>
        props.isActive ? props.theme.primary : props.theme.text};
    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const DesktopNavigation = styled.div`
    display: none;

    @media ${({ theme }) => theme.breakpoint.tablet} {
        background-color: white;
        width: 300px;
        height: 100vh;
        position: fixed;
        left: 0;
        box-shadow: 5px 0 15px -11px ${({ theme }) => theme.darkGrey};
        display: block;
    }
`;

const DesktopNavigationItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;
    position: absolute;
    width: 100%;
    bottom: 150px;
`;

const DesktopNavigationItem = styled.div<NavProps>`
    display: flex;
    gap: 20px;
    align-items: center;
    width: 200px;
    cursor: pointer;

    font-size: ${({ theme }) => theme.fonts.normal.paragraph};

    color: ${(props) =>
        props.isActive ? props.theme.primary : props.theme.text};

    :hover {
        * {
            color: ${({ theme }) => theme.primary};
        }
    }

    ${(props) =>
        props.isActive &&
        `
            font-weight: 600;
        `}
`;

const NavText = styled.div``;

const DesktopFooter = styled.div`
    font-size: ${({ theme }) => theme.fonts.normal.info};
    display: flex;
    gap: 20px;
    padding: 0 20px;
    position: absolute;
    width: 100%;
    bottom: 30px;

    * {
        text-decoration: none;
    }
`;

const DesktopLogout = styled.div`
    margin-left: auto;
    cursor: pointer;

    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const LogoText = styled.div`
    font-size: ${({ theme }) => theme.fonts.normal.headline4};
    font-weight: 600;
    text-align: center;
    padding-top: 20px;

    * {
        text-decoration: none;
    }
`;
