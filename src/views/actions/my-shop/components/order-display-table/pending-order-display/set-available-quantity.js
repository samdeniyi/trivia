import React from "react";
import styled from "styled-components";
import { colors } from "../../../../../../styles";
import { array, number, object, func, any } from "prop-types";
import { ReactComponent as AddIcon } from "../../../assets/add.svg";
import { ReactComponent as SubstractIcon } from "../../../assets/substract.svg";
import { ReactComponent as DisableAddIcon } from "../../../assets/disableAdd.svg";
import { ReactComponent as DisableSubstractIcon } from "../../../assets/disabledSubstract.svg";

const QuantityControls = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 0;
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

const ModifiedDisableAddIcon = styled(DisableAddIcon)`
    width: 30px;
    height: 30px;
    margin-left: 8px !important;
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
    border-radius: 8px;
    text-align: center;
    background-color: ${colors.themeColor3};
    text-align: center

`;

const changeQuantity = (
    selectedProducts,
    orderedQuantity,
    fetchOrderDetails,
    productId,
    order,
    action,
    setSubTotal,
    subTotal,
    confirmedStatus
) => {
    const updatedOrderItems = selectedProducts.map(product => {
        const quantity = product.newQuantity;
        if (product.id === productId) {
            if (action === "add") {
                product.newQuantity =
                    quantity === parseInt(orderedQuantity)
                        ? parseInt(quantity)
                        : parseInt(quantity) + 1;
                product.totalPrice =
                    quantity === parseInt(orderedQuantity)
                        ? parseInt(product.totalPrice)
                        : parseInt(product.totalPrice) +
                          parseInt(product.PricePerOne);
                if (confirmedStatus && quantity < orderedQuantity) {
                    setSubTotal(subTotal + product.PricePerOne);
                }
            } else {
                product.newQuantity =
                    parseInt(quantity) - (quantity !== 1 ? 1 : 0);
                product.totalPrice =
                    quantity === 1
                        ? parseInt(product.totalPrice)
                        : parseInt(product.totalPrice) -
                          parseInt(product.PricePerOne);
                if (confirmedStatus && quantity !== 1) {
                    setSubTotal(subTotal - product.PricePerOne);
                }
            }
        }

        return product;
    });

    order.orderItems = updatedOrderItems;
    fetchOrderDetails({}, order);
};

export const SetAvailableQuantity = ({
    selectedProducts,
    fetchOrderDetails,
    orderedQuantity,
    productId,
    order,
    setSubTotal,
    subTotal,
    confirmedStatus
}) => {
    return (
        <QuantityControls>
            {selectedProducts.find(x => x.id === productId).newQuantity <= 1 ? (
                <ModifiedDisableSubstractIcon></ModifiedDisableSubstractIcon>
            ) : (
                <Substract
                    onClick={() =>
                        changeQuantity(
                            selectedProducts,
                            orderedQuantity,
                            fetchOrderDetails,
                            productId,
                            order,
                            "substract",
                            setSubTotal,
                            subTotal,
                            confirmedStatus
                        )
                    }
                    style={{ marginRight: "8px" }}
                ></Substract>
            )}
            <QuantityCount>
                {selectedProducts.find(x => x.id === productId).newQuantity ||
                    orderedQuantity}
            </QuantityCount>
            {selectedProducts.find(x => x.id === productId).newQuantity >=
            orderedQuantity ? (
                <ModifiedDisableAddIcon></ModifiedDisableAddIcon>
            ) : (
                <Add
                    onClick={() =>
                        changeQuantity(
                            selectedProducts,
                            orderedQuantity,
                            fetchOrderDetails,
                            productId,
                            order,
                            "add",
                            setSubTotal,
                            subTotal,
                            confirmedStatus
                        )
                    }
                    style={{ marginLeft: "8px" }}
                ></Add>
            )}
        </QuantityControls>
    );
};

SetAvailableQuantity.propTypes = {
    selectedProducts: array,
    productId: number,
    orderedQuantity: number,
    order: object,
    fetchOrderDetails: func,
    subTotal: number,
    setSubTotal: func,
    confirmedStatus: any
};
