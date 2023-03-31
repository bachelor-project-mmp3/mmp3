import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Navigation from './organisms/Navigation';
import Image from 'next/image';

interface LayoutProps {
    children: ReactNode;
    noPadding?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    noPadding,
}: LayoutProps) => (
    <LayoutWrapper>
        <Navigation />
        <StyledLayout noPadding={noPadding}>
            <BackgroundImageWrapper>
                <MobileImage
                    src={'/images/background_mobile.svg'}
                    alt="Image"
                    fill
                    sizes="100"
                    style={{ objectFit: 'cover' }}
                />
                <DesktopImage
                    src={'/images/background_desktop.svg'}
                    alt="Image"
                    fill
                    sizes="100"
                    style={{ objectFit: 'cover' }}
                />
            </BackgroundImageWrapper>
            {children}
        </StyledLayout>
    </LayoutWrapper>
);

export default Layout;

interface StyledLayoutProps {
    noPadding?: boolean;
    cancelled?: boolean;
}
const StyledLayout = styled.div<StyledLayoutProps>`
    padding: ${(props) => (props.noPadding ? '0 px' : '30px 20px 80px 20px')};

    @media ${({ theme }) => theme.breakpoint.tablet} {
        padding: ${(props) => (props.noPadding ? '0 px' : '30px 20px')};
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
