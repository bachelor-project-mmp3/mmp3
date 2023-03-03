import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Card } from '../../../components/atoms/Card';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Button } from '../../../components/atoms/Button';
import { SmallEventPreview } from '../../../components/organisms/events/SmallEventPreview';
import Location from '../../../public/icons/location.svg';
import Study from '../../../public/icons/major.svg';
import Instagram from '../../../public/icons/insta.svg';

// TODO: maybe load some data before page gets rendered, like session maybe?
/*export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: { },
    };
};*/

const Profile: React.FC = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [profile, setProfile] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        // check isReady to prevent query of undefiend https://stackoverflow.com/questions/69412453/next-js-router-query-getting-undefined-on-refreshing-page-but-works-if-you-navi
        if (router.isReady) {
            setLoading(true);
            fetch(`/api/profile/${router.query.id}`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    setProfile(data.profile);
                    setLoading(false);
                });
        }
    }, [router.isReady, router.query.id]);

    console.log(profile);

    if (isLoading) return <p>Loading...</p>;
    if (!profile) return <p>No profile</p>;

    return (
        <Layout>
            <div>
                <WrapperRow>
                    <WrapperColumn>
                        {profile.image && (
                            <StyledImage
                                src={profile.image}
                                alt="Image"
                                width="300"
                                height="300"
                            />
                        )}
                        <WrapperName>
                            {profile.instagram && (
                                <StyledInsta
                                    onClick={() =>
                                        window.open(
                                            `https://www.instagram.com/${profile.instagram}`
                                        )
                                    }
                                />
                            )}
                            <StyledName>
                                {profile.firstName}
                                <br></br> {profile.lastName}
                            </StyledName>
                        </WrapperName>

                        <StyledMember>
                            member since {getFormattedDate(profile.createdAt)}
                        </StyledMember>
                        <DormitoryAndStudyWrapper>
                            <DormitoryAndStudyRow>
                                <StyledLocation />
                                <p>{profile.dormitory}</p>
                            </DormitoryAndStudyRow>
                            <DormitoryAndStudyRow>
                                <StyledStudy />
                                <p>{profile.study}</p>
                            </DormitoryAndStudyRow>
                        </DormitoryAndStudyWrapper>
                        {profile.interests && (
                            <Card>
                                <StyledAboutMe>A little about me</StyledAboutMe>
                                <p>{profile.interests}</p>
                            </Card>
                        )}

                        {profile.id === session?.user?.userId && (
                            <Button
                                variant="primary"
                                onClick={() =>
                                    router.push(`/profile/${profile.id}/edit`)
                                }>
                                Edit profile
                            </Button>
                        )}
                    </WrapperColumn>
                    <WrapperColumn className="top">
                        <StyledH2>{profile.firstName}s hosted events</StyledH2>
                        <EventsWrapper>
                            {profile.events ? (
                                profile.events.map((event) => (
                                    <>
                                        <EventItem>
                                            <SmallEventPreview
                                                title={event.title}
                                                imageEvent={event.image}
                                                imageHost={profile.image}
                                                onClick={() =>
                                                    router.push(
                                                        `/events/${event.id}`
                                                    )
                                                }
                                                date={
                                                    event.date
                                                }></SmallEventPreview>
                                        </EventItem>
                                    </>
                                ))
                            ) : (
                                <p>No hosted events...</p>
                            )}
                        </EventsWrapper>
                    </WrapperColumn>
                </WrapperRow>
            </div>
        </Layout>
    );
};

export default Profile;

const getFormattedDate = (date: string) => {
    return new Date(date).toLocaleString('en-us', {
        month: 'long',
        year: 'numeric',
    });
};

const WrapperName = styled.div`
    position: relative;
`;

const DormitoryAndStudyWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const WrapperColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 45%;
        min-width: 500px;
    }
    &.top {
        align-self: flex-start;
    }
`;

const WrapperRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-wrap: wrap @media ${(props) => props.theme.breakpoint.tablet} {
        flex-wrap: no-wrap;
    }
`;

const EventsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
`;

const DormitoryAndStudyRow = styled.div`
    gap: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
`;

const StyledImage = styled(Image)`
    border-radius: 100%;
    height: 200;
    widht: 300;
`;

const StyledLocation = styled(Location)`
    height: 25px;
    width: 25px;
`;

const StyledStudy = styled(Study)`
    height: 25px;
    width: 25px;
`;

const StyledInsta = styled(Instagram)`
    height: 32px;
    width: 32px;
    position: absolute;
    right: -60px;
    bottom: 30px;
`;

const StyledName = styled.h1`
    text-align: center;
`;

const StyledH2 = styled.h2`
    align-self: flex-start;
    margin-top: 80px;
`;

const StyledMember = styled.p`
    text-align: center;
    font-size: ${({ theme }) => theme.fonts.mobile.info};
    margin-top: 0;
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 100%;
        font-size: ${({ theme }) => theme.fonts.normal.info};
    }
`;

const StyledAboutMe = styled.p`
    font-weight: 600;
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 100%;
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
    }
`;

const EventItem = styled.div`
    width: 45%;
    height: 170px;
    margin-bottom: 20px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        margin-bottom: 80px;
    }
`;
