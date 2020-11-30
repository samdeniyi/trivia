import React, { Fragment } from 'react';
import { string, bool, any } from 'prop-types';
import { InputLabelBlock, TextareaInputBlock } from '../../../../containers/InputContainer';
import { ErrorMessage } from 'formik';

export const TextareaWithLabel = (props) => {
    const {
        placeholder, 
        valid, 
        errors, 
        value, 
        name,
        disabled,
        height
    } = props;
    
    return (
        <Fragment>
            <InputLabelBlock height={height} valid={valid} error={errors}>
                <TextareaInputBlock
                    placeholder={placeholder}
                    valid={valid && valid.toString()}
                    errors={errors}
                    value={value}
                    name={name}
                    component={"textarea"}
                    disabled={disabled}
                />      
                <ErrorMessage
                    name={name}
                    component="div"
                    className="form-error"
                />
            </InputLabelBlock>
        </Fragment>
    );
};

TextareaWithLabel.propTypes = {
    placeholder: string.isRequired,
    name:        string.isRequired,
    valid:       string,
    errors:      string,
    disabled:    bool,
    value:       any
};