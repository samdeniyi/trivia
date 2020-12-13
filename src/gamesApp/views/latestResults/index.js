import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { SpacesHeader } from '../../../components/spaces-header';
import { ReactComponent as QuestionMark } from '../../assets/icons/question-mark.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/info-icon.svg';
import Avatar from '../../assets/img/passport.jpeg';
import TermsDialog from '../terms';
import PreviousWinners from '../previousWinners';
import {
  FragmentWrapper,
  PageHeader,
  PageHeaderText,
  RightSide,
  SubHeader,
  GameInformationText,
  GameInformation,
  HeaderAvatar,
  LeftSide,
  InfoLeftSide,
  InfoRightSide,
  UserAvatar,
  UserAvatarContainer,
  ScoreContainer,
  ScoreInnerBox,
  ScoreText,
  ScoreTitleBox,
  ScoreTitleText,
} from './styles';


const LatestResults = () => {
  const [openTerms, setOpenTerms] = useState(false);

  return (
    <Fragment>
      <TermsDialog open={openTerms} cancel={() => setOpenTerms(false)} />
      <SpacesHeader />
      <PageHeader>
        <LeftSide>
          <HeaderAvatar src={Avatar} />
          <PageHeaderText>Welcome, JohnDoeOne</PageHeaderText>
        </LeftSide>
        <RightSide>
          <QuestionMark onClick={() => setOpenTerms(true)} />
        </RightSide>
      </PageHeader>
      <SubHeader>
        LATEST RESULTS
      </SubHeader>
      <UserAvatarContainer>
        <UserAvatar src={Avatar} />
      </UserAvatarContainer>

      <FragmentWrapper>
        <ScoreContainer>
          <ScoreTitleBox>
            <ScoreTitleText>
              YOUR SCORE
            </ScoreTitleText>
          </ScoreTitleBox>
          <ScoreInnerBox>
            <ScoreText>
              35 / 125
            </ScoreText>
          </ScoreInnerBox>
        </ScoreContainer>

        <GameInformation>
          <InfoLeftSide>
            <InfoIcon />
          </InfoLeftSide>
          <InfoRightSide>
            <GameInformationText>Game is only open between <strong>12pm and 4pm daily</strong> and can be played only <strong>once.</strong></GameInformationText>
          </InfoRightSide>
        </GameInformation>
      </FragmentWrapper>
      <PreviousWinners />
    </Fragment>
  );
};

LatestResults.propTypes = {};

export default connect()(LatestResults);