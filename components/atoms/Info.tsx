import { ReactNode } from 'react';
import styled from 'styled-components';
import InfoIcon from '../../public/icons/info.svg';
import { device, theme } from '../../ThemeConfig.js';

interface InfoProps {
    children: ReactNode;
}

export const Info = ({ children }: InfoProps) => {
    return (
        <>
            <StyledWrapper>
                <StyledIcon />
                {children}
            </StyledWrapper>
        </>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    color: ${theme.darkGrey};
    padding-bottom: 10px;
    @media ${device.tablet} {
        font-size: ${theme.fonts.normal.info};
    }
    font-size: ${theme.fonts.mobile.info};
`;

const StyledIcon = styled(InfoIcon)`
    height: 15px;
    width: 15px;
`;
