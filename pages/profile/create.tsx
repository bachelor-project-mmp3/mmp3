import React from 'react';
import Layout from '../../components/Layout';
import { Header } from '../../components/organisms/Header';
import { ProfileForm } from '../../components/organisms/forms/ProfileForm';
import Walkthrough from '../../components/organisms/Walkthrough';

const CreateProfile = () => {
    return (
        <Layout>
            <Walkthrough />
            <Header>Complete your profile</Header>
            <ProfileForm />
        </Layout>
    );
};

export default CreateProfile;
