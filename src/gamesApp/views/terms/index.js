import React, { Fragment } from "react";
import styled from "styled-components";
import { string, bool, func } from "prop-types";

import { Overlay, ActionBlock } from "../../../containers/OverlayContainer";
import {
  PopUp,
  PopUpContent,
  PopUpHeader,
  OptionList,
  CancelButton,
  InfoMessage,
} from "../../../components/popup/common";

const ModifiedInfoMessage = styled(InfoMessage)`
    text-align: start;
    margin-left: 5%;
    padding: 0;
`;
const ModifiedPopUpHeader = styled(PopUpHeader)`
    font-weight: 600;
    font-size: 12px;
`;

const TermsText = styled.div`
    font-size: 12px;
    text-align: left;
    padding: 10px;
`;


const TermsDialog = ({
  open,
  desc,
  cancel,
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
            Terms &amp; Conditions
          </ModifiedPopUpHeader>
          <ModifiedInfoMessage>{desc}</ModifiedInfoMessage>
          <TermsText>
            <h3>1. Welcome to Spaces020!</h3>
            <small>Thank you for using Spaces020 (“Spaces020”, “we”, “us”, “our”). </small>
            <small>These Terms and Conditions (“Terms”) are applicable to our website
            (https://www.spaces020.com) and software/mobile application (“App”), all owned and
            operated by Rensource Distributed Energy Limited (“Rensource” or the “Company”) from or
            in connection with which you are accessing this Terms.</small>
          </TermsText>

          <OptionList>

          </OptionList>
          <ActionBlock direction={"row"} top={"16px"}>
            <CancelButton type="button" onClick={cancel}>
              Cancel
            </CancelButton>
          </ActionBlock>
        </PopUpContent>
      </PopUp>
    </Fragment>
  );
};

TermsDialog.propTypes = {
  open: bool,
  cancel: func,
  title: string,
  desc: string,
  confirm: func,
  setOpenInfo: func
};

export default TermsDialog;
