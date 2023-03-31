import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import Check from '../../../public/icons/hakerl.svg';
import FilterButton from '../../atoms/FilterButton';

interface SortByDateProps {
    onSubmit?: (filter: string) => void;
    children: ReactNode;
    currentSort?: string;
}

export const sortOptions = ['Sort by latest', 'Sort by event date'];

const SortByDate: React.FC<SortByDateProps> = ({
    children,
    onSubmit,
    currentSort,
}: SortByDateProps) => {
    const [showSortByList, setShowSortByList] = useState(false);
    const [preSettedSorting, setPreSettedSorting] = useState<
        string | undefined
    >(currentSort);

    return (
        <Wrapper>
            {showSortByList && (
                <>
                    <FakeBlur onClick={() => setShowSortByList(false)} />
                    <OptionList>
                        <Headline>Filter by campus</Headline>
                        <SortListWrapper>
                            {sortOptions.map((option) => (
                                <SortItemWrapper key={`${option}-filter-entry`}>
                                    <FilterItem
                                        selected={option === preSettedSorting}
                                        onClick={() =>
                                            setPreSettedSorting(option)
                                        }>
                                        {option}
                                    </FilterItem>
                                    {option === preSettedSorting && (
                                        <StyledCheck />
                                    )}
                                </SortItemWrapper>
                            ))}
                        </SortListWrapper>
                        <ButtonWrapper>
                            <Button
                                onClick={() => {
                                    onSubmit(preSettedSorting);
                                }}
                                variant="primary">
                                Save
                            </Button>
                        </ButtonWrapper>
                    </OptionList>
                </>
            )}

            <FilterButton
                onClick={() => setShowSortByList(true)}
                isOpen={showSortByList}>
                {children}
            </FilterButton>
        </Wrapper>
    );
};

export default SortByDate;

const Wrapper = styled.div`
    @media ${(props) => props.theme.breakpoint.tablet} {
        position: relative;
    }
`;

const OptionList = styled.div`
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
        left: auto;
        width: 280px;
        right: 0;
        border-radius: 10px;
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

const SortItemWrapper = styled.li`
    position: relative;
    cursor: pointer;
    list-style: none;
`;

const FilterItem = styled.div<FilterItemProps>`
    border-bottom: 1px solid ${({ theme }) => theme.midGrey};
    font-size: ${({ theme }) => theme.fonts.mobile.headline5};
    padding: 10px 50px;
    @media ${(props) => props.theme.breakpoint.tablet} {
        font-size: ${({ theme }) => theme.fonts.normal.smallParagraph};
        border: none;
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
        margin: 30px 0;
    }
`;

const StyledCheck = styled(Check)`
    position: absolute;
    height: 19px;
    width: 19px;
    top: 50%;
    right: 20px;
    transform: translate(0, -50%);
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
