import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CrownIcon from '../../assets/icons/small-crown.png';
import { ReactComponent as RedPlay } from '../../assets/icons/red-play.svg';
import { ReactComponent as GreenPlay } from '../../assets/icons/green-play.svg';
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
  WinnerUsername,
  WinnerAmountText,
} from './styles';
import { utils } from '../../utils';

const PreviousWinners = ({ winners, userId }) => {

  return (
    <Fragment>
      <Title>Previous Winners</Title>
      <Line />
      <Wrapper>
        {winners && <ImageContainer>
          {!!winners[1] && <SecondPositionImageContainer>
            <BoldText>2</BoldText>
            <IconContainer>
              <GreenPlay />
            </IconContainer>
            <SecondPositionImage src={winners[1]?.userAvatar} />
            <WinnerUsername>{userId === winners[1]?.userId ? "You" : winners[1]?.username}</WinnerUsername>
            <WinnerAmountText>&#8358;{utils.formatNumberWithCommas(winners[1]?.totalAmountWon)}</WinnerAmountText>
          </SecondPositionImageContainer>}

          {!!winners[0] &&<FirstPositionImageContainer>
            <BoldText>1</BoldText>
            <img src={CrownIcon} alt="first position" />
            <FirstPositionImage src={winners[0]?.userAvatar} />
            <WinnerUsername>{userId === winners[0]?.userId ? "You" : winners[0]?.username}</WinnerUsername>
            <WinnerAmountText>&#8358;{utils.formatNumberWithCommas(winners[0]?.totalAmountWon)}</WinnerAmountText>
          </FirstPositionImageContainer>}

          {!!winners[2] &&<ThirdPositionImageContainer>
            <BoldText>3</BoldText>
            <IconContainer>
              <RedPlay />
            </IconContainer>
            <ThirdPositionImage src={winners[2]?.userAvatar} />
            <WinnerUsername>{userId === winners[2]?.userId ? "You" : winners[2]?.username}</WinnerUsername>
            <WinnerAmountText>&#8358;{utils.formatNumberWithCommas(winners[2]?.totalAmountWon)}</WinnerAmountText>
          </ThirdPositionImageContainer>}
        </ImageContainer>}

        {winners.map((item, index) =>
          <LeaderBoardItemContainer>
            <Col1>
              <BoldText>{`${index+1}.`}</BoldText>
            </Col1>
            <Col2>
              <LeaderboardAvatar src={item?.userAvatar} />
            </Col2>
            <Col3>
              <p>{userId === item?.userId ? "You" : item?.username}</p>
            </Col3>
            <Col4>
              <AmountText>
                &#8358;{utils.formatNumberWithCommas(item?.totalAmountWon)}
              </AmountText>
            </Col4>
          </LeaderBoardItemContainer>)
        }
      </Wrapper>
    </Fragment>
  );
};

PreviousWinners.propTypes = {};

const mapStateToProps = (state) => ({
  userId: state.user.userId,
});

export default connect(mapStateToProps)(PreviousWinners);
