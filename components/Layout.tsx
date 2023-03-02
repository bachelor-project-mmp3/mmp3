import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Navigation from './organisms/Navigation';

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <LayoutWrapper>
        <Navigation />
        <StyledLayout>{props.children}</StyledLayout>
    </LayoutWrapper>
);

export default Layout;

const StyledLayout = styled.div`
    padding: 30px 20px 80px 20px;

    @media ${({ theme }) => theme.breakpoint.tablet} {
        padding: 30px 20px;
    }
`;

const LayoutWrapper = styled.div`
    @media ${({ theme }) => theme.breakpoint.tablet} {
        margin-left: 350px;
    }
`;
