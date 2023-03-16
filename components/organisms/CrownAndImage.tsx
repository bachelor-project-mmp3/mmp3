import styled from 'styled-components';
import React from 'react';
import Image from 'next/image';
import Crown from '../../public/icons/krone.svg';
import { HostImageProps } from './events/ExtendedEventPreview';

interface CrownAndImageProps {
    userIsHost?: boolean;
    hostName: string;
    source: string;
    onClick?: (e: any) => void;
}
export const CrownAndImage: React.FC<CrownAndImageProps> = ({
    onClick,
    userIsHost,
    hostName,
    source,
}: CrownAndImageProps) => {
    return (
        <>
            <StyledCrownAndImage onClick={onClick}>
                <StyledCrown />
                <HostImage userIsHost={userIsHost}>
                    <StyledImage
                        src={source}
                        alt="Image"
                        layout={'fill'}
                        style={{ objectFit: 'cover' }}
                    />
                </HostImage>
            </StyledCrownAndImage>
            <div
                style={{ textAlign: 'right', cursor: 'pointer' }}
                onClick={onClick}>
                by {hostName}
            </div>
        </>
    );
};
const StyledCrownAndImage = styled.div`
    position: relative;
    cursor: pointer;
`;

const StyledImage = styled(Image)`
    border-radius: 50%;
`;

const StyledCrown = styled(Crown)`
    position: absolute;
    right: -20px;
    top: -30px;
    height: 35px;
    width: 70px;
    transform: rotate(30deg);
`;

const HostImage = styled.div<HostImageProps>`
    position: relative;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    border: ${(props) =>
        props.userIsHost ? '7px solid ' + props.theme.green : 'none'};
`;
