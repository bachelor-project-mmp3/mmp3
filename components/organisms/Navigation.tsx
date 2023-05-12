import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EventsIcon from '../../public/icons/events_feed.svg';
import CreateIcon from '../../public/icons/menu_create.svg';
import ProfileIcon from '../../public/icons/menu_pro.svg';
import MyEventsIcon from '../../public/icons/my_events.svg';
import RequestsIcon from '../../public/icons/requests.svg';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import Logo from '../../public/icons/logo.svg';
import { RequestStatus } from '@prisma/client';
import { NotificationBubble } from '../atoms/NotificationBubble';

const hideNavigationOnPaths = [
    '/profile/[id]/edit',
    '/profile/create',
    '/events/[id]/edit',
    '/events/create',
];

const Navigation: React.FC = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [pendingRequestsLength, setPendingRequestsLength] = useState(0);

    useEffect(() => {
        fetch('/api/requests', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                const pendingRequests = data.requests.filter(
                    (request) =>
                        request.status === RequestStatus.PENDING &&
                        request.Event.host.id === session?.user.userId
                ).length;
                setPendingRequestsLength(pendingRequests);
            });
    }, []);

    return (
        <>
            {router?.pathname === '/' || router?.pathname === '/landingpage' ? (
                <></>
            ) : (
                <>
                    <DesktopNavigation>
                        <StyledLogo onClick={() => router.push('/')} />

                        <DesktopNavigationItems>
                            <DesktopNavigationItem
                                $isactive={router?.pathname === '/my-events'}
                                onClick={() => router.push('/my-events')}>
                                <StyledMyEventsIcon
                                    $isactive={
                                        router?.pathname === '/my-events'
                                    }
                                />
                                <NavText>My Events</NavText>
                            </DesktopNavigationItem>
                            <DesktopNavigationItem
                                $isactive={
                                    router?.pathname === '/events' ||
                                    router?.pathname === '/events/[id]'
                                }
                                onClick={() => router.push('/events')}>
                                <StyledEventIcon
                                    $isactive={
                                        router?.pathname === '/events' ||
                                        router?.pathname === '/events/[id]'
                                    }
                                />
                                <NavText>All Events</NavText>
                            </DesktopNavigationItem>
                            <DesktopNavigationItem
                                $isactive={
                                    router?.pathname === '/events/create'
                                }
                                onClick={() => router.push('/events/create')}>
                                <StyledCreateIcon
                                    $isactive={
                                        router?.pathname === '/events/create'
                                    }
                                />
                                <NavText>Create Event</NavText>
                            </DesktopNavigationItem>
                            <BubbleWrapper>
                                {pendingRequestsLength > 0 && (
                                    <NotificationBubble>
                                        {pendingRequestsLength}
                                    </NotificationBubble>
                                )}
                                <DesktopNavigationItem
                                    $isactive={router?.pathname === '/requests'}
                                    onClick={() => router.push('/requests')}>
                                    <StyledRequestsIcon
                                        $isactive={
                                            router?.pathname === '/requests'
                                        }
                                    />
                                    <NavText>Requests</NavText>
                                </DesktopNavigationItem>
                            </BubbleWrapper>
                            <DesktopNavigationItem
                                $isactive={
                                    (router?.pathname === `/profile/[id]` &&
                                        router?.query.id ===
                                            session?.user.userId) ||
                                    (router?.pathname ===
                                        `/profile/[id]/edit` &&
                                        router?.query.id ===
                                            session?.user.userId)
                                }
                                onClick={() =>
                                    router.push(
                                        `/profile/${session?.user.userId}`
                                    )
                                }>
                                <StyledProfileIcon
                                    $isactive={
                                        (router?.pathname === `/profile/[id]` &&
                                            router?.query.id ===
                                                session?.user.userId) ||
                                        (router?.pathname ===
                                            `/profile/[id]/edit` &&
                                            router?.query.id ===
                                                session?.user.userId)
                                    }
                                />
                                <NavText>Profile</NavText>
                            </DesktopNavigationItem>
                            <DesktopSignOutButton>
                                <Button
                                    variant="secondary"
                                    width={100}
                                    onClick={() =>
                                        signOut({ callbackUrl: '/' })
                                    }>
                                    Logout
                                </Button>
                            </DesktopSignOutButton>
                        </DesktopNavigationItems>
                        <DesktopFooter>
                            <Link href="/imprint">Imprint</Link>
                            <Link href="/privacy">Data Privacy</Link>
                        </DesktopFooter>
                    </DesktopNavigation>
                    {!hideNavigationOnPaths.includes(router?.pathname) && (
                        <MobileNavigation>
                            <StyledMyEventsIcon
                                $isactive={router?.pathname === '/my-events'}
                                onClick={() => router.push('/my-events')}
                            />
                            <StyledEventIcon
                                $isactive={
                                    router?.pathname === '/events' ||
                                    router?.pathname === '/events/[id]'
                                }
                                onClick={() => router.push('/events')}
                            />
                            <StyledCreateIcon
                                $isactive={
                                    router?.pathname === '/events/create'
                                }
                                onClick={() => router.push('/events/create')}
                            />
                            <BubbleWrapper>
                                <StyledRequestsIcon
                                    $isactive={router?.pathname === '/requests'}
                                    onClick={() => router.push('/requests')}
                                />
                                {pendingRequestsLength > 0 && (
                                    <NotificationBubble>
                                        {pendingRequestsLength}
                                    </NotificationBubble>
                                )}
                            </BubbleWrapper>
                            <StyledProfileIcon
                                $isactive={
                                    (router?.pathname === `/profile/[id]` &&
                                        router?.query.id ===
                                            session?.user.userId) ||
                                    (router?.pathname ===
                                        `/profile/[id]/edit` &&
                                        router?.query.id ===
                                            session?.user.userId)
                                }
                                onClick={() =>
                                    router.push(
                                        `/profile/${session?.user.userId}`
                                    )
                                }
                            />
                        </MobileNavigation>
                    )}
                </>
            )}
        </>
    );
};

export default Navigation;

const MobileNavigation = styled.nav`
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
    $isactive: boolean;
}

const StyledEventIcon = styled(EventsIcon)<NavProps>`
    height: 32px;
    width: 32px;
    color: ${(props) =>
        props.$isactive ? props.theme.primary : props.theme.text};

    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const StyledCreateIcon = styled(CreateIcon)<NavProps>`
    height: 32px;
    width: 32px;
    color: ${(props) =>
        props.$isactive ? props.theme.primary : props.theme.text};
    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const StyledProfileIcon = styled(ProfileIcon)<NavProps>`
    height: 32px;
    width: 32px;
    color: ${(props) =>
        props.$isactive ? props.theme.primary : props.theme.text};
    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const StyledMyEventsIcon = styled(MyEventsIcon)<NavProps>`
    height: 32px;
    width: 32px;
    color: ${(props) =>
        props.$isactive ? props.theme.primary : props.theme.text};
    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const StyledRequestsIcon = styled(RequestsIcon)<NavProps>`
    height: 32px;
    width: 32px;
    color: ${(props) =>
        props.$isactive ? props.theme.primary : props.theme.text};
    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const DesktopNavigation = styled.nav`
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
    bottom: 55px;
`;

const DesktopSignOutButton = styled.div`
    width: 200px;
`;

const DesktopNavigationItem = styled.div<NavProps>`
    display: flex;
    gap: 20px;
    align-items: center;
    width: 200px;
    cursor: pointer;
    position: relative;

    font-size: ${({ theme }) => theme.fonts.normal.paragraph};

    color: ${(props) =>
        props.$isactive ? props.theme.primary : props.theme.text};

    :hover {
        * {
            color: ${({ theme }) => theme.primary};
        }
    }

    ${(props) =>
        props.$isactive &&
        `
            font-weight: 800;
        `}
`;

const NavText = styled.div``;

const DesktopFooter = styled.div`
    font-size: ${({ theme }) => theme.fonts.normal.info};
    display: flex;
    justify-content: space-around;
    padding: 0 20px;
    position: absolute;
    width: 100%;
    bottom: 20px;

    * {
        text-decoration: none;
    }
`;

const StyledLogo = styled(Logo)`
    margin: 35px;
    cursor: pointer;
`;

const BubbleWrapper = styled.div`
    position: relative;
`;
