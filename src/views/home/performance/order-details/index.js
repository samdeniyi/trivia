import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { formatPrice } from '../../../../utils/currency/formatPriceWithComma';
import { formatCreationDate } from '../../../../utils/date/formatCreationDate';

import { ScreenContainer, FlexCenteredBlock } from '../../../../containers/ScreenContainer';
import { TopHeader, PageLogo } from '../../../../components';
import { SubTitle, TransactionAmount, TransactionStatus } from '../../../../containers/MessageContainer';
import { List, ListItem, ListSubHeading, ListHighlight, TransactionDetail } from '../../../../containers/ListContainer';
import { SubListContainer, SubList, SubListHeading, SubListValue } from '../../../../containers/CheckoutContainer';
import { Report } from '../../../../containers/HeaderContainer';
import MerchLogo from '../../../../assets/merch_logo.svg';

const OrderDetails = ({
    location
}) => {
    const order = location.state;

    return (
        <Fragment>
            <TopHeader title={"Details"}>
                <Report right={"16px"} />
            </TopHeader>
            <ScreenContainer>
                <FlexCenteredBlock>
                    <PageLogo
                        top={"8px"}
                        background={"transparent"}
                        width={"48px"}
                        height={"48px"}
                        iconWidth={"48px"}
                        iconHeight={"48px"}
                        Icon={MerchLogo}
                    />
                    <SubTitle top={"8px"}>Order No. {order.orderNumber}</SubTitle>
                    <TransactionAmount type={"PAID"}>{formatPrice(order.amount)}</TransactionAmount>
                </FlexCenteredBlock>
                <List fullScreen>
                    <ListItem height={"48px"} top={"16px"}>
                        <ListSubHeading top={"0"}>Status</ListSubHeading>
                        <ListHighlight>
                            <TransactionStatus type={"PAID"}>
                                {order.status}    
                            </TransactionStatus>
                        </ListHighlight>
                    </ListItem>
                    <ListItem height={"48px"} top={"16px"}>
                        <ListSubHeading top={"0"}>Time stamp</ListSubHeading>
                        <TransactionDetail>{formatCreationDate(order.createdAt)}</TransactionDetail>
                    </ListItem>
                    <ListItem height={"96px"} top={"16px"}>
                        <SubListContainer>
                            <SubList>
                                <SubListHeading>Order items</SubListHeading> 
                                <SubList direction={"column"}>
                                    {order.items.map((item, index) => (
                                        <SubList direction={"column"} key={index}>
                                            <SubListValue>{item.title}</SubListValue>  
                                            <SubListHeading>{formatPrice(item.amount)}</SubListHeading>
                                        </SubList>
                                    ))}
                                </SubList>
                            </SubList>
                            <SubList>
                                <SubListHeading>SubTotal</SubListHeading>
                                <SubListValue>{formatPrice(order.totalPrice)}</SubListValue>
                            </SubList>
                            <SubList>
                                <SubListHeading>Charges</SubListHeading>
                                <SubListValue>{formatPrice(order.serviceFee)}</SubListValue>
                            </SubList>
                            <SubList>
                                <SubListHeading>Delivery Fee</SubListHeading>
                                <SubListValue>{formatPrice(order.deliveryFee)}</SubListValue>
                            </SubList>
                            <SubList bottom={"18px"}>
                                <SubListHeading>SubTotal</SubListHeading>
                                <SubListValue>{formatPrice(order.subTotal)}</SubListValue>
                            </SubList>
                            <SubList>
                                <SubListHeading>Total</SubListHeading>
                                <SubListValue>{formatPrice(order.totalPrice)}</SubListValue>
                            </SubList>
                        </SubListContainer>
                    </ListItem>
                    <ListItem height={"48px"} top={"16px"}>
                        <SubListContainer>
                            <SubList>
                                <ListSubHeading top={"0"}>Delivery address</ListSubHeading>
                                <SubList direction={"column"}>
                                    <SubListValue>{order.deliveryAddress}</SubListValue>
                                </SubList>
                            </SubList>
                        </SubListContainer>
                    </ListItem>
                    <ListItem height={"48px"} top={"16px"}>
                        <SubListContainer>
                            <SubList>
                                <ListSubHeading top={"0"}>Shipping status</ListSubHeading>
                                <SubList direction={"column"}>
                                    <SubListValue>{order.shippingStatus}</SubListValue>
                                </SubList>
                            </SubList>
                        </SubListContainer>
                    </ListItem>
                    <ListItem height={"48px"} top={"16px"}>
                        <SubListContainer>
                            <SubList>
                                <ListSubHeading top={"0"}>Customer</ListSubHeading>
                                <SubList direction={"column"}>
                                    <SubListValue>{order.customer.name}</SubListValue>
                                    <SubListHeading>{order.customer.phoneNumber}</SubListHeading>
                                </SubList>
                            </SubList>
                        </SubListContainer>
                    </ListItem>
                    <ListItem height={"48px"} top={"16px"}>
                        <SubListContainer>
                            <SubList>
                                <ListSubHeading top={"0"}>Merchant</ListSubHeading>
                                <SubList direction={"column"}>
                                    <SubListValue>{order.merchant.name}</SubListValue>
                                    <SubListHeading>{order.merchant.phoneNumber}</SubListHeading>
                                </SubList>
                            </SubList>
                        </SubListContainer>
                    </ListItem>
                </List>
            </ScreenContainer>
        </Fragment>
    );
};

export default withRouter(OrderDetails);