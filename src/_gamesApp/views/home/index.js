import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { SpacesHeader } from '../../../components/spaces-header';
import { Button } from '../../components';
import { Container } from '../../../containers/ScreenContainer';
import { ReactComponent as QuestionMark } from '../../assets/icons/question-mark.svg';
import { ReactComponent as MultipleChoiceIcon } from '../../assets/icons/multiple-choice.svg';
import { ReactComponent as TimeFrameIcon } from '../../assets/icons/time-frame.svg';
import { ReactComponent as RewardsIcon } from '../../assets/icons/rewards.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/info-icon.svg';
import CrownIcon from '../../assets/icons/small-crown.png';
import { ReactComponent as RedPlay } from '../../assets/icons/red-play.svg';
import { ReactComponent as GreenPlay } from '../../assets/icons/green-play.svg';
import Avatar from '../../assets/img/passport.jpeg';
import TermsDialog from './termsAndConditions';


const FragmentWrapper = styled(Container)`
    width: 100%;
    animation: fromRight 0.5s ease;
    @keyframes fromRight {
        0% {
            left: 100%;
            margin-right: -100%;
        }
        100% {
            left: 50%;
            margin-right: -50%;
        }
    }
`;

const PageHeader = styled(Container)`
    width: 100%;
    border-bottom: solid;
    border-bottom-width: 1px;
    border-bottom-color: #f2f5fa;
    height: 50px;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    flex-direction: space-between;
    justify-content: center;
    align-items:center
`;

const LeftSide = styled(Container)`
    flex-direction: start;
`;

const RightSide = styled(Container)`
    flex-direction: end;
`;

const SubHeader = styled(Container)`
    width: 100%;
    border-bottom: solid;
    border-bottom-width: 1px;
    border-bottom-color: #f2f5fa;
    height: 40px;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const InfoContainer = styled.div`
    width: 100%;
    height: 80px;
    font-family: Montserrat;
    font-size: 14px;
    display: flex;
    flex-direction: start;
    padding-top: 10px;
    margin-bottom: 2px;
    text-align: left;
`;

const InfoLeftSide = styled(Container)`
    flex: 20%
`;

const InfoRightSide = styled(Container)`
    flex: 80%;
`;

const HeaderText = styled.h1`
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    color: #000;
`;

const SmallText = styled.p`
    font-family: Montserrat;
    font-size: 12px;
    color: #56636d;
    text-align: left;
    margin-top: 5px;
`;

const GameExpiryContainer = styled.div`
    width: 100%;
    border: solid 1px #eeeeee;
    border-radius: 13px;
    padding: 20px;
    margin-top: 20px;
`;

const GameExpiryText = styled.p`
    color: #fc2d00;
    font-size: 12px;
    text-align: center;
`;

const CountdownText = styled.p`
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 2px;
    text-align: center;
    color: #22a8ff;
`;

const GameInformation = styled.div`
    text-align: left;
    background-color: rgba(167, 217, 255, 0.25);
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    justify-content: center;
    align-items: center;
`;

const GameInformationText = styled.p`
    font-family: Montserrat;
    font-size: 12px;
    color: #579fd7;
    text-align: left;
    margin-top: 5px;
    font-weight: 500;
`;

const FirstPositionImage = styled.img`
    width: 86px;
    height: 86px;
    border-radius: 50%;
    border: solid 3px #22a8ff;
`;

const FirstPositionImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    bottom: 35px;
    justify-content: center;
    align-items: center;
`;

const SecondPositionImage = styled.img`
    width: 68.8px;
    height: 68.8px;
    border-radius: 50%;
    border: solid 3px #22a8ff;
    position: relative;
    left: 5px;
`;


const SecondPositionImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    left: 5px;
    justify-content: center;
    align-items: center;
`;

const ThirdPositionImage = styled.img`
    width: 68.8px;
    height: 68.8px;
    border-radius: 50%;
    border: solid 3px #22a8ff;
`;

const ThirdPositionImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    right: 5px;
    justify-content: center;
    align-items: center;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
`;

const LeaderBoardItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 12px 16px;
    border-radius: 13px;
    border: solid 1px #eeeeee;
    background-color: #ffffff;
`;

const LeaderboardAvatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: solid 3px #22a8ff;
`;

const PreviousWinners = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: solid 3px #22a8ff;
`;






const Home = () => {
  const [openTerms, setOpenTerms] = useState(false);

  return (
    <Fragment>
      <TermsDialog open={openTerms} cancel={() => setOpenTerms(false)} />
      <Fragment>
        <SpacesHeader />
        <PageHeader>
          <LeaderboardAvatar src={Avatar} />
          <LeftSide>Welcome, JohnDoeOne</LeftSide>
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

          <h3>Previous Winners</h3>

          <ImageContainer>
            <SecondPositionImageContainer>
              <h3><strong>2</strong></h3>
              <GreenPlay />
              <SecondPositionImage src={Avatar} />
            </SecondPositionImageContainer>
            
            <FirstPositionImageContainer>
              <h3><strong>1</strong></h3>
              <img src={CrownIcon} alt="first position" />
              <FirstPositionImage src={Avatar} />
            </FirstPositionImageContainer>

            <ThirdPositionImageContainer>
              <h3><strong>3</strong></h3>
              <RedPlay />
              <ThirdPositionImage src={Avatar} />
            </ThirdPositionImageContainer>
          </ImageContainer>

          <LeaderBoardItemContainer>
            <h3>1.</h3>
            <LeaderboardAvatar src={Avatar} />
            <p>FortuneTiger</p>
            <p><strong>#1,550</strong></p>
          </LeaderBoardItemContainer>
          <LeaderBoardItemContainer>
            <h3>2.</h3>
            <LeaderboardAvatar src={Avatar} />
            <p>LordWinner</p>
            <p><strong>#1,550</strong></p>
          </LeaderBoardItemContainer>


        </FragmentWrapper>
      </Fragment>
    </Fragment>
  );
};

Home.propTypes = {};

export default connect()(Home);