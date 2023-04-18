import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { universities } from '../../helper/universities';
import { Button } from '../../components/atoms/Button';
import { useRouter } from 'next/router';
import { Footer } from '../../components/organisms/Footer';

const Landingpage = () => {
    const [university, setUniversity] = useState<string | undefined>();
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const onSubmit = async () => {
        const data = {
            university,
        };

        const res = await fetch(`/api/landingpage`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (res.status === 200) {
            setSuccess(true);
        } else {
            router.push('/404');
        }
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '46px',
            height: '46px',
            width: '450px',
        }),

        valueContainer: (provided, state) => ({
            ...provided,
            height: '46px',
        }),

        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '46px',
        }),
    };

    return (
        <>
            {success ? (
                <div>Vielen Dank!</div>
            ) : (
                <FormWrapper>
                    <Select
                        options={universities}
                        placeholder="Wähle deine Universität"
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: '#40845e',
                                primary: '#52A174',
                            },
                        })}
                        styles={customStyles}
                        onChange={(value) => setUniversity(value.value)}
                    />
                    <Button
                        disabled={university === undefined}
                        onClick={onSubmit}
                        variant="primary">
                        Abschicken
                    </Button>
                </FormWrapper>
            )}
            <Footer />
        </>
    );
};

export default Landingpage;

const FormWrapper = styled.div`
    width: 600px;
    display: flex;
    gap: 20px;
    align-items: center;
    margin: auto;
    margin-top: 100px;
`;
