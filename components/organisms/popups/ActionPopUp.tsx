// props: title, info, actions(1-2 buttons)
//walkthrough, canceled event, event doesnt have guests, delete event(are you sure), remove picture, withdraw request

import React from 'react';
import DiscardIcon from '../../../public/icons/discard.svg';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';

interface ActionPopUpProps {
    children: React.ReactNode;
    textButtonClose: string;
    textButtonAction: string;
    onClose: (e: any) => void;
    onAction: (e: any) => void;
}
const ActionPopUp: React.FC<ActionPopUpProps> = ({
    children,
    onClose,
    onAction,
    textButtonClose,
    textButtonAction,
}: ActionPopUpProps) => {
    return (
        <>
            <FakeBlur onClick={onClose} />
            <Dialog>
                <StyledDiscard onClick={onClose} />
                {children}
                <StyledButtonsInRow>
                    <Button
                        variant={'red'}
                        onClick={onClose}
                        width={45}
                        smallFont>
                        {textButtonClose}
                    </Button>
                    <Button
                        variant={'primary'}
                        onClick={onAction}
                        width={45}
                        smallFont>
                        {textButtonAction}
                    </Button>
                </StyledButtonsInRow>
            </Dialog>
        </>
    );
};

export default ActionPopUp;

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
        left: 50%;
        width: 410px;
    }
`;

const StyledDiscard = styled(DiscardIcon)`
    height: 16px;
    width: 16px;
    position: absolute;
    right: 20px;
    top: 20px;
`;

const StyledButtonsInRow = styled.div`
    margin: 25px 0 15px 0;
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;
`;
