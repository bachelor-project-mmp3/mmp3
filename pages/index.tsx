import React from 'react';
import { Quote } from '../components/organisms/Quote';
import { LandingPageHeader } from '../components/organisms/LandingpageHeader';
import { Footer } from '../components/organisms/Footer';
import { Steps } from '../components/organisms/Steps';

const LandingPage: React.FC = () => {
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
