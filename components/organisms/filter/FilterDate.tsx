import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import Check from '../../../public/icons/hakerl.svg';
import FilterButton from '../../atoms/FilterButton';

const dateOptions = [
    'Today',
    'Tomorrow',
    'This week',
    'This month',
    'Choose a specific date',
];

interface FilterProps {
    onSubmit?: (filter: string) => void;
    children: ReactNode;
    currentFilter?: string;
}

const FilterDate: React.FC<FilterProps> = ({
    children,
    onSubmit,
    currentFilter,
}: FilterProps) => {
    const [showDateFilterList, setShowDateFilterList] = useState(false);
    const [preSettedFilterDate, setPreSettedFilterDate] = useState<
        string | undefined
    >(
        currentFilter !== undefined && !dateOptions.includes(currentFilter)
            ? 'Choose a specific date'
            : currentFilter
    );
    const [filterType, setSelectedFilterType] = useState<string | undefined>(
        currentFilter !== undefined && !dateOptions.includes(currentFilter)
            ? 'Choose a specific date'
            : currentFilter
    );
    const [inputDate, setinputDate] = useState<string | undefined>(
        currentFilter !== undefined && !dateOptions.includes(currentFilter)
            ? currentFilter
            : undefined
    );

    const today = new Date();
    const formattedTodayIsoString = today.toISOString().split('T')[0];

    return (
        <>
            {showDateFilterList && (
                <>
                    <FakeBlur onClick={() => setShowDateFilterList(false)} />
                    <DateOptions>
                        <Headline>Filter by date</Headline>
                        <FilterListWrapper>
                            {dateOptions.map((option) => {
                                return (
                                    <FilterItemWrapper
                                        key={`${option}-filter-entry`}>
                                        <FilterItem
                                            selected={option === filterType}
                                            onClick={() => {
                                                if (
                                                    option ===
                                                    'choose a specific date'
                                                ) {
                                                    setPreSettedFilterDate(
                                                        inputDate
                                                    );
                                                } else {
                                                    setPreSettedFilterDate(
                                                        option
                                                    );
                                                }
                                                setSelectedFilterType(option);
                                            }}>
                                            {option ===
                                            'Choose a specific date' ? (
                                                <InputWrapper>
                                                    {option}
                                                    <Input
                                                        type="date"
                                                        id="datefilter"
                                                        name="datefilter"
                                                        defaultValue={inputDate}
                                                        min={
                                                            formattedTodayIsoString
                                                        }
                                                        onChange={(e) => {
                                                            setSelectedFilterType(
                                                                'Choose a specific date'
                                                            );
                                                            setinputDate(
                                                                e.target.value
                                                            );
                                                            setPreSettedFilterDate(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </InputWrapper>
                                            ) : (
                                                option
                                            )}
                                        </FilterItem>
                                        {option === filterType && (
                                            <StyledCheck />
                                        )}
                                    </FilterItemWrapper>
                                );
                            })}
                        </FilterListWrapper>
                        <ButtonWrapper>
                            <Button
                                onClick={() => {
                                    setPreSettedFilterDate(undefined);
                                    setinputDate(undefined);
                                    setSelectedFilterType(undefined);
                                    onSubmit(undefined);
                                }}
                                variant="secondary">
                                Reset
                            </Button>
                            <Button
                                onClick={() => onSubmit(preSettedFilterDate)}
                                variant="primary">
                                Save
                            </Button>
                        </ButtonWrapper>
                    </DateOptions>
                </>
            )}

            <FilterButton
                onClick={() => setShowDateFilterList(true)}
                isOpen={showDateFilterList}>
                {children}
            </FilterButton>
        </>
    );
};

export default FilterDate;

const DateOptions = styled.div`
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
        top: 145px;
        bottom: auto;
        left: auto;
        right: auto;
        border-radius: 10px;
    }
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    width: fit-content;
`;

const Headline = styled.h2`
    text-align: center;

    @media ${(props) => props.theme.breakpoint.tablet} {
        display: none;
    }
`;

const FilterListWrapper = styled.ul`
    padding: 0;
    max-height: 300px;
    overflow: scroll;
    display: initial;
`;

interface FilterItemProps {
    selected: boolean;
}

const FilterItemWrapper = styled.li`
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
        font-weight: bold;
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

interface FilterItemProps {
    isOpen: boolean;
}

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
