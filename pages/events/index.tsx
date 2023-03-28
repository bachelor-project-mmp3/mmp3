import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import ExtendedEventPreview from '../../components/organisms/events/ExtendedEventPreview';
import { useRouter } from 'next/router';
import { Header } from '../../components/organisms/Header';
import { Loading } from '../../components/organisms/Loading';
import InfoPopUp from '../../components/organisms/popups/InfoPopUp';
import Link from 'next/link';
import FilterCampus from '../../components/organisms/filter/FilterCampus';
import NoEventsImage from '../../public/images/no-events.svg';
import FilterDate from '../../components/organisms/filter/FilterDate';

const Events = () => {
    const [events, setEvents] = useState(null);
    const [filterCampus, setFilterCampus] = useState<string | undefined>();
    const [filterDate, setFilterDate] = useState<string | undefined>();
    const [isLoading, setLoading] = useState(true);
    const [showInfoPopOpOnJoin, setShowInfoPopOpOnJoin] = useState<
        undefined | string
    >();
    const [showInfoPopOpOnLeave, setShowInfoPopOpOnLeave] = useState<
        string | undefined
    >();

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
                setLoading(false);
                setShowInfoPopOpOnJoin(joinedEvent.title);
            });
        } else {
            router.push('/404');
        }
    };

    const onSubmitLeave = async (
        requestId: string,
        eventId: string,
        type: 'leave' | 'withdraw'
    ) => {
        setLoading(true);

        const res = await fetch(`/api/requests/${requestId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 200) {
            res.json().then((updatedEvent) => {
                let updatedEvents = events.map((event) =>
                    event.id === updatedEvent.id ? updatedEvent : event
                );

                setEvents(updatedEvents);
                setLoading(false);
                if (type === 'leave') {
                    setShowInfoPopOpOnLeave('You left the event.');
                } else {
                    setShowInfoPopOpOnLeave(
                        'Your Request was deleted successfully.'
                    );
                }
            });
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

    const onFilterEvents = async (filter: string) => {
        setLoading(true);
        setFilterCampus(filter);

        const res = await fetch(
            `/api/events?dormitoryFilter=${filter}&dateFilter=${filterDate}`,
            {
                method: 'GET',
            }
        );
        if (res.status < 300) {
            res.json().then((data) => {
                setEvents(data.events);
                setLoading(false);
            });
        } else {
            router.push('/404');
        }
    };

    const onFilterDate = async (filter: string) => {
        setLoading(true);
        setFilterDate(filter);
        const res = await fetch(
            `/api/events?dateFilter=${filter}&dormitoryFilter=${filterCampus}`,
            {
                method: 'GET',
            }
        );

        if (res.status < 300) {
            res.json().then((data) => {
                setEvents(data.events);
                setLoading(false);
            });
        } else {
            router.push('/404');
        }
    };

    if (isLoading) return <Loading />;
    if (!events) return <p>No events </p>;

    return (
        <>
            {showInfoPopOpOnJoin && (
                <InfoPopUp onClose={() => setShowInfoPopOpOnJoin(undefined)}>
                    Your Request to join <strong>{showInfoPopOpOnJoin}</strong>{' '}
                    was successfully sent. Check your{' '}
                    <strong>
                        <Link href="/requests">requests</Link>
                    </strong>{' '}
                    or FH mails to stay up to date!
                </InfoPopUp>
            )}

            {showInfoPopOpOnLeave && (
                <InfoPopUp onClose={() => setShowInfoPopOpOnLeave(undefined)}>
                    {showInfoPopOpOnLeave}
                </InfoPopUp>
            )}

            <Layout>
                <Header>Find an event to join</Header>
                <FilterBar>
                    <FilterCampus
                        onSubmit={onFilterEvents}
                        currentFilter={filterCampus}>
                        {filterCampus ?? 'Any campus'}
                    </FilterCampus>
                    <FilterDate
                        onSubmit={onFilterDate}
                        currentFilter={filterDate}>
                        {filterDate ?? 'Any date'}
                    </FilterDate>
                </FilterBar>
                <EventsList>
                    {events &&
                        events.map((event) => (
                            <ExtendedEventPreview
                                key={event.id}
                                event={event}
                                onSubmitJoin={onSubmitJoin}
                                onSubmitLeave={onSubmitLeave}
                            />
                        ))}
                    {events?.length === 0 && (
                        <EmptyEventsList>
                            <StyledNoEventsImage />
                            <div>There are no events available</div>
                        </EmptyEventsList>
                    )}
                </EventsList>
            </Layout>
        </>
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

const EmptyEventsList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    font-size: ${({ theme }) => theme.fonts.mobile.headline4};
`;

const FilterBar = styled.div`
    margin-bottom: 40px;
    display: flex;
    gap: 20px;
`;

const StyledNoEventsImage = styled(NoEventsImage)``;
