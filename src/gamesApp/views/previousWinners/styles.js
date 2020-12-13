import styled from 'styled-components';
import { Container } from '../../../containers/ScreenContainer';

const Wrapper = styled(Container)`
width: 100%;
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
right: 9px;
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
  margin-bottom: 15px;
  padding: 12px 16px;
  border-radius: 13px;
  border: solid 1px #eeeeee;
  background-color: #ffffff;
  height: 56px;
`;

const Col1 = styled.div`
flex: 10%;
`;

const Col2 = styled.div`
flex: 20%;
`;

const Col3 = styled.div`
flex: 50%;
`;

const Col4 = styled.div`
flex: 20%;
`;

const LeaderboardAvatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
border: solid 3px #22a8ff;
`;

const Title = styled.p`
font-family: Montserrat;
font-size: 16px;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
text-align: left;
color: #212c3d;
padding-left: 20px;
`;

const Line = styled.div`
width: 100%;
height: 1px;
margin: 10px 0;
border-bottom: solid 1px #f0f0f0;
`;

const IconContainer = styled.div`
height: 13.8px;
margin: 10px 0px;
object-fit: contain;
`;

const BoldText = styled.h3`
font-size: 16px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
text-align: left;
color: #29394f;
`;

const AmountText = styled.p`
text-align: right;
font-weight: bold;
`;

export {
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
}
