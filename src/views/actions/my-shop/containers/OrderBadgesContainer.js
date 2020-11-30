import styled,{ css } from "styled-components";
import { colors } from "../../../../styles";
import { ListHighlight } from "../../../../containers/ListContainer";
import { SmallLightText } from "../../../../containers/MessageContainer";

export const OrderBadge = styled.div`
    min-width: 36px;
    max-width: max-content;
    padding: 2px 8px;
    height: 14px;
    position: relative;
    margin-left: 4px;
    font-size: 10px;
    border-radius: 7.5px;
    text-align: center;
    background-color: ${colors.themeColor3};
    color: ${colors.smoothGreyText};
    right: ${({ right }) => right || null};
    top: ${({ top }) => top || null};
    left: ${({ left }) => left || null};
    ${({ nature }) => (nature === "Simple") &&
    css`
    background-color: ${colors.blueish};
    color: ${ colors.blue};
    `}
    ${({ nature }) => (nature === "Pending") &&
    css`
    background-color: ${colors.myShop.pending.bg};
    color: ${ colors.myShop.pending.text};
    `}
    ${({ nature }) => (nature === "Packed") &&
    css`
    background-color: ${colors.myShop.packed.bg};
    color: ${ colors.myShop.packed.text};
    `}
    ${({ nature }) => (nature === "Attended") &&
    css`
    background-color: ${colors.myShop.delivered.bg};
    color: ${ colors.myShop.delivered.text};
    `}
    ${({ nature }) => (nature === "Rejected") &&
    css`
    background-color: ${colors.myShop.rejected.bg};
    color: ${ colors.myShop.rejected.text};
    `}
`;

export const OrderBadges = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 8px;
    align-items: baseline;
    margin-top: ${({ top }) => top || null};
`;

export const AcceptedByBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const OrderInfo = styled.div`
    margin-right: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const AcceptedByText = styled.p`
    ${SmallLightText};
    margin-right: 4px;
`;

export const OrderDate = styled(ListHighlight)`
    ${SmallLightText};
    font-weight: 100;
    top: 16px;
    right: 16px;
    max-width: 100px;
    text-overflow: ellipsis;
`;
