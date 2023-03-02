import { RequestStatus } from '.prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import Request from '../../components/organisms/requests/Request';

const Requests: React.FC = () => {
    const [requests, setRequests] = React.useState(null);
    const [isLoading, setLoading] = React.useState<boolean>(false);

    // TODO after accept a refresh is needed! maybe a better solution?
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        fetch('/api/requests', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setRequests(data.requests);
                console.log(data.requests);

                setLoading(false);
            });
    }, []);

    const onSubmitAccept = async (requestId: string) => {
        const data = {
            status: RequestStatus.ACCEPTED,
        };

        // TODO: guest receices email

        const res = await fetch(`/api/requests/${requestId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (res.status < 300) {
            setLoading(true);
            router.reload();
        } else {
            router.push('/404');
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (!requests) return <p>No requests </p>;
    return (
        <Layout>
            <h1>Requests</h1>
            <div>
                {requests &&
                    requests.map((request) => (
                        <Request
                            key={request.id}
                            request={request}
                            onSubmitAccept={() => onSubmitAccept(request.id)}
                        />
                    ))}
            </div>
        </Layout>
    );
};

export default Requests;
