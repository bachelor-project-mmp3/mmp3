import styled from 'styled-components';

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
    box-shadow: 8px 8px 20px -11px ${({ theme }) => theme.darkGrey};
    background-color: ${({ theme }) => theme.bodprimary};
    color: ${({ theme }) => theme.body};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fonts.mobile.paragraph};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.mobile.paragraph};
    }
`;
