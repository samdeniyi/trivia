import React from 'react';
import { CancelButton, PopUp, PopUpContent, PopUpHeader, InfoMessage, ConfirmButton } from "../common";
import { Overlay, ActionBlock } from "../../../containers/OverlayContainer";
import { string, func, bool } from 'prop-types';

export const InfoPopupDialog = ({
    open,
    title,
    message,
    children,
    withConfirmation,
    confirm,
    confirmText,
    padding,
    messagePadding,
    cancel
}) => {
    return (
        <PopUp open={open}>
            {open && <Overlay bgc={"rgba(0, 0, 0, 0.45)"} onClick={cancel} />}
            <PopUpContent>
                <PopUpHeader padding={padding}>{title}</PopUpHeader>
                <InfoMessage padding={messagePadding} bottom>{message}</InfoMessage>
                {children}
                {withConfirmation ? (
                        <ActionBlock direction={"row"} >
                            <CancelButton type="button" onClick={cancel}>
                                Cancel
                            </CancelButton>
                            <ConfirmButton type="submit" onClick={confirm}>
                                {confirmText ? confirmText : "Confirm"}  
                            </ConfirmButton>
                        </ActionBlock>
                    ) : (
                        <CancelButton type="button" onClick={cancel}>Cancel</CancelButton>
                    )}
            </PopUpContent>
        </PopUp> 
    );
};

InfoPopupDialog.propTypes = {
    open:    bool,
    withConfirmation: bool,
    confirmText: string,
    title:   string,
    message: string,
    padding: string,
    messagePadding: string,
    cancel:  func
};