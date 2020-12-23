import styled from 'styled-components';
import { Container } from '../../../containers/ScreenContainer';
import GameBackground from '../../assets/backgrounds/game-bg.svg';

const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${GameBackground});
  background-size: cover;
`;

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
  justify-content: center;
  align-items: center;
  height: 56px;
  padding-top: 15px;
`;

const PageHeaderText = styled.span`
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`;

const LeftSide = styled.div`
flex: 10%;
`;

const MiddleSide = styled.div`
  flex: 80%;
  text-align: center;
`;

const RightSide = styled.div`
  flex: 10%;
`;

const HeaderAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: solid 2px #fff;
  margin-right: 15px;
`;

const CloseIconContainer = styled.div`
  width: 32px;
  height: 32px;
  margin: 8px 0 14px 48px;
  padding: 4px;
  border-radius: 10px;
  background-color: #66c0fb;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: solid 0.3px #fff;
  // box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);
`;

const CloseIconText = styled.p`
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
`;

const QuestionContainer = styled.div`
  width: 95%;
  height: 198px;
  margin-top: 20px;
  margin-left: 2.5%;
  border-radius: 20px;
  box-shadow: 1px 4px 40px 0 #ffffff;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuestionText = styled.p`
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #212121;
`;

const ProgressbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountdownText = styled.p`
  font-family: Montserrat;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  color: #ffd555;
  padding-left: 10px;
`;

const AnswerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  max-height: 200vh; 
  width: 95%;
  margin-left: 2.5%;
  margin-top: 15px;
`;

const AnswerCard = styled.div`
  width: 42vw;
  height: 126px;
  border-radius: 10px;
  background-color: ${({ bgc }) => bgc || '#fff'};
  display: ${({ hide }) => hide ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  &:active {
		background-color: #eee;
	}
`;

const AnswerText = styled.p`
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: ${({ color }) => color || '#000'};
`;

const PopUp = styled.div`
    display: ${props => props.open ? 'flex' : 'none'};
    font-family: Montserrat;
    align-items: flex-end;
    justify-content: center;
    text-align: center;
    position: fixed;
    //top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: ${({ zIndex }) => zIndex || '1000'};
    padding: 8px;
    max-height: 50%;
    transition: opacity 0.5s linear;
    opacity: 1;
    animation: openPopup 0.3s ease-out;
    @keyframes openPopup {
        0% {
            transform: translateY(100%);
        }

        100% {
            transform: translateY(0%);
        }
`;

export {
  FragmentWrapper,
  PageHeader,
  PageHeaderText,
  RightSide,
  HeaderAvatar,
  LeftSide,
  PageContainer,
  MiddleSide,
  CloseIconContainer,
  CloseIconText,
  QuestionContainer,
  QuestionText,
  ProgressbarContainer,
  CountdownText,
  AnswerContainer,
  AnswerCard,
  AnswerText,
  PopUp,
}
