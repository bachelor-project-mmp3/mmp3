import styled from 'styled-components';

interface InputUrlProps {
    value: string;
}

export const SubmitButton = ({ value }: InputUrlProps) => {
    return <StyledInput type="submit" value={value} />;
};

const StyledInput = styled.input`
    padding: 8px 20px;
    border-radius: 20px;
    font-weight: 600;
    background-color: ${({ theme }) => theme.primary};
    border: 2px solid ${({ theme }) => theme.primary};
    color: white;
    :hover {
        background-color: ${({ theme }) => theme.hoverPrimary};
    }
    width: 45%;
    border: none;
    box-shadow: 8px 8px 20px -11px ${({ theme }) => theme.darkGrey};
    color: ${({ theme }) => theme.body};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    @media ${({ theme }) => theme.breakpoint.tablet} {
        padding: 10px 30px;
        border-radius: 24px;
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
    }
`;
