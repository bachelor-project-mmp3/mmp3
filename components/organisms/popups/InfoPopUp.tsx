import React from 'react';
import styled from 'styled-components';
import DiscardIcon from '../../../public/icons/discard.svg';

interface InfoPopUpProps {
    children: React.ReactNode;
    onClose?: (e: any) => void;
}

const InfoPopUp: React.FC<InfoPopUpProps> = ({
    children,
    onClose,
}: InfoPopUpProps) => {
    return (
        <>
            <FakeBlur onClick={onClose} />
            <Dialog>
                <StyledDiscard onClick={onClose} />
                {children}
            </Dialog>
        </>
    );
};

export default InfoPopUp;

const FakeBlur = styled.div`
    z-index: 110;
    position: fixed;
    backdrop-filter: blur(10px);
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
`;

const Dialog = styled.div`
    box-shadow: 0 -15px 40px -10px ${({ theme }) => theme.darkGrey};
    border-radius: 20px;
    background: white;
    width: 90vw;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 120;
    padding: 40px 20px 20px;
    transform: translate(-50%, -50%);
    gap: 30px;

    @media ${(props) => props.theme.breakpoint.tablet} {
        left: calc(50% + 160px);
        width: 400px;
    }
`;

const StyledDiscard = styled(DiscardIcon)`
    height: 16px;
    width: 16px;
    position: absolute;
    right: 20px;
    top: 20px;
`;
