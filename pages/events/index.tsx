import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import ExtendedEventPreview, {
    EventProps,
} from '../../components/organisms/events/ExtendedEventPreview';

// TODO: maybe load some data before page gets rendered, like session maybe?
/*export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: { },
    };
};*/

type Props = {
    events: EventProps[];
};

const Events: React.FC<Props> = () => {
    const [events, setEvents] = useState(null);
    const [isLoading, setLoading] = useState(false);

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
            <div className="page">
                <h1>Events</h1>
                <main>
                    {events &&
                        events.map((event) => (
                            <div key={event.id} className="post">
                                <ExtendedEventPreview event={event} />
                            </div>
                        ))}
                </main>
            </div>
            <style jsx>{`
                .post {
                    background: white;
                    transition: box-shadow 0.1s ease-in;
                }

                .post:hover {
                    box-shadow: 1px 1px 3px #aaa;
                }

                .post + .post {
                    margin-top: 2rem;
                }
            `}</style>
        </Layout>
    );
};

export default Events;
