import React, {  useState } from "react";
import styled from 'styled-components';
import { arrayOf, string, bool, shape, func, object } from 'prop-types';
import { colors, fonts } from '../../../styles';

import { SearchHeader } from '../../header/search-header';
import { SlidingOverlay } from "../../../containers/OverlayContainer"
import { ListCheckedRow } from '../../../containers/ListContainer';
import { SubTitle } from '../../../containers/MessageContainer';
import { Close } from '../../../containers/HeaderContainer';
import { FloatingButton, FloatingButtonWrapper } from "../../button";

const AlphabetList = styled.ul`
    display: flex;
    flex-direction: column;
`;

const AlphabetItems = styled.li`
    flex-direction: column;
    margin: 0;
    padding: 0;
`;

const SortedItems = styled(ListCheckedRow)`
    padding: 16px;
    margin-left: 0;
    border-top: 1px solid ${colors.border.top};
    border-bottom: 1px solid ${colors.border.bottom};
    position: relative;
    font-size: 14px;
    font-family: ${fonts.main};
`;

const AlphabetLetter = styled(SubTitle)`
    font-weight: 100;
    margin: 24px 16px;
`;

export const SortedSelectOverlay = ({
    name,
    open,
    title,
    setValue,
    selectedLabels,
    sortedList,
    setOpen
}) => {
    const [searchValue, setSearchValue] = useState("");
    const searchedSortedList = sortedList.filter(data => data.letter.toLowerCase().startsWith(searchValue.charAt(0).toLowerCase()));

    return open && (
        <SlidingOverlay style={{ margin: 0 }}>
            <SearchHeader noArrow={true} placeholder={"Select a business category..."} title={title} handleSearch={setSearchValue}>
                <Close left={"true"} onClick={setOpen} />
            </SearchHeader>
            <AlphabetList>
            {searchedSortedList.map(({ letter, items }, index) => (
                <AlphabetItems borderTop={"none"} key={index + 10}>
                    <AlphabetLetter>{letter}</AlphabetLetter>
                    {items && items.toLocaleString()
                        .split(',')
                        .filter(item => item.includes(searchValue.toLowerCase()))
                        .map(
                            (item, index) => (
                            <SortedItems  
                                key={index}
                                onClick={(event) => {
                                    if (event.target.classList.contains("active")) {
                                        const newTypes = selectedLabels.current.filter(type => type !== item);
                                        selectedLabels.current = newTypes;
                                        setValue(name, newTypes);
                                        event.target.classList.remove("active");
                                    } else {
                                        event.target.classList.add("active");
                                        
                                        if (!selectedLabels.current.includes(item)) {
                                            const newLabels = selectedLabels.current.concat(item);
                                            selectedLabels.current = newLabels;
                                            setValue(name, newLabels);
                                        };
                                    }
                                }}
                            >
                                {item}
                            </SortedItems>
                        ))}
                </AlphabetItems>
            ))}
            </AlphabetList>
            <FloatingButtonWrapper>
                <FloatingButton type={"button"} onClick={() => setOpen(!open)}>Done</FloatingButton>
            </FloatingButtonWrapper>
        </SlidingOverlay>
    );
};

SortedSelectOverlay.propTypes = {
    open:           bool,
    title:          string,
    setOpen:        func,
    setValue:       func,
    selectedLabels: object,
    sortedList: 
        arrayOf(
            shape({
                letter: string,
                items: arrayOf(string)
            })
        )
};