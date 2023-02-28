import styled from 'styled-components';
import { theme, device } from '../../../ThemeConfig';

interface InputFileProps {
    id: string;
    onChange?: (e: any) => void;
}

export const InputFile = ({ id, onChange }: InputFileProps) => {
    return (
        <>
            <label htmlFor={id}>Upload Photo</label>
            <StyledInputFile
                id={id}
                name={id}
                type="file"
                accept="image/*"
                onChange={onChange}></StyledInputFile>
        </>
    );
};

export const StyledInputFile = styled.input`
    padding: 10px;
`;

export const StyledImage = styled.input`
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
