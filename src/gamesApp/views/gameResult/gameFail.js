import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { SpacesHeader } from '../../../components/spaces-header';
import {Button} from '../../components';
import { ReactComponent as QuestionMark } from '../../assets/icons/question-mark.svg';
import Avatar from '../../assets/img/passport.jpeg';
import GameFail from '../../assets/img/game-fail.svg';
import TermsDialog from '../terms';
import {
  FragmentWrapper,
  PageHeader,
  PageHeaderText,
  RightSide,
  HeaderAvatar,
  LeftSide,
  UserAvatar,
  UserAvatarContainer,
  ScoreContainer,
  ScoreInnerBox,
  ScoreText,
  ScoreTitleBox,
  ScoreTitleText,
  TryAgainTitle,
  TryAgainDescription,
  ButtonContainer,
  ButtonWrapper,
} from './styles';
import History from '../../../utils/History';


const LatestResults = () => {
  const [openTerms, setOpenTerms] = useState(false);
  const {score, totalScore} = History?.location?.state;
  const gamesUserName = localStorage.getItem('gamesUserName');

  return (
    <Fragment>
      <TermsDialog open={openTerms} cancel={() => setOpenTerms(false)} />
      <SpacesHeader />
      <PageHeader>
        <LeftSide>
          <HeaderAvatar src={Avatar} />
          <PageHeaderText>Welcome, {gamesUserName}</PageHeaderText>
        </LeftSide>
        <RightSide>
          <QuestionMark onClick={() => setOpenTerms(true)} />
        </RightSide>
      </PageHeader>
      <UserAvatarContainer>
        <UserAvatar src={GameFail} />
      </UserAvatarContainer>

      <TryAgainTitle>
        Try Again Tomorrow!
      </TryAgainTitle>

      <TryAgainDescription>
        You answered {totalScore - score} questions wrong. 
        You have to answer all questions right to earn a reward. 
        Don’t forget to try again tomorrow for a better score!
      </TryAgainDescription>

      <FragmentWrapper>
        <ScoreContainer>
          <ScoreTitleBox>
            <ScoreTitleText>
              YOUR SCORE
            </ScoreTitleText>
          </ScoreTitleBox>
          <ScoreInnerBox>
            <ScoreText>
              {score} / {totalScore}
            </ScoreText>
          </ScoreInnerBox>
        </ScoreContainer>

        <ButtonContainer>
          <ButtonWrapper>
            <Button onClick={() => History.push('/')}>Okay</Button>
          </ButtonWrapper>
        </ButtonContainer>

      </FragmentWrapper>
    </Fragment>
  );
};

LatestResults.propTypes = {};

export default connect()(LatestResults);