import React from 'react';
import { Quote } from '../components/organisms/Quote';
import { LandingPageHeader } from '../components/organisms/LandingpageHeader';
import { Footer } from '../components/organisms/Footer';
import { Steps } from '../components/organisms/Steps';
import styled from 'styled-components';
import { Button } from '../components/atoms/Button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const LandingPage: React.FC = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    return (
        <>
            <LandingPageHeader>
                <>
                    <TextWrapper>
                        <h1>Welcome to Studentenfutter</h1>
                        <h2>
                            {
                                'The platform for students to socialize through meal events'
                            }
                        </h2>
                        <p>Join the mix and meet new people - meal by meal!</p>

                        <ButtonWrapperDesktop>
                            {status != 'authenticated' ? (
                                <Button
                                    variant={'primary'}
                                    onClick={() =>
                                        signIn('fhs', {
                                            callbackUrl: '/api/auth/signin',
                                        })
                                    }>
                                    {"Let's get started"}
                                </Button>
                            ) : (
                                <Button
                                    variant={'primary'}
                                    onClick={() => router.push('/events')}>
                                    {'Show all events'}
                                </Button>
                            )}
                        </ButtonWrapperDesktop>

                        <ButtonWrapperMobile>
                            {status != 'authenticated' ? (
                                <Button
                                    variant={'primary'}
                                    onClick={() =>
                                        signIn('fhs', {
                                            callbackUrl: '/api/auth/signin',
                                        })
                                    }>
                                    {'Login'}
                                </Button>
                            ) : (
                                <Button
                                    variant={'primary'}
                                    onClick={() => router.push('/events')}>
                                    {'Show all events'}
                                </Button>
                            )}
                        </ButtonWrapperMobile>
                    </TextWrapper>
                </>
            </LandingPageHeader>
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

const ButtonWrapperDesktop = styled.div`
    display: none;  
    @media ${(props) => props.theme.breakpoint.tablet} {
        display: block;
        margin-top: 50px;
`;

const ButtonWrapperMobile = styled.div`
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 0;
    transform: translate(-50%);
    margin: 30px 0px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        display: none;
`;

const TextWrapper = styled.div`
    margin: 30px;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        margin: 60px;
    }
`;
