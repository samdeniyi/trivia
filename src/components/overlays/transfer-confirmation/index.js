import React from 'react';
import styled from 'styled-components';
import { string, shape, bool, func } from 'prop-types';
import { colors, fonts } from '../../../styles';
import { formatPrice } from '../../../utils/currency/formatPriceWithComma';

import { TopHeader } from '../../header';
import { PageLogo } from '../../logo';
import { RippleButton } from '../../button';
import { ScreenContainer, FlexCenteredBlock } from '../../../containers/ScreenContainer';
import { SlidingOverlay } from '../../../containers/OverlayContainer';
import { SubTitle, Message } from '../../../containers/MessageContainer';
import { Close }    from '../../../containers/HeaderContainer';
import { ReactComponent as TransferIcon } from './assets/transfer.svg';
import { Loader } from '../../loader';

const PaymentAmount = styled.h1`
    font-size: 24px;
    font-weight: 500;
    color: ${colors.themeTextColor1};
    font-family: ${fonts.main};
    margin-top: 8px;
    line-height: 30px;
`;

const LightSubTitle = styled(SubTitle)`
    font-weight: 100;
`;

const Transfer = styled(TransferIcon)`
    margin: 32px auto;
`;

const TransferConfirmation = ({
    open,
    transactionDetails,
    confirm,
    close,
    isLoading
}) => {
    return open && (
        <>
            {isLoading ?
                <Loader /> 
            : (<SlidingOverlay zIndex={"100000"}>
                <TopHeader title={"Transfer Confirmation"}>
                    <Close right={"true"} onClick={() => close(!open)} />
                </TopHeader>
                <ScreenContainer top={"65px"}>
                    <FlexCenteredBlock top={"8px"}>
                        <SubTitle>You are about to send</SubTitle>
                        <PaymentAmount>{formatPrice(transactionDetails.amount)}</PaymentAmount>
                        <Transfer />
                        <PageLogo 
                            width={"64px"}
                            height={"64px"}
                            iconWidth={"64px"}
                            iconHeight={"64px"}
                            Icon={transactionDetails.customer_name}
                        />
                        <SubTitle top={"16px"}>{transactionDetails.customer_name || transactionDetails.bank_name}</SubTitle>
                        <LightSubTitle top={"8px"}>{transactionDetails.phoneNumber || transactionDetails.accountNumber}</LightSubTitle>
                        <Message>
                            "{transactionDetails.message}"
                        </Message>
                        <RippleButton 
                            top={"32px"}
                            disabled={+transactionDetails.amount <= 0}
                            onClick={() => {
                                if  (transactionDetails.accountNumber) {
                                confirm({
                                    accountBank: transactionDetails.accountBank,
                                    accountNumber: transactionDetails.accountNumber,
                                    amount: +transactionDetails.amount,
                                    callback_url: '',
                                    narration: transactionDetails.message,
                                    recipient: ''
                                }).then(() => close());
                            } else {
                                confirm(
                                    transactionDetails.phoneNumber,
                                    +transactionDetails.amount 
                                ).then(() => close());
                            }
                            }}
                        >
                            Send money
                        </RippleButton>
                    </FlexCenteredBlock>
                </ScreenContainer>
            </SlidingOverlay>
            )}
        </>
    );
};

TransferConfirmation.propTypes = {
    open:                    bool.isRequired,
    confirm:                 func,
    close:                   func,
    transactionDetails: 
        shape({
            amount:         string.isRequired,
            customer_name:  string,
            providerLogo:   string,
            message:        string,
        })
};

export default TransferConfirmation;