import { ReactNode } from 'react';
import { StyledInput, StyledLabel } from './InputText';

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
            <StyledLabel htmlFor={id}>{children}</StyledLabel>
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
