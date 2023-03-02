import { useSession } from 'next-auth/react';
import React from 'react';
import styled from 'styled-components';
import Crown from '../../../public/icons/krone.svg';
import { Button } from '../../../components/atoms/Button';
import Image from 'next/image';
import Check from '../../../public/icons/hakerl.svg';
import { useRouter } from 'next/router';

export type RequestProps = {
    info: string;
    id: string;
    status: string;
    updatedAt: string;
    User: {
        firstName: string;
        lastName: string;
        image: string;
        id: string;
    };
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
};

function getCanJoinByTimeLimit(timeLimit: string) {
    return new Date(timeLimit) > new Date();
}

function getIsPlaceLeft(currentParticipants: number, capacity: number) {
    return currentParticipants < capacity;
}

const getPastTime = (updatedAt: string) => {
    const today = new Date();
    const timeLimitDate = new Date(updatedAt);
    const leftTimeToJoin = today.getTime() - timeLimitDate.getTime();
    const differenceInDays = Math.floor(leftTimeToJoin / (1000 * 3600 * 24));
    if (differenceInDays < 1) {
        const differenceInHours = leftTimeToJoin / (1000 * 3600);

        if (differenceInHours < 1) {
            return '<1 hour ago';
        }

        return Math.floor(differenceInHours) + ' hours ago';
    }
    return differenceInDays + ' days ago';
};

const Request: React.FC<{
    request: RequestProps;
    onSubmitAccept: () => void;
}> = ({ request, onSubmitAccept }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const userIsHost = session?.user?.userId !== request.User.id ?? false;
    const timeAgo = getPastTime(request.updatedAt);
    const isRegistrationTimeinFuture = getCanJoinByTimeLimit(
        request.Event.timeLimit
    );

    const getRequestText = () => {
        if (userIsHost) {
            if (request.status === 'PENDING') {
                return `${request.User.firstName} ${request.User.lastName} wants to join ${request.Event.title}`;
            } else if (request.status === 'ACCEPTED') {
                return `${request.User.firstName} ${request.User.lastName} joined ${request.Event.title}`;
            }
        } else {
            if (request.status === 'PENDING') {
                return `You sent ${request.Event.host.firstName} ${request.Event.host.lastName} a request to join ${request.Event.title}`;
            } else if (request.status === 'ACCEPTED') {
                return `${request.Event.host.firstName} ${request.Event.host.lastName} accepted your request to join ${request.Event.title}`;
            }
        }
    };

    const requestText = getRequestText();
    const isPlaceLeft = getIsPlaceLeft(
        request.Event.currentParticipants,
        request.Event.capacity
    );

    return (
        <Card>
            <Content>
                <ImageAndLinkWrapper>
                    <ImageAndCrown>
                        <StyledCrown showCrown={!userIsHost} />
                        <HostImage>
                            <StyledImage
                                src={
                                    !userIsHost
                                        ? request.Event.host.image
                                        : request.User.image
                                }
                                alt="Image"
                                layout={'fill'}
                                style={{ objectFit: 'cover' }}
                            />
                        </HostImage>
                    </ImageAndCrown>
                    <Link
                        href={`/profile/${
                            userIsHost ? request.User.id : request.Event.host.id
                        }`}>
                        view profile
                    </Link>
                </ImageAndLinkWrapper>

                <TimeAndInfo>
                    {!isPlaceLeft ? (
                        <TimeAgo>No place left</TimeAgo>
                    ) : (
                        <>
                            {!isRegistrationTimeinFuture &&
                            request.status !== 'ACCEPTED' ? (
                                <TimeAgo>Registration time over</TimeAgo>
                            ) : (
                                <TimeAgo>{timeAgo}</TimeAgo>
                            )}
                        </>
                    )}

                    <div>{requestText}</div>
                </TimeAndInfo>
            </Content>

            {request.status === 'PENDING' &&
                userIsHost &&
                isRegistrationTimeinFuture &&
                isPlaceLeft && (
                    <ApproveButton onClick={() => onSubmitAccept()}>
                        <StyledCheck />
                    </ApproveButton>
                )}
            {request.status === 'ACCEPTED' && !userIsHost && (
                <ButtonWrapper>
                    <Button
                        variant="primary"
                        onClick={() =>
                            router.push(`/events/${request.Event.id}`)
                        }>
                        View event
                    </Button>
                </ButtonWrapper>
            )}
        </Card>
    );
};

export default Request;

const Card = styled.div`
    border-radius: 40px;
    box-shadow: 17px 17px 35px -11px ${({ theme }) => theme.darkGrey};
    padding: 20px;
    position: relative;
    background: white;
    max-width: 500px;
    margin: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
    height: 150px;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const StyledCrown = styled(Crown)<HostImageProps>`
    height: 17px;
    width: 17px;
    position: absolute;
    right: 0;
    top: -11px;
    transform: rotate(36deg);
    display: ${(props) => (props.showCrown ? 'block' : 'none')};
`;

const StyledCheck = styled(Check)`
    height: 19px;
    width: 19px;
    color: white;
`;

const ApproveButton = styled.div`
    border-radius: 50%;
    background-color: ${({ theme }) => theme.primary};
    padding: 10px;
    width: 40px;
    height: 40px;
    position: absolute;
    right: 40px;
    cursor: pointer;
    box-shadow: 8px 8px 20px -11px ${({ theme }) => theme.darkGrey};

    :hover {
        background-color: ${({ theme }) => theme.hoverPrimary};
    }
`;

interface HostImageProps {
    showCrown: boolean;
}

const HostImage = styled.div`
    border-radius: 50%;
    width: 80px;
    height: 80px;
    position: relative;
`;

const StyledImage = styled(Image)`
    border-radius: 50%;
`;

const ImageAndLinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
`;

const ImageAndCrown = styled.div`
    position: relative;
    margin-bottom: 10px;
`;

const TimeAndInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const Link = styled.a`
    color: ${({ theme }) => theme.midGrey};
    text-decoration: none;
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
    }
`;

const TimeAgo = styled.div`
    margin-bottom: 10px;
    color: ${({ theme }) => theme.midGrey};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
    }
`;

const ButtonWrapper = styled.div`
    position: absolute;
    right: 40px;
`;
