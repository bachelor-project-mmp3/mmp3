import { ReactNode } from 'react';
import styled from 'styled-components';
import React from 'react';
import { Card } from '../../atoms/Card';
import Image from 'next/image';

interface SmallEventProps {
    title: string;
    imageEvent: string;
    imageHost: string;
    date: string;
    onClick?: (e: any) => void;
}

const getFormattedDate = (date: string) => {
    let formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-US');
};

export const SmallEventPreview: React.FC<SmallEventProps> = ({
    title,
    imageEvent,
    imageHost,
    date,
    onClick,
}: SmallEventProps) => {
    return (
        <SmallEventWrapper onClick={onClick}>
            <Card variant={'no-padding'}>
                <StyledImageEvent
                    src={imageEvent}
                    alt="Image"
                    width="300"
                    height="300"
                />
                <RowWrapper className="padding">
                    <ColumnWrapper className="col-1">
                        <RowWrapper>
                            <StyledDate>{getFormattedDate(date)}</StyledDate>
                            <StyledTitle>{title}</StyledTitle>
                        </RowWrapper>
                    </ColumnWrapper>
                    <ColumnWrapper className="col-2">
                        <StyledImageHost
                            src={imageHost}
                            alt="Image"
                            width="300"
                            height="300"
                        />
                    </ColumnWrapper>
                </RowWrapper>
            </Card>
        </SmallEventWrapper>
    );
};

const SmallEventWrapper = styled.div`
    cursor: pointer;
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: col;
    justify-content: flex-end;
    align-items: center;
    &.col-1 {
        width: 70%;
    }
    &.col-2 {
        width: 30%;
        justify-content: center;
    }
`;

const RowWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
    &.padding {
        padding: 10px;
    }
    @media ${(props) => props.theme.breakpoint.tablet} {
        padding: 5px;
    }
`;

const StyledImageEvent = styled(Image)`
    height: 100px;
    width: 100%;
    object-fit: cover;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        height: 150px;
    }
`;

const StyledImageHost = styled(Image)`
    border-radius: 50%;
    width: 45px;
    height: 45px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 64px;
        height: 64px;
    }
`;

const StyledDate = styled.p`
    margin-top: 15px;
    margin-bottom: 0;
    width: 100%;
    font-size: ${({ theme }) => theme.fonts.mobile.info};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
    }
`;

const StyledTitle = styled.p`
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    font-weight: bold;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 5px;
    margin-bottom: 25px;
    width: 100%;
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
    }
`;
