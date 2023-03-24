import { ReactNode } from 'react';
import { StyledInput, StyledLabel } from './InputText';

interface InputNumberProps {
    id: string;
    placeholder?: string;
    step?: string;
    min?: string;
    value: string;
    onChange?: (e: any) => void;
    children: ReactNode;
    isInvalid?: string;
    padding?: 'left' | 'right';
    required?: boolean;
}

export const InputNumber = ({
    id,
    placeholder,
    step,
    min,
    value,
    onChange,
    children,
    isInvalid,
    padding,
    required,
}: InputNumberProps) => {
    return (
        <>
            <StyledLabel htmlFor={id}>{children}</StyledLabel>
            <StyledInput
                id={id}
                name={id}
                type="text"
                step={step}
                min={min}
                placeholder={placeholder}
                value={value}
                padding={padding}
                isInvalid={isInvalid}
                onChange={onChange}
                required={required}
            />
        </>
    );
};
