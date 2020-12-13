import styled, { css } from 'styled-components';
import { colors, fonts } from '../constants';
import { Field } from 'formik';

export const InputLabelBlock = styled.div`
    position: relative;
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '48px'};
    padding: ${({ textCenter }) => textCenter ? '14px 0' : '14px'};
    margin-top: ${({ top }) => top || null};
    margin-bottom: ${({ bottom, error }) => bottom ? (!error ? bottom : `calc(${bottom} + 16px)`) : (!error ? '16px' : '32px')};
    margin-right: ${({ right }) => right || '0px'};
    margin-left: ${({ left }) => left || '0px'};
    background-color: ${colors.border.default};
    height: 69px;
    padding: 15px 63.5px 12px 14.3px;
    border-radius: 12px;
    box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    transition: all .1s linear;
    padding-top: 30px;

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

    &:focus:not(:disabled) {
        border-color: ${colors.border.active};
    }

    &:not(:disabled) .form-error {
        font-family: ${fonts.main};
        font-size: 12px;
        color: ${colors.red};
        position: relative;
        top: 16px;
        right: 16px;
    }

    &:disabled .form-error {
        display: none;
    }

    &::placeholder, &:disabled {
        opacity: .5;
    }
    
`;

export const InputWithValidation = styled(Field)`
    border: none;
    padding: ${({ countryselection }) => countryselection ? '0 64px' : '0'};
    height: 20px;
    font-size: 14px;
    width: 100%;
    position: relative;
    outline: none;

    ::placeholder {
      color: #111111;
      font-size: 12px;
      background-color: '#fff !important';
    }

    &:not(:placeholder-shown) {
        background-color: #fff;
    }

    &:not(:placeholder-shown) + label {
        display: block;
        background-color: #fff;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 30px ${colors.border.default} inset !important;
    }
`;

export const CustomInput = styled.input`
    border: none;
    line-height: 18px;
    font-size: 14px;
    width: 100%;
    position: relative;
    background-color: ${colors.border.default};
    outline: none;
    padding: 16px;
    border-radius: 13px;

    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 30px ${colors.border.default} inset !important;
    }
`;