import React, { useState } from "react";
import styled from 'styled-components';
import { bool, func, string } from "prop-types";
import { colors } from "../../../styles";
import { PopUp, PopUpContent, PopUpHeader, InfoMessage } from "../common";
import { Overlay, ActionBlock } from "../../../containers/OverlayContainer";
import { SecondaryText } from "../../../containers/MessageContainer";
import { ReactComponent as SubstractIcon } from './assets/substract.svg';
import { ReactComponent as AddIcon } from './assets/add.svg';
import { LightRippleButton, RippleButton } from "../../button";

const QuantityCount = styled.span`
    font-size: 12px;
    font-weight: 500;
    margin-top: 0;
    margin-left: 4px;
    padding: 4px 16px;
    border-radius: 15px;
    text-align: center;
    background-color: ${colors.aquamarine};
    color: ${colors.blue};
`;

const UpdateStockHeading = styled(PopUpHeader)`
    font-size: 12px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UpdateCalculatorBlock = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 32px 0;

    & > svg {
        cursor: pointer;
    }
`;

const QuantityDisplay = styled.div`
    border-radius: 8px;
    width: 82px;
    height: 48px;
    background-color: ${colors.themeColor3};
    text-align: center;
`;

const CurrentQuantity = styled.input`
    position: relative;
    top: calc(50% - 8px);
    font-weight: 100;
    font-size: 14px;
    font-weight: 500;
    color: ${({color}) => color || colors.themeTextColor1};
    margin-top: ${({ top }) => top || null};
    margin-left: ${({ left }) => left || null};
    width: 60%;
    background-color: inherit;
    border: none;
    text-align: center;
    &:focus {
        outline: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }
`;

const AddRemoveBlock = styled(ActionBlock)`
    padding: 0 16px 24px;
`;

export const UpdateStockPopup = ({
    open,
    title,
    message,
    quantity,
    cancel,
    updateProductQuantity,
    shopId,
    id,
    productName
}) => {
    const [newQuantity, setNewQuantity] = useState(0);

    return (
        <PopUp open={open}>
            <Overlay onClick={cancel}></Overlay>
            <PopUpContent>
                <UpdateStockHeading>
                    {title}<br />
                    <SecondaryText top={"13px"} bottom={"0"}>
                        Quantity in stock <QuantityCount>{quantity}</QuantityCount>
                    </SecondaryText>
                </UpdateStockHeading>
                <InfoMessage>{message}</InfoMessage>
                <UpdateCalculatorBlock>
                    <SubstractIcon 
                        onClick={() => {
                            setNewQuantity(
                                parseInt(newQuantity) - 1 <= 0 ? 0 : parseInt(newQuantity) - 1
                            );
                        }} 
                    />
                    <QuantityDisplay>
                        <CurrentQuantity 
                            value={newQuantity}
                            type={"number"}
                            onChange={e => {
                                setNewQuantity(e.target.value < 0 ? 0 : parseInt(e.target.value));
                            }}
                        />
                    </QuantityDisplay>
                    <AddIcon onClick={() => setNewQuantity(parseInt(newQuantity) + 1)} />
                </UpdateCalculatorBlock>
                <AddRemoveBlock direction={"column"}>
                    <LightRippleButton
                        type="button" 
                        disabled={newQuantity > quantity}
                        onClick={() => {
                            (newQuantity > 0) && updateProductQuantity(
                                shopId, 
                                id, 
                                parseInt(quantity) - parseInt(newQuantity),
                                newQuantity,
                                "decrease",
                                productName
                            );
                        }}
                    >
                        Remove from stock
                    </LightRippleButton>
                    <RippleButton 
                        type="button" 
                        onClick={() => {
                            (newQuantity > 0) && updateProductQuantity(
                                shopId, 
                                id, 
                                parseInt(quantity) + parseInt(newQuantity),
                                newQuantity,
                                "increase",
                                productName
                            );
                        }}
                    >
                        Add to stock
                    </RippleButton>
                </AddRemoveBlock>
            </PopUpContent>
        </PopUp> 
    );
};

UpdateStockPopup.propTypes = {
    open:        bool,
    cancel:      func,
    title:       string,
    message:     string,
    quantity:    string,
    setQuantity: func,
    confirm:     func
};