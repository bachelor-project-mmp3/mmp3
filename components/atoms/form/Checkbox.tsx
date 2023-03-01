import { ReactNode } from 'react';
import styled from 'styled-components';

interface CheckboxProps {
    id: string;
    onChange?: (e: any) => void;
    children: ReactNode;
}

export const Checkbox = ({ id, onChange, children }: CheckboxProps) => {
    return (
        <>
            <StyledInput
                id={id}
                name={id}
                type="checkbox"
                onChange={onChange}
            />
            <label htmlFor={id}>{children}</label>
        </>
    );
};

const StyledInput = styled.input`
    width: 20px;
    height: 20px;
    margin-right: 20px;
`;
