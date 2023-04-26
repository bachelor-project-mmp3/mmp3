import React, { ReactNode, useState } from 'react';
import { dormitories } from '../forms/ProfileForm';
import FilterComponent, {
    FilterItem,
    FilterItemWrapper,
    StyledCheck,
} from '../../atoms/FilterComponent';

interface FilterProps {
    onSubmit?: (filter: string) => void;
    children: ReactNode;
    currentFilter?: string;
}

const FilterCampus: React.FC<FilterProps> = ({
    children,
    onSubmit,
    currentFilter,
}: FilterProps) => {
    const [showCampusFilterList, setShowCampusFilterList] = useState(false);
    const [preSettedFilterCampus, setPreSettedFilterCampus] = useState<
        string | undefined
    >(currentFilter);

    return (
        <FilterComponent
            isOpen={showCampusFilterList}
            filterButtonChildren={children}
            onOpen={() => setShowCampusFilterList(true)}
            onClose={() => setShowCampusFilterList(false)}
            onSubmit={() => onSubmit(preSettedFilterCampus)}
            onReset={() => {
                setPreSettedFilterCampus(undefined);
                onSubmit(undefined);
            }}
            type="campus">
            <>
                {dormitories.map((dormitory) => (
                    <FilterItemWrapper key={`${dormitory}-filter-entry`}>
                        <FilterItem
                            selected={dormitory === preSettedFilterCampus}
                            onClick={() => setPreSettedFilterCampus(dormitory)}>
                            {dormitory}
                        </FilterItem>
                        {dormitory === preSettedFilterCampus && <StyledCheck />}
                    </FilterItemWrapper>
                ))}
            </>
        </FilterComponent>
    );
};

export default FilterCampus;
