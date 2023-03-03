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

export const hasUserSendRequestHelper = (event, session) => {
    return event.requests.find(
        (request) => request.userId === session?.user?.userId
    );
};

export const isRequestAcceptedHelper = (hasUserSendRequest) => {
    return hasUserSendRequest
        ? hasUserSendRequest.status === RequestStatus.ACCEPTED
        : false;
};
