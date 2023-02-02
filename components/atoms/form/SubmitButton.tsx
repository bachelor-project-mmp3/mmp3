import styled from 'styled-components';

interface SubmitButtonProps {
    value: string;
}

export const SubmitButton = ({ value }: SubmitButtonProps) => {
    return <StyledInput type="submit" value={value} />;
};

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
`;
