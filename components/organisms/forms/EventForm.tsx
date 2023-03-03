import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface EventFormProps {
    onSubmit: (e: any) => void;
    children: ReactNode;
}

export const EventForm = ({ onSubmit, children }: EventFormProps) => {
    return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export const StyledForm = styled.form`
    max-width: 600px;
`;
