import React, { Fragment } from "react"
import { withRouter } from "react-router-dom";
import { formatCreationDate } from "../../../../utils/date/formatCreationDate";
import { formatPrice } from "../../../../utils/currency/formatPriceWithComma";

import { TopHeader, RippleLink } from "../../../../components";
import { List, ListItem, ListLeftBlock, ListHeading, ListSubHeading, ListHighlight } from "../../../../containers/ListContainer";
import { Message } from "../../../../containers/MessageContainer";
import { ScreenContainer } from "../../../../containers/ScreenContainer";
import { ReactComponent as MerchLogo } from '../../../../assets/merch_logo.svg';

const OrdersPlacedList = ({
    location
}) => {
    const ordersList = location.state;

    return (
        <Fragment>
            <TopHeader title={"Orders"} />
            <ScreenContainer>
                <Message top={"8px"} bottom={"24px"}>Showing all orders</Message>
                <List fullScreen={true}>
                    {ordersList.map((order, index) => (
                        <RippleLink
                            key={index}
                            to={{
                                pathname: '/user/performance_order_details',
                                state: order
                            }}
                        >
                            <ListItem>
                                <MerchLogo />
                                <ListLeftBlock>
                                    <ListHeading>Order No. {order.orderNumber}</ListHeading>
                                    <ListSubHeading>{formatCreationDate(order.createdAt)}</ListSubHeading>
                                    <ListHighlight>{formatPrice(order.amount)}</ListHighlight>
                                </ListLeftBlock>
                            </ListItem>
                        </RippleLink>
                    ))}
                </List>
            </ScreenContainer>
        </Fragment>
    );
};

export default withRouter(OrdersPlacedList);