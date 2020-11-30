import React, { Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { colors } from '../../../../../styles';
import { uploadContentToBucket } from '../../../../../redux/ducks/applications/my-shop/actions/sales';
import { htmlToFormData } from '../../../../../utils/files/htmlToFormData';
import { formatPrice } from '../../../../../utils/currency/formatPriceWithComma';

import { TopHeader, RippleButton } from '../../../../../components';
import { ScreenContainer, ViewContainer, FlexCenteredBlock } from '../../../../../containers/ScreenContainer';
import { SubTitle, SecondaryText, SecondaryStrongText } from '../../../../../containers/MessageContainer';
import { List } from '../../../../../containers/ListContainer';
import { SubListContainer, SubList, SubListHeading, SubListValue } from '../../../../../containers/CheckoutContainer';
import { ReactComponent as SpacesLogo } from '../../../../../assets/spaces_logo.svg';
import { formatDateWithDash } from '../../../../../utils/date/formatDateWithDash';

const ReminderWrapper = styled(ViewContainer)`
    width: 100%;
    min-height: 323px;
    border-radius: 10px;
    box-shadow:
        0 1px 10px 0 ${colors.gray2},
        0 4px 5px 0 #26000000,
        0 2px 4px -1px #26000000;
`;

const ReminderHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 24px 0;    
`;

const ReminderTitle = styled(SubTitle)`
    font-weight: bolder;
    text-transform: uppercase;
    margin: 8px 0;
`;

const ReminderBody = styled.div`
    width: 100%;
    min-height: 100px;
`;

const ReminderTextBlock = styled.div`
    border-top: 1px solid ${colors.border.top};
    border-bottom: 1px solid ${colors.border.bottom};
    padding: 8px 16px;
`;

const TotalCheckout = styled(List)`
    padding: 24px 16px;
`;

const IncompletePayment = styled(SubListHeading)`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.transactions.pending};
`;

const PaymentReminder = ({
    location,
    uploadContentToBucket
}) => {
    const sale = location.state.sale;
    const shopId = location.state.shopId;
    const whatsAppRequestPaymentLink = location.state.whatsAppRequestPaymentLink;
    const customerName = sale.salesInfo ? sale.salesInfo.customer.name : sale.customer.name;
    const saleId = sale.salesInfo ? sale.salesInfo.id : sale.id;
    const amountOutstanding = sale.salesInfo ? sale.salesInfo.amountOutstanding : sale.amountOutstanding;
    const totalAmount = sale.salesInfo ? sale.salesInfo.totalAmount : sale.totalAmount;
    const discount = sale.salesInfo ? sale.salesInfo.discount : sale.discount;
    const salesDate = sale.salesInfo ? sale.salesInfo.localSalesDate : sale.localSalesDate;
    const shopName = useSelector(state => state.applications.myShop.shops)
        .find(shop => shop.id === shopId).shopName;

    return (
        <Fragment>
            <TopHeader title={"Request Payment"} />
            <ScreenContainer paddingBottom={"65px"}>
                <ReminderWrapper top={"108px"} id={"reminder"}>
                    <FlexCenteredBlock>
                        <ReminderHeader>
                            <SpacesLogo width={"97px"} height={"21px"} />
                            <ReminderTitle>Payment Reminder</ReminderTitle>
                            <SubTitle>Sale No. {saleId}</SubTitle>
                        </ReminderHeader>
                        <ReminderBody>
                            <ReminderTextBlock>
                                <SecondaryText>
                                    Hello {customerName}, {" "}
                                    your payment of {" "}
                                    <SecondaryStrongText>{formatPrice(amountOutstanding)}</SecondaryStrongText> {" "}
                                    is still pending on the purchase made from {" "}
                                    <SecondaryStrongText>{shopName} Shop</SecondaryStrongText> on {" "}
                                    <SecondaryStrongText>{formatDateWithDash(salesDate)}</SecondaryStrongText>.
                                </SecondaryText>
                            </ReminderTextBlock>
                            <TotalCheckout noBorderBottom>
                                <SubListContainer>
                                    <SubList>
                                        <SubListHeading>Status</SubListHeading>
                                        <IncompletePayment>Incomplete Sale</IncompletePayment>
                                    </SubList>
                                    <SubList>
                                        <SubListHeading>SubTotal</SubListHeading>
                                        <SubListValue>{formatPrice(totalAmount + discount)}</SubListValue>
                                    </SubList>
                                    <SubList>
                                        <SubListHeading>Discount</SubListHeading>
                                        <SubListValue>{formatPrice(-discount)}</SubListValue>
                                    </SubList>
                                    <SubList>
                                        <SubListHeading>TOTAL</SubListHeading>
                                        <SubListValue>{formatPrice(totalAmount)}</SubListValue>
                                    </SubList>
                                </SubListContainer>
                            </TotalCheckout>
                        </ReminderBody>
                    </FlexCenteredBlock>
                </ReminderWrapper>
                <RippleButton
                    onClick={async () => {
                        const url = await htmlToFormData("#reminder", uploadContentToBucket);
                        url && window.open(`${whatsAppRequestPaymentLink} ${encodeURIComponent(url)}`);
                    }}
                    type={"button"}
                    top={"101px"}
                >
                    Send to {customerName}'s WhatsApp
                </RippleButton>
            </ScreenContainer>
        </Fragment>
    );
};

export default connect(
    null,
    { uploadContentToBucket }
)(withRouter(PaymentReminder));