import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import ExtendedEventPreview from '../../components/organisms/events/ExtendedEventPreview';
import Arrow from '../../public/icons/goBack.svg';
import { useRouter } from 'next/router';
import { Header } from '../../components/organisms/Header';
import { SmallEventPreview } from '../../components/organisms/events/SmallEventPreview';
import { useSession } from 'next-auth/react';
import { Loading } from '../../components/organisms/Loading';
import InfoPopUp from '../../components/organisms/popups/InfoPopUp';
import { hasUserSendRequestHelper } from '../../helper/EventsAndUserHelper';

const MyEvents = () => {
    const [upcomingEvents, setUpcomingEvents] = useState(null);
    const [pastEvents, setPastEvents] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [showInfoPopOpOnLeave, setShowInfoPopOpOnLeave] =
        useState<boolean>(false);
    const { data: session } = useSession();

    const router = useRouter();

    useEffect(() => {
        fetch('/api/my-events', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setUpcomingEvents(data.upcomingEvents);
                setPastEvents(data.pastEvents);
                setLoading(false);
            });
    }, []);

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
                    Your Request was deleted successfully.
                </InfoPopUp>
            )}

            <Layout>
                <Header>Hello {session?.user?.firstName}! 👋</Header>

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
    font-weight: bold;
`;

const StyledIcon = styled(Arrow)`
    width: 18px;
    height: 18px;
    transform: rotate(180deg);
`;

const TextInvitation = styled.p`
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
    }
    font-weight: bold;
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
