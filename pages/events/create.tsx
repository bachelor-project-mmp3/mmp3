import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { InputText } from '../../components/atoms/form/InputText';
import { InputDateTime } from '../../components/atoms/form/InputDateTime';
import { InputNumber } from '../../components/atoms/form/InputNumber';
import { InputTextarea } from '../../components/atoms/form/InputTextarea';
import { SubmitButton } from '../../components/atoms/form/SubmitButton';

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

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = {
                title,
                info,
                date,
                timeLimit,
                costs,
                capacity,
            };
            await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            //TODO route to event detail after creation
            await Router.push('/events');
        } catch (error) {
            console.error('Failed to create event:' + error);
        }
    };
    return (
        <Layout>
            <div>
                <h1>Create Event</h1>
                <form onSubmit={submitData}>
                    <InputText
                        onChange={(e) => setTitle(e.target.value)}
                        id="title"
                        placeholder="Title"
                        value={title}>
                        Event title
                    </InputText>
                    <InputDateTime
                        id="date"
                        value={date}
                        min={date}
                        onChange={(e) => setDate(e.target.value)}>
                        Date and time
                    </InputDateTime>

                    <InputDateTime
                        id="timeLimit"
                        value={timeLimit}
                        min={timeLimit}
                        max={date}
                        onChange={(e) => setTimeLimit(e.target.value)}>
                        Receive requests until
                    </InputDateTime>

                    <InputNumber
                        id="costs"
                        placeholder="0"
                        step="0.01"
                        min="0"
                        value={costs}
                        onChange={(e) => setCosts(e.target.value)}>
                        Costs
                    </InputNumber>

                    <InputNumber
                        id="guests"
                        placeholder="0"
                        min="0"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}>
                        Guests
                    </InputNumber>

                    <InputTextarea
                        id="information"
                        cols={50}
                        rows={8}
                        placeholder="Write a little bit about your event plans"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}>
                        Short information
                    </InputTextarea>

                    <SubmitButton value="Submit"></SubmitButton>
                    <a
                        className="back"
                        href="#"
                        onClick={() => Router.push('/')}>
                        or Cancel
                    </a>
                </form>
            </div>
            <style jsx>{`
                .page {
                    background: var(--geist-background);
                    padding: 3rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                input[type='text'],
                textarea {
                    width: 100%;
                    padding: 0.5rem;
                    margin: 0.5rem 0;
                    border-radius: 0.25rem;
                    border: 0.125rem solid rgba(0, 0, 0, 0.2);
                }

                input[type='submit'] {
                    background: #ececec;
                    border: 0;
                    padding: 1rem 2rem;
                }

                .back {
                    margin-left: 1rem;
                }
            `}</style>
        </Layout>
    );
};

export default CreateEvent;
