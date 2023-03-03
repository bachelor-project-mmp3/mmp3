import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import ExtendedEventPreview from '../../components/organisms/events/ExtendedEventPreview';
import Arrow from '../../public/icons/goBack.svg';
import { useRouter } from 'next/router';
import { Header } from '../../components/organisms/Header';
import { SmallEventPreview } from '../../components/organisms/events/SmallEventPreview';
import { useSession } from 'next-auth/react';

const MyEvents: React.FC = () => {
    const [upcomingEvents, setUpcomingEvents] = useState(null);
    const [pastEvents, setPastEvents] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { data: session } = useSession();

    const router = useRouter();

    if (session) {
        fetch(`/api/profile/${session.user.userId}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.profile.roomNumber) {
                    router.push(`/profile/${session.user.userId}/edit`);
                }
            });
    }

    useEffect(() => {
        setLoading(true);
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

    if (isLoading) return <p>Loading...</p>;
    console.log(upcomingEvents);
    console.log(pastEvents);

    return (
        <Layout>
            <Header>Hello {session?.user?.firstName}! 👋</Header>
            <InvitationWrapper onClick={() => router.push('/requests')}>
                <TextInvitation>Go to Invitation Updates</TextInvitation>
                <StyledIcon />
            </InvitationWrapper>

            <WrapperRow>
                <WrapperColumn>
                    <StyledHeadline>Upcoming Events</StyledHeadline>

                    {upcomingEvents ? (
                        upcomingEvents.map((event) => (
                            <ExtendedEventPreview
                                key={event.id}
                                event={event}
                                onSubmitJoin={() => alert('hi')}
                            />
                        ))
                    ) : (
                        <p>No upcoming events...</p>
                    )}
                </WrapperColumn>
                <WrapperColumn className="top">
                    <StyledHeadline>Past Events</StyledHeadline>
                    <EventsWrapper>
                        {pastEvents ? (
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
    );
};

export default MyEvents;

const InvitationWrapper = styled.div`
    width: 100%;
    margin: 20px 0;
    background: white;
    box-shadow: 17px 17px 35px -11px #707070;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 30px;
    justify-content: space-between;
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 500px;
    }
`;

const StyledHeadline = styled.p`
    width: 100%;
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
        min-width: 500px;
    }
    &.top {
        align-self: flex-start;
    }
`;

const WrapperRow = styled.div`
    display: flex;
    flex-direction: row;
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
