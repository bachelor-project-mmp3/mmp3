import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { dormitories } from '../forms/ProfileForm';
import { Button } from '../../atoms/Button';
import Check from '../../../public/icons/hakerl.svg';
import FilterButton from '../../atoms/FilterButton';

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
        <Wrapper>
            {showCampusFilterList && (
                <>
                    <FakeBlur onClick={() => setShowCampusFilterList(false)} />
                    <CampusList>
                        <Headline>Filter by campus</Headline>
                        <FilterListWrapper>
                            {dormitories.map((dormitory) => (
                                <FilterItemWrapper
                                    key={`${dormitory}-filter-entry`}>
                                    <FilterItem
                                        selected={
                                            dormitory === preSettedFilterCampus
                                        }
                                        onClick={() =>
                                            setPreSettedFilterCampus(dormitory)
                                        }>
                                        {dormitory}
                                    </FilterItem>
                                    {dormitory === preSettedFilterCampus && (
                                        <StyledCheck />
                                    )}
                                </FilterItemWrapper>
                            ))}
                        </FilterListWrapper>
                        <ButtonWrapper>
                            <Button
                                onClick={() => {
                                    setPreSettedFilterCampus(undefined);
                                    onSubmit(undefined);
                                }}
                                variant="secondary">
                                Reset
                            </Button>
                            <Button
                                onClick={() => onSubmit(preSettedFilterCampus)}
                                variant="primary">
                                Save
                            </Button>
                        </ButtonWrapper>
                    </CampusList>
                </>
            )}

            <FilterButton
                onClick={() => setShowCampusFilterList(true)}
                isOpen={showCampusFilterList}>
                {children}
            </FilterButton>
        </Wrapper>
    );
};

export default FilterCampus;

const Wrapper = styled.div`
    @media ${(props) => props.theme.breakpoint.tablet} {
        position: relative;
    }
`;

const CampusList = styled.div`
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
        left: 0;
        width: 280px;
        right: auto;
        border-radius: 10px;
        width: 300px;
    }
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
