import styled, { css } from "styled-components";
import { colors, fonts } from "../../../../../styles";
import { SecondaryText, Label, SmallLightText } from "../../../../../containers/MessageContainer";
import { List, ListHighlight } from "../../../../../containers/ListContainer";
import DownArrowIcon from '../assets/down-arrow.svg';

export const NameLabel = styled(SecondaryText)`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.themeTextColor1};
    margin: 24px 0;
`;

export const ActivitiesList = styled.section`
    display: grid;
    grid-template-columns: repeat(2, minmax(124px, 1fr));
    grid-gap: 16px;
`;

export const ActivityBlock = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'row'};
    min-height: 64px;
    padding: 16px 8px;
    border: 1px solid ${colors.gray3};
    border-radius: 13px;

    ${({ noBottomBorder }) => noBottomBorder && css`
        border-bottom: 0;
    `}
`;

export const ActivityInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 16px;
`;
 
export const ActivityCount = styled(SecondaryText)`
    margin: 0;
    font-weight: bold;
`;

export const ActivityLabel = styled(Label)`
    font-size: 12px;
    font-weight: 100;
    color: ${colors.themeTextColor3};
    line-height: 15px;
    margin: 0;
`;

export const ActivitiesGraph = styled.section`
    position: relative;
`;

export const ActivitiesGraphHeader = styled(NameLabel)`
    text-align: left;
`;

export const ChartBlock = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;

    & > svg {
        width: 122px;
        height: 136px;
    }
`;

export const ChartDescription = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
`;

export const ChartDescriptionElement = styled.li`
    &:before {
        content: "⬤";
        display: inline-block; 
        width: 8px;
        height: 8px;
        margin-right: 12px;
        color: ${({ type }) => `${colors.performanceChart[type] }`};
    }

    font-family: ${fonts.main};
    font-size: 12px;
    font-weight: 100;
    line-height: 18px;
    color: ${colors.themeTextColor3};
    margin-bottom: 12px;
`;

export const CommissionsCategoriesList = styled(List)`
    border-bottom-left-radius: 13px;
    border-bottom-right-radius: 13px;
`;

export const CommissionsCategories = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const CommissionsCategoriesLink = styled(ListHighlight)`
    top: 20px;
`;

export const ActivitySummaryBlock = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

export const ActivityTotal = styled.div`
    display: block;
`;

export const TotalCommissionsAmount = styled(NameLabel)`
    font-weight: bold;
    text-align: left;
    margin: 0;
`;

export const FilterCommissionsData = styled.div`
    width: 100px;
    height: 23px;
    border-radius: 16px;
    background: ${colors.blueish};
    cursor: pointer;
`;

export const FilterCommissionsHeading = styled.h6`
    ${SmallLightText};
    color: ${colors.blue};
    font-size: 12px;
    line-height: 15px;
    position: relative;
    padding: 4px 0 4px 10px;

    &::after {
        content: url(${ DownArrowIcon });
        position: absolute;
        right: 10px;
        cursor: pointer;
    }
`;