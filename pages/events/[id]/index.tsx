import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { Button } from '../../../components/atoms/Button';
import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
    HostImageProps,
    StyledClock,
    StyledSeat,
    TimeLimitAndSeatsRow,
    TimeLimitAndSeatsWrapper,
} from '../../../components/organisms/events/ExtendedEventPreview';
import styled from 'styled-components';
import PhoneIcon from '../../../public/icons/phone.svg';
import EmailIcon from '../../../public/icons/email.svg';
import Image from 'next/image';
import {
    getFormattedDate,
    getFormattedTime,
    getTimeLeftToJoin,
} from '../../../helper/helperFunctions';
import { Header } from '../../../components/organisms/Header';
import { Card } from '../../../components/atoms/Card';
import MenuItem from '../../../components/organisms/events/MenuItem';
import GuestListItem from '../../../components/organisms/events/GuestListItem';
import { RequestStatus } from '.prisma/client';
import {
    hasUserSendRequestHelper,
    hostNameHelper,
    isRequestAcceptedHelper,
    userIsHostHelper,
} from '../../../helper/EventsAndUserHelper';
import Link from 'next/link';
import { ChefAndImage } from '../../../components/organisms/ChefAndImage';
import { Loading } from '../../../components/organisms/Loading';
import InfoPopUp from '../../../components/organisms/popups/InfoPopUp';

type EventProps = {
    id: string;
    title: string;
    info?: string;
    timeLimit: string;
    date: string;
    costs: number;
    currentParticipants: number;
    capacity: number;
    host: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        dormitory: string;
        roomNumber: string;
        image?: string;
        phone?: string;
    } | null;
    menu: Array<{
        title: string;
        link: string;
        description: string;
        id: string;
    }> | null;
    requests: Array<{
        info: string;
        eventId: string;
        userId: string;
        User: {
            id: string;
            firstName: string;
            lastName: string;
            image: string;
        } | null;
        id: string;
        status: string;
    }> | null;
};

async function deleteEvent(id: string): Promise<void> {
    await fetch(`/api/events/${id}`, {
        method: 'DELETE',
    });
    // replace url, because event doesn't exist anymore
    Router.push('/events');
}

const EventDetail = () => {
    const { data: session } = useSession();
    const router = useRouter();
    // TODO add type definition
    const [event, setEvent] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [showInfoPopOpOnJoin, setShowInfoPopOpOnJoin] = useState(false);

    async function joinEvent(eventId: string, userId: string): Promise<void> {
        setLoading(true);

        const data = {
            eventId: eventId,
            userId: userId,
        };

        const res = await fetch('/api/requests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (res.status < 300) {
            res.json().then((joinedEvent) => {
                setEvent(joinedEvent);
            });
            setLoading(false);
            setShowInfoPopOpOnJoin(true);
        } else {
            router.push('/404');
        }
    }

    useEffect(() => {
        // check isReady to prevent query of undefiend https://stackoverflow.com/questions/69412453/next-js-router-query-getting-undefined-on-refreshing-page-but-works-if-you-navi
        if (router.isReady) {
            fetch(`/api/events/${router.query.id}`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    setEvent(data.event);
                    setLoading(false);
                });
        }
    }, [router.isReady, router.query.id]);

    if (isLoading) return <Loading />;
    if (!event) return <div>No event detail </div>;

    const timeLimit = getTimeLeftToJoin(event.timeLimit);
    const date = getFormattedDate(event.date);
    const time = getFormattedTime(event.date);
    const userIsHost = userIsHostHelper(session?.user?.userId, event.host.id);
    const hostName = hostNameHelper(
        event?.host.firstName,
        event?.host.lastName
    );

    const hasUserSendRequest = hasUserSendRequestHelper(
        event.requests,
        session
    );

    const isRequestAccepted = isRequestAcceptedHelper(hasUserSendRequest);

    //TODO: Add onClick to PhoneButton to copy phone number

    // @ts-ignore
    return (
        <>
            {showInfoPopOpOnJoin && (
                <InfoPopUp onClose={() => setShowInfoPopOpOnJoin(false)}>
                    Your Request to join <strong>{event.title}</strong> was
                    successfully sent. Check your{' '}
                    <strong>
                        <Link href="/requests">requests</Link>
                    </strong>{' '}
                    or FH mails to stay up to date!
                </InfoPopUp>
            )}
            <Layout>
                <Header backButton>{event.title}</Header>
                <StyledInfoEventDetails>
                    <StyledInfoEventDetailsBoxes>
                        <TimeLimitAndSeatsWrapper bold>
                            <TimeLimitAndSeatsRow>
                                <StyledClock />
                                <div>{timeLimit}</div>
                            </TimeLimitAndSeatsRow>
                            <TimeLimitAndSeatsRow>
                                <StyledSeat />
                                <div>
                                    {event.currentParticipants}/{event.capacity}{' '}
                                    seats taken
                                </div>
                            </TimeLimitAndSeatsRow>
                        </TimeLimitAndSeatsWrapper>
                        <div>{date}</div>
                        <div>{time}</div>
                        <div>{event.host?.dormitory}</div>
                        <div>Room No. {event.host?.roomNumber}</div>
                        <div>Costs: {event.costs} &#8364; per person</div>
                    </StyledInfoEventDetailsBoxes>
                    <StyledInfoEventDetailsBoxes textAlign="right">
                        {event.host.image && (
                            <ChefAndImage
                                onClick={() =>
                                    router.push(`/profile/${event.host.id}`)
                                }
                                userIsHost={userIsHost}
                                source={event.host.image}
                                hostName={hostName}></ChefAndImage>
                        )}

                        {event.requests.filter(
                            (request) =>
                                request.status == RequestStatus.ACCEPTED &&
                                request.userId == session?.user?.userId
                        ).length > 0 && (
                            <div>
                                <StyledPhoneIcon />
                                <Link href={`mailto:${event.host.email}`}>
                                    <StyledEmailIcon />
                                </Link>
                            </div>
                        )}
                    </StyledInfoEventDetailsBoxes>
                </StyledInfoEventDetails>
                {event.menu.length > 0 && (
                    <Card variant={'center'}>
                        <StyledHeadings>Menu</StyledHeadings>
                        {event.menu.map((dish, index) => (
                            <MenuItem
                                key={index}
                                dishTitle={dish.title}
                                dishLink={dish.link}
                                dishDescription={dish.description}
                            />
                        ))}
                    </Card>
                )}

                {event.info && (
                    <Card variant={'description'}>
                        <StyledHeadings style={{ marginTop: 0 }}>
                            About the event
                        </StyledHeadings>
                        {event.info}
                    </Card>
                )}

                {event.requests.filter(
                    (request) => request.status == RequestStatus.ACCEPTED
                ).length > 0 && (
                    <Card variant={'description'}>
                        <StyledHeadings style={{ marginTop: 0 }}>
                            Guestlist
                        </StyledHeadings>
                        {event.requests
                            .filter(
                                (request) =>
                                    request.status == RequestStatus.ACCEPTED
                            )
                            .map((request, index) => (
                                <GuestListItem
                                    key={index}
                                    guest={request.User}
                                    userIsHost={userIsHost}
                                />
                            ))}
                    </Card>
                )}
                {userIsHost ? (
                    <StyledButtons userIsHost={userIsHost}>
                        <Button
                            variant={'red'}
                            // onClick={() => deleteEvent(event.id)}
                            width={45}
                            disabled>
                            Cancel Event
                        </Button>
                        <Button
                            variant={'primary'}
                            // onClick={() => router.push(`/events/${event.id}/edit`)}
                            width={45}
                            disabled>
                            Edit event
                        </Button>
                    </StyledButtons>
                ) : (
                    <StyledButtons>
                        {hasUserSendRequest ? (
                            <>
                                {isRequestAccepted ? (
                                    <Button
                                        variant="primary"
                                        disabled
                                        onClick={() => alert('todo')}>
                                        Leave Event
                                    </Button>
                                ) : (
                                    <Button
                                        variant="primary"
                                        disabled
                                        onClick={() => alert('todo')}>
                                        Pending
                                    </Button>
                                )}
                            </>
                        ) : (
                            <>
                                {event.currentParticipants < event.capacity && (
                                    <Button
                                        variant="primary"
                                        width={45}
                                        onClick={() =>
                                            joinEvent(
                                                event.id,
                                                session?.user?.userId
                                            )
                                        }>
                                        Ask to join
                                    </Button>
                                )}
                            </>
                        )}
                    </StyledButtons>
                )}
            </Layout>
        </>
    );
};

export default EventDetail;

const StyledInfoEventDetails = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 50px 20px;
`;

const StyledPhoneIcon = styled(PhoneIcon)`
    height: 20px;
    width: 20px;
    margin-right: 10px;
`;

const StyledEmailIcon = styled(EmailIcon)`
    height: 20px;
    width: 20px;
    margin-right: 10px;
    margin-left: 10px;
`;

interface StyledInfoEventDetailsBoxesProps {
    textAlign?: string;
}

const StyledInfoEventDetailsBoxes = styled.div<StyledInfoEventDetailsBoxesProps>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: ${(props) => (props.textAlign === 'right' ? 'end' : 'start')};
`;

const StyledButtons = styled.div<HostImageProps>`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) =>
        props.userIsHost ? 'space-between' : 'center'};
    position: sticky;
    width: auto;
    bottom: 100px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        bottom: 40px;
    }
`;

const StyledHeadings = styled.p`
    font-weight: 600;
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 100%;
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
    }
`;
