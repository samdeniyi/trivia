import React, { Fragment } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import { string, bool, func } from "prop-types";

import {PopUp} from './styles';
import { Overlay, ActionBlock } from "../../../containers/OverlayContainer";
import {
  PopUpContent,
  PopUpHeader,
  OptionList,
  CancelButton,
  InfoMessage,
  ConfirmButton,
} from "../../../components/popup/common";
import History from "../../../utils/History";

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
    padding-left: 10px;
    padding-right: 10px;
    max-height: 30vh;
    overflow: scroll;
`;


const TermsDialog = ({
  open,
  desc,
  cancel,
  email,
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
            Hold on!
          </ModifiedPopUpHeader>
          <ModifiedInfoMessage>{desc}</ModifiedInfoMessage>
          <TermsText>
            <p>Are you sure you want to cance this game?</p>

            <p>Cancelling this game will mean a forfieture for the day.</p>

            <p>You will have to come back and play tomorrow.</p>
          </TermsText>

          <OptionList>

          </OptionList>
          <ActionBlock direction={"row"}>
            <ConfirmButton onClick={cancel}>
              Continue
            </ConfirmButton>
            <CancelButton type="button" onClick={() => History.push('/games')}>
              Leave Game
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

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(TermsDialog);
