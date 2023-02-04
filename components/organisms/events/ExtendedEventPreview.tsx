import React from 'react';
import { useRouter } from 'next/router';

export type EventProps = {
    id: string;
    title: string;
    info?: string;
    host: {
        firstName: string;
        email: string;
    } | null;
};

const ExtendedEventPreview: React.FC<{ event: EventProps }> = ({ event }) => {
    const router = useRouter();

    const hostName = event?.host.firstName
        ? event?.host.firstName
        : 'Unknown host';
    return (
        <div onClick={() => router.push(`/events/${event.id}`)}>
            <h2>{event.title}</h2>
            <small>Host: {hostName}</small>
            {event.info && <div>Info: {event.info}</div>}
            <style jsx>{`
                div {
                    color: inherit;
                    padding: 2rem;
                }
            `}</style>
        </div>
    );
};

export default ExtendedEventPreview;
