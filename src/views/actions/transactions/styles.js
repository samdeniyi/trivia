import styled from "styled-components";
import { colors } from "../../../styles";
import { ListHighlight } from "../../../containers/ListContainer";
import { SmallLightText } from "../../../containers/MessageContainer";

export const SaleBadge = styled.div`
    min-width: 36px;
    max-width: max-content;
    padding: 2px 8px;
    height: 14px;
    margin-left: 4px;
    font-size: 10px;
    border-radius: 7.5px;
    text-align: center;
    background-color: ${({ bg }) => bg || colors.themeColor3};
    color: ${({ color }) => color || colors.smoothGreyText};
    position: ${({ position }) => position || 'relative'};
    right: ${({ right }) => right || null};
    top: ${({ top }) => top || null};
    left: ${({ left }) => left || null};
`;

export const TransactionDateBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 8px;
    align-items: baseline;

`;

export const SoldToBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const SaleInfo = styled.div`
    margin-right: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const SaleByText = styled.p`
    ${SmallLightText};
    margin-right: 4px;
`;

export const TransactionAmount = styled(ListHighlight)`
    ${SmallLightText};
    font-weight: 100;
    top: 16px;
    right: 16px;
    color: ${({ color }) => color || ""};

`;

export const TransactionDetail = styled(ListHighlight)`
    top: ${({ top }) => top || null};
    color: #56636d;
    min-width: auto;
    max-width: 240px;
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;


export const SubTitle = styled.h5`
    font-size: 14px;
    font-weight: 500;
    text-align: ${({ textAlign }) => textAlign || null};
    color: ${({color}) => color || colors.themeTextColor1};
    margin-top: ${({ top }) => top || null};
    margin-left: ${({ left }) => left || null};
    text-transform: capitalize;
    text-overflow: ellipsis;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
`;

export const TransactionValue = styled.span`
    font-size: 18px;
    font-weight: 500;
    margin: 16px 0 24px 0;
    color: ${({ color }) => color || ""};
`;

export const TransactionStatus = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: ${({ color }) => color || ""};

`;