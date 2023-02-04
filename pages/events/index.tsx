import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';
import ExtendedEventPreview, {
    EventProps,
} from '../../components/organisms/events/ExtendedEventPreview';

export const getServerSideProps: GetServerSideProps = async () => {
    const events = await prisma.event.findMany({
        include: {
            host: {
                select: { firstName: true },
            },
        },
    });
    return {
        props: { events: JSON.parse(JSON.stringify(events)) },
    };
};

type Props = {
    events: EventProps[];
};

const Events: React.FC<Props> = (props) => {
    return (
        <Layout>
            <div className="page">
                <h1>Events</h1>
                <main>
                    {props.events &&
                        props.events.map((event) => (
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
