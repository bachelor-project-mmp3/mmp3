import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { useSession } from 'next-auth/react';
import { InputFile } from '../../../components/atoms/form/InputFile';
import { uploadImage } from '../../api/helper/uploadHelper';
import Router from 'next/router';

const Profile: React.FC = () => {
    const { data: session } = useSession();
    const [image, setImage] = useState(null);


    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const uploadResult = await uploadImage(image, 'profile')

            const body = {
                uploadResult,
            };
            await fetch(`/api/profile/${session?.user?.userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            
            await Router.push(`/profile/${session?.user?.userId}`);
           
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Layout>
            <div>
                <h1>Profile</h1>
                <p>{session?.user?.name}</p>
                <form onSubmit={submitData}>
                    <InputFile id={"photoUpload"} onChange={(e) => {setImage(e.target.files[0])}}></InputFile>
                    <input type="submit" value="UPLOAD TO 🔥-base and database 🥳" />
                </form>
            </div>
        </Layout>
    );
};

export default Profile;