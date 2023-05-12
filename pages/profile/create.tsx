import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Header } from '../../components/organisms/Header';
import { ProfileForm } from '../../components/organisms/forms/ProfileForm';
import Walkthrough from '../../components/organisms/Walkthrough';
import styled from 'styled-components';
import Head from 'next/head';

const CreateProfile = () => {
    const [showWalkthrough, setShowWalkthrough] = useState(true);

    return (
        <>
            <Head>
                <title>{`Studentenfutter - Complete your profile`}</title>
            </Head>
            <Layout>
                <Header />
                <StyledHeading>Complete your profile</StyledHeading>
                {showWalkthrough && (
                    <WalkthroughWrapper>
                        <Walkthrough
                            onClick={() => setShowWalkthrough(false)}
                        />
                    </WalkthroughWrapper>
                )}
                {!showWalkthrough && (
                    <FormMobile>
                        <ProfileForm />
                    </FormMobile>
                )}
                <FormDesktop>
                    <ProfileForm />
                </FormDesktop>
            </Layout>
        </>
    );
};

const StyledHeading = styled.h2`
    font-size: ${({ theme }) => theme.fonts.mobile.headline3};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.headline3};
    }
    font-weight: 800;
    margin-bottom: 10px;
    margin-top: 30px;
    padding: 0 20px;
`;

const WalkthroughWrapper = styled.div`
    @media ${(props) => props.theme.breakpoint.tablet} {
        display: none;
    }
`;

const FormMobile = styled.div`
    @media ${(props) => props.theme.breakpoint.tablet} {
        display: none;
    }
`;

const FormDesktop = styled.div`
    display: none;
    @media ${(props) => props.theme.breakpoint.tablet} {
        display: unset;
    }
`;

export default CreateProfile;
