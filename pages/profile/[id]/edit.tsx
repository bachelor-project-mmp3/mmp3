import React from 'react';
import Layout from '../../../components/Layout';
import { ProfileForm } from '../../../components/organisms/forms/ProfileForm';
import { Header } from '../../../components/organisms/Header';
import styled from 'styled-components';

const Profile = () => {
    return (
        <Layout>
            <Header />
            <StyledHeading>Edit profile</StyledHeading>
            <ProfileForm cancelButton />
        </Layout>
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

export default Profile;
