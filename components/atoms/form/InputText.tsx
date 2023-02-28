import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme, device } from '../../../ThemeConfig';

interface InputTextProps {
    id: string;
    placeholder?: string;
    value: string;
    onChange?: (e: any) => void;
    children: ReactNode;
    minLength?: 3;
    required?: boolean;
    isInvalid?: string;
}

export const InputText = ({
    id,
    placeholder,
    value,
    minLength,
    required,
    onChange,
    isInvalid,
    children,
}: InputTextProps) => {
    return (
        <>
            <StyledLabel htmlFor={id}>{children}</StyledLabel>
            <StyledInput
                id={id}
                name={id}
                type="text"
                placeholder={placeholder}
                value={value}
                minLength={minLength}
                isInvalid={isInvalid}
                required={required}
                onChange={onChange}
            />
        </>
    );
};

export interface InputStyleProps {
    isInvalid: boolean;
}

export const StyledInput = styled.input<InputStyleProps>`
    border-color: ${(props) =>
        props.isInvalid === 'true' ? theme.red : theme.lightGrey};
    width: 100%;
    padding: 0.8em 1em;
    border-radius: 2.5em;
    border-style: solid;
    font-size: ${theme.fonts.mobile.info};
    @media ${device.tablet} {
        width: 50%;
        font-size: ${theme.fonts.normal.info};
    }
`;

export const StyledLabel = styled.label`
    margin: 0 0 0.5em 1em;
`;
