import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../styles';
import { string, array } from 'prop-types';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as SubstractIcon } from '../../assets/substract.svg';

const QuantityControls = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 16px;
    top: 29px;
`;

const QuantityCount = styled.span`
    font-size: 12px;
    font-weight: 500;
    margin-top: 0;
    margin-left: 4px;
    padding: 4px 16px;
    border-radius: 15px;
    text-align: center;
    background-color: ${colors.themeColor3};
`;

const changeQuantity = (
    selectedProducts, 
    itemsInInventory, 
    setProducts, 
    inventoryProductId, 
    action
) => {
    const newProducts = selectedProducts.map(product => {
        const quantity = parseInt(product.quantity);

        if (product.inventoryProductId === inventoryProductId) {
            if (action === "add") {
                product.quantity =  parseInt(product.quantity) + 1;
            } else {
                product.quantity = parseInt(product.quantity) - ((quantity !== 1) ? 1 : 0);
            };
        };
        
        return product;
    });

    setProducts(newProducts);
};

export const SetSaleQuantity = ({
    selectedProducts,
    setProducts,
    itemsInInventory,
    inventoryProductId
}) => {
    return (
        <QuantityControls>
            <SubstractIcon 
                onClick={() => changeQuantity(selectedProducts, itemsInInventory, setProducts, inventoryProductId, "substract")} 
                style={{ marginRight: "8px" }} 
            />
            <QuantityCount>
                {selectedProducts.filter(product => product.inventoryProductId === inventoryProductId)[0].quantity}
            </QuantityCount>
            <AddIcon 
                onClick={() => changeQuantity(selectedProducts, itemsInInventory, setProducts, inventoryProductId, "add")} 
                style={{ marginLeft: "8px" }} 
            />
        </QuantityControls>
    );
};

SetSaleQuantity.propTypes = {
    selectedProducts:   array,
    inventoryProductId: string
};