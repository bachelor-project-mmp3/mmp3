import styled from 'styled-components';
import React from 'react';
import Image from 'next/image';

interface QuoteProps {
    title?: string;
    subtitle?: string;
    text?: string;
}
export const Quote: React.FC<QuoteProps> = ({
    title,
    subtitle,
    text,
}: QuoteProps) => {
    return (
        <>
            <BackgroundWrapper>
                <MobileImage
                    src={'/images/background_quote_mobile.svg'}
                    alt="Image"
                    fill
                    sizes="100"
                    style={{ objectFit: 'cover' }}
                />
                <DesktopImage
                    src={'/images/background_quote_desktop.svg'}
                    alt="Image"
                    fill
                    sizes="100"
                    style={{ objectFit: 'cover' }}
                />

                <Content>
                    <StyledTitle>
                        <strong>&quot;{title}&quot;</strong>
                    </StyledTitle>
                    {subtitle && (
                        <StyledSubtitle>
                            <em>{subtitle}</em>
                        </StyledSubtitle>
                    )}
                    {text && <StyledText>{text}</StyledText>}
                </Content>
            </BackgroundWrapper>
        </>
    );
};
const BackgroundWrapper = styled.div`
    width: 100%;
    min-height: 600px;
    position: relative;
    background-image: url('images/background_quote.svg');
    background: ${({ theme }) => theme.body};
`;

const StyledTitle = styled.p`
    text-align: center;
    font-weight: 800;
    margin: 0;
    font-size: ${({ theme }) => theme.fonts.mobile.paragraph};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.paragraph};
    }
`;

const StyledSubtitle = styled.p`
    text-align: center;
    font-size: ${({ theme }) => theme.fonts.mobile.smallParagraph};
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.info};
    }
`;

const StyledText = styled.p`
    text-align: center;
`;

const Content = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
