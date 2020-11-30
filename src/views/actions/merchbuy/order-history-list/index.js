import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
    PageLogo,
    SearchHeader,
    TopHeader,
    Loader,
    OptionsPopupDialog,
    DropdownList
} from "../../../../components";
import {
    FlexCenteredBlock,
    ScreenContainer
    // FilterAndSortSection,
    // SortFilterCell
} from "../../../../containers/ScreenContainer";
import { Message, Title } from "../../../../containers/MessageContainer";
import { formatCreationDate } from "../../../../utils/date/formatCreationDate";

import { parseTransactionsByDate } from "../../../../utils/date/parseTransactionsByDate";
import {
    List,
    ListLeftBlock,
    ListItem,
    ListHeading,
    ListSubHeading
} from "../../../../containers/ListContainer";
import { Space } from "../styles";
import {
    OrderBadges,
    OrderBadge,
    AcceptedByBlock,
    OrderInfo,
    AcceptedByText,
    OrderDate
} from "../../my-shop/containers/OrderBadgesContainer";

import OrderDetials from "./OrderDetials";

import OrdersIcon from "../assets/order.svg";
// import { ReactComponent as FilterIcon } from "../../../../assets/filter.svg";
// import { ReactComponent as SortIcon } from "../../../../assets/sort.svg";
import OrderIcon from "../../../../assets/order-icon.svg";

import { ReactComponent as MostRecent } from "../../../../assets/most_recent.svg";
import { ReactComponent as Oldest } from "../../../../assets/oldest.svg";
import { ReactComponent as Ascending } from "../../../../assets/ascending.svg";
import { ReactComponent as Descending } from "../../../../assets/descending.svg";
import { ReactComponent as ParkedOrderSVG } from "../../../../assets/parked_order_icon.svg";
// import { ReactComponent as DeliveredOrderSVG } from "../../../../../assets/delivered_order_icon.svg";
// import { ReactComponent as RejectedOrderSVG } from "../../../../../assets/rejected_order_icon.svg";
import { ReactComponent as PendingOrderSVG } from "../../../../assets/pending_order_icon.svg";
import { ReactComponent as AllOrderSVG } from "../../../../assets/all_orders_icon.svg";
import { ReactComponent as TimePeriodIcon } from "../../../../assets/time_period_icon.svg";

import { merchbuyActions } from "../../../../redux/ducks/applications/merchbuy/actions";

import { sortOrders } from "./sort";
import { filterOrders } from "./filter";
import { formatPrice } from "../../../../utils/currency/formatPriceWithComma";

const OrderHistoryList = () => {
    const dispatch = useDispatch();
    const orders = useSelector(
        state => state.applications.merchbuy.orderHistory
    );
    const passedId = useSelector(
        state =>
        state.router.location.state ? state.router.location.state.id: null
    );
    const [allOrders, setAllOrders] = useState(orders);
    const isLoading = useSelector(
        state => state.applications.merchbuy.isLoading
    );
    const [searchValue, setSearchValue] = useState("");
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [sortOptionsOpen, setSortOptionsOpen] = useState(false);
    const [sortType, setSortType] = useState("Most Recent");
    const [filterType, setFilterType] = useState("All Orders");
    const [openTimePeriod, setOpenTimePeriod] = useState(false);
    const [openOrderDetails, setOpenOrderDetails] = useState(passedId? true: false);
    const chosenOrderHistory = useSelector(state => state.applications.merchbuy.chosenOrderHistory);

    useEffect(() => {
        dispatch(merchbuyActions.getOrderHistory());
    }, [dispatch]);

    useEffect(() => {
        orders &&
            setAllOrders(
                orders.filter(
                    data =>
                        data.userName.includes(searchValue) ||
                        String(data.orderNumber).includes(searchValue) ||
                        String(data.phoneNumber).includes(searchValue)
                )
            );
    }, [searchValue, orders]);

    useEffect(() => {
        filterOrders(filterType, orders, setAllOrders);
    }, [filterType, orders, setAllOrders]);

    useEffect(() => {
        sortOrders(sortType, orders, setAllOrders);
    }, [sortType, orders, setAllOrders]);

    if (isLoading) {
        return <Loader />;
    } else
        return (
            <Fragment>
                {orders && !orders.length ? (
                    <Fragment>
                        <TopHeader
                            withSpacesHeader
                            title={"My Orders"}
                            backLink={"/actions/merchbuy"}
                        ></TopHeader>
                        <ScreenContainer>
                            <FlexCenteredBlock top={"80px"}>
                                <PageLogo
                                    Icon={OrdersIcon}
                                    width={"184px"}
                                    height={"184px"}
                                    iconHeight={"auto"}
                                    iconWidth={"auto"}
                                    margin={"24px auto"}
                                />
                                <Title>No orders received</Title>
                                <Message
                                    bottom={"24px"}
                                    top={"8px"}
                                    align={"center"}
                                    padding={"0 1em"}
                                >
                                    You’ve not received any orders. Orders you
                                    receive will appear here.
                                </Message>
                            </FlexCenteredBlock>
                        </ScreenContainer>
                    </Fragment>
                ) : (
                    <Fragment>
                        {!openOrderDetails && (
                            <SearchHeader
                                title={"My Orders"}
                                right={"24px"}
                                sticky
                                placeholder={"Search for an order..."}
                                handleSearch={setSearchValue}
                                backLink={"/actions/merchbuy"}
                                withSpacesHeader
                            ></SearchHeader>
                        )}
                        <Space height={"54px"} />
                        <ScreenContainer>
                            {/* <FilterAndSortSection top={"64px"}>
                                <SortFilterCell
                                    onClick={() =>
                                        setSortOptionsOpen(!sortOptionsOpen)
                                    }
                                >
                                    <SortIcon />
                                    {sortType}
                                </SortFilterCell>
                                <SortFilterCell
                                    onClick={() =>
                                        setOpenFilterOptions(!openFilterOptions)
                                    }
                                >
                                    <FilterIcon />
                                    {filterType}
                                </SortFilterCell>
                            </FilterAndSortSection> */}
                        

                            {parseTransactionsByDate(
                               allOrders,
                                "createdDate"
                            ).map((order, index) => (
                                <DropdownList
                                    key={index}
                                    customList={true}
                                    transactionList={order.transactions}
                                    title={order.date}
                                    index={index}
                                >
                                    <List fullScreen childLink>
                                        {order.transactions.map(
                                            (item, index) => (
                                                <ListItem
                                                    key={index}
                                                    pressedUpList
                                                    top={"16px"}
                                                    bottom={"16px"}
                                                    onClick={() => {
                                                        dispatch(merchbuyActions.getOrderHistoryById(item.id))
                                                        setOpenOrderDetails(
                                                            !openOrderDetails
                                                        );
                                                    }}
                                                >
                                                    <PageLogo
                                                        width={"32px"}
                                                        height={"32px"}
                                                        iconWidth={"32px"}
                                                        iconHeight={"32px"}
                                                        Icon={OrderIcon}
                                                    />
                                                    <ListLeftBlock>
                                                        <ListHeading
                                                            maxWidth={"150px"}
                                                        >
                                                            Order No.
                                                            {item.orderNumber}
                                                        </ListHeading>
                                                        <OrderBadges>
                                                            <ListSubHeading>
                                                                {item.totalPrice && formatPrice(
                                                                    item.totalPrice
                                                                )}
                                                            </ListSubHeading>
                                                            {item.noOfItems >0 && (
                                                                <OrderBadge nature="Simple">
                                                                    {item.noOfItems +
                                                                        `${item.noOfItems >1? " Products": " Product"}`}
                                                                </OrderBadge>
                                                            )}
                                                        </OrderBadges>
                                                        <AcceptedByBlock>
                                                            {item.salesPersonName && (
                                                                <OrderInfo>
                                                                    <AcceptedByText>
                                                                        Accepted
                                                                        by:
                                                                    </AcceptedByText>
                                                                    <OrderBadge>
                                                                        {
                                                                            item.salesPersonName
                                                                        }
                                                                    </OrderBadge>
                                                                </OrderInfo>
                                                            )}
                                                        </AcceptedByBlock>
                                                    </ListLeftBlock>
                                                    <OrderDate>
                                                        {item.createdDate && formatCreationDate(
                                                            moment(item.createdDate).add(1, 'hours')
                                                        )}
                                                    </OrderDate>
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </DropdownList>
                            ))}
                        </ScreenContainer>
                    </Fragment>
                )}
                <OptionsPopupDialog
                    open={sortOptionsOpen}
                    title={"Sort"}
                    cancel={() => {
                        setSortType("Most Recent");
                        setSortOptionsOpen(!sortOptionsOpen);
                    }}
                    items={[
                        {
                            Icon: MostRecent,
                            title: "Most Recent",
                            click: () => {
                                setSortOptionsOpen(!sortOptionsOpen);
                                sortType !== "Most Recent" &&
                                    setSortType("Most Recent");
                            }
                        },
                        {
                            Icon: Oldest,
                            title: "Oldest",
                            click: () => {
                                setSortOptionsOpen(!sortOptionsOpen);
                                sortType !== "Oldest" && setSortType("Oldest");
                            }
                        },
                        {
                            Icon: Ascending,
                            title: "Amount (lower to higher)",
                            click: () => {
                                setSortOptionsOpen(!sortOptionsOpen);
                                sortType !== "Lowest Amount" &&
                                    setSortType("Lowest Amount");
                            }
                        },
                        {
                            Icon: Descending,
                            title: "Amount (higher to lower)",
                            click: () => {
                                setSortOptionsOpen(!sortOptionsOpen);
                                sortType !== "Highest Amount" &&
                                    setSortType("Highest Amount");
                            }
                        }
                    ]}
                />
                <OptionsPopupDialog
                    open={openFilterOptions}
                    title={"Filter"}
                    cancel={() => {
                        setFilterType("All Orders");
                        setOpenFilterOptions(!openFilterOptions);
                    }}
                    items={[
                        {
                            Icon: AllOrderSVG,
                            title: "All Orders",
                            click: () => {
                                setOpenFilterOptions(!openFilterOptions);
                                filterType !== "All Orders" &&
                                    setFilterType("All Orders");
                            }
                        },
                        {
                            Icon: PendingOrderSVG,
                            title: "Pending Orders",
                            click: () => {
                                setOpenFilterOptions(!openFilterOptions);
                                filterType !== "Pending Orders" &&
                                    setFilterType("Pending Orders");
                            }
                        },
                        // {
                        //     Icon: RejectedOrderSVG,
                        //     title: "Rejected Orders",
                        //     click: () => {
                        //         setOpenFilterOptions(!openFilterOptions);
                        //         filterType !== "Rejected Orders" &&
                        //             setFilterType("Rejected Orders");
                        //     }
                        // },
                        {
                            Icon: ParkedOrderSVG,
                            title: "Attended Orders",
                            click: () => {
                                setOpenFilterOptions(!openFilterOptions);
                                filterType !== "Attended Orders" &&
                                    setFilterType("Attended Orders");
                            }
                        },
                        // {
                        //     Icon: DeliveredOrderSVG,
                        //     title: "Delivered Orders",
                        //     click: () => {
                        //         setOpenFilterOptions(!openFilterOptions);
                        //         filterType !== "Delivered Orders" &&
                        //             setFilterType("Delivered Orders");
                        //     }
                        // },
                        {
                            Icon: TimePeriodIcon,
                            more: true,
                            title: "Time Period",
                            click: () => {
                                setOpenFilterOptions(!openFilterOptions);
                                setOpenTimePeriod(!openTimePeriod);
                            }
                        }
                    ]}
                />
                <OptionsPopupDialog
                    open={openTimePeriod}
                    title={"Time Period"}
                    cancel={() => {
                        setOpenTimePeriod(!openTimePeriod);
                        setOpenFilterOptions(!openFilterOptions);
                    }}
                    items={[
                        {
                            Icon: TimePeriodIcon,
                            title: "Today",
                            click: () => {
                                setOpenTimePeriod(!openTimePeriod);
                                filterType !== "Today" &&
                                    setFilterType("Today");
                            }
                        },
                        {
                            Icon: TimePeriodIcon,
                            title: "This Week",
                            click: () => {
                                setOpenTimePeriod(!openTimePeriod);
                                filterType !== "This Week" &&
                                    setFilterType("This Week");
                            }
                        },
                        {
                            Icon: TimePeriodIcon,
                            title: "This Month",
                            click: () => {
                                setOpenTimePeriod(!openTimePeriod);
                                filterType !== "This Month" &&
                                    setFilterType("This Month");
                            }
                        },
                        {
                            Icon: TimePeriodIcon,
                            title: "This Year",
                            click: () => {
                                setOpenTimePeriod(!openTimePeriod);
                                filterType !== "This Year" &&
                                    setFilterType("This Year");
                            }
                        }
                    ]}
                />

                      {openOrderDetails && (
                    <OrderDetials orderHistory={chosenOrderHistory} closeOrderHistory={() => {
                        dispatch(merchbuyActions.clearOrderHistory())
                        setOpenOrderDetails(false)}}
                    />
                )}
            </Fragment>
        );
};

export default OrderHistoryList;
