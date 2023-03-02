import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../components/atoms/Button';
import Layout from '../components/Layout';
import styled from 'styled-components';

const LandingPage: React.FC = () => {
    const { data: session, status } = useSession();

    return (
        <Layout>
            <Content>
                <h1>Welcome to Studentenfutter</h1>
                <h2>
                    The platform for Salzburg's students to socialize through
                    dinner events!{' '}
                </h2>
                <p>
                    Vegetarian, vegan or allergy-save: Join events that fit you
                    and your diet or simply create them yourself!
                </p>
                {status != 'authenticated' ? (
                    <Button
                        variant={'primary'}
                        onClick={() => signIn('fhs')}
                        card>
                        {"Let's get started"}
                    </Button>
                ) : (
                    <Button
                        variant={'secondary'}
                        onClick={() => signOut()}
                        card>
                        Sign out
                    </Button>
                )}
            </Content>
        </Layout>
    );
};

export default LandingPage;

const Content = styled.div`
    margin-top: 100px;
    text-align: center;
    padding: 20px;
`;
