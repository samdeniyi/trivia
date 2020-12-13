import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { SpacesHeader } from '../../../components/spaces-header';
import { Button } from '../../components';
import { ReactComponent as QuestionMark } from '../../assets/icons/question-mark.svg';
import { ReactComponent as MultipleChoiceIcon } from '../../assets/icons/multiple-choice.svg';
import { ReactComponent as TimeFrameIcon } from '../../assets/icons/time-frame.svg';
import { ReactComponent as RewardsIcon } from '../../assets/icons/rewards.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/info-icon.svg';
import Avatar from '../../assets/img/passport.jpeg';
import TermsDialog from '../terms';
import PreviousWinners from '../previousWinners';
import Loader from '../loader';
import {
  FragmentWrapper,
  PageHeader,
  PageHeaderText,
  RightSide,
  SubHeader,
  SmallText,
  GameExpiryContainer,
  GameExpiryText,
  GameInformationText,
  GameInformation,
  HeaderAvatar,
  LeftSide,
  InfoLeftSide,
  InfoRightSide,
  InfoContainer,
  CountdownText,
  HeaderText,
} from './styles';


const Home = () => {
  const [openTerms, setOpenTerms] = useState(false);

  return (
    <Fragment>
      <Loader open={false} />
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
        What you need to know
        </SubHeader>
      <FragmentWrapper>
        <InfoContainer>
          <InfoLeftSide><MultipleChoiceIcon /></InfoLeftSide>
          <InfoRightSide>
            <HeaderText>Multiple Choice</HeaderText>
            <SmallText>Answer all questions given to you correctly.</SmallText>
          </InfoRightSide>
        </InfoContainer>
        <InfoContainer>
          <InfoLeftSide><TimeFrameIcon /></InfoLeftSide>
          <InfoRightSide>
            <HeaderText>60 Second Time frame</HeaderText>
            <SmallText>You must answere all questions within a 60 second time frame.</SmallText>
          </InfoRightSide>
        </InfoContainer>
        <InfoContainer>
          <InfoLeftSide><RewardsIcon /></InfoLeftSide>
          <InfoRightSide>
            <HeaderText>Receive Rewards</HeaderText>
            <SmallText>Our top 5 winners will get a reward after play time expires.</SmallText>
          </InfoRightSide>
        </InfoContainer>

        <GameExpiryContainer>
          <GameExpiryText>Game expires in</GameExpiryText>
          <CountdownText>00:03:23</CountdownText>
          <Button>Play Game</Button>
        </GameExpiryContainer>

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

Home.propTypes = {};

export default connect()(Home);