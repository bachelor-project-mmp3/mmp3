import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from './../atoms/Button';

export const Header = () => {
    const { data: session, status } = useSession();

    let left = (
        <div className="left">
            <Link href="/">LandingPage</Link>
            <Link href="/events">Events</Link>
            <Link href={`/profile/${session?.user?.id}`}>Profile</Link>

            
            <p>{status}</p>
            {session != null ?
                <p>
                    {session.user.name}, {session.user.email}
                </p>
            : null}

            {status != 'authenticated' ? 
                <Button variant={'primary'} onClick={() => signIn('fhs')}>
                    Sign in with FH Login
                </Button>
                : 
                <Button variant={'secondary'} onClick={() => signOut()}>
                    Sign out
                </Button>}
            

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
