import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { Card } from '../../../components/atoms/Card';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Button } from '../../../components/atoms/Button';
import { SmallEventPreview } from '../../../components/organisms/events/SmallEventPreview';
import Location from '../../../public/icons/location.svg';
import Study from '../../../public/icons/major.svg';
import Phone from '../../../public/icons/phone_filled.svg';
import Instagram from '../../../public/icons/insta.svg';
import Burger from '../../../public/icons/burger_menu.svg';
import Link from 'next/link';
import { Loading } from '../../../components/organisms/Loading';
import { Header } from '../../../components/organisms/Header';
import FilterIcon from '../../../public/icons/goBack.svg';
import Head from 'next/head';

const Profile = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [profile, setProfile] = useState(null);
    const [events, setEvents] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [isLoading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // check isReady to prevent query of undefiend https://stackoverflow.com/questions/69412453/next-js-router-query-getting-undefined-on-refreshing-page-but-works-if-you-navi
        if (router.isReady) {
            fetch(`/api/profile/${router.query.id}?page=${pageIndex}`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    setProfile(data.profile);
                    setEvents(data.profile.events);
                    setPageCount(data.pageCount);
                    setLoading(false);
                });
        }
    }, [router.isReady, router.query.id, pageIndex]);

    if (isLoading) return <Loading />;

    return (
        <>
            <Head>
                <title>{`Studentenfutter - ${profile.firstName} ${profile.lastName}`}</title>
            </Head>
            <Layout>
                <div>
                    {session?.user.userId == profile.id && (
                        <StyledBurger
                            onClick={() =>
                                setIsMenuOpen(isMenuOpen ? false : true)
                            }
                        />
                    )}
                    {session?.user.userId !== profile.id && <Header />}

                    {isMenuOpen && (
                        <>
                            <FakeBlur onClick={() => setIsMenuOpen(false)} />
                            <MenuMobile>
                                <NavItemsWrapper>
                                    <StyledNavItem
                                        href={`/profile/${profile.id}/edit`}>
                                        Edit Profile
                                    </StyledNavItem>
                                    <StyledLine />
                                    <StyledNavItem href="/privacy">
                                        Data privacy
                                    </StyledNavItem>
                                    <StyledLine />
                                    <StyledNavItem href="/imprint">
                                        Imprint
                                    </StyledNavItem>
                                    <StyledLine />
                                    <LogoutWrapper
                                        onClick={() =>
                                            signOut({ callbackUrl: '/' })
                                        }>
                                        {profile.image && (
                                            <StyledImageLogout
                                                src={profile.image}
                                                alt="Image"
                                                width="300"
                                                height="300"
                                            />
                                        )}
                                        <StyledLogout>Logout</StyledLogout>
                                    </LogoutWrapper>
                                    <StyledLine />
                                </NavItemsWrapper>
                            </MenuMobile>
                        </>
                    )}
                    <WrapperRow>
                        <WrapperColumn>
                            {profile.image && (
                                <ProfileImage>
                                    <StyledImage
                                        src={profile.image}
                                        alt="Image"
                                        width="300"
                                        height="300"
                                    />
                                </ProfileImage>
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
                                member since{' '}
                                {getFormattedDate(profile.createdAt)}
                            </StyledMember>
                            <InfoWrapper>
                                <InfoRow>
                                    <StyledLocation />
                                    {profile.id === session?.user?.userId ? (
                                        <p>
                                            {profile.dormitory}
                                            {', No.'}
                                            {profile.roomNumber}
                                        </p>
                                    ) : (
                                        <p>{profile.dormitory}</p>
                                    )}
                                </InfoRow>
                                <InfoRow>
                                    <StyledStudy />
                                    <p>{profile.study}</p>
                                </InfoRow>
                                {profile.id === session?.user?.userId &&
                                    profile.phone && (
                                        <InfoRow>
                                            <StyledPhone />
                                            <p>{profile.phone}</p>
                                        </InfoRow>
                                    )}
                            </InfoWrapper>
                            {profile.interests && (
                                <>
                                    <FakeGreenBackgroundWrapper>
                                        <Card
                                            width="100%"
                                            variant="description"
                                            margin="0px">
                                            <StyledAboutMeHeadline>
                                                A little about me
                                            </StyledAboutMeHeadline>
                                            <StyledAboutMeText>
                                                {profile.interests}
                                            </StyledAboutMeText>
                                        </Card>
                                        <FakeGreenBackground />
                                    </FakeGreenBackgroundWrapper>
                                </>
                            )}

                            {profile.id === session?.user?.userId && (
                                <ButtonWrapper>
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            router.push(
                                                `/profile/${profile.id}/edit`
                                            )
                                        }>
                                        Edit profile
                                    </Button>
                                </ButtonWrapper>
                            )}
                        </WrapperColumn>
                        {events?.length > 0 && (
                            <WrapperColumn className="top">
                                <StyledH2>
                                    {profile.firstName}&apos;s hosted events
                                </StyledH2>
                                <EventsWrapper>
                                    {events.map((event) => (
                                        <EventItem
                                            key={`hosted-event-${event.id}`}>
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
                                    ))}
                                </EventsWrapper>

                                <Pagination>
                                    <PaginationAction
                                        onClick={
                                            pageIndex !== 1
                                                ? () => {
                                                      setPageIndex(
                                                          pageIndex - 1
                                                      );
                                                  }
                                                : null
                                        }
                                        disabled={pageIndex === 1}>
                                        <StyledFilterIcon option="prev" />
                                        Prev
                                    </PaginationAction>
                                    <PaginationPageCount>{`${pageIndex}/${pageCount}`}</PaginationPageCount>
                                    <PaginationAction
                                        onClick={
                                            pageIndex !== pageCount
                                                ? () => {
                                                      setPageIndex(
                                                          pageIndex + 1
                                                      );
                                                  }
                                                : null
                                        }
                                        disabled={pageIndex === pageCount}>
                                        Next
                                        <StyledFilterIcon option="next" />
                                    </PaginationAction>
                                </Pagination>
                            </WrapperColumn>
                        )}
                    </WrapperRow>
                </div>
            </Layout>
        </>
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

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: ${({ theme }) => theme.backgroundLightGreen};
    align-items: center;
    padding-bottom: 50px;
    border-bottom-right-radius: 40px;
    border-bottom-left-radius: 40px;
`;

const WrapperColumn = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: start;
    width: 100%;
    :nth-child(2) {
        margin-top: 40px;
    }
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 45%;
        min-width: 500px;
        :nth-child(2) {
            margin-top: 60px;
        }
        @media ${(props) => props.theme.breakpoint.tablet} {
            :nth-child(2) {
                margin-top: 0px;
            }
        }
    }
    &.top {
        align-self: flex-start;
    }
    :first-child {
        &:before {
            content: '';
            width: 100%;
            height: 350px;
            border-top-right-radius: 40px;
            border-top-left-radius: 40px;
            background: ${({ theme }) => theme.backgroundLightGreen};
            position: absolute;
            top: 150px;
            z-index: -1;
        }
    }
`;

const WrapperRow = styled.div`
    margin: 50px 0 80px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    @media ${(props) => props.theme.breakpoint.tablet} {
        flex-wrap: no-wrap;
    }
`;

const EventsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    row-gap: 20px;
    width: 100%;
`;

const InfoRow = styled.div`
    gap: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    min-width: 250px;
`;

const StyledImage = styled(Image)`
    border-radius: 100%;
    object-fit: cover;
`;

const StyledLocation = styled(Location)`
    height: 22px;
    width: 25px;
`;

const StyledStudy = styled(Study)`
    height: 25px;
    width: 25px;
`;

const StyledPhone = styled(Phone)`
    height: 19px;
    width: 25px;
`;

const StyledInsta = styled(Instagram)`
    height: 32px;
    width: 32px;
    position: absolute;
    right: -60px;
    bottom: 30px;
    cursor: pointer;
    @media ${(props) => props.theme.breakpoint.tablet} {
        bottom: 35px;
    }
`;

const StyledName = styled.h1`
    text-align: center;
`;

const StyledH2 = styled.h2`
    align-self: flex-start;
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

const StyledAboutMeHeadline = styled.p`
    font-weight: 800;
    margin-top: 0;
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 100%;
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
    }
`;

const StyledAboutMeText = styled.p`
    margin-bottom: 0;
`;

const EventItem = styled.div`
    width: 45%;
    height: 170px;
    margin-bottom: 20px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        margin-bottom: 80px;
    }
`;

const StyledBurger = styled(Burger)`
    position: absolute;
    right: 20px;
    top: 35px px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        display: none;
    }
`;

const MenuMobile = styled.div`
    box-shadow: 0 -15px 40px -10px ${({ theme }) => theme.darkGrey};
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
    background: white;
    width: 100vw;
    height: 50vh;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    padding-top: 50px;
    gap: 30px;
`;

const StyledNavItem = styled(Link)`
    text-decoration: none;
    padding-left: 50px;
`;
const NavItemsWrapper = styled.div`
    gap: 15px;
    display: flex;
    flex-direction: column;
`;
const StyledLogout = styled.p`
    margin-top: 0;
    margin-bottom: 0;
`;

const StyledLine = styled.div`
    background: ${({ theme }) => theme.lightGrey};
    height: 2px;
`;

const LogoutWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding-left: 50px;
    align-items: center;
    gap: 15px;
`;

const StyledImageLogout = styled(Image)`
    border-radius: 50%;
    width: 38px;
    height: 38px;
    object-fit: cover;
`;

const FakeBlur = styled.div`
    z-index: 110;
    position: fixed;
    backdrop-filter: blur(3px);
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
`;

const ButtonWrapper = styled.div`
    margin-top: 30px;
    position: fixed;
    z-index: 1;
    bottom: 100px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        bottom: 40px;
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
    }
`;

const ProfileImage = styled.div`
    position: relative;
    border-radius: 50%;
    width: 300px;
    height: 300px;
    background: white;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    font-weight: bold;
    margin-top: 20px;
    font-size: ${({ theme }) => theme.fonts.mobile.paragraph};

    @media ${({ theme }) => theme.breakpoint.tablet} {
        justify-content: flex-start;
        margin-left: 10px;
        font-size: ${({ theme }) => theme.fonts.normal.paragraph};
        gap: 30px;
    }
`;

interface PaginationIconProps {
    disabled: boolean;
    option: 'prev' | 'next';
}

interface PaginationActionProps {
    disabled: boolean;
}

const StyledFilterIcon = styled(FilterIcon)<PaginationIconProps>`
    height: 16px;
    width: 16px;

    transform: ${(props) =>
        props.option === 'prev' ? 'rotate(0deg)' : 'rotate(180deg)'};

    @media ${({ theme }) => theme.breakpoint.tablet} {
        height: 20px;
        width: 20px;
    }
`;

const PaginationAction = styled.div<PaginationActionProps>`
    display: flex;
    align-items: center;
    color: ${(props) => `${props.theme.primary}`};
    cursor: pointer;

    ${(props) =>
        !props.disabled &&
        `
        :hover {
            color: ${props.theme.hoverPrimary};
        }
    `}
    ${(props) =>
        props.disabled &&
        `
        color: ${props.theme.midGrey};
        cursor: auto;
    `}
`;

const PaginationPageCount = styled.div``;

const FakeGreenBackgroundWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const FakeGreenBackground = styled.div`
    content: '';
    height: 80px;
    width: 100%;
    left: 0;
    background: ${({ theme }) => theme.backgroundLightGreen};
    position: absolute;
    z-index: -1;
    top: -40px;
`;
