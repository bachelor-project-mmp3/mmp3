import { RequestStatus } from '.prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { Header } from '../../components/organisms/Header';
import { Loading } from '../../components/organisms/Loading';
import InfoPopUp from '../../components/organisms/popups/InfoPopUp';
import Request from '../../components/organisms/requests/Request';

const Requests = () => {
    const [requests, setRequests] = React.useState(null);
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [showInfoPopOpOnAcceptOrDecline, setShowInfoPopOpOnAcceptOrDecline] =
        React.useState<
            undefined | { status: string; name: string; title: string }
        >();

    const router = useRouter();

    useEffect(() => {
        fetch('/api/requests', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setRequests(data.requests);
                setLoading(false);
            });
    }, []);

    const onSubmit = async (requestId: string, status: RequestStatus) => {
        setLoading(true);
        const data = {
            status,
        };

        const res = await fetch(`/api/requests/${requestId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (res.status < 300) {
            res.json().then((updatedRequest) => {
                let updatedRequests = requests.map((request) =>
                    request.id === updatedRequest.id ? updatedRequest : request
                );

                setRequests(updatedRequests);
                setLoading(false);
                setShowInfoPopOpOnAcceptOrDecline({
                    status: data.status.toLocaleLowerCase(),
                    name: updatedRequest.User.firstName,
                    title: updatedRequest.Event.title,
                });
            });
        } else {
            router.push('/404');
        }
    };

    if (isLoading) return <Loading />;
    if (!requests) return <p>No requests </p>;
    return (
        <>
            {showInfoPopOpOnAcceptOrDecline && (
                <InfoPopUp
                    onClose={() =>
                        setShowInfoPopOpOnAcceptOrDecline(undefined)
                    }>
                    You {showInfoPopOpOnAcceptOrDecline.status} the request from{' '}
                    {showInfoPopOpOnAcceptOrDecline.name} to join{' '}
                    <strong>{showInfoPopOpOnAcceptOrDecline.title}</strong>. An
                    email was sent to {showInfoPopOpOnAcceptOrDecline.name}.
                </InfoPopUp>
            )}

            <Layout>
                <Header backButton>Invitations</Header>
                <div>
                    {requests &&
                        requests.map((request) => (
                            <Request
                                key={request.id}
                                request={request}
                                onSubmitAccept={() =>
                                    onSubmit(request.id, RequestStatus.ACCEPTED)
                                }
                                onSubmitDecline={() =>
                                    onSubmit(request.id, RequestStatus.DECLINED)
                                }
                            />
                        ))}
                </div>
            </Layout>
        </>
    );
};

export default Requests;
