import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import DiscardIcon from '../../../public/icons/discard.svg';
import router from 'next/router';
import { EventStatus } from '.prisma/client';

type GuestProps = {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
};

const GuestListItem: React.FC<{
    guest: GuestProps;
    userIsHost: boolean;
    eventStatus: EventStatus;
    onClick?: (e: any) => void;
}> = ({ guest, userIsHost, eventStatus, onClick }) => {
    const altText = `photo of ${guest.firstName}`;
    return (
        <StyledGuestListItem>
            <StyledImageAndName
                onClick={() => router.push(`/profile/${guest.id}`)}>
                <StyledImage
                    src={guest.image}
                    alt={altText}
                    style={{ objectFit: 'cover' }}
                    width={60}
                    height={60}
                />
                <div>
                    {guest.firstName} {guest.lastName}
                </div>
            </StyledImageAndName>
            {userIsHost && eventStatus !== EventStatus.OVER && (
                <StyledDeleteButton onClick={onClick} />
            )}
        </StyledGuestListItem>
    );
};

export default GuestListItem;

export const StyledGuestListItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px 0;
    justify-content: space-between;
`;

export const StyledImage = styled(Image)`
    border-radius: 50%;
    flex-shrink: 0;
`;
const StyledDeleteButton = styled(DiscardIcon)`
    height: 16px;
    width: 16px;
    cursor: pointer;
    flex-shrink: 0;
`;

const StyledImageAndName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 25px;
    cursor: pointer;
`;
