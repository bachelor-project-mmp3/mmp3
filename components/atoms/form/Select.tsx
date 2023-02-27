
import { ReactNode } from 'react';
import styled from 'styled-components';

interface InputSelectProps {
    id: string;
    options: Array<string>;
    onChange?: (e: any) => void;
    children: ReactNode;
}
export const Select = ({
    id,
    options,
    onChange,
    children,
}: InputSelectProps) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <StyledSelect
                id={id}
                name={id}
                onChange={onChange}
            > 
            {options.map(option => (
                <option value={option} key={option}>{option}</option>
             ))}
            </StyledSelect>
        </>
    );
};
const StyledSelect = styled.select`
    width: 30%;
    padding: 10px;
`;

export default Select;