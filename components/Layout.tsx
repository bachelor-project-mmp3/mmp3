import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Navigation from './organisms/Navigation';

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <div>
        <StyledLayout>{props.children}</StyledLayout>
        <Navigation />
    </div>
);

export default Layout;

const StyledLayout = styled.div`
    padding: 0 20px;
`;
