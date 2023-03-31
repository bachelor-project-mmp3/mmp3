import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { Button } from '../../../components/atoms/Button';
import { useRouter } from 'next/router';
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
import {
    getFormattedDate,
    getFormattedTime,
    getTimeLeftToJoin,
} from '../../../helper/helperFunctions';
import { Header } from '../../../components/organisms/Header';
import { Card } from '../../../components/atoms/Card';
import MenuItem from '../../../components/organisms/events/MenuItem';
import GuestListItem from '../../../components/organisms/events/GuestListItem';
import { EventStatus, RequestStatus } from '.prisma/client';
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
import ActionPopUp from '../../../components/organisms/popups/ActionPopUp';
import UploadButton from '../../../components/atoms/UploadButton';
import { uploadImage } from '../../../helper/uploadHelper';
import Image from 'next/image';
import Discard from '../../../public/icons/discard.svg';
import { RequestProps } from '../../../components/organisms/requests/Request';

type EventProps = {
    id: string;
    title: string;
    info?: string;
    timeLimit: string;
    date: string;
    costs: number;
    currentParticipants: number;
    capacity: number;
    status: EventStatus;
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

const defaultImage =
    'https://firebasestorage.googleapis.com/v0/b/studentenfutter-dba6a.appspot.com/o/profile%2Fpexels-cats-coming-920220.jpg?alt=media&token=fde91666-3d24-471b-9bd3-8a1825edde79';

const EventDetail = () => {
    const { data: session } = useSession();
    const router = useRouter();
    // TODO add type definition
    const [event, setEvent] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [showInfoPopUpOnJoin, setShowInfoPopUpOnJoin] = useState(false);
    const [showInfoPopOpOnLeave, setShowInfoPopOpOnLeave] = useState<
        string | undefined
    >();
    const [showQuestion, setShowQuestion] = useState(false);
    const [showInfoPopUpOnCancel, setshowInfoPopUpOnCancel] = useState(false);
    const [showInfoPopUpOnUploadPhoto, setshowInfoPopUpOnUploadPhoto] =
        useState(false);
    const [eventImage, setEventImage] = useState('');
    const [showInfoPopUpOnDeleteGuest, setShowInfoPopUpOnDeleteGuest] =
        useState(false);
    const [deleteGuest, setDeleteGuest] = useState<undefined | RequestProps>();

    useEffect(() => {
        // check isReady to prevent query of undefiend https://stackoverflow.com/questions/69412453/next-js-router-query-getting-undefined-on-refreshing-page-but-works-if-you-navi
        if (router.isReady) {
            fetch(`/api/events/${router.query.id}`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    setEvent(data.event);
                    setEventImage(data.event.image);
                    setLoading(false);
                });
        }
    }, [router.isReady, router.query.id]);

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
            setShowInfoPopUpOnJoin(true);
        } else {
            router.push('/404');
        }
    }

    const onSubmitLeave = async (
        requestId: string,
        type: 'leave' | 'withdraw' | 'deleteGuest'
    ) => {
        setLoading(true);

        const res = await fetch(`/api/requests/${requestId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 200) {
            res.json().then((event) => {
                setEvent(event);
            });

            if (type === 'deleteGuest' && userIsHost) {
                setShowInfoPopOpOnLeave(
                    `${deleteGuest.User.firstName} got deleted from the event.`
                );
                setDeleteGuest(undefined);
            } else {
                setShowQuestion(false);

                if (type === 'leave') {
                    setShowInfoPopOpOnLeave('You left the event.');
                } else {
                    setShowInfoPopOpOnLeave(
                        'Your Request was deleted successfully.'
                    );
                }
            }

            setLoading(false);
        } else {
            router.push('/404');
        }
    };

    const cancelEvent = async (eventId: string) => {
        setLoading(true);
        const cancelHeaders = new Headers();
        cancelHeaders.append('Content-Type', 'application/json');
        cancelHeaders.append('Cancel', 'true');

        const res = await fetch(`/api/events/${eventId}`, {
            method: 'PATCH',
            headers: cancelHeaders,
        });

        if (res.status === 200) {
            res.json().then((event) => {
                setEvent(event);
            });
            setLoading(false);
            setshowInfoPopUpOnCancel(false);
        } else {
            router.push('/404');
        }
    };

    const uploadEventPhoto = async (e: any) => {
        setLoading(true);

        const uploadHeaders = new Headers();
        uploadHeaders.append('Content-Type', 'application/json');
        uploadHeaders.append('Upload', 'true');

        let imageUrl = await uploadImage(e.target.files[0], 'events');

        const body = {
            imageUrl,
        };

        const res = await fetch(`/api/events/${event.id}`, {
            method: 'PATCH',
            headers: uploadHeaders,
            body: JSON.stringify(body),
        });

        if (res.status === 200) {
            res.json().then((event) => {
                setEventImage(event.image);
            });
            setshowInfoPopUpOnUploadPhoto(true);
            setLoading(false);
        } else {
            router.push('/404');
        }
    };

    const deleteEventPhoto = async () => {
        setLoading(true);

        const uploadHeaders = new Headers();
        uploadHeaders.append('Content-Type', 'application/json');
        uploadHeaders.append('Upload', 'true');

        const body = {
            imageUrl: defaultImage,
        };

        const res = await fetch(`/api/events/${event.id}`, {
            method: 'PATCH',
            headers: uploadHeaders,
            body: JSON.stringify(body),
        });

        if (res.status === 200) {
            res.json().then(() => {
                setEventImage(defaultImage);
            });
            setLoading(false);
        } else {
            router.push('/404');
        }
    };

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
    const userIsHost = userIsHostHelper(session?.user?.userId, event?.host?.id);
    const hostName = hostNameHelper(
        event?.host.firstName,
        event?.host.lastName
    );

    const hasUserSendRequest = hasUserSendRequestHelper(
        event?.requests,
        session
    );

    const isRequestAccepted = isRequestAcceptedHelper(hasUserSendRequest);

    //TODO: Add onClick to PhoneButton to copy phone number

    // @ts-ignore
    return (
        <>
            {showInfoPopUpOnJoin && (
                <InfoPopUp onClose={() => setShowInfoPopUpOnJoin(false)}>
                    Your Request to join <strong>{event.title}</strong> was
                    successfully sent. Check your{' '}
                    <strong>
                        <Link href="/requests">requests</Link>
                    </strong>{' '}
                    or FH mails to stay up to date!
                </InfoPopUp>
            )}

            {showInfoPopOpOnLeave && (
                <InfoPopUp onClose={() => setShowInfoPopOpOnLeave(undefined)}>
                    {showInfoPopOpOnLeave}
                </InfoPopUp>
            )}
            {showInfoPopUpOnUploadPhoto && (
                <InfoPopUp onClose={() => setshowInfoPopUpOnUploadPhoto(false)}>
                    Photo was successfully uploaded!
                </InfoPopUp>
            )}

            {showQuestion && (
                <ActionPopUp
                    onClose={() => setShowQuestion(false)}
                    onAction={() =>
                        onSubmitLeave(hasUserSendRequest.id, 'leave')
                    }
                    textButtonAction={'Leave'}
                    textButtonClose={'Cancel'}>
                    Do you really want to leave <strong>{event.title}</strong>?
                </ActionPopUp>
            )}

            {showInfoPopUpOnCancel && (
                <ActionPopUp
                    onClose={() => setshowInfoPopUpOnCancel(false)}
                    onAction={() => cancelEvent(event.id)}
                    textButtonAction={'Cancel Event'}
                    textButtonClose={'Close'}>
                    Are your sure you want to cancel this event?
                </ActionPopUp>
            )}

            {showInfoPopUpOnDeleteGuest && (
                <ActionPopUp
                    onClose={() => setShowInfoPopUpOnDeleteGuest(false)}
                    onAction={() => {
                        onSubmitLeave(deleteGuest.id, 'deleteGuest').then(() =>
                            setShowInfoPopUpOnDeleteGuest(false)
                        );
                    }}
                    textButtonAction={'Delete'}
                    textButtonClose={'Cancel'}>
                    Are your sure you want to delete{' '}
                    {deleteGuest.User.firstName} from{' '}
                    <strong>{event.title}</strong>?
                </ActionPopUp>
            )}

            <Layout>
                <StyledDetailsWrapper>
                    <Header backButton>{event.title}</Header>

                    <StyledInfoEventDetails>
                        <StyledInfoEventDetailsBoxes>
                            {new Date() < new Date(event.date) &&
                                (event.status === EventStatus.CANCELLED ? (
                                    <StyledCancelNote>
                                        CANCELLED
                                    </StyledCancelNote>
                                ) : (
                                    <TimeLimitAndSeatsWrapper bold>
                                        <TimeLimitAndSeatsRow>
                                            <StyledClock />
                                            <div>{timeLimit}</div>
                                        </TimeLimitAndSeatsRow>
                                        <TimeLimitAndSeatsRow>
                                            <StyledSeat />
                                            <div>
                                                {event.currentParticipants}/
                                                {event.capacity} seats taken
                                            </div>
                                        </TimeLimitAndSeatsRow>
                                    </TimeLimitAndSeatsWrapper>
                                ))}
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

                    {eventImage != defaultImage && (
                        <>
                            <Card variant="no-padding">
                                <EventImageWrapper>
                                    <FakePlaceholder />
                                    <StyledImage
                                        src={eventImage}
                                        fill
                                        alt="event"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    {event.status !== EventStatus.CANCELLED &&
                                        new Date() > new Date(event.date) &&
                                        userIsHost && (
                                            <StyledDelete>
                                                <StyledDiscard
                                                    onClick={deleteEventPhoto}
                                                />
                                            </StyledDelete>
                                        )}
                                </EventImageWrapper>
                            </Card>
                        </>
                    )}

                    {event.menu.length > 0 && (
                        <Card variant={'description'}>
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
                                        onClick={() => {
                                            setShowInfoPopUpOnDeleteGuest(true);
                                            setDeleteGuest(request);
                                        }}
                                    />
                                ))}
                        </Card>
                    )}
                    {event.status !== EventStatus.CANCELLED &&
                        new Date() < new Date(event.date) &&
                        (userIsHost ? (
                            <StyledButtons userIsHost={userIsHost}>
                                <Button
                                    variant={'red'}
                                    onClick={() =>
                                        setshowInfoPopUpOnCancel(true)
                                    }
                                    width={45}>
                                    Cancel Event
                                </Button>
                                <Button
                                    variant={'primary'}
                                    onClick={() =>
                                        router.push(`/events/${event.id}/edit`)
                                    }
                                    width={45}>
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
                                                onClick={() =>
                                                    setShowQuestion(true)
                                                }>
                                                Leave Event
                                            </Button>
                                        ) : (
                                            <>
                                                {hasUserSendRequest.status ===
                                                'PENDING' ? (
                                                    <Button
                                                        variant="primary"
                                                        onClick={() =>
                                                            onSubmitLeave(
                                                                hasUserSendRequest.id,
                                                                'withdraw'
                                                            )
                                                        }>
                                                        Withdraw
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="primary"
                                                        disabled>
                                                        Declined
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {event.currentParticipants <
                                            event.capacity && (
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
                        ))}
                    {event.status !== EventStatus.CANCELLED &&
                        new Date() > new Date(event.date) &&
                        userIsHost && (
                            <StyledButtons>
                                <UploadButton onChange={uploadEventPhoto}>
                                    Upload photo
                                </UploadButton>
                            </StyledButtons>
                        )}
                </StyledDetailsWrapper>
            </Layout>
        </>
    );
};

export default EventDetail;

const StyledDetailsWrapper = styled.div`
    max-width: 600px;
`;

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
    font-weight: 800;
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 100%;
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
    }
`;

const StyledCancelNote = styled.p`
    color: red;
    font-weight: 800;
`;

const StyledImage = styled(Image)`
    border-radius: 40px;
    padding: 10px;
`;

const FakePlaceholder = styled.div`
    background: ${({ theme }) => theme.lightGrey};
    border-radius: 40px;
    border: 10px solid white;
    width: 100%;
    height: 300px;
`;

const EventImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
`;

const StyledDelete = styled.div`
    position: absolute;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    right: 20px;
    top: 20px;
    background: ${({ theme }) => theme.primary};
    cursor: pointer;
`;

const StyledDiscard = styled(Discard)`
    fill: white;
    position: absolute;
    width: 20px;
    height: 20px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;
