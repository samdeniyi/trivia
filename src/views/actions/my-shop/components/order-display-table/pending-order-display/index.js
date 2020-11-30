import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { object, any, func, number, bool } from "prop-types";
import { colors } from "../../../../../../styles";
import { SetAvailableQuantity } from "./set-available-quantity";
import {
  ScreenContainer,
  FlexCenteredBlock,
} from "../../../../../../containers/ScreenContainer";
import { PageLogo, RippleButton } from "../../../../../../components";
import {
  OrderBadges,
  OrderBadge,
} from "../../../containers/OrderBadgesContainer";
import { SubTitle } from "../../../../../../containers/MessageContainer";
import {
  SubList,
  SubListHeading,
  SubListValue,
} from "../../../../../../containers/CheckoutContainer";

import {
  List,
  ListItem,
  ListHeading,
  ListLeftBlock,
  ListSubHeading,
} from "../../../../../../containers/ListContainer";
import SupermarketIcon from "../../../assets/supermarket.svg";
import { ReactComponent as MerchLogo } from "../../../../../../assets/merch_icon.svg";
import OrderIcon from "../../../../../../assets/order-icon.svg";
import { getOrderTypeName } from "../../../../../../utils/orders/getOrderNameFromID";
import { formatPrice } from "../../../../../../utils/currency/formatPriceWithComma";

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
  font-size: 10px;
  color: #8d9aa3;
`;

const SectionBlock = styled.section`
  position: relative;
  font-size: 10px;
  margin-top: 36px;
`;

const ModifiedListItem = styled(ListItem)`
  padding: 5px;
`;

const ListItemChild = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 0 5px;
  padding-top: 8px;
  min-height: 56px;
  opacity: ${({ grayOut }) => grayOut || null};

`;

const ModifiedRippleButton = styled(RippleButton)`
  background-color: #f7f7f7;
  color: #212c3d;
  margin-left: 7px;
  &.active {
    border: 1px solid #579fd7;
  }
`;

export const PendingOrderDisplay = ({
  order,
  fetchOrderDetails,
  setAcceptButton,
  confirmItemStatus,
  setConfirmItemStatus,
  totalPrice,
  setTotalPrice,
  subTotal,
  setSubTotal,
  vat,
  setVat,
  reduceItemPopup,
  setReduceItemPopup,
  setProductIndex
}) => {
  let orderItems = order.orderItems ? order.orderItems : [];
 
  const removeItem = (index) => {
    const status = [...confirmItemStatus];
    const item = orderItems[index];
    if (confirmItemStatus[index] === true) {
      setSubTotal(subTotal - item.totalPrice);
      setVat(order.subTotal * 0.05);
      setTotalPrice(subTotal + vat);
    }
    status[index] = false;
    setConfirmItemStatus([...status]);
    setProductIndex(index)
    setReduceItemPopup(!reduceItemPopup)
  };

  const confirmItem = (index) => {
    const status = [...confirmItemStatus];
    const item = orderItems[index];
    if (confirmItemStatus[index] !== true) {
      setSubTotal(subTotal + item.totalPrice);
      setVat(subTotal * 0.05);
      setTotalPrice(subTotal + vat);
    }
    status[index] = true;
    setConfirmItemStatus([...status]);
    if(item.newQuantity < item.quantity) {
        setProductIndex(index);
        setReduceItemPopup(!reduceItemPopup)
    }
  };

  useEffect(() => {
    const status =
      confirmItemStatus.length === orderItems.length &&
      confirmItemStatus.every((x) => x === true || x === false);
    setAcceptButton(status);
  }, [confirmItemStatus, orderItems, setAcceptButton]);

  useEffect(() => {
    setVat(subTotal * 0.05);
    setTotalPrice(subTotal * 0.05 + subTotal);
  }, [subTotal, setTotalPrice, vat, setVat]);


  return (
    <Fragment>
      <ScreenContainer>
        <FlexCenteredBlock top={"27px"}>
          <PageLogo
            top={"8px"}
            background={"transparent"}
            width={"48px"}
            height={"48px"}
            iconWidth={"48px"}
            iconHeight={"48px"}
            Icon={OrderIcon}
          />
          <SubTitle top={"16px"}>Order No. {order.orderNumber}</SubTitle>
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
          <List top={"16px !important"} fullScreen>
            {orderItems.map((product, index) => (
              <ModifiedListItem
                key={index}
                top={"7px"}
                bottom={"7px"}
                direction={"column"}
              >
                <ListItemChild grayOut={confirmItemStatus[index] === false? "0.2": null}>
                  <PageLogo
                    width={"32px"}
                    height={"32px"}
                    iconWidth={"32px"}
                    iconHeight={"32px"}
                    Icon={product.imageUrl}
                    fallback={SupermarketIcon}
                  />
                  <ListLeftBlock>
                    <ListHeading  maxWidth={'150px'}>{product.productName}</ListHeading>
                    <ListSubHeading>
                      {formatPrice(product.totalPrice)}
                    </ListSubHeading>
                  </ListLeftBlock>
                  <SetAvailableQuantity
                    selectedProducts={order.orderItems}
                    orderedQuantity={product.quantity}
                    fetchOrderDetails={fetchOrderDetails}
                    productId={product.id}
                    order={order}
                    subTotal={subTotal}
                    setSubTotal={setSubTotal}
                    confirmedStatus={confirmItemStatus[index]}
                  />
                </ListItemChild>
                <ListItemChild>
                  <ModifiedRippleButton
                    top={"15px"}
                    className={
                      confirmItemStatus[index] === false ? "active" : ""
                    }
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </ModifiedRippleButton>
                  <ModifiedRippleButton
                    top={"15px"}
                    className={
                      confirmItemStatus[index] === true ? "active" : ""
                    }
                    onClick={() => {
                      confirmItem(index)
                    }}
                  >
                    Confirm
                  </ModifiedRippleButton>
                </ListItemChild>
              </ModifiedListItem>
            ))}
          </List>
        </SectionBlock>
        <SectionBlock>
          <SubList>
            <SubListHeading>SubTotal</SubListHeading>
            <SubListValue>{formatPrice(subTotal)}</SubListValue>
          </SubList>
          <SubList>
            <SubListHeading>V.A.T. (5%)</SubListHeading>
            <SubListValue>{formatPrice(vat)}</SubListValue>
          </SubList>

          <SubList>
            <TotalAmount>TOTAL</TotalAmount>
            <SubListValue>{formatPrice(totalPrice)}</SubListValue>
          </SubList>
        </SectionBlock>
        <SectionBlock>
          <SubList>
            <SubListHeading>Customer</SubListHeading>
            <SubListValue>
              <CustomerName>{order.userName}</CustomerName>
              <PhoneNumber>{order.phoneNumber}</PhoneNumber>
            </SubListValue>
          </SubList>
        </SectionBlock>

        <SectionBlock>
          <SubList>
            <SubListHeading>Marketplace</SubListHeading>
            <SubListValue>
              <ImageBox />
              Merchlist
            </SubListValue>
          </SubList>
        </SectionBlock>
      </ScreenContainer>
    </Fragment>
  );
};

PendingOrderDisplay.propTypes = {
  order: object,
  fetchOrderDetails: any,
  setAcceptButton: func,
  setConfirmItemStatus: func,
  confirmItemStatus: any,
  setTotalPrice: func,
  totalPrice: number,
  setSubTotal: func,
  subTotal: number,
  vat: number,
  setVat: func,
  reduceItemPopup: bool,
  setReduceItemPopup: func,
  setProductIndex: func
};
