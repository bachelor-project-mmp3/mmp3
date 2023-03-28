import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../components/atoms/Button';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { Router } from 'next/router';
import Link from 'next/link';
import { Quote } from '../components/organisms/Quote';
import { LandingPageHeader } from '../components/organisms/LandingpageHeader';
import { Footer } from '../components/organisms/Footer';
import { Steps } from '../components/organisms/Steps';

const LandingPage: React.FC = () => {
    const { data: session, status } = useSession();

    return (
        <>
            <LandingPageHeader />
            <Quote
                title="Studentenfutter"
                subtitle="the German word for trail mix"
                text="Studentenfutter wants to bring different people outside of their usual environment together to create a mixed variety - just as the namesake."
            />
            <Steps />
            <Footer />
        </>
    );
};

export default LandingPage;
