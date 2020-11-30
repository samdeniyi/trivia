import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from '../../../styles';
import { ErrorMessage } from 'formik';
import { number, object, func, string, bool } from 'prop-types';
import { InputWithValidation } from '../../../containers/InputContainer';

const PasswordBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${({ align }) => align || 'flex-start'};
    margin-top: ${({ marginTop }) => marginTop ? marginTop : 0};
    margin-bottom: 0;
`;

const ErrorBlock = styled(ErrorMessage)`
    font-size: 12px;
    font-family: ${fonts.main};
    color: ${colors.red};
    margin-top: 10px;

    ${({ disabled }) => disabled && css`
        display: none;
    `}
`;

const Password = styled(InputWithValidation)`
    &:first-child {
        margin-left: 0;
    }

    &:last-of-type {
        margin-right: 0;
    }

    border-radius: 10px;
    background-color: ${colors.border.default};
    margin-right: 6px;
    padding: 10px;
    border: 1px solid transparent;
    width: 100%;
    max-width: 50px;
    height: 50px;
    text-align: center;
    font-size: 30px;
    font-family: ${fonts.main};
    -moz-appearance: textfield;
    position: relative;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    ${({ valid }) =>
        valid && 
        css`
            &:focus:not(:disabled) {
                border-color: ${colors.border.active};
            }
        `
    }

    ${({ error }) =>
        error && 
        css`
            &:not(:disabled), 
            &:focus:not(:disabled) {
                border-color: ${colors.border.error};
            }
        `
    }
`;
    
export const PasswordGroup = ({
    type,
    name,
    startIndex,
    align,
    count, 
    errors, 
    touched,
    handleChange,
    enteredValue,
    disabled,
    marginTop
}) => {
    const range = (startIndex > count) ? (startIndex + count - 1) : count;

    const move = (event, id) => {
        const tempValue = event.target.value;
        event.target.value = tempValue.charAt(tempValue.length-1)
        let selectedInput;
        if (id === count) {
            selectedInput = ((event.which === 8) && (count - 1 > 0)) ? `${count - 1}` : `${count}`;
        } else if (id === range) {
            selectedInput = (event.which === 8) ? `${range - 1}` : `${range}`;
        } else {
            // selectedInput = ((event.which === 8) && (id - 1 > 0)) ? `${id - 1}` : `${id + 1}`;
            const temp = id;
            if((event.which === 8)) {
                selectedInput =`${id - 1}` 
            } 
            else if (event.target.value) {
                selectedInput = `${id + 1}`;
            }
            
            if(selectedInput <=0 ||  selectedInput > range || selectedInput === null ) {
                selectedInput = temp
            }

        };
        
        if (document.querySelector(`input[name=${name}`).value <= 0) {
            return;
        } else {
            document.getElementById(selectedInput) && document.getElementById(selectedInput).focus();
        };


    
        // if (event.target.value.length > 1) {
        //     event.target.value = event.target.value.slice(0, 1);
        // };

    };
    
    const generatedBlocks = [];
    for (let i = startIndex; i <= range; i++) {
        generatedBlocks.push(
            <Fragment key={i}>
                <Password
                    id={`${i}`}
                    type={type}
                    onKeyUp={(event) =>  move(event, i)}
                    onChange={handleChange}
                    value={(enteredValue === undefined) ? enteredValue : undefined}
                    inputMode={"numeric"}
                    name={name}
                    maxLength="1"
                    disabled={disabled}
                    autoComplete="new-password"
                    error={touched[name] && errors[name]}
                    valid={`${(touched[name] && !errors[name])}`}
                />
            </Fragment>
        );
    };

    return (
        <Fragment>
            <PasswordBlock align={align} marginTop={marginTop}>
                {generatedBlocks}
            </PasswordBlock>
            {(errors[name]) && (
                <ErrorBlock
                    disabled={disabled}
                    name={name}
                    style={{ marginLeft: "8px" }}
                    component="div"
                    className="form-error"
                /> 
            )}
        </Fragment>
    );
};

PasswordGroup.propTypes = {
    count:        number,
    type:         string,
    align:        string,
    errors:       object,
    touched:      object,
    startIndex:   number,
    handleChange: func,
    enteredValue: string,
    disabled:     bool,
    marginTop:    string
};

