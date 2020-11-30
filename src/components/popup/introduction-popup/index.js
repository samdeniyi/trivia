import React from "react";
import styled from "styled-components";
import { colors } from "../../../styles";
import { bool, string, func, object } from "prop-types";
import {
    PopUp,
    PopUpContent,
    InfoMessage,
    OkayCancelButton,
    InfoHeader,
    ConfirmButton,
    CancelButton
} from "../common";
import { Overlay, ActionBlock } from "../../../containers/OverlayContainer";


const UnderlinedContent = styled.h6`
    font-size: 12px;
    font-weight: bolder;
    color: ${colors.blue};
    line-height: 15px;
    letter-spacing: 0.02em;
    padding: 16px;
    margin-bottom: 48px;
    text-transform: uppercase;
`;

const Header = styled(InfoHeader)`
    font-weight: 700;
    margin-bottom: 16px;
`;

export const IntroductionPopup = ({
    open,
    title,
    Logo,
    message,
    underlinedContent,
    logoSpacing,
    cancel,
    confirm,
    withConfirmation,
    confirmText
}) => {
    return (
        <>
            {open && (
                <Overlay
                    onClick={cancel}
                    zIndex={"99999"}
                    bgc={"rgba(0, 0, 0, 45%)"}
                ></Overlay>
            )}
            <PopUp open={open} zIndex={"100000"}>
                <PopUpContent>
                    <Logo style={{ margin: logoSpacing }} />
                    <Header>{title}</Header>
                    <InfoMessage
                        bottom={underlinedContent ? null : "16px"}
                        padding={"0px 16px"}
                        top={"8px"}
                    >
                        {message}
                    </InfoMessage>
                    {underlinedContent && (
                        <UnderlinedContent>
                            {underlinedContent}
                        </UnderlinedContent>
                    )}
                    {withConfirmation ? (
                        <ActionBlock direction={"row"} top={"10px"}>
                            <CancelButton type="button" onClick={cancel}>
                                Cancel
                            </CancelButton>
                            <ConfirmButton type="submit" onClick={confirm}>
                                {confirmText ? confirmText : "Confirm"}  
                            </ConfirmButton>
                        </ActionBlock>
                    ) : (
                        <OkayCancelButton type="button" onClick={cancel}>
                            Okay, got it
                        </OkayCancelButton>
                    )}
                </PopUpContent>
            </PopUp>
        </>
    );
};

IntroductionPopup.propTypes = {
    open: bool,
    title: string,
    Logo: object,
    message: string,
    underlinedContent: string,
    logoSpacing: string,
    cancel: func,
    confirm: func,
    withConfirmation: bool,
    confirmText: string
};
