import React, { Fragment } from "react";
import styled from "styled-components";
import { string, bool, func } from "prop-types";
import { ConfirmButton, InfoMessage } from "../common";
import { RippleButton } from "../../button";
import { colors } from "../../../styles";

import { Overlay, ActionBlock } from "../../../containers/OverlayContainer";
import {
    PopUp,
    PopUpContent,
    PopUpHeader,
    OptionList,
    CancelButton,
    Item
} from "../common";
import { ReactComponent as ArrowIcon } from "../../../assets/arrow.svg";
import { ReactComponent as SpacesSVG } from "../../../assets/spaces_icon.svg";

const ArrowForward = styled(ArrowIcon)`
    position: absolute;
    right: 0;
`;

const ModifiedInfoMessage = styled(InfoMessage)`
    text-align: start;
    margin-left: 5%;
    padding: 0;
`;
const ModifiedPopUpHeader = styled(PopUpHeader)`
    font-weight: 600;
    font-size: 12px;
`;

const SpacesIcon = styled(SpacesSVG)`
    height: 16px;
    weight: 16px;
`;

const Title = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin: 25px 5%;
    text-align: start;
`;

const Logo = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${colors.background.logo};
    overflow: hidden;
    margin-right: 15px;
`;

const LogoImage = styled.div`
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AgentNetworkPopupDialog = ({
    open,
    title,
    desc,
    cancel,
    confirm,
    setOpenInfo
}) => {
    return (
        <Fragment>
            {open && (
                <Overlay
                    onClick={cancel}
                    bgc={"rgba(0, 0, 0, 0.45)"}
                    zIndex={"99999"}
                ></Overlay>
            )}
            <PopUp open={open} zIndex={"100000"}>
                <PopUpContent>
                    <ModifiedPopUpHeader>
                        Terms & Conditions
                    </ModifiedPopUpHeader>
                    <ModifiedInfoMessage>{desc}</ModifiedInfoMessage>
                    <Title>Primary Network</Title>
                    <OptionList>
                        <Item>
                            <RippleButton
                                type={"button"}
                                onClick={() => setOpenInfo(true)}
                            >
                                <Logo>
                                    <LogoImage>
                                        <SpacesIcon />
                                    </LogoImage>
                                </Logo>
                                {title}
                                <ArrowForward />
                            </RippleButton>
                        </Item>
                    </OptionList>
                    <ActionBlock direction={"row"} top={"16px"}>
                        <CancelButton type="button" onClick={cancel}>
                            Cancel
                        </CancelButton>
                        <ConfirmButton type="submit" onClick={confirm}>
                            Continue
                        </ConfirmButton>
                    </ActionBlock>
                </PopUpContent>
            </PopUp>
        </Fragment>
    );
};

AgentNetworkPopupDialog.propTypes = {
    open: bool,
    cancel: func,
    title: string,
    desc: string,
    confirm: func,
    setOpenInfo: func
};
