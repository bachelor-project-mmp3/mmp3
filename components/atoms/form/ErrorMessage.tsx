import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../../../ThemeConfig';

interface ErrorMessageProps {
    children: ReactNode;
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
    return <StyledSpan>{children}</StyledSpan>;
};

const StyledSpan = styled.span`
    color: red;
    font-size: ${theme.fonts.mobile.info};
    margin-left: 1.2em;

    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${theme.fonts.normal.info};
    }
`;
