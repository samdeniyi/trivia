import React, { Fragment } from "react";
import moment from "moment";

import styled from "styled-components";
import { object } from "prop-types";
import { colors } from "../../../../../../styles";

import {
    FlexCenteredBlock
} from "../../../../../../containers/ScreenContainer";
import { PageLogo } from "../../../../../../components";
import {
    OrderBadges,
    OrderBadge
} from "../../../containers/OrderBadgesContainer";
import { SubTitle } from "../../../../../../containers/MessageContainer";
import {
    SubList,
    SubListHeading,
    SubListValue
} from "../../../../../../containers/CheckoutContainer";

import {
    List,
    ListItem,
    ListHeading,
    ListHighlight,
    ListLeftBlock,
    ListSubHeading
} from "../../../../../../containers/ListContainer";
import SupermarketIcon from "../../../assets/supermarket.svg";
import { ReactComponent as MerchLogo } from "../../../../../../assets/merch_icon.svg";
import OrderIcon from "../../../../../../assets/order-icon.svg";
import { getOrderTypeName } from "../../../../../../utils/orders/getOrderNameFromID";
import { formatPrice } from "../../../../../../utils/currency/formatPriceWithComma";

const QuantityCount = styled(ListHighlight)`
    width: 40px;
    height: 40px;
    border-radius: 30%;
    padding: 10px;
    background-color: #f2f5fa;
    text-align: center;
`;

const Space = styled.div `
    height:${({ height }) => height || "10px"}
`

// const ModifiedSubListValue  = styled(SubListValue)`
//   overflow-x: scroll
// `;

const QuantityCountRejected = styled(QuantityCount)`
    background-color: #e0202020;
    color: ${colors.myShop.rejected.text};
`;

const QuantityCountDelivered = styled(QuantityCount)`
    background-color: ${colors.myShop.delivered.bg};
    color: ${colors.myShop.delivered.text};
`;

const QuantityCountPacked = styled(QuantityCount)`
    background-color: #e7f1f9;
    color: #579fd7;
`;

const ImageBox = styled(MerchLogo)`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: ${colors.gray3};
    position: absolute;
    right: 27%;
    top: -10px;
`;
const TotalAmount = styled(ListSubHeading)`
    font-weight: 700;
`;

const CustomerName = styled.div`
    font-size: 14px;
`;

const PhoneNumber = styled.div`
    font-size: 12px;
    color: #8d9aa3;
`;

const SectionBlock = styled.section`
    position: relative;
    margin-top: 20px;
`;

const SectionBlock2 = styled.section`
    position: relative;
`;

const Title = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin: 10px 0;
`;

export const AttendedOrderDisplay = ({ order }) => {
    let orderItems = order.orderItems ? order.orderItems : [];
    const rejected = orderItems.filter(x => x.orderItemStatus === 5);
    const packed = orderItems.filter(x => x.orderItemStatus === 4);
    const delivered = orderItems.filter(x => x.orderItemStatus === 7);
    const shipped = orderItems.filter(x => x.orderItemStatus === 6);


    const totalPrice =
        packed.length > 0
            ? packed
                  .map(x => x.totalPrice)
                  .reduce((a, b) => {
                      return a + b;
                  })
            : 0;

    return (
        <Fragment>
            <>
                <FlexCenteredBlock top={"27px"}>
                <Space height={"40px"} />

                    <PageLogo
                        top={"8px"}
                        background={"transparent"}
                        width={"48px"}
                        height={"48px"}
                        iconWidth={"48px"}
                        iconHeight={"48px"}
                        Icon={OrderIcon}
                    />
                    <SubTitle top={"16px"}>
                        Order No. {order.orderNumber}
                    </SubTitle>
                    <OrderBadges top={"16px"}>
                        <OrderBadge nature={getOrderTypeName(order)}>
                            {getOrderTypeName(order)}
                        </OrderBadge>
                        <OrderBadge nature="Simple">
                            {order.noOfItems} Product
                            {order.noOfItems > 1 ? "s" : ""}
                        </OrderBadge>
                    </OrderBadges>
                </FlexCenteredBlock>
                <SectionBlock>
                    {rejected.length > 0 && (
                        <>
                            <Title>Rejected</Title>
                            <List fullScreen>
                                {rejected &&
                                    rejected.map((product, index) => (
                                        <ListItem
                                            key={index}
                                            top={"15px"}
                                            bottom={"15px"}
                                            direction={"row"}
                                        >
                                            <PageLogo
                                                Icon={product.imageUrl}
                                                fallback={SupermarketIcon}
                                                width={"32px"}
                                                height={"32px"}
                                                iconHeight={"32px"}
                                                iconWidth={"32px"}
                                                background={"transparent"}
                                            />
                                            <ListLeftBlock>
                                                <ListHeading maxWidth={'250px'}>
                                                    {product.productName}
                                                </ListHeading>
                                                <ListSubHeading>
                                                    {formatPrice(
                                                        product.totalPrice
                                                    )}
                                                </ListSubHeading>
                                            </ListLeftBlock>
                                            <QuantityCountRejected>
                                                {product.quantity}
                                            </QuantityCountRejected>
                                        </ListItem>
                                    ))}
                            </List>
                        </>
                    )}
                    {packed.length > 0 && (
                        <>
                            <Title>Packed</Title>
                            <List fullScreen>
                                {packed &&
                                   packed.map((product, index) => (
                                        <ListItem
                                            key={index}
                                            top={"15px"}
                                            bottom={"15px"}
                                            direction={"row"}
                                        >
                                            <PageLogo
                                                Icon={product.imageUrl}
                                                fallback={SupermarketIcon}
                                                width={"32px"}
                                                height={"32px"}
                                                iconHeight={"32px"}
                                                iconWidth={"32px"}
                                                background={"transparent"}
                                            />
                                            <ListLeftBlock>
                                                <ListHeading  maxWidth={'250px'}>
                                                    {product.productName}
                                                </ListHeading>
                                                <ListSubHeading>
                                                    {formatPrice(
                                                        product.totalPrice
                                                    )}
                                                </ListSubHeading>
                                            </ListLeftBlock>
                                            <QuantityCountPacked>
                                                {product.quantity}
                                            </QuantityCountPacked>
                                        </ListItem>
                                    ))}
                            </List>
                        </>
                    )}
                    {shipped.length > 0 && (
                        <>
                            <Title>Shipped</Title>
                            <List fullScreen>
                                {shipped &&
                                    shipped.map((product, index) => (
                                        <ListItem
                                            key={index}
                                            top={"15px"}
                                            bottom={"15px"}
                                            direction={"row"}
                                        >
                                            <PageLogo
                                                Icon={product.imageUrl}
                                                fallback={SupermarketIcon}
                                                width={"32px"}
                                                height={"32px"}
                                                iconHeight={"32px"}
                                                iconWidth={"32px"}
                                                background={"transparent"}
                                            />
                                            <ListLeftBlock>
                                                <ListHeading  maxWidth={'250px'}>
                                                    {product.productName}
                                                </ListHeading>
                                                <ListSubHeading>
                                                    {formatPrice(
                                                        product.totalPrice
                                                    )}
                                                </ListSubHeading>
                                            </ListLeftBlock>
                                            <QuantityCount>
                                                {product.quantity}
                                            </QuantityCount>
                                        </ListItem>
                                    ))}
                            </List>
                        </>
                    )}

                    {delivered.length > 0 && (
                        <>
                            <Title>Delivered</Title>
                            <List fullScreen>
                                {delivered &&
                                    delivered.map((product, index) => (
                                        <ListItem
                                            key={index}
                                            top={"15px"}
                                            bottom={"15px"}
                                            direction={"row"}
                                        >
                                            <PageLogo
                                                Icon={product.imageUrl}
                                                fallback={SupermarketIcon}
                                                width={"32px"}
                                                height={"32px"}
                                                iconHeight={"32px"}
                                                iconWidth={"32px"}
                                                background={"transparent"}
                                            />
                                            <ListLeftBlock>
                                                <ListHeading  maxWidth={'250px'}>
                                                    {product.productName}
                                                </ListHeading>
                                                <ListSubHeading>
                                                    {formatPrice(
                                                        product.totalPrice
                                                    )}
                                                </ListSubHeading>
                                            </ListLeftBlock>
                                            <QuantityCountDelivered>
                                                {product.quantity}
                                            </QuantityCountDelivered>
                                        </ListItem>
                                    ))}
                            </List>
                        </>
                    )}
                </SectionBlock>
                <SectionBlock2>
                <Title>Packed Value</Title>
                    <Space />
                    <SubList>
                        <SubListHeading>SubTotal</SubListHeading>
                        <SubListValue>
                            {formatPrice(totalPrice)}
                        </SubListValue>
                    </SubList>
                    <SubList>
                        <SubListHeading>V.A.T (5%)</SubListHeading>
                        <SubListValue>
                            {formatPrice(totalPrice * 0.05)}
                        </SubListValue>
                    </SubList>

                    <SubList>
                        <TotalAmount>TOTAL</TotalAmount>
                        <SubListValue>
                            {formatPrice(totalPrice + totalPrice * 0.05)}
                        </SubListValue>
                    </SubList>
                </SectionBlock2>
                <SectionBlock2>
                    <SubList>
                        <SubListHeading>Customer</SubListHeading>
                        <SubListValue>
                            <CustomerName>{order.userName}</CustomerName>
                            <PhoneNumber>{order.phoneNumber}</PhoneNumber>
                        </SubListValue>
                    </SubList>
                </SectionBlock2>
                <SectionBlock2>
                    <SubList>
                        <SubListHeading>Marketplace</SubListHeading>
                        <SubListValue>
                            <ImageBox />
                            Merchlist
                        </SubListValue>
                    </SubList>
                </SectionBlock2>
                <SectionBlock2>
                    <SubList>
                        <SubListHeading>Attended On</SubListHeading>
                        <SubListValue>
                            {moment(order.createdDate).format("LL")}
                        </SubListValue>
                    </SubList>
                </SectionBlock2>
                {/* <SectionBlock>
                    <SubList>
                        <SubListHeading>Attended by</SubListHeading>
                        <ModifiedSubListValue>{(order.orderItems.length > 0) && order.orderItems[0].modifiedBy}</ModifiedSubListValue>
                    </SubList>
                </SectionBlock> */}
            </>
        </Fragment>
    );
};

AttendedOrderDisplay.propTypes = {
    order: object
};

