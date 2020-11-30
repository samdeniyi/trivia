import styled from 'styled-components';
import { colors, fonts } from '../styles';

export const ScreenContainer = styled.main`
    padding: ${({ padding }) => padding || "1em"};
    padding-bottom: ${({ paddingBottom }) => paddingBottom || "65px"};
    margin-top: ${({ top }) => top || null};
    //overflow: auto;
`;

export const Container = styled.div`
    padding: 0 1em;
    margin-top: ${({ top }) => top || null};
`;

export const CenteredBlock = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    padding: 0 1em;
    margin-top: ${({ top }) => top || 0};
`;

export const FlexCenteredBlock = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: ${({ top }) => top || 0};
`;

export const FlexSpaceBetweenBlock = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: ${({ top }) => top || 0};
    height: calc(100vh - 100px);
    width: 100%;
`;

export const FlexStartBlock = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: ${({ top }) => top || 0};
`;

export const FlexContainer = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: ${({ top }) => top || 0};
`;

export const FilterAndSortSection = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: ${({ top }) => top || '24px'} 0 ${({ bottom }) =>  bottom || '0'} 0;
`;

export const SortFilterCell = styled.div`
    display: flex;
    align-items: center;
    font-family: ${fonts.main};
    font-size: 12px;
    color: ${({ color }) => color || colors.blue};
    font-weight: 100;
    cursor: pointer;
    justify-content: ${({ justifyContent }) => justifyContent || null};
    border ${({ border }) => border || null};
    width:  ${({ width }) => width || null};
    padding: 10px;
    height: 24px;

    & > svg {
        width: 24px;
        margin-right: 8px;
    }
`;

export const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: ${({ top }) => top || '64px'};
`;

export const EmptyListContainer = styled.div`
    margin: 0 -16px;
    text-align: center;
    border-top: 1px solid ${colors.border.top};
    font-family: ${fonts.main};
    font-size: 12px;
    color: ${colors.themeTextColor3};
    line-height: calc(50vh + 8.5px);
`;