import React from "react";
import styled from "styled-components";
import { colors } from "../../../../../styles";
import { array, number, string, func, any } from "prop-types";
import { ReactComponent as AddIcon } from "../../assets/add.svg";
import { ReactComponent as SubstractIcon } from "../../assets/substract.svg";
import { ReactComponent as DisableSubstractIcon } from "../../assets/disabledSubstract.svg";

const QuantityControls = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 25px;
    top: 15px;
`;

const Add = styled(AddIcon)`
    cursor: pointer;
    width: 30px;
    height: 30px;
    margin-left: 8px !important;
`;
const Substract = styled(SubstractIcon)`
    cursor: pointer;
    width: 30px;
    height: 30px;
    margin-right: 8px !important;
`;

const ModifiedDisableSubstractIcon = styled(DisableSubstractIcon)`
    width: 30px;
    height: 30px;
    margin-right: 8px !important;
`;

const QuantityCount = styled.span`
    font-size: 12px;
    font-weight: 500;
    margin-top: 0;
    padding: 8px 16px;
    bcarts-radius: 8px;
    text-align: center;
    background-color: ${colors.themeColor3};
    text-align: center;
`;

const changeQuantity = (
    updateCart,
    productId,
    carts,
    action,
) => {
    const updatedcartsItems = carts.map((product) => {
        const quantity = product.quantity;
        if (product.product.id === productId) {
            if (action === "add") {
                product.quantity = parseInt(quantity) + 1;
                product.cost = parseInt(product.cost) +
                          parseInt(product.product.minPrice);
              
            } else {
                product.quantity =
                    parseInt(quantity) - (quantity >= product.product.moq ? 1 : 0);
                product.cost =
                    quantity === 1
                        ? parseInt(product.cost)
                        : parseInt(product.cost) -
                          parseInt(product.product.minPrice);
            }
        }

        return product;
    });

    carts.cartsItems = updatedcartsItems;
    updateCart(carts);
};

export const SetAvailableQuantity = ({
    updateCart,
    productQuantity,
    productId,
    carts,
    //setSubTotal,
    //subTotal,
    moq,
}) => {
    return (
        <QuantityControls>
            {productQuantity <=
            moq ? (
                <ModifiedDisableSubstractIcon></ModifiedDisableSubstractIcon>
            ) : (
                <Substract
                    onClick={() =>
                        changeQuantity(
                            updateCart,
                            productId,
                            carts,
                            "substract",
                            //setSubTotal,
                            //subTotal,
                            moq
                        )
                    }
                    style={{ marginRight: "8px" }}
                ></Substract>
            )}
            <QuantityCount>
                {productQuantity}
            </QuantityCount>
                <Add
                    onClick={() =>
                        changeQuantity(
                            updateCart,
                            productId,
                            carts,
                            "add",
                            moq                        
                            )
                    }
                    style={{ marginLeft: "8px" }}
                ></Add>
        </QuantityControls>
    );
};

SetAvailableQuantity.propTypes = {
    selectedProducts: array,
    productId: string,
    productQuantity: number,
    carts: any,
    updateCart: func,
    //subTotal: number,
    //setSubTotal: func,
    moq: any
};
