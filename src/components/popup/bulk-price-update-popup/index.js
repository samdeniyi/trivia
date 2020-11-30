import React, { useState } from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';
import { PopUp, PopUpContent, PopUpHeader, CancelButton, ConfirmButton } from '../common';
import { Overlay, ActionBlock } from '../../../containers/OverlayContainer';
import { Error } from '../../../containers/MessageContainer';
import { CustomInput } from '../../../containers/InputContainer';
import {
    PageLogo
} from "../../logo";
import {
    ListHeading
} from "../../../containers/ListContainer";
import SupermarketIcon from "./assets/supermarket.svg";

const UpdateAmountDue = styled.div`
    margin: 24px 16px;
`;

const Block = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 16px;
`;

export const BulkPriceUpdate = ({
    open,
    setOpen,
    productInfo,
    updateProduct
}) => {
    const [amount, setAmount] = useState('');
    const [error, setError]   = useState('');
    
    return (
        <PopUp open={open}>
            <Overlay onClick={() => setOpen(!open)}></Overlay>
            <PopUpContent>
                <PopUpHeader>Edit Price</PopUpHeader>
                <Block>
                    <PageLogo
                        Icon={
                            (productInfo.images && productInfo.images.baseImageUrl) ||
                            productInfo.base64ProductImageString
                        }
                        fallback={SupermarketIcon}
                        width={"32px"}
                        height={"32px"}
                        iconHeight={"32px"}
                        iconWidth={"32px"}
                        background={"transparent"}
                    />
                    <ListHeading style={{ marginLeft: "8px" }}>{productInfo.productName}</ListHeading>           
                </Block>
               
                <UpdateAmountDue>
                    <CustomInput
                        name="price"
                        value={amount}
                        type="number"
                        inputMode={"numeric"}
                        placeholder={productInfo && productInfo.retailUnitPrice}
                        onChange={(event) => {
                            const currentInput = event.target.value;
                            if (currentInput === ''){
                                setError('Please enter an amount');
                                setAmount(parseInt(''));
                            } else {
                                setError("");
                                setAmount(parseInt(event.target.value));
                            };
                        }}
                    />
                    {error && (
                        <Error>{error}</Error>
                    )}
                </UpdateAmountDue>
                <ActionBlock direction={"row"}>
                    <CancelButton type={"button"} 
                        onClick={() => {
                            setOpen(!open)
                            setAmount('')
                        }}
                    >
                        Cancel
                    </CancelButton>
                    <ConfirmButton type={"button"}
                        disabled={(amount === '') || error} 
                        onClick={() => {
                            setOpen(!open)
                            updateProduct(productInfo, amount)
                            setAmount('')
                        }}
                    >
                        Update
                    </ConfirmButton>
                </ActionBlock>
            </PopUpContent>
        </PopUp>        
    );
};

BulkPriceUpdate.propTypes = {
    open: bool,
    setOpen: func,
    updateProduct: func
};