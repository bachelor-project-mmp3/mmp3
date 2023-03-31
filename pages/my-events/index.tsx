import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import ExtendedEventPreview from '../../components/organisms/events/ExtendedEventPreview';
import { useRouter } from 'next/router';
import { Header } from '../../components/organisms/Header';
import { SmallEventPreview } from '../../components/organisms/events/SmallEventPreview';
import { useSession } from 'next-auth/react';
import { Loading } from '../../components/organisms/Loading';
import InfoPopUp from '../../components/organisms/popups/InfoPopUp';
import { hasUserSendRequestHelper } from '../../helper/EventsAndUserHelper';
import Notification from '../../components/organisms/my-events/Notification';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NoPastEventsIllustration from '../../public/images/no_past_events.svg';
import NoUpcomingEventsIllustration from '../../public/images/no_upcoming_events.svg';

const MyEvents = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [upcomingEvents, setUpcomingEvents] = useState(null);
    const [notifications, setNotfications] = useState(null);
    const [pastEvents, setPastEvents] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [showInfoPopOpOnLeave, setShowInfoPopOpOnLeave] =
        useState<boolean>(false);
    const [isToggle, setIsToggle] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/my-events', {
                method: 'GET',
            }),
            fetch('/api/notifications', {
                method: 'GET',
            }),
        ])
            .then(([resEvents, resNotifications]) =>
                Promise.all([resEvents.json(), resNotifications.json()])
            )
            .then(([dataEvents, dataNotifications]) => {
                setUpcomingEvents(dataEvents.upcomingEvents);
                setPastEvents(dataEvents.pastEvents);
                setNotfications(dataNotifications.notification);
                setLoading(false);
            });
    }, []);

    const onClickHide = async (notificationId: string) => {
        setLoading(true);

        const res = await fetch(`/api/notifications/${notificationId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 200) {
            let updatedNotifications = notifications.filter(
                (notifications) => notifications.id !== notificationId
            );

            setNotfications(updatedNotifications);
            setLoading(false);
        } else {
            router.push('/404');
        }
    };

    const onClickLink = async (notificationId: string, eventId: string) => {
        const res = await fetch(`/api/notifications/${notificationId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 200) {
            router.push(`events/${eventId}`);
        } else {
            router.push('/404');
        }
    };

    const onSubmitLeave = async (requestId: string, eventId: string) => {
        setLoading(true);

        const res = await fetch(`/api/requests/${requestId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 200) {
            let updatedEvents = upcomingEvents.filter(
                (event) => event.id !== eventId
            );

            setUpcomingEvents(updatedEvents);
            setLoading(false);
            setShowInfoPopOpOnLeave(true);
        } else {
            router.push('/404');
        }
    };

    if (isLoading) return <Loading />;

    return (
        <>
            {showInfoPopOpOnLeave && (
                <InfoPopUp onClose={() => setShowInfoPopOpOnLeave(false)}>
                    You left the event.
                </InfoPopUp>
            )}

            <Layout>
                <Header>Hello {session?.user?.firstName}! 👋</Header>
                {notifications?.length > 0 && (
                    <StyledHeadline>Notifications</StyledHeadline>
                )}
                <NotificationsWrapper>
                    <Swiper
                        modules={[Pagination]}
                        pagination={{
                            clickable: true,
                        }}
                        spaceBetween={30}
                        breakpoints={{
                            576: {
                                slidesPerView: 1,
                            },
                            1000: {
                                slidesPerView: 2,
                            },
                            1440: {
                                slidesPerView: 3,
                            },
                        }}>
                        {notifications?.length > 0 &&
                            notifications.map((notification) => (
                                <SwiperSlide
                                    key={`notification-${notification.id}`}>
                                    <Notification
                                        notification={notification}
                                        onClickLink={() =>
                                            onClickLink(
                                                notification.id,
                                                notification.eventId
                                            )
                                        }
                                        onClickHide={() =>
                                            onClickHide(notification.id)
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </NotificationsWrapper>

                <StyledToggle>
                    <StyledToggleContent style={{ justifyContent: 'flex-end' }}>
                        <StyledToggleText
                            isActive={isToggle}
                            onClick={() => setIsToggle(!isToggle)}>
                            Upcoming
                        </StyledToggleText>
                    </StyledToggleContent>
                    <StyledToggleContent>
                        <StyledToggleText
                            isActive={!isToggle}
                            onClick={() => setIsToggle(!isToggle)}>
                            Past
                        </StyledToggleText>
                    </StyledToggleContent>
                </StyledToggle>

                {isToggle ? (
                    <WrapperColumn>
                        <StyledHeadline>Upcoming Events</StyledHeadline>
                        {upcomingEvents?.length > 0 ? (
                            <EventsList>
                                {upcomingEvents.map((event) => {
                                    const request = hasUserSendRequestHelper(
                                        event.requests,
                                        session
                                    );

                                    return (
                                        <ExtendedEventPreview
                                            key={`event-${event.id}`}
                                            event={event}
                                            onSubmitJoin={() => alert('hi')}
                                            onSubmitLeave={() =>
                                                onSubmitLeave(
                                                    request.id,
                                                    event.id
                                                )
                                            }
                                        />
                                    );
                                })}
                            </EventsList>
                        ) : (
                            <StyledNoEvents>
                                <StyledNoUpcomingEventsIllustraition />
                                <StyledP>No upcoming events...</StyledP>
                                <StyledP>
                                    {
                                        'Look for new events you would like to join or create your own! Have fun :)'
                                    }
                                </StyledP>
                            </StyledNoEvents>
                        )}
                    </WrapperColumn>
                ) : (
                    <WrapperColumn className="top">
                        <StyledHeadline>Past Events</StyledHeadline>
                        <EventsWrapper>
                            {pastEvents?.length > 0 ? (
                                pastEvents.map((event) => (
                                    <EventItem key={`pastevent-${event.id}`}>
                                        <SmallEventPreview
                                            title={event.title}
                                            imageEvent={event.image}
                                            imageHost={event.host.image}
                                            myEventsPage={true}
                                            onClick={() =>
                                                router.push(
                                                    `/events/${event.id}`
                                                )
                                            }
                                            date={
                                                event.date
                                            }></SmallEventPreview>
                                    </EventItem>
                                ))
                            ) : (
                                <StyledNoEvents>
                                    <StyledNoPastEventsIllustration />
                                    <StyledP>No past events...</StyledP>
                                    <StyledP>
                                        After joining or visiting events, you
                                        can find them here
                                    </StyledP>
                                </StyledNoEvents>
                            )}
                        </EventsWrapper>
                    </WrapperColumn>
                )}
            </Layout>
        </>
    );
};

export default MyEvents;

const StyledHeadline = styled.p`
    width: 100%;
    margin-bottom: 0;
    font-size: ${({ theme }) => theme.fonts.mobile.headline5};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.headline5};
    }
    font-weight: 800;
`;

const WrapperColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    width: 100%;
    @media ${(props) => props.theme.breakpoint.tablet} {
        min-width: 400px;
    }
    &.top {
        align-self: flex-start;
    }
`;

const EventsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    row-gap: 50px;
`;

const EventItem = styled.div`
    height: 170px;
    margin-bottom: 20px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        margin-bottom: 80px;
    }
`;

const NotificationsWrapper = styled.div`
    max-width: 1000px;
`;

const StyledToggle = styled.div`
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 20px;
`;

const StyledToggleContent = styled.div`
    display: flex;
    width: 50%;
    color: ${({ theme }) => theme.midGrey};
    ${(props) => props.rightAlign && 'justify-content: flex-end;'};
`;
interface StyledToggleTextProps {
    isActive?: boolean;
}

const StyledToggleText = styled.div<StyledToggleTextProps>`
    padding: 5px 15px;
    width: 125px;
    text-align: center;
    cursor: pointer;
    ${(props) =>
        props.isActive &&
        `border: solid 1px ${props.theme.primary}; border-radius:25px; color: ${props.theme.body}; background-color: ${props.theme.primary}`};
`;

const EventsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: auto;

    @media ${(props) => props.theme.breakpoint.tablet} {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        max-width: 1500px;
    }
`;

const StyledNoPastEventsIllustration = styled(NoPastEventsIllustration)`
    height: 150px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        height: 250px;
    }
`;

const StyledNoUpcomingEventsIllustraition = styled(
    NoUpcomingEventsIllustration
)`
    height: 150px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        height: 250px;
    }
`;

const StyledNoEvents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const StyledP = styled.p`
    width: 300px;
    text-align: center;
`;
