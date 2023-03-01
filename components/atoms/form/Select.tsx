import { ReactNode } from 'react';
import styled from 'styled-components';

interface InputSelectProps {
    id: string;
    options: Array<string>;
    selected?: string;
    onChange?: (e: any) => void;
    children: ReactNode;
}
export const Select = ({
    id,
    options,
    selected,
    onChange,
    children,
}: InputSelectProps) => {
    return (
        <>
            <StyledLabel htmlFor={id}>{children}</StyledLabel>
            <StyledSelect id={id} name={id} onChange={onChange}>
                <option disabled={true} value="">
                    --- Choose an option ---
                </option>
                {options.map((option) => (
                    <option
                        value={option}
                        key={option}
                        selected={selected === option ? true : false}>
                        {option}
                    </option>
                ))}
            </StyledSelect>
        </>
    );
};

export default Select;

export const StyledSelect = styled.select`
    font-size: 16px;
    height: 44px;
    width: 100%;
    padding: 0.8em 1em;
    border-radius: 2.5em;
    border-style: solid;
    border: none;
    border-right: 16px solid transparent;
    box-shadow: 8px 8px 20px -11px ${({ theme }) => theme.darkGrey};
    font-size: ${({ theme }) => theme.fonts.info};
`;

export const StyledLabel = styled.label`
    margin: 0 0 0.5em 1em;
`;
