import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import FilterComponent, {
    FilterItem,
    FilterItemWrapper,
    StyledCheck,
} from '../../atoms/FilterComponent';

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
        <FilterComponent
            isOpen={showDateFilterList}
            filterButtonChildren={children}
            onOpen={() => setShowDateFilterList(true)}
            onClose={() => setShowDateFilterList(false)}
            onSubmit={() => onSubmit(preSettedFilterDate)}
            onReset={() => {
                setPreSettedFilterDate(undefined);
                setinputDate(undefined);
                setSelectedFilterType(undefined);
                onSubmit(undefined);
            }}
            type="sortDate">
            <>
                {dateOptions.map((option) => {
                    return (
                        <FilterItemWrapper key={`${option}-filter-entry`}>
                            <FilterItem
                                selected={option === filterType}
                                onClick={() => {
                                    if (option === 'choose a specific date') {
                                        setPreSettedFilterDate(inputDate);
                                    } else {
                                        setPreSettedFilterDate(option);
                                    }
                                    setSelectedFilterType(option);
                                }}>
                                {option === 'Choose a specific date' ? (
                                    <InputWrapper>
                                        {option}
                                        <Input
                                            type="date"
                                            id="datefilter"
                                            name="datefilter"
                                            defaultValue={inputDate}
                                            min={formattedTodayIsoString}
                                            onChange={(e) => {
                                                setSelectedFilterType(
                                                    'Choose a specific date'
                                                );
                                                setinputDate(e.target.value);
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
                            {option === filterType && <StyledCheck />}
                        </FilterItemWrapper>
                    );
                })}
            </>
        </FilterComponent>
    );
};

export default FilterDate;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    width: fit-content;
`;
