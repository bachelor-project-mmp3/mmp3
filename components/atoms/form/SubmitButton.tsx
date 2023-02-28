import styled from 'styled-components';
import { device, theme } from '../../../ThemeConfig';

interface InputUrlProps {
    value: string;
}

export const SubmitButton = ({ value }: InputUrlProps) => {
    return <StyledInput type="submit" value={value} />;
};

const StyledInput = styled.input`
    width: 45%;
    padding: 10px;
    border-radius: 40px;
    border: none;
    box-shadow: 8px 8px 20px -11px ${theme.darkGrey};
    background-color: ${theme.primary};
    color: ${theme.body};
    cursor: pointer;
    font-size: ${theme.fonts.mobile.paragraph};
    @media ${device.tablet} {
        font-size: ${theme.fonts.mobile.paragraph};
    }
`;
