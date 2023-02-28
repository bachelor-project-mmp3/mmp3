import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme, device } from '../../../ThemeConfig';

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
    border-color: ${theme.lightGrey};
    width: 100%;
    padding: 0.8em 1em;
    border-radius: 2.5em;
    border-style: solid;
    font-size: ${theme.fonts.info};
    @media ${device.tablet} {
        width: 50%;
    }
`;

export const StyledLabel = styled.label`
    margin: 0 0 0.5em 1em;
`;
