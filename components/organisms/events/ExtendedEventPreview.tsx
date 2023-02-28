import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import { device, theme } from '../../../ThemeConfig';
import Crown from '../../../public/icons/krone.svg';

export type EventProps = {
    id: string;
    title: string;
    info?: string;
    host: {
        firstName: string;
        lastName: string;
        email: string;
        image?: string;
    } | null;
    menu: Array<{
        title: string;
        link: string;
        description: string;
        id: string;
    }> | null;
};

const getTimeLeftToJoin = (timeLimit: string) => {
    const today = new Date();
    console.log('now', today.toISOString());
    const timeLimitDate = new Date(timeLimit);
    const leftTimeToJoin = timeLimitDate.getTime() - today.getTime();
    const differenceInDays = Math.floor(leftTimeToJoin / (1000 * 3600 * 24));
    if (differenceInDays < 1) {
        const differenceInHours = leftTimeToJoin / (1000 * 3600);

        if (differenceInHours < 1) {
            return '< 1 hour left to apply';
        }

        return Math.floor(differenceInHours) + ' hours left to apply';
    }
    return differenceInDays + ' days left to apply';
};

const getFormattedDate = (date: string) => {
    let formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-US');
};

const getFormattedTime = (date: string) => {
    const formattedTime = new Date(date);
    let timeString = formattedTime.toLocaleTimeString('en-US');

    const amPm = timeString.substring(timeString.length - 2, timeString.length);
    const hoursAndMinutes = timeString.substring(0, timeString.length - 6);
    timeString = hoursAndMinutes + ' ' + amPm;

    return timeString;
};

const ExtendedEventPreview: React.FC<{ event: EventProps }> = ({ event }) => {
    const router = useRouter();

    const hostName = event?.host.firstName
        ? event?.host.firstName + ' ' + event?.host.lastName
        : 'Unknown host';

    const timeLimit = getTimeLeftToJoin(event.timeLimit);

    const date = getFormattedDate(event.date);
    const time = getFormattedTime(event.date);

    return (
        <CardWithDateTime>
            <DateAndTime>
                <span>{date}</span>
                <span>{time}</span>
            </DateAndTime>
            <Card onClick={() => router.push(`/events/${event.id}`)}>
                <TitleAndCostsWrapper>
                    {' '}
                    <EventTitle>{event.title}</EventTitle>
                    <Costs>{event.costs} &#8364;</Costs>
                </TitleAndCostsWrapper>

                <p>{timeLimit}</p>
                <p>
                    {event.currentParticipants}/{event.capacity} seats taken
                </p>

                {event.host.image && (
                    <>
                        <StyledCrown />
                        <HostImage>
                            <StyledImage
                                src={event.host.image}
                                alt="Image"
                                layout={'fill'}
                            />
                        </HostImage>
                    </>
                )}
                <small>Host: {hostName}</small>
                {event.menu?.map((dish) => (
                    <span key={dish.id} className="dish">
                        {dish.title}
                    </span>
                ))}
            </Card>
        </CardWithDateTime>
    );
};

export default ExtendedEventPreview;

const CardWithDateTime = styled.div``;

const Card = styled.div`
    border-top-right-radius: 2.5em;
    border-bottom-right-radius: 2.5em;
    border-bottom-left-radius: 2.5em;
    box-shadow: 17px 17px 35px -11px ${theme.darkGrey};
    padding: 1.5em;
    position: relative;
    background: white;

    &:before {
        content: '';
        width: 20px;
        height: 25px;
        background: white;
        position: absolute;
        top: -25px;
        left: 0;
        z-index: 1;
    }
`;

const HostImage = styled.div`
    position: absolute;
    top: -1em;
    right: 2em;
    border-radius: 50%;
    width: 4em;
    height: 4em;
`;

const StyledImage = styled(Image)`
    border-radius: 50%;
`;

const StyledCrown = styled(Crown)`
    position: absolute;
    right: 2em;
    top: -2.2em;
    height: 1.2em;
    width: 1.2em;
    transform: rotate(30deg);
`;

const DateAndTime = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5em 1em;
    gap: 1.5em;
    background-color: ${theme.orange};
    border-top-right-radius: 1em;
    border-top-left-radius: 1em;
    border-bottom-left-radius: 2em;
    width: 13em;
    position: relative;
    z-index: 10;
    font-size: ${theme.fonts.mobile.smallParagraph};
    @media ${device.tablet} {
        width: 50%;
        font-size: ${theme.fonts.normal.smallParagraph};
    }
`;

const EventTitle = styled.div`
    font-size: ${theme.fonts.mobile.headline4};
    font-weight: bold;
    @media ${device.tablet} {
        width: 50%;
        font-size: ${theme.fonts.normal.headline4};
    }
`;

const Costs = styled.div`
    font-size: ${theme.fonts.mobile.smallParagraph};
    @media ${device.tablet} {
        width: 50%;
        font-size: ${theme.fonts.normal.smallParagraph};
    }
`;

const TitleAndCostsWrapper = styled.div`
    display: flex;
`;
