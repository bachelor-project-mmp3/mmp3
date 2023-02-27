import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { uploadImage } from '../../api/helper/uploadHelper';
import { InputFile } from '../../../components/atoms/form/InputFile';
import { SubmitButton } from '../../../components/atoms/form/SubmitButton';
import { InputText } from '../../../components/atoms/form/InputText';
import { InputTextarea } from '../../../components/atoms/form/InputTextarea';
import { Text } from '../../../components/atoms/Text';
import { Checkbox } from '../../../components/atoms/form/Checkbox';
import { useForm } from 'react-hook-form';
import Select from '../../../components/atoms/form/Select';

const Profile: React.FC = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [profile, setProfile] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const [image, setImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [aboutYou, setAboutYou] = useState('');
    const [instagram, setInstagram] = useState('');
    const [phone, setPhone] = useState('');
    const [dormitory, setDormitory] = useState('');

    const dormitories = [
        '--- Select dormitory ---',
        'Campus Urstein',
        'Campus Kuchl',
        'Campus Schwarzach',
    ];

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    React.useEffect(() => {
        register('firstName');
        register('lastName');
        register('roomNumber');
        register('aboutYou');
        register('instagram');
        register('phone');
        register('dormitory');
    }, [register]);

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

    const onSubmit = async () => {
        try {
            let imageUrl;
            console.log('IMAGE SIZE:', image.size);

            if (image.size < 2100000) {
                imageUrl = await uploadImage(image, 'profile');
            } else {
                // TODO: throw error image size
            }

            const body = {
                imageUrl,
                firstName,
                lastName,
                dormitory,
                roomNumber,
                aboutYou,
                instagram,
                phone,
            };

            await fetch(`/api/profile/${profile.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            await Router.push(`/profile/${session?.user?.userId}`);
        } catch (error) {
            console.error('Failed to save user:' + error);
        }
    };

    return (
        <Layout>
            <div>
                <h1>Edit Profile</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputFile
                        id={'photoUpload'}
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                        }}></InputFile>

                    <InputText
                        onChange={(e) => {
                            setValue('firstName', e.target.value);
                            setFirstName(e.target.value);
                        }}
                        id="firstName"
                        placeholder="firstName"
                        value={firstName}>
                        Firstname
                    </InputText>

                    <InputText
                        onChange={(e) => {
                            setValue('lastName', e.target.value);
                            setLastName(e.target.value);
                        }}
                        id="lastName"
                        placeholder="lastName"
                        value={lastName}>
                        Lastname
                    </InputText>

                    <Text>Course of studies: {profile.study}</Text>
                    <Text>FH email adress: {profile.email}</Text>

                    <Select
                        id="dormitory"
                        options={dormitories}
                        onChange={(e) => {
                            setValue('dormitory', e.target.value);
                            setDormitory(e.target.value);
                        }}>
                        Accommodation
                    </Select>

                    <InputText
                        onChange={(e) => {
                            setValue('roomNumber', e.target.value);
                            setRoomNumber(e.target.value);
                        }}
                        id="roomNumber"
                        placeholder="000"
                        value={roomNumber}>
                        Room number
                    </InputText>

                    <InputTextarea
                        id="aboutYou"
                        cols={50}
                        rows={8}
                        placeholder="Leave some personal notes about you, such as hobbies, interests as well as about your diet, potential allergies and intolerances."
                        value={aboutYou}
                        onChange={(e) => setAboutYou(e.target.value)}>
                        About you
                    </InputTextarea>

                    <InputText
                        onChange={(e) => {
                            setValue('instagram', e.target.value);
                            setInstagram(e.target.value);
                        }}
                        id="instagram"
                        placeholder="Enter your instagram username"
                        value={instagram}>
                        Instagram
                    </InputText>

                    <InputText
                        onChange={(e) => {
                            setValue('phone', e.target.value);
                            setPhone(e.target.value);
                        }}
                        id="phone"
                        placeholder="+43 123 45 67 890"
                        value={phone}>
                        Phone
                    </InputText>

                    <Checkbox id="privacy">
                        I have read and agree to the privacy policy
                    </Checkbox>

                    <SubmitButton></SubmitButton>
                </form>
            </div>
        </Layout>
    );
};

export default Profile;
