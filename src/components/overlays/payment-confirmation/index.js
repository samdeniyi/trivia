import React, { /*useEffect, useState*/ } from 'react';
import styled from 'styled-components';
import { string, shape, bool, func, number } from 'prop-types';
import { colors, fonts } from '../../../styles';
import { formatPrice } from '../../../utils/currency/formatPriceWithComma';

import { TopHeader } from '../../header';
import { PageLogo } from '../../logo';
import { RippleButton } from '../../button';
import { ScreenContainer, FlexCenteredBlock } from '../../../containers/ScreenContainer';
import { SlidingOverlay } from '../../../containers/OverlayContainer';
import { SubTitle } from '../../../containers/MessageContainer';
import { Close }    from '../../../containers/HeaderContainer';
import { ReactComponent as TransferIcon } from './assets/transfer.svg';

const PaymentAmount = styled.h1`
    font-size: 24px;
    font-weight: 500;
    color: ${colors.themeTextColor1};
    font-family: ${fonts.main};
    margin-top: 8px;
    line-height: 30px;
`;

// const LightSubTitle = styled(SubTitle)`
//     font-weight: 100;
// `;

const Transfer = styled(TransferIcon)`
    margin: 32px auto;
`;

const PaymentConfirmation = ({
    open,
    transactionDetails,
    confirm,
    close
}) => {

    return open && (
        <SlidingOverlay>
            <TopHeader title={"Confirmation"}>
                <Close right={"true"} onClick={() => close(!open)} />
            </TopHeader>
            <ScreenContainer>
                <FlexCenteredBlock top={"80px"}>
                    <SubTitle>You are about to topup</SubTitle>
                    <PaymentAmount>{formatPrice(transactionDetails.amount)}</PaymentAmount>
                    {transactionDetails.subHeading && (
                        <SubTitle top={"8px"}>{transactionDetails.subHeading}</SubTitle>
                    )}
                    <Transfer />
                    <PageLogo
                        width={"64px"}
                        height={"64px"}
                        iconWidth={"64px"}
                        iconHeight={"64px"}
                        Icon={transactionDetails.providerLogo}
                    />
                    <SubTitle top={"16px"}>{transactionDetails.fullName}</SubTitle>
                    <RippleButton
                        top={"128px"}
                        type="button"
                        onClick={() => {
                            confirm(true)
                            close(!open)
                        }}
                    >
                        Pay with pin
                    </RippleButton>
                </FlexCenteredBlock>
            </ScreenContainer>
        </SlidingOverlay>
    );
};

export default PaymentConfirmation;

PaymentConfirmation.propTypes = {
    open:                    bool.isRequired,
    subHeading:              string,
    detail:                  string,
    confirm:                 func,
    transactionDetails:
        shape({
            amount:       number.isRequired,
            customer:     string,
            providerLogo: string.isRequired,
            subHeading:   string,
            detail:       string,
            sender:       string,
            subChargeFee: string
        })
};