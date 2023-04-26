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
    const [showInfoOnDateError, setShowInfoOnDateError] = useState(false);

    const today = new Date();
    const formattedTodayIsoString = today.toISOString().split('T')[0];

    const checkDateValidityBeforeSubmit = () => {
        if (preSettedFilterDate === 'Choose a specific date') {
            setShowInfoOnDateError(true);
            return;
        }
        if (!dateOptions.includes(preSettedFilterDate)) {
            const filterDate = new Date(preSettedFilterDate);
            if (!(filterDate instanceof Date)) {
                setShowInfoOnDateError(true);
                return;
            }

            const today = new Date();
            if (filterDate < today) {
                setShowInfoOnDateError(true);
                return;
            }
        }

        onSubmit(preSettedFilterDate);
    };

    return (
        <FilterComponent
            isOpen={showDateFilterList}
            filterButtonChildren={children}
            onOpen={() => setShowDateFilterList(true)}
            onClose={() => setShowDateFilterList(false)}
            onSubmit={() => {
                checkDateValidityBeforeSubmit();
            }}
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
                                            max="2030-01-01"
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
                                        {showInfoOnDateError && (
                                            <InvalidDateError>
                                                Please choose a valid date
                                            </InvalidDateError>
                                        )}
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

const InvalidDateError = styled.span`
    color: ${({ theme }) => theme.red};
    font-size: ${({ theme }) => theme.fonts.mobile.paragraph};
    font-weight: normal;
`;
