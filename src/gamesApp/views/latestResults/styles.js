import styled from 'styled-components';
import { Container } from '../../../containers/ScreenContainer';

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

const PageHeader = styled.div`
display: flex;
align-items: flex-end;
justify-content: center;
border-bottom: solid;
border-bottom-width: 1px;
border-bottom-color: #f2f5fa;
height: 56px;
padding: 36px 16px 12px 24px;
`;

const PageHeaderText = styled.span`
font-family: Montserrat;
font-size: 14px;
font-weight: 500;
color: #212c3d;
line-height: normal;
letter-spacing: normal;
`;

const LeftSide = styled.div`
flex: 90%
`;

const RightSide = styled.div`
flex: 10%;
`;

const SubHeader = styled(Container)`
  margin-top: 20px;
  width: 100%;
  height: 40px;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const InfoLeftSide = styled(Container)`
flex: 20%
`;

const InfoRightSide = styled(Container)`
flex: 80%;
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

const HeaderAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: solid 3px #22a8ff;
  margin-right: 15px;
  position: relative;
  top: 10px;
`;

const UserAvatar = styled.img`
  display: block;
  width: 124px;
  height: 124px;
  border-radius: 50%;
  border: solid 4px #22a8ff;
  margin-right: 15px;
  position: relative;
  top: 10px;
`;

const UserAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const WinnerAvatar= styled.img`
    display: block;
    width: 124px;
    height: 124px;
    border-radius: 50%;
    border: solid 4px #22a8ff;
    margin-right: 15px;
    position: relative;
    top: 10px;
      &:before {
        background: none;
        border: 4px solid #fff;
        content: "";
        display: block;
        position: absolute;
        top: 4px;
        left: 4px;
        right: 4px;
        bottom: 4px;
        pointer-events: none;
      }
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 120px;
  margin: 32px 16px 24.8px;
  padding: 0 24px 22px;
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #9ed9ff;
`;

const ScoreInnerBox = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 61px;
  margin: 0px 0 0;
  border-radius: 10px;
  background-color: #0a9bfa;
`;

const ScoreText= styled.p`
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffd555;
`;

const ScoreTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 10px;
  width: 50%;
  height: 43px;
  border-radius: 10px;
  background-color: #ffffff;
`;

const ScoreTitleText = styled.p`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #22a8ff;
`;


export {
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
  WinnerAvatar,
  ScoreContainer,
  ScoreInnerBox,
  ScoreText,
  ScoreTitleBox,
  ScoreTitleText,
}
