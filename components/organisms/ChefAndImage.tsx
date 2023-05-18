import styled from 'styled-components';
import React from 'react';
import Image from 'next/image';
import ChefHood from '../../public/icons/chefmuetze.svg';
import { HostImageProps } from './events/ExtendedEventPreview';

interface ChefAndImageProps {
    userIsHost?: boolean;
    hostName: string;
    source: string;
    onClick?: (e: any) => void;
}
export const ChefAndImage: React.FC<ChefAndImageProps> = ({
    onClick,
    userIsHost,
    hostName,
    source,
}: ChefAndImageProps) => {
    const altText = `photo of ${hostName}`;
    return (
        <>
            <StyledChefAndImage onClick={onClick}>
                <StyledChefHat />
                <HostImage userIsHost={userIsHost}>
                    <StyledImage
                        src={source}
                        alt={altText}
                        fill
                        sizes="100"
                        style={{ objectFit: 'cover' }}
                    />
                </HostImage>
            </StyledChefAndImage>
            <div
                style={{ textAlign: 'right', cursor: 'pointer' }}
                onClick={onClick}>
                by {hostName}
            </div>
        </>
    );
};
const StyledChefAndImage = styled.div`
    position: relative;
    cursor: pointer;
`;

const StyledImage = styled(Image)`
    border-radius: 50%;
`;

const StyledChefHat = styled(ChefHood)`
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
        props.userIsHost ? '7px solid ' + props.theme.primary : 'none'};
`;
