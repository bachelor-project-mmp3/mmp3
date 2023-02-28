import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme, device } from '../../../ThemeConfig';
import { switchCase } from '@babel/types';

interface InputTextProps {
    id: string;
    placeholder?: string;
    value: string;
    onChange?: (e: any) => void;
    children?: ReactNode;
    minLength?: 3;
    required?: boolean;
    isInvalid?: string;
    variant?: 'center' | 'right';
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
    variant,
}: InputTextProps) => {
    return (
        <>
            <StyledLabel htmlFor={id}>{children}</StyledLabel>
            <StyledInput
                id={id}
                name={id}
                type="text"
                variant={variant}
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
    variant: 'center' | 'right';
}

export const StyledInput = styled.input<InputStyleProps>`
    border-color: ${(props) => {
        return props.isInvalid === 'true' ? theme.red : theme.lightGrey;
    }};
    text-align: ${(props) =>
        props.variant === 'center'
            ? 'center'
            : props.variant === 'right'
            ? 'right'
            : 'left'};
    max-width: 100%;
    padding: 0.8em 1em;
    border-radius: 2.5em;
    border-style: solid;
    border: none;
    box-shadow: 8px 8px 20px -11px ${theme.darkGrey};
    font-size: ${theme.fonts.mobile.info};
    @media ${device.tablet} {
        font-size: ${theme.fonts.normal.info};
    }
`;

export const StyledLabel = styled.label`
    padding: 0 0 0.5em 1em;
`;
