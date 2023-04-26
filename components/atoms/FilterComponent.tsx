import React, { ReactNode } from 'react';
import styled from 'styled-components';
import FilterButton from './FilterButton';
import { Button } from './Button';
import Check from '../../public/icons/hakerl.svg';

type FilterType = 'campus' | 'date' | 'sortDate';

interface FilterComponentProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSubmit: () => void;
    onReset?: () => void;
    children: ReactNode;
    filterButtonChildren: ReactNode;
    type: FilterType;
}

const headlines = {
    campus: 'Filter by campus',
    date: 'Filter by date',
    sortDate: 'Sort by event date',
};

const FilterComponent: React.FC<FilterComponentProps> = ({
    children,
    onOpen,
    onClose,
    onSubmit,
    onReset,
    isOpen,
    filterButtonChildren,
    type,
}: FilterComponentProps) => {
    return (
        <Wrapper>
            {isOpen && (
                <>
                    <FakeBlur onClick={onClose} />
                    <OptionList type={type}>
                        <Headline>{headlines[type]}</Headline>
                        <SortListWrapper>{children}</SortListWrapper>
                        <ButtonWrapper>
                            {onReset && (
                                <Button onClick={onReset} variant="secondary">
                                    Reset
                                </Button>
                            )}
                            <Button onClick={onSubmit} variant="primary">
                                Save
                            </Button>
                        </ButtonWrapper>
                    </OptionList>
                </>
            )}

            <FilterButton onClick={onOpen} isOpen={isOpen}>
                {filterButtonChildren}
            </FilterButton>
        </Wrapper>
    );
};

export default FilterComponent;

const Wrapper = styled.div`
    @media ${(props) => props.theme.breakpoint.tablet} {
        position: relative;
    }
`;

interface OptionListProps {
    type: FilterType;
}

const OptionList = styled.div<OptionListProps>`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 120;
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
    box-shadow: 17px 17px 35px -11px ${({ theme }) => theme.darkGrey};

    @media ${(props) => props.theme.breakpoint.tablet} {
        top: 45px;
        bottom: auto;
        left: ${(props) => (props.type === 'campus' ? `0` : 'auto')};
        width: 280px;
        right: ${(props) => (props.type === 'campus' ? `auto` : '0')};
        border-radius: 10px;
        padding: 20px;
    }
`;

const Headline = styled.h2`
    text-align: center;

    @media ${(props) => props.theme.breakpoint.tablet} {
        display: none;
    }
`;

const SortListWrapper = styled.ul`
    padding: 0;
    max-height: 300px;
    overflow: scroll;
    display: initial;
`;

interface FilterItemProps {
    selected: boolean;
}

export const FilterItemWrapper = styled.li`
    position: relative;
    cursor: pointer;
    list-style: none;
`;

export const FilterItem = styled.div<FilterItemProps>`
    border-bottom: 1px solid ${({ theme }) => theme.midGrey};
    font-size: ${({ theme }) => theme.fonts.mobile.headline5};
    padding: 10px 50px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
        border: none;
        padding: 0 10px 15px;
    }

    ${(props) =>
        props.selected &&
        `
        font-weight: 800;
    `}
`;

const ButtonWrapper = styled.div`
    margin: 20px;
    display: flex;
    gap: 20px;
    justify-content: flex-end;

    @media ${(props) => props.theme.breakpoint.tablet} {
        justify-content: center;
        margin: 10px 0 0;
    }
`;

export const StyledCheck = styled(Check)`
    position: absolute;
    height: 19px;
    width: 19px;
    top: 50%;
    right: 20px;
    transform: translate(0, -50%);

    @media ${(props) => props.theme.breakpoint.tablet} {
        top: 31%;
    }
`;

const FakeBlur = styled.div`
    z-index: 110;
    position: fixed;
    backdrop-filter: blur(10px);
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;

    @media ${(props) => props.theme.breakpoint.tablet} {
        backdrop-filter: blur(0px);
    }
`;
