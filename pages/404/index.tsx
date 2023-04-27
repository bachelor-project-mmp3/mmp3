import React from 'react';
import Layout from '../../components/Layout';
import ErrorImage from '../../public/images/error.svg';
import styled from 'styled-components';

const ErrorPage: React.FC = () => {
    return (
        <Layout>
            <ErrorWrapper>
                <h1>{'Oh no, something went wrong'}</h1>
                <StyledErrorImage />
            </ErrorWrapper>
        </Layout>
    );
};

export default ErrorPage;

const ErrorWrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    font-size: ${({ theme }) => theme.fonts.mobile.headline4};

    @media ${(props) => props.theme.breakpoint.tablet} {
        width: fit-content;
    }
`;

const StyledErrorImage = styled(ErrorImage)`
    width: 80vw;
    max-width: 400px;
`;
