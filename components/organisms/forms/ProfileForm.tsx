import React, { useEffect, useState } from 'react';
import { StyledForm } from './EventForm';
import Router from 'next/router';
import router from 'next/router';
import { InputFile } from '../../../components/atoms/form/InputFile';
import { SubmitButton } from '../../../components/atoms/form/SubmitButton';
import { InputText } from '../../../components/atoms/form/InputText';
import { InputTextarea } from '../../../components/atoms/form/InputTextarea';
import { Checkbox } from '../../../components/atoms/form/Checkbox';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../../components/atoms/form/ErrorMessage';
import { Select } from '../../../components/atoms/form/Select';
import { Button } from '../../../components/atoms/Button';
import { Info } from '../../../components/atoms/Info';
import { uploadImage } from '../../../helper/uploadHelper';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styled from 'styled-components';
import Instagram from '../../../public/icons/insta.svg';
import Phone from '../../../public/icons/phone.svg';
import Image from 'next/image';
import { Loading } from '../Loading';

interface ProfileFormProps {
    cancelButton?: boolean;
}

export const ProfileForm = ({ cancelButton }: ProfileFormProps) => {
    const { data: session } = useSession();

    const [profile, setProfile] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

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
        if (session) {
            fetch(`/api/profile/${session.user.userId}`, {
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
                    setDormitory(data.profile.dormitory);
                    setImage(data.profile.image);
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
    }, [register, session, setValue]);

    if (isLoading) return <Loading withoutLayout />;
    if (!profile) return <p>No profile</p>;

    const onSubmit = async () => {
        setLoading(true);

        try {
            let imageUrl;

            if (selectedImage) {
                imageUrl = await uploadImage(image, 'profile');
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

            await Router.replace(`/profile/${profile.id}`);
        } catch (error) {
            console.error('Failed to save user:' + error);
        }
    };
    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledDiv className="center">
                {image && (
                    <ProfileImage>
                        <StyledImage
                            src={selectedImage ? selectedImage : image}
                            alt="Image"
                            layout={'fill'}
                            style={{ objectFit: 'cover' }}
                        />
                        <InputFile
                            id="image"
                            onChange={(e) => {
                                setValue('image', e.target.files[0]);
                                setImage(e.target.files[0]);
                                setSelectedImage(
                                    URL.createObjectURL(e.target.files[0])
                                );
                            }}></InputFile>
                    </ProfileImage>
                )}

                {/*errors will return when field validation fails  */}
                {errors.image && errors.image.type === 'required' && (
                    <ErrorMessage>Please upload a photo</ErrorMessage>
                )}
                {errors.image && errors.image.type === 'fileSize' && (
                    <ErrorMessage>
                        Please upload a photo with max. 2MB
                    </ErrorMessage>
                )}
            </StyledDiv>

            <TextRequired>* Required</TextRequired>

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
                {errors.firstName && errors.firstName.type === 'required' && (
                    <ErrorMessage>Please enter a firstname</ErrorMessage>
                )}
                {errors.firstName && errors.firstName.type === 'minLength' && (
                    <ErrorMessage>
                        Please enter a firstname of at least 3 characters
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
                {errors.lastName && errors.lastName.type === 'required' && (
                    <ErrorMessage>Please enter a lastname</ErrorMessage>
                )}
                {errors.lastName && errors.lastName.type === 'minLength' && (
                    <ErrorMessage>
                        Please enter a lastname of at least 3 characters
                    </ErrorMessage>
                )}
            </StyledDiv>

            <StyledDiv>
                <InputText
                    id=""
                    placeholder="000"
                    value={profile.study}
                    disabled={true}>
                    Course of studies:
                </InputText>
            </StyledDiv>

            <StyledDiv>
                <InputText id="study" value={profile.email} disabled={true}>
                    FH email address:
                </InputText>
                <StyledInfo>
                    <Info>
                        The email address will only be shared with guests
                    </Info>
                </StyledInfo>
            </StyledDiv>

            <StyledDormitory>
                <StyledDiv className="small">
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

                <StyledDiv className="small">
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
                    <StyledInfo>
                        <Info>
                            The room number will only be shared with guests
                        </Info>
                    </StyledInfo>
                </StyledDiv>
            </StyledDormitory>
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

            <StyledContactBlock>
                <StyledInstagram />
                <InputText
                    onChange={(e) => {
                        setValue('instagram', e.target.value);
                        setInstagram(e.target.value);
                    }}
                    id="instagram"
                    placeholder="Enter your instagram username"
                    value={instagram}
                    padding="left">
                    Contact Information
                </InputText>
            </StyledContactBlock>

            <StyledDivPhone>
                <StyledPhone />
                <InputText
                    onChange={(e) => {
                        setValue('phone', e.target.value);
                        setPhone(e.target.value);
                    }}
                    id="phone"
                    placeholder="+43 123 45 67 890"
                    value={phone}
                    padding="left"></InputText>
            </StyledDivPhone>
            <StyledInfo>
                <Info>The phone number will only be shared with guests</Info>
            </StyledInfo>

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
                {errors.privacy && errors.privacy.type === 'required' && (
                    <ErrorMessage>Please accept privacy</ErrorMessage>
                )}
            </StyledDiv>
            <ButtonWrapper>
                {cancelButton && (
                    <Button
                        variant="red"
                        onClick={() => router.replace(`/profile/${profile.id}`)}
                        width={45}>
                        Cancel
                    </Button>
                )}
                <SubmitButton value="Save"></SubmitButton>
            </ButtonWrapper>
        </StyledForm>
    );
};

export default ProfileForm;

const StyledDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1.5em;
    &.center {
        align-items: center;
    }
    @media ${(props) => props.theme.breakpoint.tablet} {
        &.small {
            width: 45%;
        }
    }
`;

const StyledDivPhone = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const StyledContactBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const StyledDormitory = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    @media ${(props) => props.theme.breakpoint.tablet} {
        flex-wrap: no-wrap;
    }
`;

const StyledWrapper = styled.div`
    display: flex;
    padding-bottom: 0;
    margin-top: 20px;
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

const TextRequired = styled.p`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    font-size: ${({ theme }) => theme.fonts.mobile.info};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

const StyledInfo = styled.div`
    padding-left: 18px;
    margin-top: 10px;
`;

const StyledImage = styled(Image)`
    opacity: 0.5;
    border-radius: 50%;
`;

const ProfileImage = styled.div`
    position: relative;
    border-radius: 50%;
    width: 300px;
    height: 300px;
    background: white;
`;
