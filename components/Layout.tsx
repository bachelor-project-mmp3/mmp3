import React, { ReactNode } from 'react';
import Header from './organisms/Header';
import styled from 'styled-components';
import { device, theme } from '../ThemeConfig';

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <div>
        <Header />
        <StyledLayout>{props.children}</StyledLayout>
    </div>
);

export default Layout;

const StyledLayout = styled.div`
    padding: 0 20px;
    @media ${device.tablet} {
        padding: ${theme.layoutPadding.web};
    }
`;
