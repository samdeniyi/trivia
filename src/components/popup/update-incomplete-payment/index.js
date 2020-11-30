import React, { useState } from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';
import { colors } from '../../../styles';
import { formatPrice } from '../../../utils/currency/formatPriceWithComma';

import { FlexCenteredBlock } from '../../../containers/ScreenContainer';
import { PopUp, PopUpContent, PopUpHeader, InfoMessage, CancelButton, ConfirmButton } from '../common';
import { Overlay, ActionBlock } from '../../../containers/OverlayContainer';
import { PageLogo } from '../../logo';
import { Title, SecondaryText, SubTitle, Error } from '../../../containers/MessageContainer';
import { CustomInput } from '../../../containers/InputContainer';
import { AmountDue } from '../../forms/input/amount-due';
import CartIcon from '../../../assets/sale.svg';

const AmountDueTitle = styled(SubTitle)`
    width: fit-content;
    margin-bottom: 16px;
    color: ${colors.gray5};
    line-height: 18px;
`;

const PaymentBlock = styled(FlexCenteredBlock)`
    margin: 24px 0;
`;

const UpdateAmountDue = styled.div`
    margin: 24px 16px;
`;

export const UpdateIncompletePayment = ({
    open,
    setOpen,
    salesInfo,
    updatePayment
}) => {
    const [amountToPay, setAmountToPay] = useState('');
    const [error, setError]             = useState('');

    return (
        <PopUp open={open}>
            <Overlay onClick={() => setOpen(!open)}></Overlay>
            <PopUpContent>
                <PopUpHeader>Sale Payment</PopUpHeader>
                <InfoMessage>Update the payment for this sale by putting the amount the customer paid.</InfoMessage>
                <PaymentBlock>
                    <PageLogo 
                        Icon={CartIcon}
                        iconWidth={"40px"}
                        iconHeight={"40px"}
                        width={"40px"}
                        height={"40px"}
                    />
                    <Title top={"8px"}>{formatPrice(salesInfo.totalAmount)}</Title>
                    <SecondaryText top={"4px"}>Sale Total</SecondaryText>
                </PaymentBlock>
                <UpdateAmountDue>
                    <AmountDueTitle>Amount Due</AmountDueTitle>
                    <AmountDue amount={salesInfo.amountOutstanding} />
                    <CustomInput
                        name="discount" 
                        value={amountToPay}
                        type="number"
                        inputMode={"numeric"}
                        placeholder={"How much did the customer pay?"}
                        onChange={(event) => {
                            const currentInput = event.target.value;
                            if (currentInput > salesInfo.amountOutstanding) {
                                setError('You cannot pay more than the amount owed');
                                setAmountToPay(parseInt(event.target.value));
                            } else if (currentInput ===''){
                                setError('Please enter an amount');
                                setAmountToPay(parseInt(''));
                            } else {
                                setError("");
                                setAmountToPay(parseInt(event.target.value));
                            };
                        }}
                    />
                    {error && (
                        <Error>{error}</Error>
                    )}
                </UpdateAmountDue>
                <ActionBlock direction={"row"}>
                    <CancelButton type={"button"} onClick={() => setOpen(!open)}>Cancel</CancelButton>
                    <ConfirmButton 
                        disabled={(amountToPay === '') || error} 
                        type={"button"} 
                        onClick={() => updatePayment(salesInfo, amountToPay)}
                    >
                        Update
                    </ConfirmButton>
                </ActionBlock>
            </PopUpContent>
        </PopUp>        
    );
};

UpdateIncompletePayment.propTypes = {
    open: bool,
    setOpen: func,
    updatePayment: func
};