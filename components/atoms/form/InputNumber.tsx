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
    variant?: 'center' | 'right';
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
    variant,
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
                variant={variant}
                isInvalid={isInvalid}
                onChange={onChange}
            />
        </>
    );
};
