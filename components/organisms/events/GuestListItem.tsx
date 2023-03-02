import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../../../ThemeConfig';

interface GuestListItemProps {}

export const GuestListItem = ({}: GuestListItemProps) => {
    return <StyledGuestListItem></StyledGuestListItem>;
};

export default GuestListItem;

export interface GuestListItemStyleProps {}

export const StyledGuestListItem = styled.div<GuestListItemStyleProps>``;

export const StyledLabel = styled.label`
    padding: 0 0 8px 18px;
`;
