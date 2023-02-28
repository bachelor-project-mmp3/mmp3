import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { device } from '../../../ThemeConfig';

interface ProfileFormProps {
    onSubmit: (e: any) => void;
    children: ReactNode;
}

export const ProfileForm = ({ onSubmit, children }: ProfileFormProps) => {
    return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export const StyledForm = styled.form`
    @media ${device.tablet} {
        padding: 0 25%;
    }
`;
