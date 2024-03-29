import { RequestStatus } from '.prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Header } from '../../components/organisms/Header';
import { Loading } from '../../components/organisms/Loading';
import InfoPopUp from '../../components/organisms/popups/InfoPopUp';
import Request, {
    RequestProps,
} from '../../components/organisms/requests/Request';
import ActionPopUp from '../../components/organisms/popups/ActionPopUp';
import { useSession } from 'next-auth/react';
import NoRequestsImage from '../../public/images/no requests.svg';
import styled from 'styled-components';
import Head from 'next/head';

const Requests = () => {
    const { data: session } = useSession();
    const [requests, setRequests] = useState(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [showInfoPopOpOnAcceptOrDecline, setShowInfoPopOpOnAcceptOrDecline] =
        useState<undefined | { status: string; name: string; title: string }>();
    const [showInfoPopOpOnLeave, setShowInfoPopOpOnLeave] = useState<
        undefined | string
    >();
    const [showInfoPopUpOnCancel, setShowInfoPopUpOnCancel] = useState(false);
    const [cancelRequest, setCancelRequest] = useState<
        undefined | RequestProps
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
            router.push('/500');
        }
    };

    const onSubmitWithdraw = async (requestId: string) => {
        setLoading(true);

        const res = await fetch(`/api/requests/${requestId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 200) {
            let updatedRequests = requests.filter(
                (request) => request.id !== requestId
            );

            setRequests(updatedRequests);
            setLoading(false);
            if (cancelRequest?.Event.host.id !== session?.user.userId)
                setShowInfoPopOpOnLeave(
                    'Your request was deleted successfully.'
                );
            else {
                setShowInfoPopOpOnLeave(
                    `${cancelRequest?.User.firstName} got deleted from the event.`
                );
                setCancelRequest(undefined);
            }
        } else {
            router.push('/500');
        }
    };

    if (isLoading) return <Loading />;

    return (
        <>
            <Head>
                <title>{`Studentenfutter - Requests`}</title>
            </Head>
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

            {showInfoPopOpOnLeave && (
                <InfoPopUp onClose={() => setShowInfoPopOpOnLeave(undefined)}>
                    {showInfoPopOpOnLeave}
                </InfoPopUp>
            )}

            {showInfoPopUpOnCancel && (
                <ActionPopUp
                    onClose={() => setShowInfoPopUpOnCancel(false)}
                    onAction={() => {
                        onSubmitWithdraw(cancelRequest.id).then(() =>
                            setShowInfoPopUpOnCancel(false)
                        );
                    }}
                    textButtonAction={'Delete'}
                    textButtonClose={'Cancel'}>
                    Are your sure you want to delete{' '}
                    {cancelRequest.User.firstName} from{' '}
                    <strong>{cancelRequest.Event.title}</strong>?
                </ActionPopUp>
            )}

            <Layout>
                <StyledHeading>Requests</StyledHeading>
                <div>
                    {requests?.length > 0 ? (
                        requests.map((request) => (
                            <Request
                                key={`request-${request.id}`}
                                request={request}
                                onSubmitAccept={() =>
                                    onSubmit(request.id, RequestStatus.ACCEPTED)
                                }
                                onSubmitDecline={() =>
                                    onSubmit(request.id, RequestStatus.DECLINED)
                                }
                                onSubmitWithdraw={() => {
                                    if (
                                        session?.user?.userId ===
                                        request.Event.host.id
                                    ) {
                                        setShowInfoPopUpOnCancel(true);
                                        setCancelRequest(request);
                                    } else {
                                        onSubmitWithdraw(request.id);
                                    }
                                }}
                            />
                        ))
                    ) : (
                        <EmptyRequests>
                            <StyledNoRequestsImage />
                            <div>You have no requests</div>
                        </EmptyRequests>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Requests;

const EmptyRequests = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    font-size: ${({ theme }) => theme.fonts.mobile.headline4};

    @media ${(props) => props.theme.breakpoint.tablet} {
        width: fit-content;
    }
`;

const StyledNoRequestsImage = styled(NoRequestsImage)`
    width: 80vw;
    max-width: 400px;
`;

const StyledHeading = styled.h1`
    font-size: ${({ theme }) => theme.fonts.mobile.headline3};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.headline3};
    }
    font-weight: 800;
    margin-bottom: 10px;
    margin-top: 30px;
`;
