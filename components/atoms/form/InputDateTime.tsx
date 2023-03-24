import { ReactNode } from 'react';
import { StyledInput, StyledLabel } from './InputText';

interface InputDateTimeProps {
    id: string;
    value: string;
    onChange?: (e: any) => void;
    min: string;
    max?: string;
    children: ReactNode;
    isInvalid?: string;
    required?: boolean;
}
export const InputDateTime = ({
    id,
    value,
    onChange,
    min,
    max,
    isInvalid,
    required,
    children,
}: InputDateTimeProps) => {
    return (
        <>
            <StyledLabel htmlFor={id}>{children}</StyledLabel>
            <StyledInput
                id={id}
                name={id}
                type="datetime-local"
                value={value}
                min={min}
                max={max}
                isInvalid={isInvalid}
                onChange={onChange}
                required={required}
            />
        </>
    );
};
