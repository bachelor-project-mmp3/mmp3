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
    getOverallRating,
    hasUserSendRequestHelper,
    hostNameHelper,
    isRequestAcceptedHelper,
    userHasSentReview,
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
import ReviewPopUp from '../../../components/organisms/popups/ReviewPopUp';
import ReviewListItem, {
    Review,
} from '../../../components/organisms/events/ReviewListItem';
import ReactStars from 'react-stars';
import Head from 'next/head';
import { theme } from '../../../ThemeConfig';

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
        Event: {
            title: string;
            id: string;
            timeLimit: string;
            currentParticipants: number;
            capacity: number;
            host: {
                firstName: string;
                lastName: string;
                id: string;
                image: string;
            };
        };
        id: string;
        status: string;
        updatedAt: string;
    }> | null;
    reviews: Array<Review>;
};

const defaultImage =
    'https://firebasestorage.googleapis.com/v0/b/studentenfutter-dba6a.appspot.com/o/profile%2Fpexels-cats-coming-920220.jpg?alt=media&token=fde91666-3d24-471b-9bd3-8a1825edde79';

const EventDetail = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [event, setEvent] = useState<EventProps>(null);
    const [isLoading, setLoading] = useState(true);
    const [showInfoPopUpOnJoin, setShowInfoPopUpOnJoin] = useState(false);
    const [showInfoPopUp, setShowInfoPopUp] = useState<string | undefined>();
    const [showQuestion, setShowQuestion] = useState(false);
    const [showInfoPopUpOnCancel, setshowInfoPopUpOnCancel] = useState(false);
    const [showInfoPopUpOnUploadPhoto, setshowInfoPopUpOnUploadPhoto] =
        useState(false);
    const [eventImage, setEventImage] = useState('');
    const [showInfoPopUpOnDeleteGuest, setShowInfoPopUpOnDeleteGuest] =
        useState(false);
    const [deleteGuest, setDeleteGuest] = useState<undefined | RequestProps>();
    const [showQuestionDeleteEvent, setShowQuestionDeleteEvent] =
        React.useState(false);
    const [showReviewPopUp, setShowReviewPopUp] = useState(false);
    const [reviewData, setReviewData] = useState<{
        food: number;
        hospitality: number;
        text: string;
    }>({ food: 0, hospitality: 0, text: '' });

    const overAllRating = getOverallRating(event?.reviews);

    useEffect(() => {
        // check isReady to prevent query of undefiend https://stackoverflow.com/questions/69412453/next-js-router-query-getting-undefined-on-refreshing-page-but-works-if-you-navi
        if (router.isReady) {
            fetch(`/api/events/${router.query.id}`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.event) {
                        router.replace('/404');
                    } else {
                        setEvent(data.event);
                        setEventImage(data.event.image);
                        setLoading(false);
                    }
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
            router.push('/500');
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
                setShowInfoPopUp(
                    `${deleteGuest.User.firstName} got deleted from the event.`
                );
                setDeleteGuest(undefined);
            } else {
                setShowQuestion(false);

                if (type === 'leave') {
                    setShowInfoPopUp('You left the event.');
                } else {
                    setShowInfoPopUp('Your Request was deleted successfully.');
                }
            }

            setLoading(false);
        } else {
            router.push('/500');
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
            router.push('/500');
        }
    };

    const deleteEvent = async (eventId: string) => {
        setLoading(true);

        const res = await fetch(`/api/events/${eventId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 200) {
            router.push('/my-events');
        } else {
            router.push('/500');
        }
    };
    const addReview = async () => {
        setLoading(true);
        const data = {
            eventId: event.id,
            userId: session.user.userId,
            dish: reviewData.food,
            environment: reviewData.hospitality,
            text: reviewData.text,
        };

        const res = await fetch(`/api/events/${event.id}/review`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (res.status === 200) {
            res.json().then((review) => {
                let updatedEvent = {
                    ...event,
                    reviews: [...event.reviews, review],
                };

                setEvent(updatedEvent);
                setLoading(false);
                setShowReviewPopUp(false);
            });
        } else {
            router.push('/500');
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
            router.push('/500');
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
            router.push('/500');
        }
    };

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

    return (
        <>
            <Head>
                <title>{`Studentenfutter - ${event.title}`}</title>
            </Head>

            {showInfoPopUpOnJoin && (
                <InfoPopUp onClose={() => setShowInfoPopUpOnJoin(false)}>
                    Your request to join <strong>{event.title}</strong> was
                    successfully sent. Check your{' '}
                    <strong>
                        <Link href="/requests">requests</Link>
                    </strong>{' '}
                    or FH mails to stay up to date!
                </InfoPopUp>
            )}

            {showInfoPopUp && (
                <InfoPopUp onClose={() => setShowInfoPopUp(undefined)}>
                    {showInfoPopUp}
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
                    textButtonAction={'Cancel'}
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
            {showQuestionDeleteEvent && (
                <ActionPopUp
                    onClose={() => setShowQuestionDeleteEvent(false)}
                    onAction={() => deleteEvent(event.id)}
                    textButtonAction={'Delete'}
                    textButtonClose={'Cancel'}>
                    Do you really want to delete <strong>{event.title}</strong>?
                </ActionPopUp>
            )}

            {showReviewPopUp && (
                <ReviewPopUp
                    onClose={() => setShowReviewPopUp(false)}
                    onAction={addReview}
                    eventTitle={event.title}
                    onChangeReview={(data: {
                        food: number;
                        hospitality: number;
                        text: string;
                    }) => {
                        setReviewData(data);
                    }}
                    currentReviewData={reviewData}
                />
            )}

            <Layout>
                <StyledDetailsWrapper>
                    <StyledInfoWrapper>
                        <Header />
                        <StyledHeading>{event.title}</StyledHeading>
                        {event.reviews?.length > 0 && (
                            <EventRating>
                                <StarsMobile>
                                    <ReactStars
                                        count={5}
                                        size={25}
                                        color1={theme.midGrey}
                                        color2={theme.primary}
                                        value={overAllRating}
                                        edit={false}
                                    />
                                </StarsMobile>
                                <StarsDesktop>
                                    <ReactStars
                                        count={5}
                                        size={35}
                                        color1={theme.midGrey}
                                        color2={theme.primary}
                                        value={overAllRating}
                                        edit={false}
                                    />
                                </StarsDesktop>
                            </EventRating>
                        )}

                        <StyledInfoEventDetails>
                            <StyledInfoEventDetailsBoxes textAlign="start">
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
                                <StyledInfoEventDetailsBoxesDesktop>
                                    <div>{date}</div>
                                    <div>{time}</div>
                                    <div>{event.host?.dormitory}</div>
                                    <div>Room No. {event.host?.roomNumber}</div>
                                    <div>
                                        Costs: {event.costs} &#8364; per person
                                    </div>
                                </StyledInfoEventDetailsBoxesDesktop>
                                <StyledInfoEventDetailsBoxesMobile>
                                    <div>
                                        {date}, {time}
                                    </div>
                                    <div>
                                        {event.host?.dormitory} - No.{' '}
                                        {event.host?.roomNumber}
                                    </div>
                                    <div>
                                        Costs: {event.costs} &#8364; per person
                                    </div>
                                </StyledInfoEventDetailsBoxesMobile>
                            </StyledInfoEventDetailsBoxes>
                            <StyledInfoEventDetailsBoxes>
                                {event.host.image && (
                                    <ChefAndImage
                                        onClick={() =>
                                            router.push(
                                                `/profile/${event.host.id}`
                                            )
                                        }
                                        userIsHost={userIsHost}
                                        source={event.host.image}
                                        hostName={hostName}></ChefAndImage>
                                )}
                                <div>
                                    {event.requests?.filter(
                                        (request) =>
                                            request.status ==
                                                RequestStatus.ACCEPTED &&
                                            request.userId ==
                                                session?.user?.userId
                                    ).length > 0 &&
                                        event.host?.phone && (
                                            <Link
                                                href={`tel:${event.host.phone}`}>
                                                <StyledPhoneIcon />
                                                {/* text is required for accessibility */}
                                                <FakeLinkText>
                                                    Phone
                                                </FakeLinkText>
                                            </Link>
                                        )}
                                    <Link href={`mailto:${event.host.email}`}>
                                        <StyledEmailIcon />
                                        {/* text is required for accessibility */}
                                        <FakeLinkText>Email</FakeLinkText>
                                    </Link>
                                </div>
                            </StyledInfoEventDetailsBoxes>
                        </StyledInfoEventDetails>
                    </StyledInfoWrapper>

                    {eventImage != defaultImage && (
                        <>
                            <Card variant="no-padding">
                                <EventImageWrapper>
                                    <FakePlaceholder />
                                    <StyledImage
                                        src={eventImage}
                                        fill
                                        sizes="100"
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

                    {event.reviews?.length > 0 && (
                        <Card variant={'description'}>
                            <StyledSectionHeadings>
                                Reviews
                            </StyledSectionHeadings>
                            <ReviewList>
                                {event.reviews.map((review, index) => (
                                    <ReviewListItem
                                        key={`reviewItem-${index}`}
                                        review={review}
                                    />
                                ))}
                            </ReviewList>
                        </Card>
                    )}

                    {event.menu?.length > 0 && (
                        <Card variant={'description'}>
                            <StyledSectionHeadings>Menu</StyledSectionHeadings>
                            {event.menu.map((dish, index) => (
                                <MenuItem
                                    key={`menuItem-${index}`}
                                    dishTitle={dish.title}
                                    dishLink={dish.link}
                                    dishDescription={dish.description}
                                />
                            ))}
                        </Card>
                    )}

                    {event.info && (
                        <Card variant={'description'}>
                            <StyledSectionHeadings style={{ marginTop: 0 }}>
                                About the event
                            </StyledSectionHeadings>
                            {event.info}
                        </Card>
                    )}

                    {event.requests?.filter(
                        (request) => request.status == RequestStatus.ACCEPTED
                    ).length > 0 &&
                        event.status !== EventStatus.CANCELLED && (
                            <Card variant={'description'}>
                                <StyledSectionHeadings style={{ marginTop: 0 }}>
                                    Guestlist
                                </StyledSectionHeadings>
                                {event.requests
                                    .filter(
                                        (request) =>
                                            request.status ==
                                            RequestStatus.ACCEPTED
                                    )
                                    .map((request, index) => (
                                        <GuestListItem
                                            key={`guestlistitem-${index}`}
                                            guest={request.User}
                                            eventStatus={event.status}
                                            userIsHost={userIsHost}
                                            onClick={() => {
                                                setShowInfoPopUpOnDeleteGuest(
                                                    true
                                                );
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
                        event.status === EventStatus.OVER &&
                        userIsHost && (
                            <StyledButtons userIsHost={userIsHost}>
                                <Button
                                    variant={'red'}
                                    onClick={() =>
                                        setShowQuestionDeleteEvent(true)
                                    }
                                    width={45}>
                                    Delete event
                                </Button>
                                <UploadButton onChange={uploadEventPhoto}>
                                    Upload photo
                                </UploadButton>
                            </StyledButtons>
                        )}
                    {event.status !== EventStatus.CANCELLED &&
                        new Date() > new Date(event.date) &&
                        !userIsHost &&
                        hasUserSendRequest &&
                        isRequestAccepted &&
                        !userHasSentReview(event, session) && (
                            <StyledButtons>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        setShowReviewPopUp(true);
                                    }}>
                                    Add review
                                </Button>
                            </StyledButtons>
                        )}
                    {event.status == EventStatus.CANCELLED && userIsHost && (
                        <StyledButtons>
                            <Button
                                variant="red"
                                width={45}
                                onClick={() => {
                                    setShowQuestionDeleteEvent(true);
                                }}>
                                Delete event
                            </Button>
                        </StyledButtons>
                    )}
                </StyledDetailsWrapper>
            </Layout>
        </>
    );
};

export default EventDetail;

const StyledDetailsWrapper = styled.div`
    @media ${(props) => props.theme.breakpoint.tablet} {
        max-width: 600px;
    }
`;

const StyledInfoEventDetails = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 50px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        flex-direction: row;
        gap: 0;
        padding: 40px;
    }
    justify-content: space-between;
    padding: 10px 40px 40px 40px;
`;

const StyledInfoWrapper = styled.div`
    background-color: ${({ theme }) => theme.backgroundLightGreen};
    margin-top: -30px;
    padding-top: 30px;
    border-radius: 0 0 40px 40px;
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
    align-items: ${(props) =>
        props.textAlign === 'start' ? 'start' : 'center'};
    @media ${(props) => props.theme.breakpoint.tablet} {
        align-items: ${(props) =>
            props.textAlign === 'start' ? 'start' : 'end'};
    }
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

const StyledSectionHeadings = styled.h2`
    font-weight: 800;
    margin-top: 0;
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 100%;
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
    }
`;

const StyledCancelNote = styled.p`
    color: ${({ theme }) => theme.red};
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

const StyledHeading = styled.h1`
    font-size: ${({ theme }) => theme.fonts.mobile.headline3};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.headline3};
    }
    font-weight: 800;
    margin-top: 30px;
    margin-bottom: 0;
    padding: 0 40px;
    overflow-wrap: break-word;
`;

const StyledInfoEventDetailsBoxesDesktop = styled.div`
    display: none;
    @media ${(props) => props.theme.breakpoint.tablet} {
        display: initial;
    }
`;

const StyledInfoEventDetailsBoxesMobile = styled.div`
    display: initial;
    @media ${(props) => props.theme.breakpoint.tablet} {
        display: none;
    }
`;

const EventRating = styled.div`
    padding-left: 40px;
`;

const StarsDesktop = styled.div`
    display: none;

    @media ${(props) => props.theme.breakpoint.tablet} {
        display: block;
    }
`;

const StarsMobile = styled.div`
    display: block;

    @media ${(props) => props.theme.breakpoint.tablet} {
        display: none;
    }
`;

const ReviewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

const FakeLinkText = styled.p`
    display: none;
`;
