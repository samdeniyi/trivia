import React, { Fragment } from 'react';
import styled from 'styled-components';
import Select, { components } from 'react-select';
import { Field } from 'formik';
import { string, func, shape, arrayOf, any, bool } from 'prop-types';
import { colors, fonts } from '../../../../styles';
import { ReactComponent as SelectArrow } from './assets/arrow.svg';

const CustomDropdownArrow = styled(SelectArrow)`
    width: 20px;
    height: 20px;
    padding-right: 10px;
    cursor: pointer;
`;

const SelectBlock = styled(Field)`
    position: relative;
    //margin-bottom: 16px;
`;

const ErrorMessage = styled.div`
    color: ${colors.red};
    font-family: ${fonts.main};
    font-size: 12px;
    font-weight: 400;
`;

const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <CustomDropdownArrow></CustomDropdownArrow>
        </components.DropdownIndicator>
    );
};

export const SelectBox = ({ 
    name, 
    options,
    placeholder,
    handleChange,
    valid,
    value,
    errors,
    disabled = false
}) => {

    return (
        <Fragment>
            <SelectBlock
                name={name}
                options={options}
                component={Select}
                value={value && options && options.filter(option => option.label === value)}
                placeholder={placeholder}
                valid={valid}
                errors={errors}
                onChange={selected => handleChange(name)(selected.label)}
                components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (provided) => ({
                        ...provided,
                        fontSize: '14px',
                        fontFamily: fonts.main,
                        borderColor: colors.white,
                        boxShadow: 0,
                        backgroundColor: colors.border.default,
                        padding: '5px',
                        borderRadius: '8px',
                        color: colors.themeTextColor3,
                        pointerEvents: disabled ? 'none' : 'auto',
                        opacity: disabled ? '0.7' : '1',
                        
                        '&:focus, &:hover': {
                            borderColor: colors.white
                        }
                    }),
                    menu: (styles) => {
                        return {
                            ...styles,
                            position: 'relative',
                            bottom: '.5em'
                        }
                    },
                    placeholder: (styles) => {
                        return {
                            ...styles,
                            opacity: '50%',
                        }
                    },
                    menuList: (styles) => {
                        return {
                            ...styles,
                            backgroundColor: colors.border.default,
                            border: `1px solid ${colors.white}`,
                            borderRadius: '8px',
                            color: colors.themeTextColor3,
                            fontSize: '14px',
                            fontFamily: fonts.main,
                            padding: '10px',
                            cursor: 'pointer'
                        }
                    },
                    option: (styles, { isDisabled }) => {
                        return {
                            ...styles,
                            backgroundColor: 'transparent' ,
                            color: colors.themeTextColor3,
                            opacity: isDisabled ? '50%' : '100%',
                            cursor: isDisabled ? 'not-allowed' : 'default',
                            fontSize: '14px',
                            fontFamily: fonts.main,
                            
                            '&:hover': {
                                backgroundColor: 'transparent'
                            }
                        };
                    }
                }}
            />
            {errors && (<ErrorMessage>{errors}</ErrorMessage>)}
        </Fragment>
    );
};

SelectBox.propTypes = {
    name:             string,
    placeholder:      string,
    handleChange:     func,
    setSelectedValue: func,
    valid:            string,
    value:            any,
    errors:           string,
    disabled:         bool,
    options:          arrayOf(shape({ value: string, label: string }))
};