import React from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../../styles';
import { flags, countriesMap, countriesData } from '../../../data/countries';
import { bool, func, array, string } from 'prop-types';
import { SearchHeader } from '../../header/search-header';
import { SlidingOverlay } from '../../../containers/OverlayContainer';
import { Close } from '../../../containers/HeaderContainer';
import { Label, SecondaryText } from '../../../containers/MessageContainer';
import { List, ListItem, AlphabetList, AlphabetItems, AlphabetSortedItems, AlphabetLetter } from '../../../containers/ListContainer';
import { FloatingButton, FloatingButtonWrapper } from '../../button';

const CurrentCountry = styled(SecondaryText)`
    margin: 8px 0 8px 16px;
`;

const CurrentCountryInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const CountryName = styled(Label)`
    font-size: 14px;
    margin: 0 0 0 16px;
`;

const CountryCode = styled(Label)`
    position: absolute;
    right: 16px;
    top: 16px;
    margin: 0;

    ${({ selected }) => selected && css`
        color: ${colors.blue};
    `}
`;

const CountryFlag = styled.img`
    width: 24px;
    height: 24px;
`;

export const SelectCountryOverlay = ({
    open,
    setOpen,
    countriesInfo,
    currentCountry,
    setCountry
}) => {
    return open && (
        <SlidingOverlay>
            <SearchHeader placeholder={"Find country..."} noArrow title={"Country Selection"}>
                <Close left={"true"} onClick={() => setOpen(!open)} />
            </SearchHeader>
            <List top={"72px"}>
                <CurrentCountry top={"7.5px"}>Current Location</CurrentCountry>
                <ListItem top={"0"}>
                    <CurrentCountryInfo>
                        <CountryFlag 
                            src={flags.filter(flag => flag.customAbbreviation === currentCountry)[0].value}
                            alt={flags.filter(flag => flag.customAbbreviation === currentCountry)[0].label}
                        />
                        <CountryName top={"0"} bottom={"0"}>
                            {countriesMap.get(currentCountry).name}
                        </CountryName>
                        <CountryCode selected={true} top={"0"} bottom={"0"}>
                            {countriesMap.get(currentCountry).code}
                        </CountryCode>
                    </CurrentCountryInfo>
                </ListItem>
            </List>
            <AlphabetList top={"8px"}>
            {countriesInfo && countriesInfo.map(({ letter, items }, index) => (
                <AlphabetItems
                    borderTop={"none"}
                    key={index + 10}
                >
                    <AlphabetLetter>{letter}</AlphabetLetter>
                    {items && items.map((item, index) => (
                        <AlphabetSortedItems
                            key={index}
                            onClick={() => {
                                setCountry("country", flags.filter(flag => flag.label === item)[0].customAbbreviation)
                            }}
                        >
                            <CountryFlag 
                                src={countriesData.filter(country => country.name === item)[0].flag}
                                alt={item}
                            />
                            <CountryName>{item}</CountryName>
                            <CountryCode>{countriesData.filter(country => country.name === item)[0].code}</CountryCode>
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

SelectCountryOverlay.propTypes = {
    open:           bool,
    setOpen:        func,
    countriesInfo:  array,
    currentCountry: string,
    setCountry:     func
};