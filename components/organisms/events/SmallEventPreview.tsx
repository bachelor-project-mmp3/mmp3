import styled from 'styled-components';
import React from 'react';
import { Card } from '../../atoms/Card';
import Image from 'next/image';
import ReactStars from 'react-stars';
import { getOverallRating } from '../../../helper/EventsAndUserHelper';

interface SmallEventProps {
    title: string;
    imageEvent: string;
    imageHost: string;
    date: string;
    myEventsPage?: boolean;
    onClick?: (e: any) => void;
    reviews: { total: number }[];
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
    myEventsPage,
    reviews,
}: SmallEventProps) => {
    const overAllRating = getOverallRating(reviews);
    const imageText = `photo of ${title}`;
    return (
        <SmallEventWrapper onClick={onClick} myEventsPage={myEventsPage}>
            <Card variant={'small-event'}>
                <StyledImageEvent
                    src={imageEvent}
                    alt={imageText}
                    width="300"
                    height="300"
                />
                <ReviewWrapper>
                    {reviews?.length > 0 ? (
                        <ReactStars
                            count={5}
                            half={false}
                            size={20}
                            color2={'#ffd700'}
                            value={overAllRating}
                            edit={false}
                        />
                    ) : (
                        <NoReviews></NoReviews>
                    )}
                </ReviewWrapper>
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
                            alt="photo of host"
                            width="300"
                            height="300"
                        />
                    </ColumnWrapper>
                </RowWrapper>
            </Card>
        </SmallEventWrapper>
    );
};

interface SmallEventWrapperProps {
    myEventsPage?: boolean;
}
const SmallEventWrapper = styled.div<SmallEventWrapperProps>`
    cursor: pointer;
    ${(props) => props.myEventsPage && 'max-width: 300px; width:100%;'};
`;

const ReviewWrapper = styled.div`
    padding-left: 20px;
    height: 35px;
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    &.col-1 {
        width: 70%;
        padding-left: 10px;
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
        padding: 0 10px 10px;
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
    width: 38px;
    height: 38px;
    object-fit: cover;
    flex-shrink: 0;
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 52px;
        height: 52px;
    }
`;

const StyledDate = styled.p`
    margin-top: 0;
    margin-bottom: 0;
    width: 100%;
    font-size: ${({ theme }) => theme.fonts.mobile.info};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
    }
`;

const StyledTitle = styled.p`
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    font-weight: 800;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
    }
`;

const NoReviews = styled.div`
    padding-top: 10px;
`;
