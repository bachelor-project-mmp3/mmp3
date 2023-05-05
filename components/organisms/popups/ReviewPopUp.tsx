import React from 'react';
import ActionPopUp from './ActionPopUp';
import ReactStars from 'react-stars';
import styled from 'styled-components';

interface ReviewPopUpProps {
    onClose: (e: any) => void;
    onAction: (e: any) => void;
    eventTitle: string;
    onChangeReview: (data: {
        food: number;
        hospitality: number;
        text: string;
    }) => void;
    currentReviewData: {
        food: number;
        hospitality: number;
        text: string;
    };
}

const ReviewPopUp: React.FC<ReviewPopUpProps> = ({
    onClose,
    onAction,
    eventTitle,
    onChangeReview,
    currentReviewData,
}: ReviewPopUpProps) => {
    const foodRatingChanged = (newRating) => {
        onChangeReview({ ...currentReviewData, food: newRating });
    };

    const hospitalityRatingChanged = (newRating) => {
        onChangeReview({ ...currentReviewData, hospitality: newRating });
    };

    const textRatingChanged = (newRating) => {
        onChangeReview({ ...currentReviewData, text: newRating });
    };

    return (
        <ActionPopUp
            onClose={onClose}
            onAction={onAction}
            textButtonAction="Add review"
            textButtonClose="Cancel">
            <>
                <h1>{`How did you like ${eventTitle}`}?</h1>
                <RatingRow>
                    <p>Food</p>
                    <ReactStars
                        count={5}
                        half={false}
                        onChange={foodRatingChanged}
                        size={30}
                        color2={'#ffd700'}
                        value={currentReviewData.food}
                    />
                </RatingRow>
                <RatingRow>
                    <p>Hospitality</p>
                    <ReactStars
                        count={5}
                        half={false}
                        onChange={hospitalityRatingChanged}
                        size={30}
                        color2={'#ffd700'}
                        value={currentReviewData.hospitality}
                    />
                </RatingRow>
                <StyledTextArea
                    onChange={(e) => textRatingChanged(e.target.value)}
                    placeholder="Leave some personal words for your host (optional)"
                />
            </>
        </ActionPopUp>
    );
};

export default ReviewPopUp;

const StyledTextArea = styled.textarea`
    width: fill-available;
    height: 150px;
    margin-top: 20px;
    border-radius: 20px;
    border: none;
    padding: 13px 20px;
    border: 1px solid ${({ theme }) => theme.midGrey};
    font-size: ${({ theme }) => theme.fonts.mobile.info};
    @media ${({ theme }) => theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
    }
`;

const RatingRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
