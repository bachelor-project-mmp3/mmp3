import { ReactNode } from 'react';
import { StyledLabel } from './InputText';
import { theme } from '../../../ThemeConfig';
import styled from 'styled-components';

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
            <StyledTextArea
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

export const StyledTextArea = styled.textarea`
    max-width: 100%;
    border-radius: 40px;
    border: none;
    padding: 13px 20px;
    box-shadow: 8px 8px 20px -11px ${theme.darkGrey};
    font-size: ${theme.fonts.mobile.info};
    @media ${({ theme }) => theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
    }
`;
