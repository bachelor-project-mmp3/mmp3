import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import { Head } from '../../../components/organisms/Head';

// TODO: maybe load some data before page gets rendered, like session maybe?
/*export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: { },
    };
};*/

export type EventProps = {
    id: string;
    title: string;
    info?: string;
    host: {
        firstName: string;
        email: string;
    } | null;
    menu: {
        id: string;
        title: string;
        description?: string;
        link?: string;
    }[];
};

export interface EventDetailProps {
    event: EventProps;
}

const EventDetail: React.FC<EventDetailProps> = () => {
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
            <Head backButton>{event.title}</Head>
            <p>Host: {event.host?.firstName}</p>
            <p>Infos: {event.info}</p>
            {event.menu.map((dish, index) => (
                <div key={dish.id} className="dish">
                    <>
                        <p>{index + 1}. Gang</p>
                        <p>Titel:{dish.title}</p>
                        {dish.description && (
                            <p>Beschreibung: {dish.description}</p>
                        )}
                        {dish.link && <p>Link: {dish.link}</p>}
                    </>
                </div>
            ))}
        </Layout>
    );
};

export default EventDetail;
