import { RequestStatus } from '.prisma/client';

export const userIsHostHelper = (sessionUserId, hostId) => {
    return sessionUserId === hostId ?? false;
};

export const hostNameHelper = (firstName, lastName) => {
    return firstName && lastName ? firstName + ' ' + lastName : 'Unknown host';
};

export const userHasJoinedHelper = (event, session) => {
    return event.requests?.some(
        (request) => request.userId === session?.user?.userId
    );
};

export const userHasSentReview = (event, session) => {
    return event.reviews?.some(
        (review) => review.userId === session?.user?.userId
    );
};

export const getOverallRating = (reviews: { total: number }[]) => {
    if (reviews?.length > 0) {
        // round to half for star rating
        return (
            Math.round(
                (reviews
                    .map((review) => review.total)
                    .reduce((prev, next) => prev + next) /
                    reviews.length) *
                    2
            ) / 2
        );
    }
    return null;
};

export const hasUserSendRequestHelper = (requests, session) => {
    return requests.find((request) => request.userId === session?.user?.userId);
};

export const isRequestAcceptedHelper = (hasUserSendRequest) => {
    return hasUserSendRequest
        ? hasUserSendRequest.status === RequestStatus.ACCEPTED
        : false;
};
