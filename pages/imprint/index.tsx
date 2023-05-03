import React from 'react';
import Layout from '../../components/Layout';
import FhsLogo from '../../public/icons/fhs.svg';
import styled from 'styled-components';
import Head from 'next/head';

const Imprint = () => {
    return (
        <>
            <Head>
                <title>{`Studentenfutter - Imprint`}</title>
            </Head>
            <Layout>
                <StyledDiv>
                    <h1>Imprint</h1>
                    <p>
                        Studentenfutter is created during our bachelors degree
                        programm (MultiMediaTechnology) at the{' '}
                        <a
                            href="https://www.fh-salzburg.ac.at/"
                            target="_blank"
                            rel="noreferrer">
                            University of Applied Sciences Salzburg
                        </a>
                        .
                    </p>
                    <Wrapper>
                        <StyledLogo />
                        <p>
                            Fachhochschule Salzburg GmbH<br></br>
                            Urstein Süd 1 A-5412<br></br>
                            Puch/Salzburg Österreich
                        </p>
                    </Wrapper>
                    <h2>Contact</h2>
                    <ul>
                        <li>
                            Kerstin Reichinger:
                            kreichinger.mmt-b2020@fh-salzburg.ac.at
                        </li>
                        <li>Lisa Rader: lrader.mmt-b2020@fh-salzburg.ac.at</li>
                        <li>
                            Tanja Santner: tsantner.mmt-b2020@fh-salzburg.ac.at
                        </li>
                        <li>
                            Alexandra Buchecker:
                            abuchecker.mma-b2020@fh-salzburg.ac.at
                        </li>
                    </ul>
                </StyledDiv>
            </Layout>
        </>
    );
};

export default Imprint;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
`;

const StyledLogo = styled(FhsLogo)`
    width: 80px;
`;

const StyledDiv = styled.div`
    max-width: 600px;
`;
