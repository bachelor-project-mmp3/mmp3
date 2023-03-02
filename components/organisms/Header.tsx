import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '../atoms/Button';
import router from 'next/router';

export const Header = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) {
            fetch(`/api/profile/${session.user.userId}`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.profile.roomNumber) {
                        router.push(`/profile/${session.user.userId}/edit`);
                    }
                });
        }
    }, [session]);

    let left = (
        <div className="left">
            <Link href="/">LandingPage</Link>
            {status === 'authenticated' && (
                <>
                    <Link href="/events">Events</Link>
                    <Link href="/events/create">CreateEvent</Link>
                    <Link href={`/profile/${session?.user?.userId}`}>
                        Profile
                    </Link>
                </>
            )}

            <p>{status}</p>
            {session != null ? (
                <p>
                    {session.user.name}, {session.user.email}
                </p>
            ) : null}

            {status != 'authenticated' ? (
                <Button
                    variant={'primary'}
                    onClick={() => signIn('fhs', { callbackUrl: '/events' })}>
                    Sign in with FH Login
                </Button>
            ) : (
                <Button
                    variant={'secondary'}
                    onClick={() => signOut({ callbackUrl: '/' })}>
                    Sign out
                </Button>
            )}

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
