import styled from 'styled-components';
import { fonts, colors } from "../styles";

export const SubListContainer = styled.div`
    height: 100%;
    width: 100%;
`;

export const SubList = styled.ul`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'row'};
    justify-content: space-between;
    margin-bottom: ${({ bottom }) => bottom || "11px"};
`;

export const SubListHeading = styled.li`
    font-family: ${fonts.main};
    font-size: 12px;
    font-weight: 100;
    color: #8d9aa3;
    line-height: 15px;
    text-align: right;
`;

export const SubListValue = styled.li`
    font-family: ${fonts.main};
    font-size: 14px;
    font-weight:  ${({ weight }) => weight || "500"};
    line-height: 18px;
    color: ${colors.themeTextColor1};
    text-align: right;
    max-width: 177px;
`;