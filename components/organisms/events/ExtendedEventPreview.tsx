import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import ChefHood from '../../../public/icons/chefmuetze.svg';
import Clock from '../../../public/icons/uhr.svg';
import Seat from '../../../public/icons/sessel.svg';
import Location from '../../../public/icons/location.svg';
import MenuStar from '../../../public/icons/sternmenu.svg';
import { Button } from '../../atoms/Button';
import { useSession } from 'next-auth/react';
import {
    getFormattedDate,
    getFormattedTime,
    getTimeLeftToJoin,
} from '../../../helper/helperFunctions';
import { RequestStatus } from '.prisma/client';

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
        id: string;
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
    requests: Array<{
        info: string;
        eventId: string;
        userId: string;
        id: string;
        status: string;
    }> | null;
};

const ExtendedEventPreview: React.FC<{
    event: EventProps;
    onSubmitJoin: (eventId: string, userId: string) => void;
    onSubmitLeave: (requestId: string , eventId: string) => void;
}> = ({ event, onSubmitJoin, onSubmitLeave }) => {
    const router = useRouter();
    const { data: session } = useSession();

    const timeLimit = getTimeLeftToJoin(event.timeLimit);
    const date = getFormattedDate(event.date);
    const time = getFormattedTime(event.date);
    const userIsHost = session?.user?.userId === event?.host?.id ?? false;
    const hostName = event?.host?.firstName
        ? event?.host.firstName
        : 'Unknown host';

    // TODO use from helper
    const hasUserSendRequest = event.requests.find(
        (request) => request.userId === session?.user?.userId
    );
    const isRequestAccepted = hasUserSendRequest
        ? hasUserSendRequest.status === RequestStatus.ACCEPTED
        : false;

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
                    <div>{event?.host?.dormitory}</div>
                </Place>
                <TitleAndCostsWrapper>
                    <EventTitle>{event.title}</EventTitle>
                    <Costs>{event.costs} &#8364; p. p.</Costs>
                </TitleAndCostsWrapper>

                {event?.host?.image && (
                    <>
                        <StyledChefHood />
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
                {!userIsHost && (
                    <ButtonWrapper>
                        {hasUserSendRequest ? (
                            <>
                                {isRequestAccepted ? (
                                    <Button
                                        variant="primary"
                                        onClick={(e) => {
                                            onSubmitLeave(
                                                hasUserSendRequest.id,
                                                event.id
                                            );
                                            {
                                                /* to prevent navigation to eventdetail */
                                            }
                                            e.stopPropagation();
                                        }}>
                                        Leave Event
                                    </Button>
                                ) : (
                                    <Button
                                        variant="primary"
                                        disabled
                                        onClick={(e) => {
                                            alert('todo');
                                            {
                                                /* to prevent navigation to eventdetail */
                                            }
                                            e.stopPropagation();
                                        }}>
                                        Pending
                                    </Button>
                                )}
                            </>
                        ) : (
                            <>
                                {event.currentParticipants < event.capacity && (
                                    <Button
                                        variant="primary"
                                        onClick={(e) => {
                                            onSubmitJoin(
                                                event.id,
                                                session?.user?.userId
                                            );
                                            {
                                                /* to prevent navigation to eventdetail */
                                            }
                                            e.stopPropagation();
                                        }}>
                                        Ask to join
                                    </Button>
                                )}
                            </>
                        )}
                    </ButtonWrapper>
                )}
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
    cursor: pointer;

    @media ${(props) => props.theme.breakpoint.tablet} {
        flex: 0 0 45%;
        width: 45%;
        max-width: 45%;
        min-width: 400px;
        margin-left: 0;
        margin-right: 0;
    }
`;

const Card = styled.div`
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    border-bottom-left-radius: 40px;
    box-shadow: 17px 17px 35px -11px ${({ theme }) => theme.darkGrey};
    padding: 10px 20px 20px 20px;
    position: relative;
    background: white;
    height: 220px;

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

    @media ${(props) => props.theme.breakpoint.tablet} {
        height: 260px;
    }
`;

export interface HostImageProps {
    userIsHost: boolean;
}

export const HostImage = styled.div<HostImageProps>`
    position: absolute;
    top: -16px;
    right: 32px;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    border: ${(props) =>
        props.userIsHost ? '5px solid ' + props.theme.secondary : 'none'};
`;

export const StyledImage = styled(Image)`
    border-radius: 50%;
`;

export const StyledChefHood = styled(ChefHood)`
    position: absolute;
    right: 32px;
    top: -35px;
    height: 19px;
    width: 19px;
    transform: rotate(30deg);
`;

export const StyledClock = styled(Clock)`
    //TODO: sollen die Icons auch fett werden?
    height: 16px;
    width: 16px;
`;

export const StyledSeat = styled(Seat)`
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
    background-color: ${({ theme }) => theme.green};
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 32px;
    width: 208px;
    position: relative;
    z-index: 10;
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagrap};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
        width: 250px;
    }
`;

const EventTitle = styled.div`
    font-size: ${({ theme }) => theme.fonts.mobile.headline4};
    font-weight: bold;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.headline4};
    }
`;

const Costs = styled.div`
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    flex-basis: 50px;
    white-space: nowrap;
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 50%;
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
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

export interface TimeLimitAndSeatsWrapperProps {
    bold: boolean;
}
export const TimeLimitAndSeatsWrapper = styled.div<TimeLimitAndSeatsWrapperProps>`
    color: ${(props) =>
        props.bold ? ({ theme }) => theme.text : ({ theme }) => theme.midGrey};
    font-weight: ${(props) => (props.bold ? '600' : '0')};
`;

export const TimeLimitAndSeatsRow = styled.div`
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

    :first-child {
        flex-shrink: 0;
    }
`;

const Dishes = styled.div`
    display: flex;
    gap: 10px;
`;

const ButtonWrapper = styled.div`
    text-align: end;
`;
