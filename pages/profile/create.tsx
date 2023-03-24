import React from 'react';
import Layout from '../../components/Layout';
import { Header } from '../../components/organisms/Header';
import { ProfileForm } from '../../components/organisms/forms/ProfileForm';

const CreateProfile = () => {
    return (
        <Layout>
            <Header>Complete your profile</Header>
            <ProfileForm />
        </Layout>
    );
};

export default CreateProfile;
