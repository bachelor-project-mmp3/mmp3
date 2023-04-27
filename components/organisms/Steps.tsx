import React from 'react';
import styled from 'styled-components';
import Bubble1 from '../../public/images/bubble-1.svg';
import Bubble2 from '../../public/images/bubble-2.svg';
import Bubble3 from '../../public/images/bubble-3.svg';

interface StepsProps {
    german?: boolean;
}

export const Steps: React.FC<StepsProps> = ({ german }) => {
    return (
        <Wrapper>
            <WrapperItem>
                <Bubble1 />
                <StyledText>
                    {german
                        ? 'Erstelle deine eigenen Events oder nimm an welchen teil, die deinen Vorlieben entsprechen.'
                        : 'Create your own events or join ones that suit your preferences.'}
                </StyledText>
            </WrapperItem>
            <WrapperItem>
                <Bubble2 />
                <StyledText>
                    {german
                        ? 'Lerne andere Studierende außerhalb des eigenen Studiengangs kennen.'
                        : 'Get to know to other students outside of your own degree programm.'}
                </StyledText>
            </WrapperItem>
            <WrapperItem>
                <Bubble3 />
                <StyledText>
                    {german
                        ? 'Genieße das Essen mit neu gewonnenen Freunden.'
                        : 'Enjoy meals with newfound friends and create lasting connections'}
                </StyledText>
            </WrapperItem>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 60px 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @media ${(props) => props.theme.breakpoint.tablet} {
        margin-top: 40px;
        padding: 60px;
        justify-content: center;
        gap: 20px;
    }
`;

const WrapperItem = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media ${(props) => props.theme.breakpoint.tablet} {
        flex-basis: 30%;
        width: fit-content;
    }
`;

const StyledText = styled.p`
    text-align: center;
    padding: 20px 0;
    width: 300px;
`;
