import React, { useState } from 'react';
import styled from 'styled-components';
import { string, func, arrayOf, shape, bool } from 'prop-types';
import { ReactComponent as SelectArrow } from '../select/assets/arrow.svg';
import { colors, fonts } from '../../../../styles';
import { countriesMap, flags } from '../../../../data/countries';
import { InputLabelBlock } from '../../../../containers/InputContainer';

const CustomDropdownArrow = styled(SelectArrow)`
    width: 20px;
    height: 20px;
    padding-right: 6px;
    padding-top: 8px;
    padding-left: 4px;
    cursor: pointer;
`;

const SelectBlock = styled.div`
    position: relative;
`;

const CountryDropdown = styled.div`
    display: flex;
    flex-direction: column;
    width: 48px;
    margin-top: -16px;
    position: relative;
    border-radius: 6px;
    padding: 8px 0;
    background-color: ${colors.themeColor3};

    & > img {
        &:not(:last-of-type) {
            margin-bottom: 8px;
        }
    }
`;

const SelectCountryContainer = styled(InputLabelBlock)`
    padding: 8px 16px;
    margin-bottom: 0;
`;

const DisplayLabel = styled.span`
    margin-left: 8px;
    color: ${colors.themeTextColor3};
    font-size: 14px;
    font-family: ${fonts.main};
`;

const CurrentCountryFlag = styled.img`
    cursor: pointer;
`;

const CountryToSelect = styled.img`
    cursor: pointer;
`;

export const SelectCountry = ({
    value,
    name,
    handleChange,
    disabled = false
}) => {
    const [openCountryDropdown, setOpenCountryDropdown] = useState(false);

    return (
        <SelectBlock style={{ 
            pointerEvents: disabled ? 'none' : 'auto', 
            opacity: disabled ? '0.7' : '1'
        }}>
            <SelectCountryContainer>
                <CurrentCountryFlag 
                    src={value ? flags.find(flag => flag.customAbbreviation === value).value : flags[0].value}
                    alt={value ? countriesMap.get(value).name : flags[0].label}
                />
                <CustomDropdownArrow onClick={() => setOpenCountryDropdown(!openCountryDropdown)} />
                <DisplayLabel>{value ? countriesMap.get(value).name : flags[0].label}</DisplayLabel>
            </SelectCountryContainer>
            {openCountryDropdown && (
                <CountryDropdown>
                    {flags.map((flag, index) => (
                        <CountryToSelect 
                            alt={flag.label} 
                            src={flag.value} 
                            key={index}
                            onClick={() => {
                                setOpenCountryDropdown(!openCountryDropdown);
                                handleChange(name, flag.customAbbreviation);
                            }}
                        />
                    ))}
                </CountryDropdown>
            )}
        </SelectBlock>
    );
};

SelectCountry.propTypes = {
    name:         string,
    errors:       string,
    valid:        string,
    error:        string,
    handleChange: func,
    disabled:     bool,
    options:      arrayOf(shape({ value: string, label: string })),
};