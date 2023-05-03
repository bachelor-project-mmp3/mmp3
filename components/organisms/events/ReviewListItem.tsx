import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ReactStars from 'react-stars';

interface ReviewItemProps {
    review: Review;
}

type Review = {
    User: { image: string };
    dish: number;
    environment: number;
    text: string;
};

const ReviewListItem: React.FC<ReviewItemProps> = ({ review }) => {
    return (
        <Wrapper>
            <ImageWrapper>
                <StyledImage
                    src={review?.User?.image}
                    alt="Reviewer Image"
                    fill
                    sizes="100"
                    style={{ objectFit: 'cover' }}
                />
            </ImageWrapper>
            <Content>
                <ReviewStarsWrapper>
                    <ReviewCategory>
                        <StarsMobile>
                            <ReactStars
                                count={5}
                                half={false}
                                size={18}
                                color2={'#ffd700'}
                                value={review.dish}
                                edit={false}
                            />
                        </StarsMobile>
                        <StarsDesktop>
                            <ReactStars
                                count={5}
                                half={false}
                                size={30}
                                color2={'#ffd700'}
                                value={review.dish}
                                edit={false}
                            />
                        </StarsDesktop>
                        <span>Food</span>
                    </ReviewCategory>
                    <ReviewCategory>
                        <StarsMobile>
                            <ReactStars
                                count={5}
                                half={false}
                                size={18}
                                color2={'#ffd700'}
                                value={review.environment}
                                edit={false}
                            />
                        </StarsMobile>
                        <StarsDesktop>
                            <ReactStars
                                count={5}
                                half={false}
                                size={30}
                                color2={'#ffd700'}
                                value={review.environment}
                                edit={false}
                            />
                        </StarsDesktop>
                        <span>Atmosphere</span>
                    </ReviewCategory>
                </ReviewStarsWrapper>
                <Text>{review.text}</Text>
            </Content>
        </Wrapper>
    );
};

export default ReviewListItem;

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;

    @media ${(props) => props.theme.breakpoint.desktop} {
        gap: 20px;
    }
`;

const Content = styled.div`
    width: 100%;
`;
const ImageWrapper = styled.div`
    position: relative;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    flex-shrink: 0;

    @media ${(props) => props.theme.breakpoint.desktop} {
        width: 80px;
        height: 80px;
    }
`;

const StyledImage = styled(Image)`
    border-radius: 50%;
`;

const ReviewStarsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ReviewCategory = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Text = styled.div`
    margin-top: 10px;
`;

const StarsMobile = styled.div`
    @media ${(props) => props.theme.breakpoint.desktop} {
        display: none;
    }
`;

const StarsDesktop = styled.div`
    display: none;

    @media ${(props) => props.theme.breakpoint.desktop} {
        display: block;
    }
`;
