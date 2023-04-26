import React, { ReactNode, useState } from 'react';
import FilterComponent, {
    FilterItem,
    FilterItemWrapper,
    StyledCheck,
} from '../../atoms/FilterComponent';

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
        <FilterComponent
            isOpen={showSortByList}
            filterButtonChildren={children}
            onOpen={() => setShowSortByList(true)}
            onClose={() => setShowSortByList(false)}
            onSubmit={() => onSubmit(preSettedSorting)}
            type="sortDate">
            <>
                {sortOptions.map((option) => (
                    <FilterItemWrapper key={`${option}-filter-entry`}>
                        <FilterItem
                            selected={option === preSettedSorting}
                            onClick={() => setPreSettedSorting(option)}>
                            {option}
                        </FilterItem>
                        {option === preSettedSorting && <StyledCheck />}
                    </FilterItemWrapper>
                ))}
            </>
        </FilterComponent>
    );
};

export default SortByDate;
