import React from 'react';
import { PopUp, PopUpContent, PopUpHeader } from '../common';
import { Overlay } from '../../../containers/OverlayContainer';
import styled from 'styled-components';
import { colors } from '../../../styles';
import { bool, string, shape, func, arrayOf } from 'prop-types';
import {LightRippleButton} from '../../button';

const ConfirmationText = styled.h4`
    font-size: 14px;
    width: 100%;
    color: ${colors.popup.header};
    border-bottom: 1px solid ${colors.border.bottom};
    padding: 14.5px 16px 15px 16px;
    text-align: center;
`;

const ConfirmOptions = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: ${colors.popup.cancelButton};
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    font-size: 14px;
    font-weight: lighter;
    margin: 0;
`;

const ConfirmOption = styled(LightRippleButton)`
    &:first-of-type {
        color: ${colors.popup.reject};
    }

    &:last-of-type {
        color: ${colors.popup.confirm};
    }

    margin: 0;
    background: transparent;
    font-weight: unset;
`;

export const ConfirmPopupDialog = ({
    open,
    title,
    confirmationText,
    answers,
    cancel
}) => {
    return (
        <>
            {open && (<Overlay zIndex={'99999'} bgc={'rgba(0, 0, 0, 45%)'} onClick={cancel}/>)}
            <PopUp open={open} zIndex={'100000'}>
                <PopUpContent>
                    <PopUpHeader>{title}</PopUpHeader>
                    <ConfirmationText>{confirmationText}</ConfirmationText>
                    <ConfirmOptions>
                        {answers.map(({ variant, action }, index) => (
                            <ConfirmOption key={index} onClick={action}>
                                {variant}
                            </ConfirmOption>
                        ))}
                    </ConfirmOptions>
                </PopUpContent>
            </PopUp>
        </>
    )
};

ConfirmPopupDialog.propTypes = {
    open:             bool,
    title:            string,
    confirmationText: string,
    cancel:           func,
    answers:
        arrayOf(shape({
            variant: string,
            action: func
        }))
};