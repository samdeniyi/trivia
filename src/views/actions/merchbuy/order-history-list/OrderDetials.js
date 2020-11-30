import React from "react";
import styled from "styled-components";
import { TopHeader } from "../../../../components/header";
import {
    FlexCenteredBlock,
    ScreenContainer
} from "../../../../containers/ScreenContainer";
import { PageLogo } from "../../../../components/logo";
import { SubTitle } from "../../../../containers/MessageContainer";
import OrderIcon from "../../../../assets/order-icon.svg";
import { OrderBadge } from "../../my-shop/containers/OrderBadgesContainer";
import { formatPrice } from "../../../../utils/currency/formatPriceWithComma";
import { parseDate } from "../../../../utils/date/parseDateFromStr";
import {
    List,
    ListHeading,
    ListHighlight,
    ListItem,
    ListLeftBlock,
    ListSubHeading
} from "../../../../containers/ListContainer";
import { fromCamelCase } from "../../../../utils/fromCamelCase";
import SupermarketIcon from "../../my-shop/assets/supermarket.svg";
import { colors } from "../../../../styles";
import { Space } from "../styles";

const DetailsContainer = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 50;
    background: white;
    min-height: 120vh;
    overflow: hidden;
    padding: 4vh;
`;
const BorderBlock = styled.div`
    border-top: ${noBorderTop => (noBorderTop ? "" : "1px solid #f0f0f0")};
    border-bottom: 1px solid #f0f0f0;
    padding: 24px 16px 16px 16px;
    position: relative;
    margin: 0 -16px;
`;

const SecondaryBlock = styled(BorderBlock)`
    padding: 13px 16px;
`;

const SecondaryText = styled.span`
    display: block;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.6em;
    max-width: 90%;
`;
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ bottom }) => bottom || "19px"};
    margin-top: ${({ top }) => top || "0"};
`;
const RowText = styled(SecondaryText)`
    color: #6c7984;
`;
const QuantityCount = styled(ListHighlight)`
    width: 40px;
    height: 40px;
    border-radius: 30%;
    padding: 10px;
    background-color: #f2f5fa;
    text-align: center;
`;
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
const Title = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin: 16px 0;
`;
const BranchNameWrapper = styled.span`
    padding: 0 8px;
    background: #f2f5fa;
    border-radius: 8px;
    font-size: 12px;
    margin-left: 8px;
`;

const OrderDetials = ({ closeOrderHistory, orderHistory }) => {
    let orderItems = orderHistory.orderItems || [];
    const pending = orderItems.filter(x => x.orderItemStatus === 1 || x.orderItemStatus === 2 || x.orderItemStatus === 2 || x.orderItemStatus === 9);
    const rejected = orderItems.filter(x => x.orderItemStatus === 5);
    const packed = orderItems.filter(x => x.orderItemStatus === 4);
    const delivered = orderItems.filter(x => x.orderItemStatus === 7);
    const shipped = orderItems.filter(x => x.orderItemStatus === 6);
    const { serviceFee, createdDate, orderDelivery } =
        orderHistory || {};
    const { firstName, address, state, phoneNumber } = orderDelivery || {};

    const totalPrice =
    packed.length > 0
        ? packed
              .map(x => x.totalPrice)
              .reduce((a, b) => {
                  return a + b;
              })
        : 0;

    return (
        <DetailsContainer>
            <TopHeader
                withSpacesHeader
                title={`Order No. ${orderHistory.orderNumber || ""}`}
                backAction={closeOrderHistory}
                backLink={"/actions/merchbuy/order-history"}
            ></TopHeader>
            <ScreenContainer padding={"0"}>
                <FlexCenteredBlock top={"50px"}>
                    <PageLogo
                        top={"22px"}
                        background={"transparent"}
                        width={"48px"}
                        height={"48px"}
                        iconWidth={"48px"}
                        iconHeight={"48px"}
                        Icon={OrderIcon}
                    />
                    <OrderBadge top={"15px"} nature="Simple">
                        {orderHistory.orderItems && ( orderHistory.orderItems.length + `${(orderHistory.orderItems.length > 1) ? " Products" : " Product"}`  ) } 
                    </OrderBadge>
                </FlexCenteredBlock>
                <Space height={"20px"} />

                <>
                    <BorderBlock noBorderTop>
                        <SubTitle font={"16px"}>
                            Products In Your Order
                        </SubTitle>
                    </BorderBlock>
                    {pending.length > 0 && (
                        <>
                            <Title>Pending</Title>
                            <List fullScreen>
                                {pending &&
                                    pending.map((product, index) => (
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
                                                <ListHeading maxWidth={"180px"}>
                                                    {product.productName}
                                                </ListHeading>
                                                <div>
                                                    <ListSubHeading>
                                                        {product.totalPrice && formatPrice(
                                                            product.totalPrice
                                                        )}
                                                    </ListSubHeading>
                                                    <BranchNameWrapper>
                                                        {product.branchName}
                                                    </BranchNameWrapper>
                                                </div>
                                            </ListLeftBlock>
                                            <QuantityCount>
                                                {product.quantity}
                                            </QuantityCount>
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
                                                <ListHeading maxWidth={"180px"}>
                                                    {product.productName}
                                                </ListHeading>
                                                <div>
                                                    <ListSubHeading>
                                                        {product.totalPrice && formatPrice(
                                                            product.totalPrice
                                                        )}
                                                    </ListSubHeading>
                                                    <BranchNameWrapper>
                                                        {product.branchName}
                                                    </BranchNameWrapper>
                                                </div>
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
                                                <ListHeading maxWidth={"180px"}>
                                                    {product.productName}
                                                </ListHeading>
                                                <div>
                                                    <ListSubHeading>
                                                        {product.totalPrice && formatPrice(
                                                            product.totalPrice
                                                        )}
                                                    </ListSubHeading>
                                                    <BranchNameWrapper>
                                                        {product.branchName}
                                                    </BranchNameWrapper>
                                                </div>
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
                                                <ListHeading maxWidth={"180px"}>
                                                    {product.productName}
                                                </ListHeading>
                                                <div>
                                                    <ListSubHeading>
                                                        {product.totalPrice && formatPrice(
                                                            product.totalPrice
                                                        )}
                                                    </ListSubHeading>
                                                    <BranchNameWrapper>
                                                        {product.branchName}
                                                    </BranchNameWrapper>
                                                </div>
                                            </ListLeftBlock>
                                            <QuantityCountDelivered>
                                                {product.quantity}
                                            </QuantityCountDelivered>
                                        </ListItem>
                                    ))}
                            </List>
                        </>
                    )}

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
                                                <ListHeading maxWidth={"180px"}>
                                                    {product.productName}
                                                </ListHeading>
                                                <div>
                                                    <ListSubHeading>
                                                        {product.totalPrice && formatPrice(
                                                            product.totalPrice
                                                        )}
                                                    </ListSubHeading>
                                                    <BranchNameWrapper>
                                                        {product.branchName}
                                                    </BranchNameWrapper>
                                                </div>
                                            </ListLeftBlock>
                                            <QuantityCountRejected>
                                                {product.quantity}
                                            </QuantityCountRejected>
                                        </ListItem>
                                    ))}
                            </List>
                        </>
                    )}
                    {orderHistory.payment && (
                        <>
                            <BorderBlock>
                                <SubTitle font={"16px"}>Payment</SubTitle>
                            </BorderBlock>
                            <SecondaryBlock>
                                <SecondaryText weight={"500"}>
                                    {fromCamelCase(
                                        orderHistory.payment
                                            .paymentMethodDescription
                                    )}
                                </SecondaryText>
                            </SecondaryBlock>
                        </>
                    )}

                    <BorderBlock>
                        <SubTitle font={"16px"}>Delivery</SubTitle>
                    </BorderBlock>
                    <BorderBlock noBorderTop>
                        <SubTitle font={"16px"} bottom={"5px"}>
                            {firstName}
                        </SubTitle>
                        <SecondaryText>{address}</SecondaryText>
                        <SecondaryText>{state} state.</SecondaryText>
                        <SecondaryText>{phoneNumber}</SecondaryText>
                    </BorderBlock>
                    <BorderBlock>
                        <Row>
                            <RowText>Subtotal</RowText>
                            {totalPrice && formatPrice(totalPrice)}
                        </Row>
                        <Row>
                            <RowText>Service charge</RowText>
                            {serviceFee && formatPrice(serviceFee).replace(/^(\D+)/, "$1 ")}
                        </Row>
                        <Row bottom={"-10px"}>
                            <SubTitle font={"16px"}>TOTAL</SubTitle>
                            {totalPrice && formatPrice(serviceFee + totalPrice + totalPrice * 0.05)}
                        </Row>
                    </BorderBlock>
                    <Row top={"16px"} bottom={"24px"}>
                        <RowText>Date</RowText>
                        <SubTitle font={"16px"}>
                            {parseDate(createdDate)}
                        </SubTitle>
                    </Row>
                </>
            </ScreenContainer>
        </DetailsContainer>
    );
};

export default OrderDetials;
