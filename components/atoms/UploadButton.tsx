import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface UploadButtonProps {
    children: ReactNode;
    onChange?: (e: File, eventId: string) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({
    children,
    onChange,
}: UploadButtonProps) => {
    return (
        <>
            <StyledUpload>
                <StyledButton>{children}</StyledButton>
                <StyledInputFile
                    id="eventPhoto"
                    name="eventPhoto"
                    type="file"
                    accept="image/*"
                    onChange={onChange}></StyledInputFile>
            </StyledUpload>
        </>
    );
};

export default UploadButton;

export const StyledButton = styled.div`
    padding: 8px 20px;
    border-radius: 20px;
    font-weight: 800;
    box-shadow: 8px 8px 20px -11px ${({ theme }) => theme.darkGrey};
    width: 100%;
    background-color: ${({ theme }) => theme.primary};
    border: 2px solid ${({ theme }) => theme.primary};
    color: white;
    text-align: center;
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
        padding: 10px 30px;
        border-radius: 24px;
    }
`;

export const StyledInputFile = styled.input`
    display: none;
`;

export const StyledUpload = styled.label`
    cursor: pointer;
    width: 45%;
    height: 100%;
`;
