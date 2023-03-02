import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '../atoms/Button';

export const Header = () => {
    const { data: session, status } = useSession();

    // TODO ADD HEAD HERE
    let left = (
        <div className="left">
            {status != 'authenticated' ? (
                <Button variant={'primary'} onClick={() => signIn('fhs')} card>
                    Sign in with FH Login
                </Button>
            ) : (
                <Button variant={'secondary'} onClick={() => signOut()} card>
                    Sign out
                </Button>
            )}
        </div>
    );

    let right = null;

    return (
        <nav>
            {left}
            {right}
        </nav>
    );
};

export default Header;
