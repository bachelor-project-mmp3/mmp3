import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

import { useRouter } from 'next/router';
import { Header } from '../../components/organisms/Header';

const MyEvents: React.FC = () => {
    const [upcomingEvents, setUpcomingEvents] = useState(null);
    const [pastEvents, setPastEvents] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/my-events', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setUpcomingEvents(data.upcomingEvents);
                setPastEvents(data.pastEvents);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    console.log(upcomingEvents);
    console.log(pastEvents);

    return (
        <Layout>
            <Header>Hello TODO</Header>
            <Link href="/requests">Go to Invitation Updates</Link>
            <h1>MyEvents</h1>
            {upcomingEvents &&
                upcomingEvents.map((event) => <>{event.title}</>)}
            {pastEvents && pastEvents.map((event) => <>{event.title}</>)}
        </Layout>
    );
};

export default MyEvents;
