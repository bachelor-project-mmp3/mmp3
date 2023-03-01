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
            />
        </>
    );
};

export interface InputStyleProps {
    isInvalid: boolean;
    variant: 'center' | 'right';
    padding: 'left' | 'right';
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
    padding: 13px 0;
    padding-left: ${(props) => {
        return props.padding === 'left' ? '45px' : '20px';
    }};
    padding-right: ${(props) => {
        return props.padding === 'right' ? '45px' : '20px';
    }};

    border-radius: 40px;
    border: none;
    box-shadow: 8px 8px 20px -11px ${theme.darkGrey};
    font-size: ${theme.fonts.mobile.info};
    @media ${(props) => props.theme.breakpoint.tablet} {
        width: 50%;
        font-size: ${theme.fonts.normal.info};
    }
`;

export const StyledLabel = styled.label`
    padding: 0 0 8px 18px;
`;
