import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import DiscardIcon from '../../../public/icons/discard.svg';

type GuestProps = {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
};

const GuestListItem: React.FC<{
    guest: GuestProps;
    key: string;
    userIsHost: boolean;
}> = ({ guest, key, userIsHost }) => {
    return (
        <StyledGuestListItem key={key}>
            <StyledImage
                src={guest.image}
                alt="Image"
                style={{ objectFit: 'cover' }}
                width={60}
                height={60}
            />
            <div>
                {guest.firstName} {guest.lastName}
            </div>
            {userIsHost && (
                <StyledDeleteButton onClick={() => console.log('Jaaaaaa')} />
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
    justify-content: space-evenly;
`;

export const StyledImage = styled(Image)`
    border-radius: 50%;
`;
const StyledDeleteButton = styled(DiscardIcon)`
    height: 16px;
    width: 16px;
    cursor: pointer;
`;
