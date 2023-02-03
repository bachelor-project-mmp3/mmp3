import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image'

const Profile: React.FC = () => {
    const { data: session } = useSession();

    // TODO: new photo is only visible after clearing cache -> new photo should be visible immediately
    return (
        <Layout>
            <div>
                <h1>Profile</h1>
                <p>{session?.user?.name}</p>
                <p>Info: Uploaded Foto ist erst sichtbar nach Cache löschen... muss ich erst beheben ;-D</p>
                { session?.user?.image && <Image src={session?.user?.image} alt="Image" width="300" height="300"/> }
                <Link href={`/profile/${session?.user?.userId}/edit`}>Edit Profile</Link>
            </div>
        </Layout>
    );
};

export default Profile;