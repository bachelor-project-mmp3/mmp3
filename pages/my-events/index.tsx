import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import { Header } from '../../components/organisms/Header';

const MyEvents: React.FC = () => {
    return (
        <Layout>
            <Header>Hello TODO</Header>
            <Link href="/requests">Go to Invitation Updates</Link>
        </Layout>
    );
};

export default MyEvents;
