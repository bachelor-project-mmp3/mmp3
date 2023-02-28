import { ReactNode } from 'react';
import { StyledInput, StyledLabel } from './InputText';

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
            <StyledLabel htmlFor={id}>{children}</StyledLabel>
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
