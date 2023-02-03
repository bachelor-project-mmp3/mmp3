import { ReactNode } from 'react';
import styled from 'styled-components';

interface InputNumberProps {
    id: string;
    placeholder?: string;
    step?: string;
    min?: string;
    value: string;
    onChange?: (e: any) => void;
    children: ReactNode;
}

export const InputNumber = ({
    id,
    placeholder,
    step,
    min,
    value,
    onChange,
    children,
}: InputNumberProps) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <StyledInput
                id={id}
                name={id}
                type="text"
                step={step}
                min={min}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    );
};

const StyledInput = styled.input`
    width: 70%;
    padding: 10px;
`;