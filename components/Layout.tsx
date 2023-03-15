import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Navigation from './organisms/Navigation';
import Image from 'next/image';

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <LayoutWrapper>
        <Navigation />
        <StyledLayout>
            <BackgroundImageWrapper>
                <MobileImage
                    src={'/images/background_mobile.png'}
                    alt="Image"
                    layout={'fill'}
                    fill
                    style={{ objectFit: 'cover' }}
                />
                <DesktopImage
                    src={'/images/background_desktop.png'}
                    alt="Image"
                    layout={'fill'}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </BackgroundImageWrapper>
            {props.children}
        </StyledLayout>
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
        margin-left: 320px;
    }
`;

const BackgroundImageWrapper = styled.div`
    position: fixed;
    inset: 0;
    z-index: -1;
`;

const MobileImage = styled(Image)`
    display: block;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: none;
    }
`;

const DesktopImage = styled(Image)`
    display: none;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        display: block;
    }
`;
