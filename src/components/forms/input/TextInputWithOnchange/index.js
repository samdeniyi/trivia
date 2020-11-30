import React from 'react';
import styled from 'styled-components';
import { string, bool, any, func, object } from 'prop-types';
import { ErrorMessage } from 'formik';
import { Clear } from '../../../../containers/HeaderContainer';
import { InputLabelBlock, InputWithValidation } from '../../../../containers/InputContainer';

const InputLabel = styled.label`
    font-size: 10px;
    position: absolute;
    top: 8px;
    height: 13px;
    margin-left: ${({ countryselection }) => countryselection ? "56px" : "0"};
    display: none; 
`;

// very similar to inputWithLabel component, but created instead of modifying that component to avoid introducing a breaking change accross the app

export const InputWithOnchange = props => {
    const {
        label,
        id,
        placeholder, 
        valid, 
        errors, 
        value, 
        name,
        width,
        right,
        left,
        top,
        height,
        readOnly,
        inputMode,
        type, 
        disabled,
        onKeyUp,
        onBlur,
        onFocus,
        onChange,
        countryselection,
        autoComplete,
        touched,
        setFieldValue,
        initialValues,
        noClearButton,
        as,
        maxLength,
        bottom,
        onKeyPress,
        pattern,
        step,
        list
    } = props;
    
    return (
        <InputLabelBlock left={left} right={right} id={id} height={height} width={width} valid={valid} error={errors} bottom={bottom} top={top}>
            <InputWithValidation
                placeholder={placeholder}
                countryselection={countryselection && countryselection.toString()}
                touched={touched && touched.toString()}
                inputMode={inputMode && inputMode.toString()}
                autoComplete={autoComplete && autoComplete.toString()}
                valid={valid && valid.toString()}
                errors={errors}
                readOnly={readOnly}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                onFocus={onFocus}
                onChange={onChange}
                value={value}
                name={name}
                as={as}
                type={type}
                disabled={disabled}
                maxLength={maxLength}
                onKeyPress={onKeyPress}
                pattern={pattern}
                step={step}
                list={list}
            />
            <InputLabel countryselection={countryselection} touched={touched && touched.toString()}>
                {label}
            </InputLabel>
            {(type === 'text' && touched && (!!noClearButton === false)) && (
                <Clear
                    right={"true"}
                    onClick={() => {
                        document.querySelector(`input[name=${name}]`).value = '';
                        setFieldValue(name, initialValues[name]);
                    }} 
                />
            )}
            <ErrorMessage
                name={name}
                component="div"
                className="form-error"
            />
        </InputLabelBlock>
    );
};

InputWithOnchange.propTypes = {
    label:            string.isRequired,
    placeholder:      string.isRequired,
    name:             string.isRequired,
    id:               string,
    countrySelection: string,
    autoComplete:     string,
    inputMode:        string,
    valid:            string,
    errors:           string,
    width:            string,
    height:           string,
    type:             string,
    right:            string,
    left:             string,
    top:              string,
    as:               string,
    noClearButton:    bool,
    readOnly:         bool,
    disabled:         bool,
    touched:          bool,
    onKeyUp:          func,
    onChange:         func,
    setFieldValue:    func,
    initialValues:    object,
    value:            any,
    list:             any
};