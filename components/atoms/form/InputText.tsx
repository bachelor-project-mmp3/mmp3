import { ReactNode } from 'react';
import styled from 'styled-components';

interface InputTextProps {
    id: string;
    placeholder?: string;
    value: string;
    onChange?: (e: any) => void;
    children: ReactNode;
    minLength?: 3;
    required?: boolean;
}

export const InputText = ({
    id,
    placeholder,
    value,
    minLength,
    required,
    onChange,
    children,
}: InputTextProps) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <StyledInput
                id={id}
                name={id}
                type="text"
                placeholder={placeholder}
                value={value}
                minLength={minLength}
                required={required}
                onChange={onChange}
            />
        </>
    );
};

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
`;
