import React, { Fragment, useState } from 'react';
import { formatPrice } from '../../../utils/currency/formatPriceWithComma';
import { unparseBalance } from '../../../utils/currency/parseBalance';

import { PopUp, PopUpContent, PopUpHeader, CancelButton, OkayCancelButton, InfoMessage, ConfirmButton, InputPopup } from '../common';
import { Overlay, ActionBlock } from '../../../containers/OverlayContainer';
import { Error } from '../../../containers/MessageContainer';

export const SetDiscountPopup = ({
    open,
    setOpen,
    discount,
    setDiscount,
    amount,
    setFieldValue
}) => {
    const [error, setError] = useState('');
    const [inputDiscount, setInputDiscount] = useState(0);
    const currentDiscount = (typeof discount === "string") ? unparseBalance(discount) : discount;
    //TODO Fix bug
    return (
        <Fragment>
        {open && <Overlay onClick={() => setOpen(!open)} bgc={'rgba(0,0,0,0.4)'} zIndex="99999" />}
        <PopUp open={open} zIndex="100000">
            <PopUpContent>
                <PopUpHeader align={"left"}>Discount</PopUpHeader>
                <InfoMessage>
                    {(currentDiscount === 0) ? 
                        "How much discount do you want to give this customer?" :
                        "Change or remove the discount you have given to this customer"
                    }  
                </InfoMessage>
                <InputPopup
                    name="discount" 
                    type="text"
                    autoComplete={'off'} 
                    size={14}
                    inputMode={"numeric"}
                    nobottom={"true"}
                    placeholder={!currentDiscount ? "Discount amount" : formatPrice(discount)}
                    onKeyUp={event => {
                        if (event.target.value >= amount) {
                            setError("You cannot discount more than the customer should pay");
                        } else if (event.target.value === 0) {
                            setError("Discount cannot be 0");
                        } else setError("");
                        setInputDiscount(+event.target.value);
                    }}
                />
                {error && <Error right={"24px"} justifyContent="center">{error}</Error>}
                <ActionBlock direction={"row"} top={"16px"}>
                    {currentDiscount === 0 ? (
                        <Fragment>
                        {inputDiscount === 0 ? (
                            <OkayCancelButton 
                                type="button" 
                                onClick={() => {
                                    setDiscount(0);
                                    setInputDiscount(0);
                                    setOpen(!open);
                                    setFieldValue('discount', 0);
                                }}
                            >
                                Cancel
                            </OkayCancelButton>
                        ) : (
                            <ConfirmButton
                                type="button"
                                disabled={error}
                                onClick={() => {
                                    if (!error) {
                                        const discountValue = Number(document.querySelector('input[name=discount]').value);
                                        setDiscount(discountValue);
                                        setFieldValue('discount', discountValue);
                                    };

                                    setOpen(!open);
                                }}
                            >
                                Apply
                            </ConfirmButton>
                        )}        
                        </Fragment>
                    ) : (
                        <Fragment>
                            <CancelButton 
                                type="button" 
                                onClick={() => {
                                    setDiscount(0);
                                    setInputDiscount(0);
                                    setOpen(!open);
                                    setFieldValue('discount', 0);
                                }}
                            >
                                Remove Discount
                            </CancelButton>
                            <ConfirmButton
                                type="button"
                                disabled={error}
                                onClick={() => {
                                    if (!error) {
                                        const discountValue = Number(document.querySelector('input[name=discount]').value);
                                        setDiscount(discountValue);
                                        setFieldValue('discount', discountValue);
                                    };
                                    setOpen(!open);
                                }}
                            >
                                Apply discount
                            </ConfirmButton>
                        </Fragment>
                    )}
                </ActionBlock>
            </PopUpContent>
        </PopUp>
        </Fragment>
    );
};