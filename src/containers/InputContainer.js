import styled, { css } from 'styled-components';
import { colors, fonts } from '../styles';
import { Field } from 'formik';
import ChevronDownIcon from '../assets/chevron_down.svg';

export const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: ${({ top }) => top || null};
    margin-bottom: ${({ bottom }) => bottom || null};

    & > * {
        &:first-of-type {
            margin-top: 12px;
        }
        margin-bottom: 16px;
    }
`;

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
    border: 1px solid ${colors.white};
    border-radius: 8px;
    transition: all .1s linear;

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

export const TextareaInputBlock = styled(Field)`
    position: relative;
    width: 100%;
    font-size: 14px;
    border-radius: 8px;
    outline-color: transparent;
    background-color: ${colors.themeColor3};
    border: none;
    outline: none;
`;

export const InputWithValidation = styled(Field)`
    border: none;
    padding: ${({ countryselection }) => countryselection ? '0 64px' : '0'};
    height: 20px;
    font-size: 14px;
    width: 100%;
    position: relative;
    background-color: ${colors.border.default};
    outline: none;

    &:not(:placeholder-shown) {
        margin-top: 6px;
    }

    &:not(:placeholder-shown) + label {
        display: block;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 30px ${colors.border.default} inset !important;
    }
`;

export const OpenOverlaySelectBox = styled(InputLabelBlock)`
    position: relative;
    padding: 16px;
    cursor: pointer;
    font-family: ${fonts.main};
    font-size: 14px;
    font-weight: 100;
    color: ${colors.themeTextColor1};
    opacity: 50%;
    pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};

    &::after {
        content: url(${ ChevronDownIcon });
        position: absolute;
        width: 24px;
        height: 24px;
        text-align: center;
        cursor: pointer;
        right: 16px;
        top: 12px;
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