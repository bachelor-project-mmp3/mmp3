import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import ExtendedEventPreview from '../../components/organisms/events/ExtendedEventPreview';
import { useRouter } from 'next/router';
import { Header } from '../../components/organisms/Header';
import { Loading } from '../../components/organisms/Loading';

const Events = () => {
    const [events, setEvents] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const router = useRouter();

    const onSubmitJoin = async (eventId: string, userId: string) => {
        setLoading(true);
        const data = {
            eventId: eventId,
            userId: userId,
        };

        const res = await fetch('/api/requests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (res.status < 300) {
            res.json().then((joinedEvent) => {
                let updatedEvents = events.map((event) =>
                    event.id === joinedEvent.id ? joinedEvent : event
                );

                setEvents(updatedEvents);
            });
            setLoading(false);
            //TODO show dialog
        } else {
            router.push('/404');
        }
    };

    useEffect(() => {
        fetch('/api/events', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setEvents(data.events);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <Loading />;
    if (!events) return <p>No events </p>;

    return (
        <Layout>
            <Header>Find an event to join</Header>
            <EventsList>
                {events &&
                    events.map((event) => (
                        <ExtendedEventPreview
                            key={event.id}
                            event={event}
                            onSubmitJoin={onSubmitJoin}
                        />
                    ))}
            </EventsList>
        </Layout>
    );
};

export default Events;

const EventsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: auto;

    @media ${(props) => props.theme.breakpoint.tablet} {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        max-width: 1500px;
    }
`;
