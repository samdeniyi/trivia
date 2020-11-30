import React, { useEffect, useState } from 'react';
import { bool, func, string } from 'prop-types';
import { useSelector } from 'react-redux';
import { listToAlphabetMap } from '../../../utils/sorting/alphabeticSort';
import { SlidingOverlay } from '../../../containers/OverlayContainer';
import { SearchHeader } from '../../header/search-header';
import { Close } from '../../../containers/HeaderContainer';
import { AlphabetList, AlphabetItems, AlphabetLetter, AlphabetSortedItems, ListCheckedRow, ListHeading } from '../../../containers/ListContainer';
import { FloatingButton, FloatingButtonWrapper } from '../../button';

export const SelectBank = ({
    open,
    setOpen,
    selectedBank,
    setSelectedBank,
    setFieldValue,
    fieldName
}) => {
    const [allBanks, setBanks] = useState([]);
    const [availableBanks, setAvailableBanks] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const banks = useSelector(state => state.account.wallet.availableBanks);
    const searchedAvailableBanks = availableBanks
        .filter(data => data.letter.toLowerCase().startsWith(searchValue.charAt(0).toLowerCase()));

    useEffect(() => {
        banks && setBanks(banks);
        banks && setAvailableBanks(listToAlphabetMap(banks.map(bank => bank["Name"])));
    }, [banks]);

    return open && (
        <SlidingOverlay>
            <SearchHeader noArrow title={"Bank Selection"} handleSearch={setSearchValue}>
                <Close left={"true"} onClick={() => setOpen(!open)} />
            </SearchHeader>
            <AlphabetList top={"8px"}>
            {searchedAvailableBanks && searchedAvailableBanks.map(({ letter, items }, index) => (
                <AlphabetItems
                    borderTop={"none"}
                    key={index}
                >
                    <AlphabetLetter>{letter}</AlphabetLetter>
                    {items && items.filter(bank => bank.includes(searchValue)).map((bank, index) => (
                        <AlphabetSortedItems 
                            key={index}
                            onClick={() => {
                                if (selectedBank && (bank === selectedBank.Name)) {
                                    setSelectedBank(undefined);
                                    setFieldValue(fieldName, undefined);
                                } else {
                                    const foundBank = allBanks.find(avBank => avBank.Name === bank);
                                    setSelectedBank(foundBank.Code);
                                    setFieldValue(fieldName, foundBank.Name);
                                };
                                setOpen(!open)
                            }}
                        >
                            <ListCheckedRow className={(selectedBank === bank) ? "active" : ""}>
                                <ListHeading noHeadingWrap>{bank}</ListHeading>
                            </ListCheckedRow>
                        </AlphabetSortedItems>
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

SelectBank.propTypes = {
    open: bool,
    setOpen: func,
    getAvailableBanks: func,
    selectedBank: string,
    setFieldValue: func,
    fieldName: string
};