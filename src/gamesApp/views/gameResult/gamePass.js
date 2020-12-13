import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { SpacesHeader } from '../../../components/spaces-header';
import {Button} from '../../components';
import { ReactComponent as QuestionMark } from '../../assets/icons/question-mark.svg';
import Avatar from '../../assets/img/passport.jpeg';
import GamePass from '../../assets/img/game-pass.svg';
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
        <UserAvatar src={GamePass} />
      </UserAvatarContainer>

      <TryAgainTitle>
        Congratulations!
      </TryAgainTitle>

      <TryAgainDescription>
        Congratulations! You have been added to the winners pool. 
        We will notify you, when all results have been collated and your reward is ready. 
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
              125 / 125
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