import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import Router, { useRouter } from 'next/router';
import { Button } from '../../../components/atoms/Button';
import { Header } from '../../../components/organisms/Header';

async function deleteEvent(id: string): Promise<void> {
    await fetch(`/api/events/${id}`, {
        method: 'DELETE',
    });
    // replace url, because event doesn't exist anymore
    Router.replace('/events');
}

type EventDetailProps = {
    id: string;
    title: string;
    info?: string;
    timeLimit: string;
    date: string;
    costs: number;
    currentParticipants: number;
    capacity: number;
    host: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        dormitory: string;
        roomNumber: string;
        image?: string;
        phone?: string;
    } | null;
    menu: Array<{
        title: string;
        link: string;
        description: string;
        id: string;
    }> | null;
    requests: Array<{
        info: string;
        eventId: string;
        userId: string;
        User: {
            firstName: string;
            lastName: string;
            image: string;
        } | null;
        id: string;
        status: string;
    }> | null;
};
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
            <Header backButton>Edit event</Header>
            <Button variant={'primary'} onClick={() => deleteEvent(event.id)}>
                Delete event
            </Button>
        </Layout>
    );
};

export default EditEvent;
