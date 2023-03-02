import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '../atoms/Button';
import router from 'next/router';

export const Header = () => {
    const { data: session, status } = useSession();

    // TODO ADD HEAD HERE
    return <div></div>;
};

export default Header;
