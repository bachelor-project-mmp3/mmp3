import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { device } from '../../../ThemeConfig';

interface EventFormProps {
    onSubmit: (e: any) => void;
    children: ReactNode;
}

export const EventForm = ({ onSubmit, children }: EventFormProps) => {
    return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export const StyledForm = styled.form``;
