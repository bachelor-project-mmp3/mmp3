import { ReactNode } from 'react';
import styled from 'styled-components';

interface InputDateTimeProps {
    id: string;
    value: string;
    onChange?: (e: any) => void;
    min: string;
    max?: string;
    children: ReactNode;
}
export const InputDateTime = ({
    id,
    value,
    onChange,
    min,
    max,
    children,
}: InputDateTimeProps) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <StyledInput
                id={id}
                name={id}
                type="datetime-local"
                value={value}
                min={min}
                max={max}
                onChange={onChange}
            />
        </>
    );
};
const StyledInput = styled.input`
    width: 30%;
    padding: 10px;
`;
