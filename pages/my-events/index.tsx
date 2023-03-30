import React, { useEffect, useState } from 'react';
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

const MyEvents = () => {
    const [upcomingEvents, setUpcomingEvents] = useState(null);
    const [notifications, setNotfications] = useState(null);
    const [pastEvents, setPastEvents] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [showInfoPopOpOnLeave, setShowInfoPopOpOnLeave] =
        useState<boolean>(false);
    const { data: session } = useSession();

    const router = useRouter();

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
                                <>
                                    <SwiperSlide>
                                        <Notification
                                            key={notification.id}
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
                                </>
                            ))}
                    </Swiper>
                </NotificationsWrapper>
                <WrapperRow>
                    <WrapperColumn>
                        <StyledHeadline>Upcoming Events</StyledHeadline>
                        {upcomingEvents?.length > 0 ? (
                            upcomingEvents.map((event) => {
                                const request = hasUserSendRequestHelper(
                                    event.requests,
                                    session
                                );

                                return (
                                    <ExtendedEventPreview
                                        key={event.id}
                                        event={event}
                                        onSubmitJoin={() => alert('hi')}
                                        onSubmitLeave={() =>
                                            onSubmitLeave(request.id, event.id)
                                        }
                                    />
                                );
                            })
                        ) : (
                            <p>No upcoming events...</p>
                        )}
                    </WrapperColumn>
                    <WrapperColumn className="top">
                        <StyledHeadline>Past Events</StyledHeadline>
                        <EventsWrapper>
                            {pastEvents?.length > 0 ? (
                                pastEvents.map((event) => (
                                    <>
                                        <EventItem>
                                            <SmallEventPreview
                                                title={event.title}
                                                imageEvent={event.image}
                                                imageHost={event.host.image}
                                                onClick={() =>
                                                    router.push(
                                                        `/events/${event.id}`
                                                    )
                                                }
                                                date={
                                                    event.date
                                                }></SmallEventPreview>
                                        </EventItem>
                                    </>
                                ))
                            ) : (
                                <p>No past events...</p>
                            )}
                        </EventsWrapper>
                    </WrapperColumn>
                </WrapperRow>
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
        width: 45%;
        min-width: 400px;
    }
    &.top {
        align-self: flex-start;
    }
`;

const WrapperRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 20px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    @media ${(props) => props.theme.breakpoint.tablet} {
        flex-wrap: no-wrap;
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
    width: 45%;
    height: 170px;
    margin-bottom: 20px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        margin-bottom: 80px;
    }
`;

const NotificationsWrapper = styled.div`
    max-width: 1000px;
`;
