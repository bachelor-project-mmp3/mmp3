import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { Loading } from '../../components/organisms/Loading';
import InfoPopUp from '../../components/organisms/popups/InfoPopUp';
import Link from 'next/link';
import FilterCampus from '../../components/organisms/filter/FilterCampus';
import NoEventsImage from '../../public/images/no-events.svg';
import FilterDate from '../../components/organisms/filter/FilterDate';
import SortByDate, {
    sortOptions,
} from '../../components/organisms/filter/SortByDate';
import ExtendedEventPreview from '../../components/organisms/events/ExtendedEventPreview';
import Head from 'next/head';
import Pagination from '../../components/organisms/Pagination';

const Events = () => {
    const [events, setEvents] = useState(null);
    const [filterCampus, setFilterCampus] = useState<string | undefined>();
    const [filterDate, setFilterDate] = useState<string | undefined>();
    const [sortByDate, setSortByDate] =
        useState<(typeof sortOptions)[number]>('Sort by event date');
    const [isLoading, setLoading] = useState(true);
    const [showInfoPopOpOnJoin, setShowInfoPopOpOnJoin] = useState<
        undefined | string
    >();
    const [showInfoPopOpOnLeave, setShowInfoPopOpOnLeave] = useState<
        string | undefined
    >();
    const [pageIndex, setPageIndex] = useState(1);
    const [pageCount, setPageCount] = useState(1);

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
            router.push('/500');
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
                let updatedEvents = events?.map((event) =>
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
            router.push('/500');
        }
    };

    useEffect(() => {
        setLoading(true);
        fetch(
            `/api/events?dormitoryFilter=${filterCampus}&dateFilter=${filterDate}&sortByDate=${sortByDate}&page=${pageIndex}`,
            {
                method: 'GET',
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setEvents(data.events);
                setPageCount(data.pageCount);
                setLoading(false);
            });
    }, [pageIndex]);

    const onFilterEvents = async (filter: string) => {
        setLoading(true);
        setFilterCampus(filter);
        setPageIndex(1);

        const res = await fetch(
            `/api/events?dormitoryFilter=${filter}&dateFilter=${filterDate}&sortByDate=${sortByDate}&page=1`,
            {
                method: 'GET',
            }
        );
        if (res.status < 300) {
            res.json().then((data) => {
                setEvents(data.events);
                setPageCount(data.pageCount);
                setLoading(false);
            });
        } else {
            router.push('/500');
        }
    };

    const onFilterDate = async (filter: string) => {
        setLoading(true);
        setFilterDate(filter);
        setPageIndex(1);
        const res = await fetch(
            `/api/events?dateFilter=${filter}&dormitoryFilter=${filterCampus}&sortByDate=${sortByDate}&page=1`,
            {
                method: 'GET',
            }
        );

        if (res.status < 300) {
            res.json().then((data) => {
                setEvents(data.events);
                setPageCount(data.pageCount);
                setLoading(false);
            });
        } else {
            router.push('/500');
        }
    };

    const onSortDate = async (sort: string) => {
        setLoading(true);
        setSortByDate(sort);
        setPageIndex(1);
        const res = await fetch(
            `/api/events?dateFilter=${filterDate}&dormitoryFilter=${filterCampus}&sortByDate=${sort}&page=1`,
            {
                method: 'GET',
            }
        );

        if (res.status < 300) {
            res.json().then((data) => {
                setEvents(data.events);
                setPageCount(data.pageCount);
                setLoading(false);
            });
        } else {
            router.push('/500');
        }
    };

    const onResetFilter = async () => {
        setLoading(true);
        setSortByDate('Sort by event date');
        setFilterCampus(undefined);
        setFilterDate(undefined);
        setPageIndex(1);
        const res = await fetch(
            `/api/events?dateFilter=undefined&dormitoryFilter=undefined&sortByDate=Sort by event date&page=1`,
            {
                method: 'GET',
            }
        );

        if (res.status < 300) {
            res.json().then((data) => {
                setEvents(data.events);
                setPageCount(data.pageCount);
                setLoading(false);
            });
        } else {
            router.push('/500');
        }
    };

    if (isLoading) return <Loading />;
    const showResetFilter =
        sortByDate !== 'Sort by event date' ||
        filterCampus !== undefined ||
        filterDate !== undefined;

    return (
        <>
            <Head>
                <title>{'Studentenfutter - Events feed'}</title>
            </Head>
            {showInfoPopOpOnJoin && (
                <InfoPopUp onClose={() => setShowInfoPopOpOnJoin(undefined)}>
                    Your request to join <strong>{showInfoPopOpOnJoin}</strong>{' '}
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
                <StyledHeading>Find an event to join</StyledHeading>
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
                    <SortByDate onSubmit={onSortDate} currentSort={sortByDate}>
                        {sortByDate ?? 'Any date'}
                    </SortByDate>
                    {showResetFilter && (
                        <Reset onClick={() => onResetFilter()}>Reset</Reset>
                    )}
                </FilterBar>
                <EventsList>
                    {events &&
                        events.map((event) => (
                            <ExtendedEventPreview
                                key={`extendedEventPreview-${event.id}`}
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
                {events?.length > 0 && (
                    <Pagination
                        eventsPageIndex={pageIndex}
                        eventsPageCount={pageCount}
                        setEventsPageIndex={setPageIndex}
                    />
                )}
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
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
`;

const Reset = styled.div`
    cursor: pointer;
    padding: 0 10px;
    :hover {
        color: ${({ theme }) => theme.hoverPrimary};
    }
`;

const StyledNoEventsImage = styled(NoEventsImage)``;

const StyledHeading = styled.h1`
    font-size: ${({ theme }) => theme.fonts.mobile.headline3};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.headline3};
    }
    font-weight: 800;
    margin-bottom: 10px;
    margin-top: 30px;
`;
