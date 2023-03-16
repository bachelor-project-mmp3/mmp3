import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import { ToolTip } from '../../atoms/ToolTip';
import InfoIcon from '../../../public/icons/info.svg';
import LinkIcon from '../../../public/icons/link.svg';

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

    return (
        <StyledMenuItem key={key}>
            {dishLink ? <a href={dishLink}>{dishTitle}</a> : <p>{dishTitle}</p>}
            <div>
                {dishLink && (
                    <a href={dishLink}>
                        <StyledLinkIcon />
                    </a>
                )}
                {dishDescription && (
                    <StyledToolTip onClick={toggleTipTool}>
                        <StyledInfoIcon />
                        <ToolTip open={toolTipState}>{dishDescription}</ToolTip>
                    </StyledToolTip>
                )}
            </div>
        </StyledMenuItem>
    );
};

export default MenuItem;

const StyledMenuItem = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 25%;
    justify-content: space-between;
    align-items: center;
`;

const StyledToolTip = styled.div`
    position: relative;
    display: inline-block;
`;

const StyledInfoIcon = styled(InfoIcon)`
    width: 18px;
    height: 18px;
    margin: 0 10px;
`;

const StyledLinkIcon = styled(LinkIcon)`
    height: 16px;
    width: 16px;
    margin: 0 10px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        top: 154px;
    }
`;
