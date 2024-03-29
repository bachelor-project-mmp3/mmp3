import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import ExtendedEventPreview from '../../components/organisms/events/ExtendedEventPreview';
import { useRouter } from 'next/router';
import { SmallEventPreview } from '../../components/organisms/events/SmallEventPreview';
import { useSession } from 'next-auth/react';
import { Loading } from '../../components/organisms/Loading';
import InfoPopUp from '../../components/organisms/popups/InfoPopUp';
import { hasUserSendRequestHelper } from '../../helper/EventsAndUserHelper';
import Notification from '../../components/organisms/my-events/Notification';
import { Swiper, SwiperSlide } from 'swiper/react';
import Pagination from '../../components/organisms/Pagination';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NoPastEventsIllustration from '../../public/images/no_past_events.svg';
import NoUpcomingEventsIllustration from '../../public/images/no_upcoming_events.svg';
import Head from 'next/head';

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
    const [upcomingEventsPageIndex, setUpcomingEventsPageIndex] = useState(1);
    const [upcomingEventsPageCount, setUpcomingEventsPageCount] = useState(1);
    const [pastEventsPageIndex, setPastEventsPageIndex] = useState(1);
    const [pastEventsPageCount, setPastEventsPageCount] = useState(1);

    useEffect(() => {
        Promise.all([
            fetch(
                `/api/my-events?upcomingEventsPage=${upcomingEventsPageIndex}&pastEventsPage=${pastEventsPageIndex}`,
                {
                    method: 'GET',
                }
            ),
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
                setUpcomingEventsPageCount(dataEvents.upcomingEventsPageCount);
                setPastEventsPageCount(dataEvents.pastEventsPageCount);
                setNotfications(dataNotifications.notification);
                setLoading(false);
            });
    }, [upcomingEventsPageIndex, pastEventsPageIndex]);

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
            router.push('/500');
        }
    };

    const onClickLink = async (notificationId: string, eventId: string) => {
        setLoading(true);
        const res = await fetch(`/api/notifications/${notificationId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 200) {
            router.push(`events/${eventId}`);
        } else {
            router.push('/500');
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
            router.push('/500');
        }
    };

    const onSubmitDelete = async (eventId: string) => {
        setLoading(true);
        const res = await fetch(`/api/events/${eventId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 200) {
            let updatedEvents = upcomingEvents.filter(
                (event) => event.id !== eventId
            );

            setUpcomingEvents(updatedEvents);
            setLoading(false);
        } else {
            router.push('/500');
        }
    };
    if (isLoading) return <Loading />;

    return (
        <>
            <Head>
                <title>{`Studentenfutter - My events`}</title>
            </Head>
            {showInfoPopOpOnLeave && (
                <InfoPopUp onClose={() => setShowInfoPopOpOnLeave(false)}>
                    You left the event.
                </InfoPopUp>
            )}

            <Layout>
                <StyledHeading>
                    Hello {session?.user?.firstName}! 👋
                </StyledHeading>
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
                        <StyledHeadline>My upcoming events</StyledHeadline>

                        {upcomingEvents?.length > 0 ? (
                            <>
                                <EventsWrapper>
                                    {upcomingEvents.map((event) => {
                                        const request =
                                            hasUserSendRequestHelper(
                                                event.requests,
                                                session
                                            );

                                        return (
                                            <ExtendedEventPreview
                                                key={`event-${event.id}`}
                                                event={event}
                                                onSubmitDelete={onSubmitDelete}
                                                onSubmitLeave={() =>
                                                    onSubmitLeave(
                                                        request.id,
                                                        event.id
                                                    )
                                                }
                                            />
                                        );
                                    })}
                                </EventsWrapper>
                                <Pagination
                                    eventsPageIndex={upcomingEventsPageIndex}
                                    eventsPageCount={upcomingEventsPageCount}
                                    setEventsPageIndex={
                                        setUpcomingEventsPageIndex
                                    }></Pagination>
                            </>
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
                        <StyledHeadline>My past events</StyledHeadline>
                        <EventsWrapper pastEvents>
                            {pastEvents?.length > 0 ? (
                                pastEvents.map((event) => (
                                    <SmallEventPreview
                                        key={`pastevent-${event.id}`}
                                        title={event.title}
                                        imageEvent={event.image}
                                        imageHost={event.host.image}
                                        reviews={event.reviews}
                                        myEventsPage={true}
                                        onClick={() =>
                                            router.push(`/events/${event.id}`)
                                        }
                                        date={event.date}></SmallEventPreview>
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

                        {pastEvents?.length > 0 && (
                            <Pagination
                                eventsPageIndex={pastEventsPageIndex}
                                eventsPageCount={pastEventsPageCount}
                                setEventsPageIndex={
                                    setPastEventsPageIndex
                                }></Pagination>
                        )}
                    </WrapperColumn>
                )}
            </Layout>
        </>
    );
};

export default MyEvents;

const StyledHeadline = styled.h2`
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

interface EventsWrapperProps {
    pastEvents: boolean;
}

const EventsWrapper = styled.div<EventsWrapperProps>`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    row-gap: 50px;
    justify-content: center;
    ${(props) =>
        props.pastEvents &&
        `
        max-width: 960px;

    `}

    @media ${(props) => props.theme.breakpoint.tablet} {
        justify-content: flex-start;
    }
`;

const NotificationsWrapper = styled.div`
    max-width: 1000px;
`;

const StyledToggle = styled.div`
    display: flex;
    justify-content: center;
    width: fit-content;
    gap: 5px;
    margin-top: 20px;
    background: white;
    border-radius: 25px;
    padding: 2px;
    margin: auto;
    margin-top: 40px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        margin: inherit;
        margin-top: 40px;
        justify-content: flex-start;
    }
`;

const StyledToggleContent = styled.div`
    display: flex;
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

const StyledHeading = styled.h1`
    font-size: ${({ theme }) => theme.fonts.mobile.headline3};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.headline3};
    }
    font-weight: 800;
    margin-bottom: 10px;
    margin-top: 30px;
`;
