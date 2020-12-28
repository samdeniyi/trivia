import React, { Fragment } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import { string, bool, func } from "prop-types";

import { PopUp } from './styles';
import { Overlay, ActionBlock } from "../../../containers/OverlayContainer";
import {
  PopUpContent,
  PopUpHeader,
  OptionList,
  InfoMessage,
  OkayCancelButton,
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
            Terms &amp; Conditions
          </ModifiedPopUpHeader>
          <ModifiedInfoMessage>{desc}</ModifiedInfoMessage>
          <TermsText>
            <p><strong>1. Welcome to Spaces020!</strong></p>
            <p>Thank you for using Spaces020 (“Spaces020”, “we”, “us”, “our”). </p>
            <p>These Terms and Conditions (“Terms”) are applicable to our website
            <a href="https://www.spaces020.com" target="_blank" rel="noopener noreferrer">(https://www.spaces020.com)</a> and software/mobile application (“App”), all owned and
            operated by Rensource Distributed Energy Limited (“Rensource” or the “Company”) from or
            in connection with which you are accessing this Terms.</p>

            <p>
              Your use of the Services and your agreement with us include these Terms and our Privacy Policy which can be reviewed and accessed here:
              <a href="https://spaceso2o.com/termsAndConditions" target="_blank" rel="noopener noreferrer">https://spaceso2o.com/termsAndConditions</a> and
              <a href="https://spaceso2o.com/privacyPolicy" target="_blank" rel="noopener noreferrer">https://spaceso2o.com/privacyPolicy</a>.
              The Terms,  Privacy  Policy,  and  any  additional  terms,  policy,  conditions  or  agreements  that  you have agreed to are referred to as the “Agreements”.
            </p>

            <p>You understand that it is your responsibility to read and understand each of the Agreements
            carefully as they contain important information about the Services provided to you and any
            fees and charges applicable to the Services. You acknowledge that you have read and
            understood the Agreements, and that you accept and agree to be bound by them. If you don’t
            agree with (or cannot comply with) the Agreements, then you may not use the Service or
            continue to use the website or the App.
            </p>

            <p>
              You undertake that your registration information, payment details and any other information
              that you submit to us are true, accurate, and complete, and you agree to keep them that way
              at all times. If you have provided incorrect or inaccurate information, you undertake to correct
              such information in your account settings or discontinue the use of the Services or any of them
              pending your access to the correct or accurate information. You promise that no other person
              shall be allowed to use or access your account, or in any other way make use of the rights
              conferred to you pursuant to the agreements.
            </p>

            <p><strong>2. Responsible use and conduct.</strong></p>
            <p>
              By visiting our Services and accessing the information, resources, services and products we
              provide for you (hereafter referred to as ‘Resources’), you agree to use these Resources only
              for the purposes intended as permitted by (a) these Terms, and (b) or by us through any
              channel (“Acceptable Use”). You understand that we reserve the right to change the
              Acceptable Use at any time without notice.
            </p>
            <p>
              You understand and agree that in the event of a violation of the Acceptable Use may warrant
              an immediate termination or suspension of your Spaces020 account with or without notice to
              you.
            </p>

            <p><strong>3. Competition and Promoter</strong></p>

            <p>
              By entering the SpacesO2O Trivia Competition (“<strong>the Game</strong>”), you agree to be bound by and
observe the terms and conditions stipulated under headings 3 - 11 (“Conditions of Entry”).
            </p>

            <p>
              You understand that every other information related to the Game, including information on
              entry into the Game and details of available prizes also form part of the Conditions of Entry.
            </p>

            <p>
              The Game shall be promoted by us and we shall be responsible for providing all prizes on
              offer
            </p>

            <p>
              The Game is a game of skill in which eligible contestants are required to answer select
              multichoice questions on specified topics. Contestants who answer all questions correctly will
              be part of a draw from which winners will be selected randomly and be eligible to win prizes.
            </p>

            <p>
              Officers, management, and employees (and immediate family members of officers,
              management and employees) of Spaces020 or Rensource and third-party prize suppliers, are
              not eligible to participate in the Game.
            </p>

            <p>
              You understand and agree to submit only one entry to the Game per day in accordance with
              the Conditions of Entry.
            </p>

            <p><strong>4. Competition Period</strong></p>
            <p>
              The Game is conducted solely on the Application and at no other place or location or any
              other platform. You understand that we will not be liable for any loss or damage suffered by
              you where you participate in the Game on any other platform or at any other location or place.
            </p>
            <p>
              Entries not received during the Game Period or not completed in accordance with these
              Conditions of Entry will not be considered.
            </p>

            <p><strong>5. To Enter</strong></p>
            <p>
              To play the Game, you need to fill the form provided on the App and provide true, complete
              and accurate information (including name, contact number and email address). You may not
              register more than once as any subsequent registration may be disregarded.
            </p>

            <p><strong>6. To Win</strong></p>
            <p>
              To be eligible to win the Game, you must have answered the most correct answer and in the
              fastest time possible within the Game Period. We will determine who had the highest score
              and will notify the winner vide email (address: {`${email}`}) or SMS to the phone
              number provided during registration. If a winner cannot be contacted within a reasonable
              amount of time the next participant with the next high score will be selected as an alternative
winner. You will fill your name on the form as contained on your government issued identity
card. Therefore, any nickname or name deemed inappropriate by us may render you ineligible
to claim your prize(s).
            </p>

            <p><strong>7. Prize and notification</strong></p>

            <p>
              Prizes may be cash and non-cash prizes. In the case of a non-cash prize. we shall not be
              responsible for any variation in the value of a prize. The prize is not transferable or
              exchangeable and must be taken as offered. Spaces020 reserves the right to substitute the
              Prizes (or any part of them) for a prize or prizes of equivalent or greater monetary value if this
              is necessary for reasons beyond its control. All costs and expenses not included within the
              Prizes are the responsibility of the winner(s).
            </p>

            <p>
              You acknowledge that the prize is subject to additional terms and conditions imposed by third
              party prize suppliers and it is your responsibility to become acquainted with any such
              additional terms and conditions prior to taking the prize.
            </p>

            <p>
              All entrants agree that, if selected as a prize winner, the prize winner may be required to
              provide the Promoter with identification and/or proof of age. If the prize winner is under the
              age of 18 years, the prize will be awarded to the prize winner’s parent/guardian on their behalf.
              In accepting a prize, the prize winner agrees to the release set out below.
            </p>

            <p><strong>8. Limitation of Liability</strong></p>

            <p>
              Except for any liability that cannot by law be excluded, Spaces020, and our related
              corporations and associated agencies (and any of our personnel) exclude all liability for any
              loss (including any damage, claim, injury, cost or expense) which you may suffer or incur in
              connection with the Game or a prize, including, without limitation:
            </p>

            <ol type='a'>
              <li>
                any indirect, economic or consequential loss;
              </li>
              <li>
                any loss, damage or injury to you and/or any third party or to any property belonging
                to you or any third party in connection with the Game and/or the Prizes (including the
                winner’s receipt or use of the same), resulting from any cause whatsoever; and
              </li>
              <li>
                any liability for personal injury or death.
              </li>
            </ol>
            <p>
              We, including our authorized agents, will take no responsibility for lost, ineligible, misdirected
              or late entries due to technical reasons or any other reason. Entries that are not genuine or
              are incomplete, late or in any way fraudulent will be declared void.
            </p>

            <p><strong>9. Privacy</strong></p>
            <p>
              By entering the Game, you understand and agree that we may use and disclose your personal
              information to assist in conducting the Game and communicating with you in regard to special
              offers from the Promoters, third party prize suppliers (where applicable) and their related
              entities. Without limiting the foregoing, we may disclose the prize winner’s personal
              information to third parties for the purpose of fulfilling the prize. If an entrant elects to receive
              information from other third parties, we may also disclose your personal information for that
              purpose.
              We are bound by Nigeria privacy laws. Entrants may access the personal information the
              Promoter holds about them by writing to the Promoter at the address set out in the Privacy
              Policy. If the Promoter limits or denies an entrant access to their personal information in
              certain circumstances, the Promoter will tell you why access was limited or denied.
            </p>

            <p><strong>10. General</strong></p>

            <p>
              All Entries must be original and created solely by you. All Entries and all copyright and other
              rights in such entries and/or other materials (including but not limited to, photographs and
              videos taken by the prize winner in entering the Game) become the property of the Promoters
              and will not be returned. Each entrant agrees to provide a written assignment of all rights to
              the Promoters if requested. By submitting an Entry and any other materials (save for any
              personal information) to the Promoters in connection with the Game, each entrant:
            </p>

            <ol type='a'>
              <li>
                specifically authorises the Promoters to use and/or license third parties to use such
                Entry in whole or in part, throughout the universe, in perpetuity in or on any and all
                media, whether currently in existence or developed in the future, and alone or
                together or as part of other information, content and/or material of any kind or nature;
              </li>
              <li>
                represents and warrants that all elements contained in the Entry or other material:
              <ol type='i'>
                  <li>are original to you and fully cleared for use as contemplated in these Conditions
                  of Entry; </li>
                  <li>
                    do not and will not, in any way, violate or breach any of the terms of any other
                    agreement;
                  </li>
                  <li>
                    you may be a party to;
                  </li>
                  <li>
                    do not contain defamatory, tortious or otherwise unlawful, untrue or inaccurate
                    information, infringe or violate any copyright or other right; or contain any
                    matter the publication or sale of which will violate any law;
                  </li>
                  <li>
                    are not obscene or likely to cause offence;
                  </li>
                  <li>
                    are not in any way cruel or abusive; and
                  </li>
                  <li>
                    will not require the Promoters to pay or incur any sums to any person or entity
                    as a result of the Promoters’ use or exploitation of the same; and
                  </li>
                  <li>
                    unconditionally and irrevocably consents to any act or omission which would
                    otherwise infringe any of their moral rights in the entry and waives all moral
                    rights in the entry that arise outside of Nigeria.
                  </li>
                </ol>
              </li>
            </ol>
            <p>
              Acceptance of the prize constitutes consent on the prize winner’s part to allow the use of the
              prize winner’s name, image, voice and/or likeness by us for editorial, advertising, promotional,
              marketing and/or other purposes without further compensation except where prohibited by
              law.
            </p>
            <p>
              No correspondence will be entered into and our decision is final and binding.
            </p>
            <p>
              If, for any reason, the Game is not capable of running as planned, including due to infection
              by computer virus, bugs, tampering, technical failures or any other causes beyond our control,
              which corrupt or affect the fairness or integrity or proper conduct of the Game, we reserve the
              right in their sole discretion to disqualify any individual who tampers with the entry process
              and to cancel, modify, terminate or suspend the Game.
            </p>
            <p>
              The prize winner is advised that tax implications may arise from the prize and should seek
              independent financial and taxation advice prior to their acceptance of the prize. The prize
              winner is responsible for all taxes which may be payable as consequence of receiving a prize.
            </p>
            <p>
              We reserve the right to withdraw or amend the Game or these Terms if circumstances outside
              our reasonable control make this unavoidable.
            </p>
            <p>
              If you attempt to compromise the integrity or proper operation of the Game by cheating or
              committing fraud in any way, we reserve the right to render your entry invalid, seek damages
              from you and ban you from participating in any of their future raffles and/or competitions.
            </p>
            <p>
              The Game is governed by the laws of Nigeria. All entrants submit to the non-exclusive
              jurisdiction of the courts of Lagos, Nigeria.
            </p>

            <p><strong>11. Contact details</strong></p>
            <p>It is your responsibility to inform the Promoter of any change to your contact details, including
              their email address.</p>

          </TermsText>

          <OptionList>

          </OptionList>
          <ActionBlock direction={"row"}>
            <OkayCancelButton type="button" onClick={cancel}>
              Cancel
            </OkayCancelButton>
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
