import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export type EventProps = {
    id: string;
    title: string;
    info?: string;
    host: {
        firstName: string;
        lastName: string;
        email: string;
        image?: string;
    } | null;
    menu: Array<{
        title: string;
        link: string;
        description: string;
        id: string;
    }> | null;
};

const getTimeLeftToJoin = (timeLimit: string) => {
    const today = new Date();
    console.log('now', today.toISOString());
    const timeLimitDate = new Date(timeLimit);
    const leftTimeToJoin = timeLimitDate.getTime() - today.getTime();
    const differenceInDays = Math.floor(leftTimeToJoin / (1000 * 3600 * 24));
    if (differenceInDays < 1) {
        const differenceInHours = leftTimeToJoin / (1000 * 3600);

        if (differenceInHours < 1) {
            return '< 1 hour left to apply';
        }

        return Math.floor(differenceInHours) + ' hours left to apply';
    }
    return differenceInDays + ' days left to apply';
};

const getFormattedDate = (date: string) => {
    let formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-US');
};

const getFormattedTime = (date: string) => {
    let formattedTime = new Date(date);
    return formattedTime.toLocaleTimeString('en-US');
};

const ExtendedEventPreview: React.FC<{ event: EventProps }> = ({ event }) => {
    const router = useRouter();

    const hostName = event?.host.firstName
        ? event?.host.firstName + ' ' + event?.host.lastName
        : 'Unknown host';

    const timeLimit = getTimeLeftToJoin(event.timeLimit);

    const date = getFormattedDate(event.date);
    const time = getFormattedTime(event.date);

    return (
        <div onClick={() => router.push(`/events/${event.id}`)}>
            <h2>{event.title}</h2>
            <span>{date}</span>
            <p>{time}</p>
            <p>{timeLimit}</p>
            <p>
                {event.currentParticipants}/{event.capacity} seats taken
            </p>
            {event.host.image && (
                <Image
                    src={event.host.image}
                    alt="Image"
                    width="100"
                    height="100"
                />
            )}
            <small>Host: {hostName}</small>
            <p>{event.costs} &#8364;</p>
            {event.menu?.map((dish) => (
                <span key={dish.id} className="dish">
                    {dish.title}
                </span>
            ))}
        </div>
    );
};

export default ExtendedEventPreview;
