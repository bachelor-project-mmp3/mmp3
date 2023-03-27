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

const Events = () => {
    const [events, setEvents] = useState(null);
    const [filterCampus, setFilterCampus] = useState<string | undefined>();
    const [isLoading, setLoading] = useState(true);
    const [showInfoPopOpOnJoin, setShowInfoPopOpOnJoin] = useState<
        undefined | string
    >();
    const [showInfoPopOpOnLeave, setShowInfoPopOpOnLeave] =
        useState<boolean>(false);

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

    const onSubmitLeave = async (requestId: string, eventId: string) => {
        setLoading(true);

        const res = await fetch(`/api/requests/${requestId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 200) {
            let updatedEvents = events.filter((event) => event.id !== eventId);

            setEvents(updatedEvents);
            setLoading(false);
            setShowInfoPopOpOnLeave(true);
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
        fetch(`/api/events?dormitoryFilter=${filter}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setEvents(data.events);
                setLoading(false);
            });
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
                <InfoPopUp onClose={() => setShowInfoPopOpOnLeave(false)}>
                    Your Request was deleted successfully.
                </InfoPopUp>
            )}

            {showInfoPopOpOnLeave && (
                <InfoPopUp onClose={() => setShowInfoPopOpOnLeave(false)}>
                    Your Request was deleted successfully.
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
`;

const StyledNoEventsImage = styled(NoEventsImage)``;
