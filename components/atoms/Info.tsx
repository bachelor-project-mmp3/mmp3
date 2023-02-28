import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../ThemeConfig';
import InfoIcon from '../../public/icons/info.svg';

interface InfoProps {
    children: ReactNode;
}

export const Info = ({ children }: InfoProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <StyledWrapper>
                {isOpen && (
                    <>
                        <StyledInfoBox>{children}</StyledInfoBox>
                    </>
                )}
                <StyledIcon
                    onClick={() =>
                        isOpen ? setIsOpen(false) : setIsOpen(true)
                    }
                />
            </StyledWrapper>
        </>
    );
};

const StyledWrapper = styled.div`
    position: relative;
`;

const StyledInfoBox = styled.div`
    padding: 10px;
    background: ${theme.cremeLight};
    width: 50%;
    position: absolute;
    z-index: 1;
    left: 25px;
    border-radius: 10px;
`;

const StyledIcon = styled(InfoIcon)`
    height: 16px;
    width: 16px;
`;
