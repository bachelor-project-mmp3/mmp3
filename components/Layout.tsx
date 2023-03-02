import React, { ReactNode } from 'react';
import Header from './organisms/Header';
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
    @media ${({ theme }) => theme.breakpoint.tablet} {
        padding: ${({ theme }) => theme.layoutPadding.web};
    }
`;
