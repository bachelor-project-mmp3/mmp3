import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { universities } from '../../helper/universities';
import { Button } from '../../components/atoms/Button';
import { useRouter } from 'next/router';
import { Footer } from '../../components/organisms/Footer';
import { signIn } from 'next-auth/react';
import { LandingPageHeader } from '../../components/organisms/LandingpageHeader';
import { Quote } from '../../components/organisms/Quote';
import { Steps } from '../../components/organisms/Steps';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import Image from 'next/image';

const Landingpage = () => {
    const [university, setUniversity] = useState<string | undefined>();
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const onSubmit = async () => {
        const data = {
            university,
        };

        const res = await fetch(`/api/landingpage`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (res.status === 200) {
            setSuccess(true);
        } else {
            router.push('/500');
        }
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minHeight: '46px',
            height: '46px',
        }),

        valueContainer: (provided) => ({
            ...provided,
            height: '46px',
        }),

        indicatorsContainer: (provided) => ({
            ...provided,
            height: '46px',
        }),
    };

    return (
        <>
            <GoogleAnalytics trackPageViews />
            <LandingPageHeader hideLogin>
                <>
                    <TextWrapper>
                        {success ? (
                            <>
                                {university ===
                                    'Fachhochschule Salzburg GmbH' ||
                                university ===
                                    'Fachhochschule Salzburg (Puch)' ? (
                                    <>
                                        <h1>
                                            {
                                                'Gratuliere, für die Fachhochschule Salzburg gibt es Studentenfutter schon!'
                                            }
                                        </h1>
                                        <h2> {'Starte gleich kostenlos!'}</h2>
                                        <Button
                                            variant={'primary'}
                                            onClick={() =>
                                                signIn('fhs', {
                                                    callbackUrl:
                                                        '/api/auth/signin',
                                                })
                                            }
                                            width={50}>
                                            {'Login'}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <h1>
                                            {
                                                'Leider ist deine Institution noch nicht verfügbar!'
                                            }
                                        </h1>
                                        <Subtitle>
                                            {
                                                'Wir bedanken uns für dein Interesse. Wir wenden uns an deine Institution, damit auch ihr in Zukunft Studentenfutter verwenden könnt.'
                                            }
                                        </Subtitle>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <h1>
                                    {
                                        'Liebe ...ähh Freundschaft geht durch den Magen'
                                    }
                                </h1>
                                <Subtitle>
                                    {
                                        'Lerne deine Studienkolleg*innen beim Essen kennen - schwing selbst den Kochlöffel oder schlag dir bei anderen Studierenden den Bauch voll.'
                                    }
                                </Subtitle>
                                <Question>
                                    {'Ist deine Uni oder FH schon dabei?'}
                                </Question>

                                <FormWrapper>
                                    <Select
                                        options={universities}
                                        placeholder="Wähle deine Institution aus"
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary25: '#40845e',
                                                primary: '#52A174',
                                            },
                                        })}
                                        styles={customStyles}
                                        onChange={(value) =>
                                            setUniversity(value.value)
                                        }
                                    />
                                    <Button
                                        disabled={university === undefined}
                                        onClick={onSubmit}
                                        variant="primary">
                                        {'Jetzt prüfen'}
                                    </Button>
                                </FormWrapper>
                            </>
                        )}
                    </TextWrapper>
                </>
            </LandingPageHeader>
            <Quote
                title="Studentenfutter"
                subtitle="the German word for trail mix"
                text="Studentenfutter will Studierende außerhalb ihres gewohnten Umfelds zusammenbringen und so bei einem gemütlichen Essen neue Freundschaften entstehen lassen."
            />
            <Steps german />
            <MockupWrapper>
                <ImageWrapper>
                    <Image
                        src={'/images/mockupPhones.jpg'}
                        alt="Mockup Mobile"
                        fill
                        sizes="100"
                        style={{ objectFit: 'scale-down' }}
                    />
                </ImageWrapper>
                <ImageWrapper>
                    <Image
                        src={'/images/mockupLaptop.jpg'}
                        alt="Mockup Desktop"
                        fill
                        sizes="100"
                        style={{ objectFit: 'scale-down' }}
                    />
                </ImageWrapper>
            </MockupWrapper>
            <Footer />
        </>
    );
};

export default Landingpage;

const FormWrapper = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
    max-width: 350px;
    width: 100%;
    margin: auto;

    @media ${({ theme }) => theme.breakpoint.tablet} {
        margin: initial;
    }
`;

const TextWrapper = styled.div`
    margin: 0 30px 10px;

    @media ${({ theme }) => theme.breakpoint.desktop} {
        margin: 60px;
    }
`;

const Subtitle = styled.h3`
    color: ${({ theme }) => theme.darkGrey};
`;

const Question = styled.p`
    margin-top: 20px;
    text-align: center;
    font-weight: 800;

    @media ${({ theme }) => theme.breakpoint.tablet} {
        text-align: left;
    }
`;

const MockupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;

    @media ${({ theme }) => theme.breakpoint.tablet} {
        flex-direction: row;
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 350px;

    @media ${({ theme }) => theme.breakpoint.tablet} {
        height: 550px;
    }
`;
