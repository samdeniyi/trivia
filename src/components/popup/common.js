import styled from "styled-components";
import { colors, fonts } from "../../styles";
import {LightRippleButton, RippleButton, RippleLabel} from "../button";
import { InputWithValidation } from '../../containers/InputContainer';
import { Message, Title, SecondaryText } from '../../containers/MessageContainer';
import CheckedIcon from '../../assets/checkmark.svg';

export const PopUp = styled.div`
    display: ${props => props.open ? 'flex' : 'none'};
    font-family: ${fonts.main};
    align-items: flex-end;
    justify-content: center;
    text-align: center;
    position: fixed;
    //top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: ${({ zIndex }) => zIndex || '1000'};
    padding: 8px;
    overflow: hidden;
    transition: opacity 0.5s linear;
    opacity: 1;
    animation: openPopup 0.3s ease-out;
    @keyframes openPopup {
        0% {
            transform: translateY(100%);
        }

        100% {
            transform: translateY(0%);
        }
`;

export const PopUpContent = styled.div`
    width: 100%;
    z-index: 2000;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${colors.white};
    box-shadow: rgba(0, 0, 0, 0.14) 0px 0px 4px, rgba(0, 0, 0, 0.28) 0px 4px 8px;
    transition: all 0.3s ease 0s;
`;

export const PopUpHeader = styled.h3`
    font-size: 14px;
    width: 100%;
    padding: ${({ padding }) => padding || '32px 8px'};
    color: ${colors.popup.header};
    border-bottom: 1px solid ${colors.border.bottom};
`;

const ActionButton = styled(RippleButton)`
    text-align: center;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    font-size: 14px;
    font-weight: lighter;
    margin: 0;
      &:active:after{
        content: "";
        display: none;
    }
`;

export const CancelButton = styled(LightRippleButton)`
    background-color: ${colors.popup.cancelButton};
    color: ${colors.red};
`;

export const ConfirmButton = styled(LightRippleButton)`
    background-color: ${colors.popup.cancelButton};
    text-align: center;
    color: ${colors.green};
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    font-size: 14px;
    font-weight: lighter;
`;

export const OkayCancelButton = styled(ActionButton)`
    color: ${colors.smoothGreyText};
    background-color: ${colors.popup.cancelButton};
`;

export const OptionList = styled.ul`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 400px;
`;

export const Item = styled.li`
    font-family: ${fonts.main};
    font-size: 14px;
    padding: 10px 1em;
    text-align: left;
    color: ${colors.themeTextColor3};
    position: relative;
    &:not(:first-of-type) {
        border-top: 1px solid ${colors.border.bottom};
    }

    & > button, & > a {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: unset;
        background: none;
        border: none;
        font-weight: unset;
        height: 2em;
        margin: 0;
        color: unset;
        text-align: left;
        outline: none;
        position: relative;
        & > svg {
            padding-right: 3px;
            padding-bottom: 3px;
            margin-right: 8px;
            width: 32px;
        }
    }
`;

export const LabelItem = styled(RippleLabel)`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: ${fonts.main};
    font-size: 14px;
    border-top: 1px solid ${colors.border.bottom};
    padding: 1em;
    text-align: left;
    color: ${colors.themeTextColor3};
    position: relative;
    cursor: pointer;
    & > svg {
        margin-right: 16px;
        width: 32px;
    }
    & > button, & > a {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: unset;
        background: none;
        border: none;
        font-weight: unset;
        height: unset;
        margin: 0;
        color: unset;
        text-align: left;
        position: relative;
        outline: none;
    }
`;

export const LabelText = styled.span`
    font-size: 14px;
`;

export const Radio = styled.input`
    position: absolute;
    top: 16px;
    right: 16px;
    margin: 0;
    cursor: pointer;
    appearance: none;
    &:focus {
        outline: none;
    }
    &:checked {
        &:after {
            content: url(${CheckedIcon});
            position: absolute;
            top: 8px;
            right: 8px;
        }
    }
`;

export const InfoMessage = styled(Message)`
    padding: ${({ padding }) => padding || '0 8px'};
    margin-bottom: ${({ bottom }) => bottom && '48px'};
`;

export const InfoHeader = styled(Title)``;

export const InputPopup = styled(InputWithValidation)`
    padding: 16px;
    margin: 16px;
    border-radius: 13px;
    width: calc(100% - 32px);
    height: inherit;
    margin-bottom: ${({ nobottom }) => nobottom ? '0' : '36px'};
`;

export const TextBlock = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AdditionalText = styled(SecondaryText)`
    margin: 0;
`;
