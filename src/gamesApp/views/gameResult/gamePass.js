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
import History from '../../../utils/History';

const LatestResults = ({avatar}) => {
  const [openTerms, setOpenTerms] = useState(false);
  const {totalScore} = History?.location?.state;
  const gamesUserName = localStorage.getItem('gamesUserName');

  return (
    <Fragment>
      <TermsDialog open={openTerms} cancel={() => setOpenTerms(false)} />
      <SpacesHeader />
      <PageHeader>
        <LeftSide>
          <HeaderAvatar src={avatar} />
          <PageHeaderText>Welcome, {gamesUserName}</PageHeaderText>
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
              {totalScore} / {totalScore}
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

const mapStateToProps = ({ user }) => ({
  avatar: user.avatar,
});

export default connect(mapStateToProps)(LatestResults);