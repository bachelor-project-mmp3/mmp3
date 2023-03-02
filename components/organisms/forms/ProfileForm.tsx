import React, { ReactNode } from 'react';
import { StyledForm } from './EventForm';

interface ProfileFormProps {
    onSubmit: (e: any) => void;
    children: ReactNode;
}

export const ProfileForm = ({ onSubmit, children }: ProfileFormProps) => {
    return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};
