import { ReactNode } from 'react';
import styled from 'styled-components';

interface InputTextareaProps {
    id: string;
    cols: number;
    rows: number;
    placeholder: string;
    value: string;
    onChange?: (e: any) => void;
    children: ReactNode;
}

export const InputTextarea = ({
    id,
    cols,
    rows,
    placeholder,
    value,
    onChange,
    children,
}: InputTextareaProps) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <StyledInput
                id={id}
                name={id}
                cols={cols}
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    );
};

const StyledInput = styled.textarea`
    width: 100%;
    padding: 10px;
`;
