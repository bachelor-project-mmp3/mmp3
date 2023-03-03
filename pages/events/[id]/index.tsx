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
import Crown from '../../../public/icons/krone.svg';
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
    userHasJoinedHelper,
    userIsHostHelper,
} from '../../../helper/EventsAndUserHelper';
import Link from 'next/link';

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
            firstName: string;
            lastName: string;
            image: string;
        } | null;
        id: string;
        status: string;
    }> | null;
};

interface EventDetailProps {
    event: EventProps;
}

async function deleteEvent(id: string): Promise<void> {
    await fetch(`/api/events/${id}`, {
        method: 'DELETE',
    });
    // replace url, because event doesn't exist anymore
    Router.push('/events');
}

async function joinEvent(eventId: string, userId: string): Promise<void> {
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
        Router.replace(Router.asPath);
        Router.reload();
    } else {
        Router.push('/events/${event.id}/edit');
    }
}

const EventDetail: React.FC<EventDetailProps> = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [event, setEvent] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        // check isReady to prevent query of undefiend https://stackoverflow.com/questions/69412453/next-js-router-query-getting-undefined-on-refreshing-page-but-works-if-you-navi
        if (router.isReady) {
            setLoading(true);
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

    if (isLoading) return <div>Loading...</div>;
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
        <Layout>
            <Header backButton>{event.title}</Header>
            <StyledInfoEventDetails>
                <StyledInfoEventDetailsBoxes>
                    <TimeLimitAndSeatsWrapper>
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
                    <div>Costs: {event.costs} &#8364;</div>
                </StyledInfoEventDetailsBoxes>
                <StyledInfoEventDetailsBoxes textAlign="right">
                    {event.host.image && (
                        <StyledCrownAndImage>
                            <StyledCrown />
                            <HostImage userIsHost={userIsHost}>
                                <StyledImage
                                    src={event.host.image}
                                    alt="Image"
                                    layout={'fill'}
                                    style={{ objectFit: 'cover' }}
                                />
                            </HostImage>
                        </StyledCrownAndImage>
                    )}
                    <div>by {hostName}</div>
                    <div>
                        {/*<StyledPhoneIcon />*/}
                        <Link href={`mailto:${event.host.email}`}>
                            <StyledEmailIcon />
                        </Link>
                    </div>
                </StyledInfoEventDetailsBoxes>
            </StyledInfoEventDetails>
            {/*{userIsHost && <div>*/}
            {/*    <Button variant={'primary'} onClick={() => router.push(`/events/${event.id}/edit`)}>Edit event</Button>*/}
            {/*</div>}*/}
            {event.menu.length > 0 && (
                <Card variant={'center'}>
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

            {event.info && <Card variant={'description'}>{event.info}</Card>}

            {event.requests.filter(
                (request) => request.status == RequestStatus.ACCEPTED
            ).length > 0 && (
                <Card variant={'description'}>
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
                        form
                        disabled>
                        Cancel Event
                    </Button>
                    <Button
                        variant={'primary'}
                        // onClick={() => router.push(`/events/${event.id}/edit`)}
                        form
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
                        <Button
                            variant="primary"
                            form
                            onClick={() =>
                                joinEvent(event.id, session?.user?.userId)
                            }>
                            Ask to join
                        </Button>
                    )}
                </StyledButtons>
            )}
        </Layout>
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

const HostImage = styled.div<HostImageProps>`
    position: relative;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    border: ${(props) =>
        props.userIsHost ? '7px solid ' + props.theme.green : 'none'};
`;

const StyledImage = styled(Image)`
    border-radius: 50%;
`;

const StyledCrown = styled(Crown)`
    position: absolute;
    right: -20px;
    top: -30px;
    height: 35px;
    width: 70px;
    transform: rotate(30deg);
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

const StyledCrownAndImage = styled.div`
    position: relative;
`;
