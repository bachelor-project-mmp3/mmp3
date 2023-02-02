import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '../atoms/Button';

export const Header = () => {
    const { data: session, status } = useSession();

    let left = (
        <div className="left">
            <Link href="/">LandingPage</Link>
            <Link href="/events">Events</Link>
            <Link href="/events/create">CreateEvent</Link>

            <p>{status}</p>
            {session != null ? (
                <p>
                    {session.user.name}, {session.user.email}
                </p>
            ) : null}

            <Button variant={'primary'} onClick={() => signIn('fhs')} disabled>
                Sign in with FH Login
            </Button>
            <Button variant={'secondary'} onClick={() => signOut()}>
                Sign out
            </Button>

            <style jsx>{`
                .bold {
                    font-weight: bold;
                }

                a {
                    text-decoration: none;
                    color: #000;
                    display: inline-block;
                }

                .left a[data-active='true'] {
                    color: gray;
                }

                a + a {
                    margin-left: 1rem;
                }
            `}</style>
        </div>
    );

    let right = null;

    return (
        <nav>
            {left}
            {right}
            <style jsx>{`
                nav {
                    display: flex;
                    padding: 2rem;
                    align-items: center;
                }
            `}</style>
        </nav>
    );
};

export default Header;
