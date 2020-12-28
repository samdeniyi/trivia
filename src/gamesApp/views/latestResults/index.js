import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { SpacesHeader } from '../../../components/spaces-header';
import { ReactComponent as QuestionMark } from '../../assets/icons/question-mark.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/info-icon.svg';
import TermsDialog from '../terms';
import PreviousWinners from '../../containers/previousWinner';
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
  // WinnerAvatar,
} from './styles';
import History from '../../../utils/History';


const LatestResults = ({avatar}) => {
  const [openTerms, setOpenTerms] = useState(false);
  const {data} = History?.location?.state;
  const gamesUserName = localStorage.getItem('gamesUserName');

  return (
    <Fragment>
      <TermsDialog open={openTerms} cancel={() => setOpenTerms(false)} />
      <SpacesHeader />
      <PageHeader>
        <LeftSide>
          <HeaderAvatar src={avatar ? avatar : null} />
          <PageHeaderText>Welcome, {gamesUserName}</PageHeaderText>
        </LeftSide>
        <RightSide>
          <QuestionMark onClick={() => setOpenTerms(true)} />
        </RightSide>
      </PageHeader>
      <SubHeader>
        LATEST RESULTS
      </SubHeader>
      <UserAvatarContainer>
        <UserAvatar src={avatar} />
        {/* <WinnerAvatar src={avatar} /> */}
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
              {/* 35 / 125 */}
              {`${data.pointsAccrued} / ${data.questionScore}`}
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

const mapStateToProps = ({ user }) => ({
  avatar: user.avatar,
});

export default connect(mapStateToProps)(LatestResults);