import { ReactNode } from 'react';
import styled from 'styled-components';

interface NotificationBubble {
    children: ReactNode;
}

export const NotificationBubble = ({ children }: NotificationBubble) => {
    return (
        <>
            <StyledWrapper>
                <StyledCount>{children}</StyledCount>
            </StyledWrapper>
        </>
    );
};

const StyledWrapper = styled.div`
    position: absolute;
    text-align: center;
    color: ${({ theme }) => theme.body};
    top: 0;
    left: 22px;
    height: 20px;
    min-width: 20px;
    border-radius: 20px;
    padding: 2px;
    z-index: 1;
    background: ${({ theme }) => theme.red};
`;

const StyledCount = styled.p`
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: ${({ theme }) => theme.fonts.mobile.bubble};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.caption};
        :hover {
            color: ${({ theme }) => theme.body};
        }
    }
`;
