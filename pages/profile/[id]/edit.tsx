import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { uploadImage } from '../../api/helper/uploadHelper';
import { InputFile } from '../../../components/atoms/form/InputFile';
import { SubmitButton } from '../../../components/atoms/form/SubmitButton';
import { InputText } from '../../../components/atoms/form/InputText';
import { InputTextarea } from '../../../components/atoms/form/InputTextarea';
import { Checkbox } from '../../../components/atoms/form/Checkbox';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../../components/atoms/form/ErrorMessage';
import { Select } from '../../../components/atoms/form/Select';
import { ProfileForm } from '../../../components/organisms/forms/ProfileForm';
import Link from 'next/link';
import styled from 'styled-components';
import Instagram from '../../../public/icons/insta.svg';
import Phone from '../../../public/icons/phone.svg';
import Info from '../../../public/icons/phone.svg';

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

    const dormitories = ['Campus Urstein', 'Campus Kuchl', 'Campus Schwarzach'];
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            image: image,
            firstName: firstName,
            lastName: lastName,
            roomNumber: roomNumber,
            aboutYou: aboutYou,
            dormitory: dormitory,
            instagram: instagram,
            phone: phone,
            privacy: false,
        },
    });

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
                    setFirstName(data.profile.firstName);
                    setLastName(data.profile.lastName);
                    setRoomNumber(data.profile.roomNumber);
                    setInstagram(data.profile.instagram);
                    setPhone(data.profile.phone);
                    setAboutYou(data.profile.interests);
                    setLoading(false);
                    setValue('firstName', data.profile.firstName);
                    setValue('lastName', data.profile.lastName);
                    setValue('roomNumber', data.profile.roomNumber);
                });
        }

        register('firstName', { required: true, minLength: 3 });
        register('lastName', { required: true, minLength: 3 });
        register('roomNumber', { required: true });
        register('privacy', { required: true });
    }, [register, router.isReady, router.query.id, setValue]);

    if (isLoading) return <p>Loading...</p>;
    if (!profile) return <p>No profile</p>;

    const onSubmit = async () => {
        try {
            let imageUrl;

            if (image.size < 2100000) {
                imageUrl = await uploadImage(image, 'profile');
            } else {
                // TODO: throw error image size
            }

            const body = {
                imageUrl,
                firstName,
                lastName,
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
                <ProfileForm onSubmit={handleSubmit(onSubmit)}>
                    <StyledDiv>
                        <InputFile
                            id="image"
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                            }}></InputFile>
                    </StyledDiv>

                    {/* TODO: Validation for Photo */}

                    <StyledDiv>
                        <InputText
                            onChange={(e) => {
                                setValue('firstName', e.target.value);
                                setFirstName(e.target.value);
                            }}
                            id="firstName"
                            placeholder="firstName"
                            value={firstName}
                            isInvalid={errors.firstName ? 'true' : 'false'}>
                            Firstname*
                        </InputText>

                        {/*errors will return when field validation fails  */}
                        {errors.firstName &&
                            errors.firstName.type === 'required' && (
                                <ErrorMessage>
                                    Please enter a firstname
                                </ErrorMessage>
                            )}
                        {errors.firstName &&
                            errors.firstName.type === 'minLength' && (
                                <ErrorMessage>
                                    Please enter a firstname of at least 3
                                    characters
                                </ErrorMessage>
                            )}
                    </StyledDiv>

                    <StyledDiv>
                        <InputText
                            onChange={(e) => {
                                setValue('lastName', e.target.value);
                                setLastName(e.target.value);
                            }}
                            id="lastName"
                            placeholder="lastName"
                            value={lastName}
                            isInvalid={errors.lastName ? 'true' : 'false'}>
                            Lastname*
                        </InputText>
                        {/*errors will return when field validation fails  */}
                        {errors.lastName &&
                            errors.lastName.type === 'required' && (
                                <ErrorMessage>
                                    Please enter a lastname
                                </ErrorMessage>
                            )}
                        {errors.lastName &&
                            errors.lastName.type === 'minLength' && (
                                <ErrorMessage>
                                    Please enter a lastname of at least 3
                                    characters
                                </ErrorMessage>
                            )}
                    </StyledDiv>

                    <StyledText>
                        <p>Course of studies: {profile.study}</p>
                        <p>FH email adress: {profile.email}</p>
                    </StyledText>

                    <StyledDiv>
                        <Select
                            id="dormitory"
                            options={dormitories}
                            selected={dormitory}
                            onChange={(e) => {
                                setValue('dormitory', e.target.value);
                                setDormitory(e.target.value);
                            }}>
                            Accommodation*
                        </Select>
                    </StyledDiv>

                    <StyledDiv>
                        <InputText
                            onChange={(e) => {
                                setValue('roomNumber', e.target.value);
                                setRoomNumber(e.target.value);
                            }}
                            id="roomNumber"
                            placeholder="000"
                            value={roomNumber}
                            isInvalid={errors.roomNumber ? 'true' : 'false'}>
                            Room number*
                        </InputText>

                        {/*errors will return when field validation fails  */}
                        {errors.roomNumber &&
                            errors.roomNumber.type === 'required' && (
                                <ErrorMessage>
                                    Please enter a room number
                                </ErrorMessage>
                            )}
                    </StyledDiv>
                    <StyledDiv>
                        <InputTextarea
                            id="aboutYou"
                            cols={50}
                            rows={8}
                            placeholder="Leave some personal notes about you, such as hobbies, interests as well as about your diet, potential allergies and intolerances."
                            value={aboutYou}
                            onChange={(e) => setAboutYou(e.target.value)}>
                            About you
                        </InputTextarea>
                    </StyledDiv>

                    <StyledDiv>
                        <StyledInstagram />
                        <InputText
                            onChange={(e) => {
                                setValue('instagram', e.target.value);
                                setInstagram(e.target.value);
                            }}
                            id="instagram"
                            placeholder="Enter your instagram username"
                            value={instagram}>
                            Contact Information
                        </InputText>
                    </StyledDiv>

                    <StyledDiv>
                        <StyledPhone />
                        <InputText
                            onChange={(e) => {
                                setValue('phone', e.target.value);
                                setPhone(e.target.value);
                            }}
                            id="phone"
                            placeholder="+43 123 45 67 890"
                            value={phone}></InputText>
                    </StyledDiv>

                    <StyledDiv>
                        <StyledWrapper>
                            <Checkbox
                                id="privacy"
                                onChange={(e) => {
                                    setValue('privacy', e.target.value);
                                }}>
                                I have read and agree to the{' '}
                                <Link href="/privacy">privacy policy</Link>
                            </Checkbox>
                        </StyledWrapper>
                        {/*errors will return when field validation fails */}
                        {errors.privacy &&
                            errors.privacy.type === 'required' && (
                                <ErrorMessage>
                                    Please accept privacy
                                </ErrorMessage>
                            )}
                    </StyledDiv>
                    <SubmitButton></SubmitButton>
                </ProfileForm>
            </div>
        </Layout>
    );
};

export default Profile;

const StyledText = styled.div`
    padding: 0 0 0.5em 1em;
`;

const StyledDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1.5em;
`;

const StyledWrapper = styled.div`
    display: flex;
`;

const StyledInstagram = styled(Instagram)`
    height: 20px;
    width: 20px;
    position: absolute;
    bottom: 12px;
    left: 20px;
`;

const StyledPhone = styled(Phone)`
    height: 20px;
    width: 20px;
    position: absolute;
    bottom: 12px;
    left: 20px;
`;
