import styled, { keyframes } from 'styled-components';
import React from 'react';
import Layout from '../Layout';
import PizzaIcon from '../../public/icons/pizza.svg';

export const Loading = ({
    withoutLayout = false,
}: {
    withoutLayout?: boolean;
}) => {
    return (
        <>
            {withoutLayout ? (
                <LoadingContent />
            ) : (
                <Layout>
                    <LoadingContent />
                </Layout>
            )}
        </>
    );
};

const LoadingContent = () => {
    return (
        <LoadingWrapper>
            <Content>
                <StyledPizzaIcon />
                <div>Loading</div>
            </Content>
        </LoadingWrapper>
    );
};
const LoadingWrapper = styled.div`
    position: relative;
    height: 100vh;
`;

const Content = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledPizzaIcon = styled(PizzaIcon)`
    height: 50px;
    width: 50px;
    animation: ${rotate} 5s linear infinite;
`;
