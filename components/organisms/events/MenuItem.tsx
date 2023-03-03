import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import { ToolTip } from '../../atoms/ToolTip';
import InfoIcon from '../../../public/icons/info.svg';

interface MenuItemProps {
    key: string;
    dishLink?: string;
    dishTitle: string;
    dishDescription?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    key,
    dishLink,
    dishDescription,
    dishTitle,
}: MenuItemProps) => {
    const [toolTipState, setToolTipState] = useState(false);

    const toggleTipTool = () => {
        setToolTipState(!toolTipState);
    };
    //TODO: check why link and description are still shown when null

    console.log(dishLink);

    return (
        <StyledMenuItem key={key}>
            {dishLink ? <a href={dishLink}>{dishTitle}</a> : <p>{dishTitle}</p>}
            {dishDescription && (
                <StyledToolTip onClick={toggleTipTool}>
                    <StyledInfoIcon />
                    <ToolTip open={toolTipState}>{dishDescription}</ToolTip>
                </StyledToolTip>
            )}
        </StyledMenuItem>
    );
};

export default MenuItem;

const StyledMenuItem = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const StyledToolTip = styled.div`
    position: relative;
    display: inline-block;
`;

const StyledInfoIcon = styled(InfoIcon)`
    width: 18px;
    height: 18px;
`;
