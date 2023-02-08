import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

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

    if (isLoading) return <p>Loading...</p>;
    if (!profile) return <p>No profile</p>;

    return (
        <Layout>
            <div>
                <h1>Profile</h1>
                <p>
                    {profile.firstName} {profile.lastName}
                </p>

                {profile.image && (
                    <Image
                        src={profile.image}
                        alt="Image"
                        width="300"
                        height="300"
                    />
                )}
                <Link href={`/profile/${profile.id}/edit`}>Edit Profile</Link>
            </div>
        </Layout>
    );
};

export default Profile;
