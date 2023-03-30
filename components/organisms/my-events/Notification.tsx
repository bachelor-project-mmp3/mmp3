import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import DiscardIcon from '../../../public/icons/discard.svg';

export type NotificationProps = {
    id: string;
    eventId: string;
    message: string;
    type: string;
    Event: {
        title: string;
        id: string;
        host: {
            id: string;
            image: string;
        };
    };
};

const Notification: React.FC<{
    notification: NotificationProps;
    onClickLink: () => void;
    onClickHide: () => void;
}> = ({ notification, onClickHide, onClickLink }) => {
    return (
        <>
            <NotificationWrapper>
                <StyledCard
                    onClick={notification.type === 'EVENT' ? onClickLink : null}
                    style={{
                        cursor:
                            notification.type === 'EVENT' ? 'pointer' : null,
                    }}>
                    <StyledTitle>{notification.Event.title}</StyledTitle>
                    <StyledMessage>{notification.message}</StyledMessage>
                    <HostImage>
                        <StyledImage
                            src={notification.Event.host.image}
                            alt="Image"
                            layout={'fill'}
                            style={{ objectFit: 'cover' }}
                        />
                    </HostImage>
                </StyledCard>
                <StyledDeleteButton onClick={onClickHide} />
            </NotificationWrapper>
        </>
    );
};

export default Notification;

const StyledTitle = styled.p`
    width: 300px;
    font-weight: 800;
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 220px;
    }
`;

const StyledMessage = styled.p`
    font-size: ${({ theme }) => theme.fonts.mobile.info};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
    }
    margin: 0;
`;

const HostImage = styled.div`
    position: absolute;
    top: -50%;
    transform: translateY(25%);
    right: 10px;
    border-radius: 50%;
    width: 64px;
    height: 64px;
`;

const StyledImage = styled(Image)`
    border-radius: 50%;
`;

const StyledDeleteButton = styled(DiscardIcon)`
    height: 16px;
    width: 16px;
    position: absolute;
    right: 20px;
    bottom: 15px;
    cursor: pointer;
`;

const StyledCard = styled.div`
    margin-top: 40px;
    position: relative;
    background: ${({ theme }) => theme.secondary};
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
`;

const NotificationWrapper = styled.div`
    position: relative;
`;
