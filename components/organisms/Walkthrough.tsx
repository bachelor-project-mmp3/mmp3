import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ImageState1 from '../../public/images/intro_1.svg';
import ImageState2 from '../../public/images/intro_2.svg';
import ImageState3 from '../../public/images/intro_3.svg';
import { Button } from '../atoms/Button';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore from 'swiper';

const Walkthrough: React.FC = () => {
    const [showWalkthrough, setShowWalkthrough] = useState(true);
    const [introState, setIntroState] = useState(0);
    const swiperRef = useRef<SwiperCore>();
    return (
        <>
            {showWalkthrough && (
                <StyledBackground>
                    <StyledSkip onClick={() => setShowWalkthrough(false)}>
                        Skip Intro
                    </StyledSkip>
                    <StyledHeadline>Welcome to Studentenfutter</StyledHeadline>

                    <Swiper
                        modules={[Pagination]}
                        pagination
                        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={() =>
                            swiperRef.current?.swipeDirection == 'prev'
                                ? setIntroState(introState - 1)
                                : setIntroState(introState + 1)
                        }>
                        <SwiperSlide>
                            <StyledText>
                                Join events or simply create them yourself - all
                                to your preferences!
                            </StyledText>
                            <StyledImage>
                                <ImageState1 />
                            </StyledImage>
                        </SwiperSlide>
                        <SwiperSlide>
                            <StyledText>
                                The plattform that brings students together at a
                                shared meal
                            </StyledText>
                            <StyledImage>
                                <ImageState2 />
                            </StyledImage>
                        </SwiperSlide>
                        <SwiperSlide>
                            <StyledText>
                                But before you get going: Please fill out your
                                profile page!
                            </StyledText>
                            <StyledImage>
                                <ImageState3 />
                            </StyledImage>
                        </SwiperSlide>
                        <ButtonWrapper>
                            {introState != 0 && (
                                <Button
                                    variant="secondary"
                                    width={40}
                                    onClick={function () {
                                        swiperRef.current?.slidePrev();
                                        setIntroState(introState - 1);
                                    }}>
                                    Go Back
                                </Button>
                            )}
                            {introState == 2 ? (
                                <Button
                                    variant="primary"
                                    width={40}
                                    onClick={() => setShowWalkthrough(false)}>
                                    Got it!
                                </Button>
                            ) : (
                                <Button
                                    variant="primary"
                                    width={40}
                                    onClick={function () {
                                        swiperRef.current?.slideNext();
                                        setIntroState(introState + 1);
                                    }}>
                                    Next
                                </Button>
                            )}
                        </ButtonWrapper>
                    </Swiper>
                </StyledBackground>
            )}
        </>
    );
};

export default Walkthrough;

const StyledSkip = styled.p`
    color: ${({ theme }) => theme.primary};
    text-align: end;
    margin: 20px;
`;

const StyledImage = styled.div`
    height: 300px;
`;

const StyledHeadline = styled.h1`
    padding-left: 30px;
    padding-right: 60px;
`;

const StyledText = styled.p`
    padding-left: 30px;
    padding-right: 60px;
`;

const StyledBackground = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    background: ${({ theme }) => theme.backgroundLightGreen};
    left: 0;
    top: 0;
    z-index: 1;
`;

const ButtonWrapper = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-evenly;
    margin: 25px 0px;
    width: 100%;
    bottom: 0;
`;
