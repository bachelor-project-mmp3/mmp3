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
    const router = useRouter();
    let currentDate = new Date();

    let cDay = formatDateForDateInput(currentDate.getDate());
    let cMonth = formatDateForDateInput(currentDate.getMonth() + 1);
    let cYear = currentDate.getFullYear();
    let cHour = formatDateForDateInput(currentDate.getHours());
    let cMinutes = formatDateForDateInput(currentDate.getMinutes());

    let dateTimeNow =
        cYear + '-' + cMonth + '-' + cDay + 'T' + cHour + ':' + cMinutes;

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
        register('title', { required: true, minLength: 3 });
        register('date', { required: true });
        register('timelimit', { required: true });
        register('costs', { required: true, min: 0, max: 99 });
        register('guests', { required: true, min: 1 });
    }, [register]);

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
    return (
        <Layout>
            <div>
                <h1>Create Event</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputText
                        onChange={(e) => {
                            setValue('title', e.target.value);
                            setTitle(e.target.value);
                        }}
                        id="title"
                        placeholder="Title"
                        value={title}>
                        Event title
                    </InputText>
                    {/* errors will return when field validation fails  */}
                    {errors.title && errors.title.type === 'required' && (
                        <span>Please enter a title of the event</span>
                    )}
                    {errors.title && errors.title.type === 'min' && (
                        <span>
                            Please enter a title of at least 3 characters
                        </span>
                    )}

                    <InputDateTime
                        id="date"
                        value={date}
                        min={date}
                        onChange={(e) => {
                            setValue('date', e.target.value);
                            setDate(e.target.value);
                        }}>
                        Date and time
                    </InputDateTime>
                    {errors.date && <span>Please enter a date</span>}

                    <InputDateTime
                        id="timelimit"
                        value={timeLimit}
                        min={timeLimit}
                        max={date}
                        onChange={(e) => {
                            setValue('timelimit', e.target.value);
                            setTimeLimit(e.target.value);
                        }}>
                        Receive requests until
                    </InputDateTime>
                    {errors.date && (
                        <span>
                            Please enter a date and time when to close to join
                        </span>
                    )}
                    <InputNumber
                        id="costs"
                        placeholder="0"
                        step="0.01"
                        min="0"
                        value={costs}
                        onChange={(e) => {
                            setValue('costs', e.target.value);
                            setCosts(e.target.value);
                        }}>
                        Costs
                    </InputNumber>
                    {errors.costs && errors.costs.type === 'required' && (
                        <span>Please enter the costs for your event</span>
                    )}
                    {errors.costs && errors.costs.type === 'max' && (
                        <span role="alert">Must be maximum 99</span>
                    )}
                    {errors.costs && errors.costs.type === 'min' && (
                        <span role="alert">Must be at least 0</span>
                    )}
                    <InputNumber
                        id="guests"
                        placeholder="0"
                        min="0"
                        value={capacity}
                        onChange={(e) => {
                            setValue('guests', e.target.value);
                            setCapacity(e.target.value);
                        }}>
                        Guests
                    </InputNumber>
                    {errors.guests && errors.guests.type === 'required' && (
                        <span>Please enter the number of guests</span>
                    )}
                    {errors.guests && errors.guests.type === 'min' && (
                        <span role="alert">Must be at least 0</span>
                    )}
                    <InputTextarea
                        id="information"
                        cols={50}
                        rows={8}
                        placeholder="Write a little bit about your event plans"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}>
                        Short information
                    </InputTextarea>
                    {dishes.map((currentDish, i) => {
                        return (
                            <div key={i}>
                                <InputText
                                    onChange={(e) => handleChange(e, i)}
                                    id="title"
                                    placeholder="Enter a title"
                                    minLength={3}
                                    value={currentDish.title}
                                    required={true}>
                                    Name of the dish
                                </InputText>
                                <InputUrl
                                    onChange={(e) => handleChange(e, i)}
                                    id="link"
                                    placeholder="https://www.google.at"
                                    value={currentDish.link}>
                                    Link for the dish's recipe
                                </InputUrl>
                                <InputTextarea
                                    id="description"
                                    cols={50}
                                    rows={8}
                                    placeholder="Add any information about the dish"
                                    value={currentDish.description}
                                    onChange={(e) => handleChange(e, i)}>
                                    Short information
                                </InputTextarea>
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
                </form>
            </div>
        </Layout>
    );
};

export default CreateEvent;
