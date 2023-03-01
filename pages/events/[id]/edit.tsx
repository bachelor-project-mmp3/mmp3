import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import Router, { useRouter } from 'next/router';
import { Button } from '../../../components/atoms/Button';
import { EventDetailProps } from './index';

async function deleteEvent(id: string): Promise<void> {
    await fetch(`/api/events/${id}`, {
        method: 'DELETE',
    });
    // replace url, because event doesn't exist anymore
    Router.replace('/events');
}
const EditEvent: React.FC<EventDetailProps> = () => {
    const router = useRouter();

    const [event, setEvent] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        // check isReady to prevent query of undefiend https://stackoverflow.com/questions/69412453/next-js-router-query-getting-undefined-on-refreshing-page-but-works-if-you-navi
        if (router.isReady) {
            setLoading(true);
            fetch(`/api/events/${router.query.id}`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    setEvent(data.event);
                    setLoading(false);
                });
        }
    }, [router.isReady, router.query.id]);

    if (isLoading) return <p>Loading...</p>;
    if (!event) return <p>No event detail </p>;
    return (
        <Layout>
            <div>
                <h1>Edit Event</h1>
                <Button
                    variant={'primary'}
                    onClick={() => deleteEvent(event.id)}>
                    Delete event
                </Button>
            </div>
        </Layout>
    );
};

export default EditEvent;
