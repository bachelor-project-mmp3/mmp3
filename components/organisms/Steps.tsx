import React from 'react';
import styled from 'styled-components';
import Bubble1 from '../../public/images/bubble-1.svg';
import Bubble2 from '../../public/images/bubble-2.svg';
import Bubble3 from '../../public/images/bubble-3.svg';

export const Steps = () => {
    return (
        <Wrapper>
            <WrapperItem>
                <Bubble1 />
                <StyledText>
                    Create your own events or join ones that suit your
                    preferences.
                </StyledText>
            </WrapperItem>
            <WrapperItem>
                <Bubble2 />
                <StyledText>
                    Get to know to other students outside of your own degree
                    programm
                </StyledText>
            </WrapperItem>
            <WrapperItem>
                <Bubble3 />
                <StyledText>
                    Enjoy meals with newfound friends and create lasting
                    connections
                </StyledText>
            </WrapperItem>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-top: 80px;
    padding: 60px 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @media ${(props) => props.theme.breakpoint.tablet} {
        padding: 60px;
    }
`;

const WrapperItem = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 33%;
    }
`;

const StyledText = styled.p`
    text-align: center;
    padding: 20px 50px;
`;
