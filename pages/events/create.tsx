import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { InputText } from '../../components/atoms/form/InputText';
import { InputDateTime } from '../../components/atoms/form/InputDateTime';
import { InputNumber } from '../../components/atoms/form/InputNumber';
import { InputTextarea } from '../../components/atoms/form/InputTextarea';
import { SubmitButton } from '../../components/atoms/form/SubmitButton';
import { InputUrl } from '../../components/atoms/form/InputUrl';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ErrorMessage } from '../../components/atoms/form/ErrorMessage';
import { useSession } from 'next-auth/react';
import { StyledLabel } from '../../components/atoms/form/InputText';
import { EventForm } from '../../components/organisms/forms/EventForm';
import { Button } from '../../components/atoms/Button';
import AddDishIcon from '../../public/icons/addDish.svg';
import DiscardIcon from '../../public/icons/discard.svg';
import MoneyIcon from '../../public/icons/chefmuetze.svg';
import LinkIcon from '../../public/icons/link.svg';
import { formatDateForDateInput } from '../../helper/helperFunctions';
import { Header } from '../../components/organisms/Header';
import { Loading } from '../../components/organisms/Loading';
import { Info } from '../../components/atoms/Info';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
    .object({
        title: yup.string().min(3).required(),
        date: yup.string().required(),
        timelimit: yup.string().required(),
        costs: yup.number().positive().max(99).required(),
        guests: yup.number().positive().integer().min(1).max(99).required(),
    })
    .required();
type FormData = yup.InferType<typeof schema>;

// interface IFormInput {
//     title: string;
//     date: string;
//     timelimit: string;
//     costs: number;
//     guests: number;
// }

const CreateEvent = () => {
    const { data: session } = useSession();
    const router = useRouter();
    let currentDate = new Date();

    let cDay = formatDateForDateInput(currentDate.getDate());
    let cMonth = formatDateForDateInput(currentDate.getMonth() + 1);
    let cYear = currentDate.getFullYear();
    let cHour = formatDateForDateInput(currentDate.getHours());
    let cMinutes = formatDateForDateInput(currentDate.getMinutes());

    let dateTimeNow =
        cYear + '-' + cMonth + '-' + cDay + 'T' + cHour + ':' + cMinutes;
    let dateTimePlusOneHour =
        cYear + '-' + cMonth + '-' + cDay + 'T' + (cHour + 1) + ':' + cMinutes;

    const [isLoading, setLoading] = useState(true);
    const [dormitory, setDormitory] = useState('');
    const [roomnumber, setRoomnumber] = useState('');
    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');
    const [date, setDate] = useState(dateTimeNow);
    const [timeLimit, setTimeLimit] = useState(dateTimePlusOneHour);
    const [costs, setCosts] = useState('');
    const [capacity, setCapacity] = useState('');
    const [dishes, setDishes] = useState([
        {
            title: '',
            link: '',
            description: '',
        },
    ]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'all',
        resolver: yupResolver(schema),
    });

    React.useEffect(() => {
        register('title');
        register('date');
        register('timelimit');
        register('costs');
        register('guests');
        //TODO: check for correct validation

        if (session) {
            fetch(`/api/profile/${session?.user?.userId}`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    setDormitory(data.profile.dormitory);
                    setRoomnumber(data.profile.roomNumber);
                    setLoading(false);
                });
        }
    }, [register, session]);

    // handle input change
    const handleChange = (event, index) => {
        const values = [...dishes];
        values[index][event.target.name] = event.target.value;

        setDishes(values);
    };
    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        if (dishes.length !== 1) {
            const list = [...dishes];
            list.splice(index, 1);
            setDishes(list);
        }
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setDishes([
            ...dishes,
            {
                title: '',
                link: '',
                description: '',
            },
        ]);
    };
    const onSubmit = async (data: FormData) => {
        try {
            const body = {
                title,
                info,
                date,
                timeLimit,
                costs,
                capacity,
                dishes,
            };

            const res = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const eventId = await res.json();

            router.replace(`/events/${eventId}`);
        } catch (error) {
            console.error('Failed to create event:' + error);
        }
    };

    if (isLoading) return <Loading />;
    return (
        <Layout>
            <Header backButton>Create a new Event</Header>
            <EventForm onSubmit={handleSubmit(onSubmit)}>
                <StyledInputWithError>
                    <InputText
                        onChange={(e) => {
                            setValue('title', e.target.value);
                            setTitle(e.target.value);
                            console.log(e.target.value);
                            if (
                                e.target.value.length > 0 &&
                                e.target.value.length < 4
                            ) {
                                errors.title.type = 'min';
                            }
                        }}
                        id="title"
                        placeholder="Title"
                        value={title}
                        isInvalid={errors.title ? 'true' : 'false'}
                        required>
                        Title*
                    </InputText>
                    {/*errors will return when field validation fails  */}
                    {errors.title && errors.title.type === 'required' && (
                        <ErrorMessage>
                            Please enter a title of the event
                        </ErrorMessage>
                    )}
                    {errors.title && errors.title.type === 'min' && (
                        <ErrorMessage>
                            Please enter a title of at least 3 characters
                        </ErrorMessage>
                    )}
                </StyledInputWithError>
                <StyledInputWithError>
                    <InputDateTime
                        id="date"
                        value={date}
                        min={dateTimeNow}
                        onChange={(e) => {
                            setValue('date', e.target.value);
                            setDate(e.target.value);
                        }}
                        isInvalid={errors.title ? 'true' : 'false'}
                        required>
                        Date and time*
                    </InputDateTime>
                    {errors.date && (
                        <ErrorMessage>Please enter a date</ErrorMessage>
                    )}
                </StyledInputWithError>
                <StyledInputWithError>
                    <InputDateTime
                        id="timelimit"
                        value={timeLimit}
                        min={dateTimePlusOneHour}
                        max={date}
                        onChange={(e) => {
                            setValue('timelimit', e.target.value);
                            setTimeLimit(e.target.value);
                        }}
                        isInvalid={errors.title ? 'true' : 'false'}
                        required>
                        Time limit to receive join requests until*
                    </InputDateTime>
                    {errors.date && (
                        <ErrorMessage>
                            Please enter a date and time when to close to join
                        </ErrorMessage>
                    )}
                </StyledInputWithError>
                <StyledFormComponentsInRow>
                    <StyledInputWithError className="small">
                        <InputText
                            id=""
                            placeholder="000"
                            value={dormitory}
                            disabled={true}>
                            Dormitory
                        </InputText>
                    </StyledInputWithError>
                    <StyledInputWithError className="small">
                        <InputText
                            id=""
                            placeholder="000"
                            value={roomnumber}
                            disabled={true}>
                            Roomnumber
                        </InputText>
                    </StyledInputWithError>
                </StyledFormComponentsInRow>

                <StyledInfo>
                    <StyledInfo>
                        <Info>
                            The exact location will only be shared with guests
                        </Info>
                    </StyledInfo>
                </StyledInfo>
                <StyledFormComponentsInRow>
                    <StyledInputWithError className="small">
                        <InputNumber
                            id="costs"
                            placeholder="0"
                            step="0.01"
                            min="0"
                            value={costs}
                            onChange={(e) => {
                                setValue('costs', e.target.value);
                                setCosts(e.target.value);
                            }}
                            isInvalid={errors.title ? 'true' : 'false'}
                            padding="left">
                            Costs per person
                        </InputNumber>
                        {errors.costs && errors.costs.type === 'max' && (
                            <ErrorMessage>Must be maximum 99</ErrorMessage>
                        )}
                    </StyledInputWithError>
                    <StyledMoneyIcon />
                    <StyledInputWithError className="small">
                        <InputNumber
                            id="guests"
                            placeholder="0"
                            min="0"
                            value={capacity}
                            onChange={(e) => {
                                setValue('guests', e.target.value);
                                setCapacity(e.target.value);
                            }}
                            isInvalid={errors.title ? 'true' : 'false'}
                            required>
                            Guests*
                        </InputNumber>
                        {errors.guests && errors.guests.type === 'required' && (
                            <ErrorMessage>
                                Please enter the number of guests
                            </ErrorMessage>
                        )}
                        {errors.guests && errors.guests.type === 'min' && (
                            <ErrorMessage>Must be at least 1</ErrorMessage>
                        )}
                        {errors.guests && errors.guests.type === 'max' && (
                            <ErrorMessage>Must be maximum 99</ErrorMessage>
                        )}
                    </StyledInputWithError>
                </StyledFormComponentsInRow>
                <StyledInputWithError>
                    <InputTextarea
                        id="information"
                        cols={50}
                        rows={8}
                        placeholder="Write a little bit about your event plans"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}>
                        Short information
                    </InputTextarea>
                </StyledInputWithError>
                <StyledMenuInput>
                    <StyledH1>Add your menu</StyledH1>
                    {dishes.map((currentDish, i) => {
                        return (
                            <StyledMenuInputItem key={i}>
                                <StyledInputWithError>
                                    <InputText
                                        onChange={(e) => handleChange(e, i)}
                                        id="title"
                                        placeholder="Enter a title"
                                        minLength={3}
                                        value={currentDish.title}
                                        padding="right"
                                        required={true}>
                                        Name of the dish*
                                    </InputText>
                                </StyledInputWithError>
                                <StyledInputWithError>
                                    <InputUrl
                                        onChange={(e) => handleChange(e, i)}
                                        id="link"
                                        placeholder="https://www.google.at"
                                        value={currentDish.link}
                                        padding="left">
                                        {"Link for the dish's recipe"}
                                    </InputUrl>
                                </StyledInputWithError>
                                <StyledLinkIcon />
                                <StyledInputWithError>
                                    <InputTextarea
                                        id="description"
                                        cols={50}
                                        rows={5}
                                        placeholder="Add any information about the dish"
                                        value={currentDish.description}
                                        onChange={(e) => handleChange(e, i)}>
                                        Short information
                                    </InputTextarea>
                                </StyledInputWithError>
                                <StyledHR />
                                <div>
                                    {dishes.length - 1 === i && (
                                        <StyledAddButton
                                            onClick={handleAddClick}>
                                            <StyledAddDish />
                                            <div>Add another dish</div>
                                        </StyledAddButton>
                                    )}
                                </div>
                                {dishes.length !== 1 && (
                                    <StyledDeleteButton
                                        onClick={() => handleRemoveClick(i)}
                                    />
                                )}
                            </StyledMenuInputItem>
                        );
                    })}
                    <StyledFormComponentsInRow>
                        <Button
                            variant="red"
                            onClick={() => router.replace(`/events`)}
                            width={45}>
                            Cancel
                        </Button>
                        <SubmitButton value="Create event"></SubmitButton>
                    </StyledFormComponentsInRow>
                </StyledMenuInput>
            </EventForm>
        </Layout>
    );
};

export default CreateEvent;

const StyledInputWithError = styled.div.attrs((/* props */) => ({
    tabIndex: 0,
}))`
    display: flex;
    flex-direction: column;
    margin-bottom: 27px;
    width: 100%;
    &.small {
        width: 45%; // <StyledInputWithError> tagged with an additional CSS class ".small"
    }
`;

const StyledFormComponentsInRow = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;
`;

const StyledMenuInputItem = styled.div`
    position: relative;
`;

const StyledMenuInput = styled.div`
    background-color: ${({ theme }) => theme.backgroundLightGreen};
    border-radius: 25px 25px 0 0;
    padding: 20px 20px 40px 20px;
    margin-bottom: -80px;

    @media ${(props) => props.theme.breakpoint.tablet} {
        margin-bottom: -30px;
    }
`;

const StyledAddDish = styled(AddDishIcon)`
    height: 20px;
    width: 20px;
    margin-right: 10px;
`;

const StyledAddButton = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 10px 10px 10px;
    cursor: pointer;
`;

const StyledDeleteButton = styled(DiscardIcon)`
    position: absolute;
    height: 16px;
    width: 16px;
    cursor: pointer;
    right: 20px;
    top: 0px;
`;

const StyledLinkIcon = styled(LinkIcon)`
    position: absolute;
    height: 16px;
    width: 16px;
    left: 20px;
    top: 145px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        top: 154px;
    }
`;

const StyledHR = styled.hr`
    border-top: 2px solid ${({ theme }) => theme.midGrey};
    border-radius: 4px;
    width: 90%;
    margin-bottom: 20px;
`;
const StyledH1 = styled.h1`
    margin: 25px 20px;
    font-size: ${({ theme }) => theme.fonts.mobile.headline4};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.headline4};
    }
`;

const StyledInfo = styled.div`
    padding-left: 18px;
    margin: -10px 0 15px 0;
`;

const StyledMoneyIcon = styled(MoneyIcon)`
    position: absolute;
    height: 16px;
    width: 16px;
    left: 20px;
    top: 42px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        top: 47px;
    }
`;
