import styled from 'styled-components';

interface InputFileProps {
    id: string;
    onChange?: (e: any) => void;
}

export const InputFile = ({
    id,
    onChange,
}: InputFileProps) => {
    return (
        <>
            <label htmlFor={id}>Upload Photo</label>
            <StyledInputFile
                id={id}
                name={id}
                type="file"
                accept="image/*"
                onChange={onChange}>
            </StyledInputFile>
        </>
    );
};

const StyledInputFile = styled.input`
    padding: 10px;
`;