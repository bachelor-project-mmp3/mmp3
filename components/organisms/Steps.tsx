import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Step1 from '../../public/images/step_1.png';
import Step2 from '../../public/images/step_2.png';
import Step3 from '../../public/images/step_3.png';

export const Steps = () => {
    return (
        <>
            <Wrapper>
                <WrapperItem>
                    <StyledImage
                        src={Step1}
                        alt="Image"
                        style={{ objectFit: 'cover' }}
                    />
                    <StyledText>
                        Create your own events or join ones that suit your
                        preferences.
                    </StyledText>
                </WrapperItem>
                <WrapperItem>
                    <StyledImage
                        src={Step2}
                        alt="Image"
                        style={{ objectFit: 'cover' }}
                    />
                    <StyledText>
                        Get to know to other students outside of your own degree
                        programm
                    </StyledText>
                </WrapperItem>
                <WrapperItem>
                    <StyledImage
                        src={Step3}
                        alt="Image"
                        style={{ objectFit: 'cover' }}
                    />
                    <StyledText>
                        Enjoy meals with newfound friends and create lasting
                        connections
                    </StyledText>
                </WrapperItem>
            </Wrapper>
        </>
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

const StyledImage = styled(Image)`
    width: 300px;
    height: 300px;
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
