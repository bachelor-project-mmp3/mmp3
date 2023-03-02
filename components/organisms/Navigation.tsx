import React from 'react';
import styled from 'styled-components';
import EventsIcon from '../../public/icons/menu_events.svg';
import CreateIcon from '../../public/icons/menu_create.svg';
import ProfileIcon from '../../public/icons/menu_pro.svg';
import MyEventsIcon from '../../public/icons/fork-knife.svg';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Navigation: React.FC = () => {
    const router = useRouter();
    console.log(router, 'router');
    const { data: session } = useSession();

    return (
        <>
            {router?.pathname === '/' ? (
                <></>
            ) : (
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

interface IconProps {
    isActive: boolean;
}

const StyledEventIcon = styled(EventsIcon)<IconProps>`
    height: 32px;
    color: ${(props) =>
        props.isActive ? props.theme.primary : props.theme.text};
    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const StyledCreateIcon = styled(CreateIcon)<IconProps>`
    height: 32px;
    color: ${(props) =>
        props.isActive ? props.theme.primary : props.theme.text};
    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const StyledProfileIcon = styled(ProfileIcon)<IconProps>`
    height: 32px;
    color: ${(props) =>
        props.isActive ? props.theme.primary : props.theme.text};
    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;

export const StyledMyEventsIcon = styled(MyEventsIcon)<IconProps>`
    height: 32px;
    color: ${(props) =>
        props.isActive ? props.theme.primary : props.theme.text};
    :hover {
        color: ${({ theme }) => theme.primary};
    }
`;
