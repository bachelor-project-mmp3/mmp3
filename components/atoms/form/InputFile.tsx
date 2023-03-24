import styled from 'styled-components';
import Camera from '../../../public/icons/kamera.svg';

interface InputFileProps {
    id: string;
    onChange?: (e: any) => void;
}

export const InputFile = ({ id, onChange }: InputFileProps) => {
    return (
        <>
            <StyledUpload>
                <StyledCamera></StyledCamera>
                <StyledInputFile
                    id={id}
                    name={id}
                    type="file"
                    accept="image/*"
                    onChange={onChange}></StyledInputFile>
            </StyledUpload>
        </>
    );
};

export const StyledInputFile = styled.input`
    display: none;
`;

export const StyledUpload = styled.label`
    display: block;
    cursor: pointer;
    width: 100%;
    height: 100%;
    position: relative;
`;

export const StyledCamera = styled(Camera)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.7);
`;
