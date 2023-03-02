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
import Crown from '../../../public/icons/krone.svg';
import PhoneIcon from '../../../public/icons/phone.svg';
import EmailIcon from '../../../public/icons/email.svg';
import Image from 'next/image';
import {
    getFormattedDate,
    getFormattedTime,
    getTimeLeftToJoin,
} from '../../../helper/helperFunctions';
import { Head } from '../../../components/organisms/Head';
import { Card } from '../../../components/atoms/Card';

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
    const userIsHost = session?.user?.userId === event.host.id ?? false;
    const hostName =
        event?.host.firstName && event?.host.lastName
            ? event?.host.firstName + ' ' + event?.host.lastName
            : 'Unknown host';

    return (
        <Layout>
            <Head backButton onClick={router.back}>
                {event.title}
            </Head>
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
                        <>
                            <StyledCrown />
                            <HostImage userIsHost={userIsHost}>
                                <StyledImage
                                    src={event.host.image}
                                    alt="Image"
                                    layout={'fill'}
                                    style={{ objectFit: 'cover' }}
                                />
                            </HostImage>
                        </>
                    )}
                    <div>by {hostName}</div>
                    <div>
                        <StyledPhoneIcon />
                        <StyledEmailIcon />
                    </div>
                </StyledInfoEventDetailsBoxes>
            </StyledInfoEventDetails>

            <Card variant={'center'}>
                {event.menu.map((dish, index) => (
                    <StyledDishItem>
                        {dish.link && <a href={dish.link}>{dish.title}</a>}
                        {dish.description && (
                            <StyledToolTip>
                                Hover over me
                                <StyledToolTipText>
                                    {dish.description}
                                </StyledToolTipText>
                            </StyledToolTip>
                        )}
                    </StyledDishItem>
                ))}
            </Card>
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
    text-align: ${(props) => (props.textAlign === 'right' ? 'right' : 'left')};
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
    right: 0px;
    top: 20px;
    height: 35px;
    width: 70px;
    transform: rotate(30deg);
`;

const StyledDishItem = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
`;

const StyledToolTip = styled.div`
    position: relative;
    display: inline-block;
`;

const StyledToolTipText = styled.span`
    display: none;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
`;
