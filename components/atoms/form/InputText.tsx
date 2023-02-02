import { ReactNode } from 'react';
import styled from 'styled-components';

interface InputTextProps {
    id: string;
    placeholder: string;
    value: string;
    onChange?: (e: any) => void;
    children: ReactNode;
}

export const InputText = ({
    id,
    placeholder,
    value,
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
                onChange={onChange}
            />
        </>
    );
};

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
`;
