import styled from 'styled-components';
import { colors } from '../../../styles';
import { SubTitle, SecondaryText } from '../../../containers/MessageContainer';
import { ListItem } from '../../../containers/ListContainer';

export const PageTitle = styled.h4`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.themeTextColor1}; //#29394f
    line-height: 18px;
`;

export const PageCount = styled.span`
    font-size: 10px;
    font-weight: 500;
    line-height: 13px;
    color: ${colors.themeColor6}; //#829099
`;

export const PageList = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 16px;
    padding: 33px 16px;
    border-radius: 13px;
    border: 1px solid ${colors.gray3};
`;

export const InfoBlockSteps = styled.div`
    display: flex;
    flex-direction: row;
    margin: 16px 0;
`;

export const StepsBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Steps = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 16px;
`;

export const Step = styled.div`
    display: flex;
    flex-direction: column;
    
    &:first-child {
        margin-bottom: 39px;
        @media screen and (max-width: 450px) {
            margin-bottom: 24px;
        }  
    }

    &:not(:last-of-type) {
        margin-bottom: 39px;
        @media screen and (max-width: 450px) {
            margin-bottom: 24px;
        }  
    };
`;

export const StepHeading = styled(SubTitle)`
    font-weight: 500;
    text-align: left;
    margin: 0;
`;

export const StepDetails = styled(SecondaryText)`
    margin: 2px 0 0 0;
    text-align: left;
`;

export const CircledNumber = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${colors.background.circle};
     
    &::after {
        content: attr(data-content);
        position: relative;
        top: 7px;
        left: 11px;
        text-align: center;
        color: ${colors.white};   
    }
`;

export const BrokenLine = styled.div`
    width: 2px;
    height: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
    background-color: #f2f5fa;
`;

export const InfoIntroduction = styled(SubTitle)`
    line-height: 17px;
    font-weight: 300;
    text-align: center;
    margin: 64px 0px 0px 0px;
`;

export const SubInfoIntroduction = styled(SubTitle)`
    line-height: 17px;
    margin-top: 24px;
    font-weight: 500;
    text-align: left;
    color: #579fd7;
`;

export const ModifiedListItem = styled(ListItem)`
    align-items: center;
`;

export const HorizontalDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: ${({ left }) => left || '0px'};
`;