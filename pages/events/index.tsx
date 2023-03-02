import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import ExtendedEventPreview, {
    EventProps,
} from '../../components/organisms/events/ExtendedEventPreview';

type Props = {
    events: EventProps[];
};

const Events: React.FC<Props> = () => {
    const [events, setEvents] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const router = useRouter();

    const onSubmitJoin = async (eventId: string, userId: string) => {
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
            setLoading(true);
            router.replace(router.asPath);
            router.reload();
        } else {
            router.push('/404');
        }
    };

    useEffect(() => {
        setLoading(true);
        fetch('/api/events', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setEvents(data.events);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!events) return <p>No events </p>;

    return (
        <Layout>
            <div>
                <h1>Events</h1>
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
            </div>
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
