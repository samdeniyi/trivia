import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CrownIcon from '../../assets/icons/small-crown.png';
import { ReactComponent as RedPlay } from '../../assets/icons/red-play.svg';
import { ReactComponent as GreenPlay } from '../../assets/icons/green-play.svg';
import Avatar from '../../assets/img/passport.jpeg';
import {
  Wrapper,
  FirstPositionImage,
  FirstPositionImageContainer,
  SecondPositionImage,
  SecondPositionImageContainer,
  ThirdPositionImage,
  ThirdPositionImageContainer,
  ImageContainer,
  LeaderBoardItemContainer,
  Col1,
  Col2,
  Col3,
  Col4,
  LeaderboardAvatar,
  Title,
  Line,
  IconContainer,
  BoldText,
  AmountText,
} from './styles';

const PreviousWinners = () => {

  return (
    <Fragment>
      <Title>Previous Winners</Title>
      <Line />
      <Wrapper>
        <ImageContainer>
          <SecondPositionImageContainer>
            <BoldText>2</BoldText>
            <IconContainer>
              <GreenPlay />
            </IconContainer>
            <SecondPositionImage src={Avatar} />
          </SecondPositionImageContainer>

          <FirstPositionImageContainer>
            <BoldText>1</BoldText>
            <img src={CrownIcon} alt="first position" />
            <FirstPositionImage src={Avatar} />
          </FirstPositionImageContainer>

          <ThirdPositionImageContainer>
            <BoldText>3</BoldText>
            <IconContainer>
              <RedPlay />
            </IconContainer>
            <ThirdPositionImage src={Avatar} />
          </ThirdPositionImageContainer>
        </ImageContainer>

        <LeaderBoardItemContainer>
          <Col1>
            <BoldText>1.</BoldText>
          </Col1>
          <Col2>
            <LeaderboardAvatar src={Avatar} />
          </Col2>
          <Col3>
            <p>FortuneTiger</p>
          </Col3>
          <Col4>
            <AmountText>
              #1,550
            </AmountText>
          </Col4>
        </LeaderBoardItemContainer>

        <LeaderBoardItemContainer>
          <Col1>
            <BoldText>2.</BoldText>
          </Col1>
          <Col2>
            <LeaderboardAvatar src={Avatar} />
          </Col2>
          <Col3>
            <p>LordWinner</p>
          </Col3>
          <Col4>
            <AmountText>
              #1,550
            </AmountText>
          </Col4>
        </LeaderBoardItemContainer>
      </Wrapper>
    </Fragment>
  );
};

PreviousWinners.propTypes = {};

export default connect()(PreviousWinners);
