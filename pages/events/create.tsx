import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { InputText } from '../../components/atoms/form/InputText';
import { InputDateTime } from '../../components/atoms/form/InputDateTime';
import { InputNumber } from '../../components/atoms/form/InputNumber';
import { InputTextarea } from '../../components/atoms/form/InputTextarea';
import { SubmitButton } from '../../components/atoms/form/SubmitButton';
import { InputUrl } from '../../components/atoms/form/InputUrl';
import { Button } from '../../components/atoms/Button';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ErrorMessage } from '../../components/atoms/form/ErrorMessage';
import { useSession } from 'next-auth/react';
import { StyledLabel } from '../../components/atoms/form/InputText';
import { EventForm } from '../../components/organisms/forms/EventForm';
import { device, theme } from '../../ThemeConfig';

//maybe refactoring?
function formatDateForDateInput(input) {
    let output;
    if (input < 10) {
        output = '0' + input;
    } else {
        output = input;
    }
    return output;
}

const CreateEvent: React.FC = () => {
    const { data: session } = useSession();
    console.log(session?.user?.userId);

    const router = useRouter();
    let currentDate = new Date();

    let cDay = formatDateForDateInput(currentDate.getDate());
    let cMonth = formatDateForDateInput(currentDate.getMonth() + 1);
    let cYear = currentDate.getFullYear();
    let cHour = formatDateForDateInput(currentDate.getHours());
    let cMinutes = formatDateForDateInput(currentDate.getMinutes());

    let dateTimeNow =
        cYear + '-' + cMonth + '-' + cDay + 'T' + cHour + ':' + cMinutes;

    const [isLoading, setLoading] = useState(false);
    const [dormitory, setDormitory] = useState('');
    const [roomnumber, setRoomnumber] = useState('');
    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');
    const [date, setDate] = useState(dateTimeNow);
    const [timeLimit, setTimeLimit] = useState(dateTimeNow);
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
    } = useForm();

    React.useEffect(() => {
        setLoading(true);

        register('title', { required: true, minLength: 3 });
        register('date', { required: true });
        register('timelimit', { required: true });
        register('costs', { required: true, min: 0, max: 99 });
        register('guests', { required: true, min: 1 });

        if (session) {
            fetch(`/api/profile/${session?.user?.userId}`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    setDormitory(data.profile.dormitory);
                    setRoomnumber(data.profile.roomNumber);
                    console.log(data.profile);
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
    const onSubmit = async () => {
        console.log('Hallo');
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

            router.push(`/events/${eventId}`);
        } catch (error) {
            console.error('Failed to create event:' + error);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    return (
        <Layout>
            <div>
                <h1>Create a new Event</h1>
                <EventForm onSubmit={handleSubmit(onSubmit)}>
                    <StyledInputWithError>
                        <InputText
                            onChange={(e) => {
                                setValue('title', e.target.value);
                                setTitle(e.target.value);
                            }}
                            id="title"
                            placeholder="Title"
                            value={title}
                            isInvalid={errors.title ? 'true' : 'false'}>
                            Titel
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
                            min={date}
                            onChange={(e) => {
                                setValue('date', e.target.value);
                                setDate(e.target.value);
                            }}
                            isInvalid={errors.title ? 'true' : 'false'}>
                            Date and time
                        </InputDateTime>
                        {errors.date && (
                            <ErrorMessage>Please enter a date</ErrorMessage>
                        )}
                    </StyledInputWithError>
                    <StyledLabel>Location</StyledLabel>
                    <StyledInformation>
                        <StyledInformationRight>
                            The exact location will only be shared with guests
                        </StyledInformationRight>

                        {dormitory && <div>{dormitory}</div>}
                        {roomnumber && <div>Room number: {roomnumber}</div>}
                    </StyledInformation>
                    <StyledInputWithError>
                        <InputDateTime
                            id="timelimit"
                            value={timeLimit}
                            min={timeLimit}
                            max={date}
                            onChange={(e) => {
                                setValue('timelimit', e.target.value);
                                setTimeLimit(e.target.value);
                            }}
                            isInvalid={errors.title ? 'true' : 'false'}>
                            Receive requests until
                        </InputDateTime>
                        {errors.date && (
                            <ErrorMessage>
                                Please enter a date and time when to close to
                                join
                            </ErrorMessage>
                        )}
                    </StyledInputWithError>
                    <StyledInputWithErrorNumbers>
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
                                variant={'right'}>
                                Costs
                            </InputNumber>
                            {errors.costs &&
                                errors.costs.type === 'required' && (
                                    <ErrorMessage>
                                        Please enter the costs for your event
                                    </ErrorMessage>
                                )}
                            {errors.costs && errors.costs.type === 'max' && (
                                <ErrorMessage>Must be maximum 99</ErrorMessage>
                            )}
                            {errors.costs && errors.costs.type === 'min' && (
                                <ErrorMessage>Must be at least 0</ErrorMessage>
                            )}
                        </StyledInputWithError>
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
                                variant="center">
                                Guests
                            </InputNumber>
                            {errors.guests &&
                                errors.guests.type === 'required' && (
                                    <ErrorMessage>
                                        Please enter the number of guests
                                    </ErrorMessage>
                                )}
                            {errors.guests && errors.guests.type === 'min' && (
                                <ErrorMessage>Must be at least 0</ErrorMessage>
                            )}
                        </StyledInputWithError>
                    </StyledInputWithErrorNumbers>
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
                    {dishes.map((currentDish, i) => {
                        return (
                            <div key={i}>
                                <StyledInputWithError>
                                    <InputText
                                        onChange={(e) => handleChange(e, i)}
                                        id="title"
                                        placeholder="Enter a title"
                                        minLength={3}
                                        value={currentDish.title}
                                        required={true}>
                                        Name of the dish
                                    </InputText>
                                </StyledInputWithError>
                                <StyledInputWithError>
                                    <InputUrl
                                        onChange={(e) => handleChange(e, i)}
                                        id="link"
                                        placeholder="https://www.google.at"
                                        value={currentDish.link}>
                                        {"Link for the dish's recipe"}
                                    </InputUrl>
                                </StyledInputWithError>
                                <StyledInputWithError>
                                    <InputTextarea
                                        id="description"
                                        cols={50}
                                        rows={8}
                                        placeholder="Add any information about the dish"
                                        value={currentDish.description}
                                        onChange={(e) => handleChange(e, i)}>
                                        Short information
                                    </InputTextarea>
                                </StyledInputWithError>
                                <div>
                                    {dishes.length !== 1 && (
                                        <Button
                                            onClick={() => handleRemoveClick(i)}
                                            variant={'primary'}>
                                            Remove
                                        </Button>
                                    )}
                                    {dishes.length - 1 === i && (
                                        <Button
                                            onClick={handleAddClick}
                                            variant={'primary'}>
                                            Add
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <SubmitButton></SubmitButton>
                    <a
                        className="back"
                        href="#"
                        onClick={() => router.push('/')}>
                        or Cancel
                    </a>
                </EventForm>
            </div>
        </Layout>
    );
};

export default CreateEvent;

// const StyledInputWithError = styled.div.attrs(() => ({ tabIndex: 0 }))`
//     display: flex;
//     flex-direction: column;
//     margin-bottom: 1.7em;
// `;
const StyledInputWithError = styled.div.attrs((/* props */) => ({
    tabIndex: 0,
}))`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.7em;
    &.small {
        width: 45%; // <Thing> tagged with an additional CSS class ".something"
    }
`;

const StyledInformation = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 0.5em 2em;
`;

const StyledInformationRight = styled.div`
    text-align: right;
    color: ${theme.darkGrey};
    padding-bottom: 10px;
    @media ${device.tablet} {
        font-size: ${theme.fonts.normal.info};
    }
    font-size: ${theme.fonts.mobile.info};
`;

const StyledInputWithErrorNumbers = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1.7em;
    justify-content: space-between;
`;
