import React from 'react';
import { Quote } from '../components/organisms/Quote';
import { LandingPageHeader } from '../components/organisms/LandingpageHeader';
import { Footer } from '../components/organisms/Footer';
import { Steps } from '../components/organisms/Steps';
import styled from 'styled-components';
import { Button } from '../components/atoms/Button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const LandingPage: React.FC = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    return (
        <>
            <LandingPageHeader>
                <WrapperContent>
                    <WrapperContentItem>
                        <TextWrapper>
                            <h1>Welcome to Studentenfutter</h1>
                            <h2>
                                {
                                    'The platform for students to socialize through meal events'
                                }
                            </h2>
                            <p>
                                Join the mix and meet new people - meal by meal!
                            </p>

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
                    </WrapperContentItem>
                    <WrapperContentItem>
                        <MobileImageWrapper>
                            <MobileImage
                                src={'/images/hands_mobile.svg'}
                                alt="Image"
                                fill
                                sizes="100"
                                style={{
                                    objectFit: 'fill',
                                }}
                            />
                        </MobileImageWrapper>
                        <DesktopImageWrapper>
                            <DesktopImage
                                src={'/images/hands_desktop.svg'}
                                alt="Image"
                                fill
                                sizes="100"
                                style={{
                                    objectFit: 'fill',
                                }}
                            />
                        </DesktopImageWrapper>
                    </WrapperContentItem>
                </WrapperContent>
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

const WrapperContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 90vh;
`;

const WrapperContentItem = styled.div`
    width: 100%;
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 40%;
        &:nth-child(2) {
            align-self: flex-end;
            width: 60%;
        }
    }
    &:nth-child(2) {
        display: flex;
        align-self: flex-end;
    }
`;

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

const MobileImage = styled(Image)`
    display: block;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: none;
    }
`;

const DesktopImage = styled(Image)`
    display: none;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: block;
        height: 10vh;
    }
`;

const TextWrapper = styled.div`
    margin: 30px;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        margin: 60px;
    }
`;

const DesktopImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: none;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: block;
    }
`;

const MobileImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 60vh;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: none;
    }
`;
