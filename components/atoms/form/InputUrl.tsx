import { ReactNode } from 'react';
import styled from 'styled-components';

interface InputUrlProps {
    id: string;
    placeholder: string;
    value: string;
    onChange?: (e: any) => void;
    children: ReactNode;
}

export const InputUrl = ({
    id,
    placeholder,
    value,
    onChange,
    children,
}: InputUrlProps) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <StyledInput
                id={id}
                name={id}
                type="url"
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
