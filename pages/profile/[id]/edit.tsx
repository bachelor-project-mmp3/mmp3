import React from 'react';
import Layout from '../../../components/Layout';
import { ProfileForm } from '../../../components/organisms/forms/ProfileForm';
import { Header } from '../../../components/organisms/Header';

const Profile = () => {
    return (
        <Layout>
            <Header backButton>Edit profile</Header>
            <ProfileForm cancelButton />
        </Layout>
    );
};

export default Profile;
