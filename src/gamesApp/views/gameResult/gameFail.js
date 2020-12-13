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
      <UserAvatarContainer>
        <UserAvatar src={GameFail} />
      </UserAvatarContainer>

      <TryAgainTitle>
        Try Again Tomorrow!
      </TryAgainTitle>

      <TryAgainDescription>
        You answered 2 questions wrong. 
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
              35 / 125
            </ScoreText>
          </ScoreInnerBox>
        </ScoreContainer>

        <ButtonContainer>
          <ButtonWrapper>
            <Button>Okay</Button>
          </ButtonWrapper>
        </ButtonContainer>

      </FragmentWrapper>
    </Fragment>
  );
};

LatestResults.propTypes = {};

export default connect()(LatestResults);