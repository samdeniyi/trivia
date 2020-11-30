import React from 'react';
import styled from "styled-components";
import { colors } from "../../../../styles";
import { ListHighlight } from "../../../../containers/ListContainer";
import { SmallLightText } from "../../../../containers/MessageContainer";

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

export const SaleBadges = styled.div`
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

export const SaleDate = styled(ListHighlight)`
    ${SmallLightText};
    font-weight: 100;
    top: 16px;
    right: 16px;
`;

const ProductsSaleBadge = styled(SaleBadge)`
    align-self: flex-end;
    margin-left: 8px;
`;

export const SelectSaleBadge = ({ type }) => {
    switch (type) {
        case true: {
            return (
                <SaleBadge
                    bg={colors.myShop.totalSales.bg}
                    color={colors.myShop.totalSales.text}
                >
                    Complete Sale
                </SaleBadge>
            );
        }

        case false: {
            return (
                <SaleBadge
                    bg={colors.myShop.pending.bg}
                    color={colors.myShop.pending.text}
                >
                    Incomplete Sale
                </SaleBadge>
            );
        }

        default: {
            return null;
        }
    }
};

export const ProductStockBadge = ({ 
    quantity 
}) => (
    <ProductsSaleBadge
        bg={quantity > 0 ? colors.myShop.product.inStock.bg : colors.myShop.product.outOfStock.bg}
        color={quantity > 0 ? colors.myShop.product.inStock.text : colors.myShop.product.outOfStock.text}
    >
        {quantity} in Stock
    </ProductsSaleBadge>
);