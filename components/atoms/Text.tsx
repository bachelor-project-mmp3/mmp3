import { ReactNode } from 'react';
import styled from 'styled-components';

interface TextProps {
    children: ReactNode;
}
export const Text = ({
    children,
}: TextProps) => {
    return (
        <>
            <StyledText>{children}</StyledText>
        </>
    );
};
const StyledText = styled.p`
    padding-bottom: 10px;
`;

export default Text;