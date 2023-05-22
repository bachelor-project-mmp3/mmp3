import React from 'react';
import styled from 'styled-components';
import FilterIcon from '../../public/icons/goBack.svg';

const Pagination: React.FC<{
    eventsPageIndex: number;
    eventsPageCount: number;
    setEventsPageIndex: (number) => void;
}> = ({ eventsPageIndex, eventsPageCount, setEventsPageIndex }) => {
    return (
        <StyledPagination>
            <PaginationEvents>
                <PaginationAction
                    onClick={
                        eventsPageIndex !== 1
                            ? () => {
                                  setEventsPageIndex(eventsPageIndex - 1);
                              }
                            : null
                    }
                    disabled={eventsPageIndex === 1}>
                    <StyledFilterIcon option="prev" />
                    Prev
                </PaginationAction>
                <PaginationPageCount>{`${eventsPageIndex}/${eventsPageCount}`}</PaginationPageCount>
                <PaginationAction
                    onClick={
                        eventsPageIndex !== eventsPageCount
                            ? () => {
                                  setEventsPageIndex(eventsPageIndex + 1);
                              }
                            : null
                    }
                    disabled={eventsPageIndex === eventsPageCount}>
                    Next
                    <StyledFilterIcon option="next" />
                </PaginationAction>
            </PaginationEvents>
        </StyledPagination>
    );
};

export default Pagination;

const PaginationEvents = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    font-weight: bold;
    margin: 10px 0 20px 0;
    font-size: ${({ theme }) => theme.fonts.mobile.paragraph};

    @media ${({ theme }) => theme.breakpoint.tablet} {
        justify-content: flex-start;
        margin-left: 10px;
        font-size: ${({ theme }) => theme.fonts.normal.paragraph};
        gap: 30px;
    }
`;

const PaginationPageCount = styled.div``;

const StyledPagination = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    @media ${({ theme }) => theme.breakpoint.tablet} {
        justify-content: start;
    }
`;

const PaginationAction = styled.div<PaginationActionProps>`
    display: flex;
    align-items: center;
    color: ${(props) => `${props.theme.primary}`};
    cursor: pointer;

    ${(props) =>
        !props.disabled &&
        `
        :hover {
            color: ${props.theme.hoverPrimary};
        }
    `}
    ${(props) =>
        props.disabled &&
        `
        color: ${props.theme.midGrey};
        cursor: auto;
    `}
`;

interface PaginationIconProps {
    disabled: boolean;
    option: 'prev' | 'next';
}

interface PaginationActionProps {
    disabled: boolean;
}

const StyledFilterIcon = styled(FilterIcon)<PaginationIconProps>`
    height: 16px;
    width: 16px;

    transform: ${(props) =>
        props.option === 'prev' ? 'rotate(0deg)' : 'rotate(180deg)'};

    @media ${({ theme }) => theme.breakpoint.tablet} {
        height: 20px;
        width: 20px;
    }
`;
