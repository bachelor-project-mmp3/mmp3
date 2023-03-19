import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../../../ThemeConfig';

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
    padding?: 'left' | 'right';
    disabled?: boolean;
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
    padding,
    disabled,
}: InputTextProps) => {
    return (
        <>
            <StyledLabel htmlFor={id}>{children}</StyledLabel>
            <StyledInput
                id={id}
                name={id}
                type="text"
                variant={variant}
                padding={padding}
                placeholder={placeholder}
                value={value}
                minLength={minLength}
                isInvalid={isInvalid}
                required={required}
                onChange={onChange}
                disabled={disabled}
                data-1p-ignore
            />
        </>
    );
};

export interface InputStyleProps {
    isInvalid: boolean;
    variant: 'center' | 'right';
    padding: 'left' | 'right';
    disabled: boolean;
}

export const StyledInput = styled.input<InputStyleProps>`
    border-color: ${(props) =>
        props.isInvalid === 'true' ? theme.red : theme.lightGrey};
    text-align: ${(props) =>
        props.variant === 'center'
            ? 'center'
            : props.variant === 'right'
            ? 'right'
            : 'left'};
    max-width: 100%;
    padding-top: 13px;
    padding-bottom: 13px;
    padding-left: ${(props) => (props.padding === 'left' ? '45px' : '20px')};
    padding-right: ${(props) => (props.padding === 'right' ? '45px' : '20px')};
    background-color: ${(props) =>
        props.disabled ? theme.lightGrey : theme.body};

    border-radius: 40px;
    border: none;
    box-shadow: 8px 8px 20px -11px ${theme.darkGrey};
    font-size: ${theme.fonts.mobile.info};
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 100%;
        font-size: ${theme.fonts.normal.info};
    }
`;

export const StyledLabel = styled.label`
    padding: 0 0 8px 18px;
`;
