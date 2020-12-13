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

const HeaderAvatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
border: solid 3px #22a8ff;
margin-right: 15px;
position: relative;
top: 10px;
`;

export {
  FragmentWrapper,
  PageHeader,
  PageHeaderText,
  RightSide,
  SubHeader,
  SmallText,
  GameExpiryContainer,
  GameExpiryText,
  GameInformationText,
  GameInformation,
  HeaderAvatar,
  LeftSide,
  InfoLeftSide,
  InfoRightSide,
  InfoContainer,
  CountdownText,
  HeaderText,
}
