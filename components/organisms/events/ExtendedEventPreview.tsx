import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import { device, theme } from '../../../ThemeConfig';
import Crown from '../../../public/icons/krone.svg';
import Clock from '../../../public/icons/uhr.svg';
import Seat from '../../../public/icons/sessel.svg';
import Location from '../../../public/icons/location.svg';
import MenuStar from '../../../public/icons/sternmenu.svg';

export type EventProps = {
    id: string;
    title: string;
    info?: string;
    timeLimit: string;
    date: string;
    costs: number;
    currentParticipants: number;
    capacity: number;
    host: {
        firstName: string;
        lastName: string;
        email: string;
        image?: string;
        dormitory: string;
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
    const timeLimitDate = new Date(timeLimit);
    const leftTimeToJoin = timeLimitDate.getTime() - today.getTime();
    const differenceInDays = Math.floor(leftTimeToJoin / (1000 * 3600 * 24));
    if (differenceInDays < 1) {
        const differenceInHours = leftTimeToJoin / (1000 * 3600);

        if (differenceInHours < 1) {
            return '<1 hour left to apply';
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

const ExtendedEventPreview: React.FC<{
    event: EventProps;
    userIsHost: boolean;
}> = ({ event, userIsHost }) => {
    const router = useRouter();

    const hostName = event?.host.firstName
        ? event?.host.firstName
        : 'Unknown host';

    const timeLimit = getTimeLeftToJoin(event.timeLimit);

    const date = getFormattedDate(event.date);
    const time = getFormattedTime(event.date);
    console.log(userIsHost, 'userishost');

    return (
        <CardWithDateTime>
            <DateAndTime>
                <span>{date}</span>
                <span>{time}</span>
            </DateAndTime>
            <Card onClick={() => router.push(`/events/${event.id}`)}>
                <TimeLimitAndSeatsWrapper>
                    <TimeLimitAndSeatsRow>
                        <StyledClock />
                        <div>{timeLimit}</div>
                    </TimeLimitAndSeatsRow>
                    <TimeLimitAndSeatsRow>
                        <StyledSeat />
                        <div>
                            {event.currentParticipants}/{event.capacity} seats
                            taken
                        </div>
                    </TimeLimitAndSeatsRow>
                </TimeLimitAndSeatsWrapper>
                <Host>{hostName}</Host>
                <Place>
                    <StyledLocation />
                    <div>{event.host.dormitory}</div>
                </Place>
                <TitleAndCostsWrapper>
                    <EventTitle>{event.title}</EventTitle>
                    <Costs>{event.costs} &#8364;</Costs>
                </TitleAndCostsWrapper>

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
                <Dishes>
                    {event.menu?.map((dish) => (
                        <DishEntry key={dish.id} className="dish">
                            <StyledMenuStar />
                            {dish.title}
                        </DishEntry>
                    ))}
                </Dishes>
            </Card>
        </CardWithDateTime>
    );
};

export default ExtendedEventPreview;

const CardWithDateTime = styled.div`
    max-width: 600px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    @media ${device.tablet} {
        flex-basis: 50%;
        min-width: 500px;
        margin-left: 0;
        margin-right: 0;
    }
`;

const Card = styled.div`
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    border-bottom-left-radius: 40px;
    box-shadow: 17px 17px 35px -11px ${theme.darkGrey};
    padding: 10px 20px 20px 20px;
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

interface HostImageProps {
    userIsHost: boolean;
}

const HostImage = styled.div<HostImageProps>`
    position: absolute;
    top: -16px;
    right: 32px;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    border: ${(props) =>
        props.userIsHost ? '5px solid ' + theme.green : 'none'};
`;

const StyledImage = styled(Image)`
    border-radius: 50%;
`;

const StyledCrown = styled(Crown)`
    position: absolute;
    right: 32px;
    top: -35px;
    height: 19px;
    width: 19px;
    transform: rotate(30deg);
`;

const StyledClock = styled(Clock)`
    height: 16px;
    width: 16px;
`;

const StyledSeat = styled(Seat)`
    height: 16px;
    width: 16px;
`;

const StyledLocation = styled(Location)`
    height: 16px;
    width: 16px;
`;

const StyledMenuStar = styled(MenuStar)`
    height: 16px;
    width: 16px;
    margin-right: 10px;
`;

const DateAndTime = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    gap: 24px;
    background-color: ${theme.orange};
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 32px;
    width: 208px;
    position: relative;
    z-index: 10;
    font-size: ${theme.fonts.mobile.smallParagraph};
    @media ${device.tablet} {
        font-size: ${theme.fonts.normal.smallParagraph};
        width: 250px;
    }
`;

const EventTitle = styled.div`
    font-size: ${theme.fonts.mobile.headline4};
    font-weight: bold;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media ${device.tablet} {
        font-size: ${theme.fonts.normal.headline4};
    }
`;

const Costs = styled.div`
    font-size: ${theme.fonts.mobile.smallParagraph};
    flex-basis: 50px;
    @media ${device.tablet} {
        width: 50%;
        font-size: ${theme.fonts.normal.smallParagraph};
    }
`;

const TitleAndCostsWrapper = styled.div`
    display: flex;
    gap: 14px;
    align-items: end;
    margin-bottom: 15px;
    margin-top: 6px;
    width: 90%;
`;

const TimeLimitAndSeatsWrapper = styled.div`
    color: ${theme.midGrey};
`;

const TimeLimitAndSeatsRow = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const Place = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const Host = styled.div`
    position: absolute;
    top: 50px;
    right: 40px;
`;

const DishEntry = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-basis: 30%;
`;

const Dishes = styled.div`
    display: flex;
    gap: 10px;
`;
