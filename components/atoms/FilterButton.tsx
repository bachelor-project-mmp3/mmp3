import React, { ReactNode } from 'react';
import styled from 'styled-components';
import FilterIcon from '../../public/icons/goBack.svg';

interface FilterButtonProps {
    children: ReactNode;
    onClick?: () => void;
    isOpen: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
    children,
    onClick,
    isOpen,
}: FilterButtonProps) => {
    return (
        <Root onClick={onClick}>
            {children} <StyledFilterIcon isOpen={isOpen} />
        </Root>
    );
};

export default FilterButton;

const Root = styled.div`
    position: relative;
    background-color: white;
    padding: 7px 10px;
    width: fit-content;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 8px 8px 20px -11px ${({ theme }) => theme.darkGrey};

    @media ${(props) => props.theme.breakpoint.tablet} {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 7px 15px;
    }
`;

interface FilterItemProps {
    isOpen: boolean;
}

const StyledFilterIcon = styled(FilterIcon)<FilterItemProps>`
    display: none;

    @media ${(props) => props.theme.breakpoint.tablet} {
        display: block;
        height: 16px;
        width: 16px;
        transform: ${(props) =>
            props.isOpen ? 'rotate(90deg)' : 'rotate(270deg)'};
    }
`;
