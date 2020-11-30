import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    PageLogo,
    TopHeader,
    SearchHeader,
    Loader,
    OptionsPopupDialog,
    DropdownList,
    IntroductionPopup
} from "../../../../../components";
import {
    FlexCenteredBlock,
    ScreenContainer,
    FilterAndSortSection,
    SortFilterCell
} from "../../../../../containers/ScreenContainer";
import { Message, Title } from "../../../../../containers/MessageContainer";
import { formatCreationDate } from "../../../../../utils/date/formatCreationDate";
import { getOrderTypeName } from "../../../../../utils/orders/getOrderNameFromID";

import { parseTransactionsByDate } from "../../../../../utils/date/parseTransactionsByDate";
import {
    List,
    ListLeftBlock,
    ListItem,
    ListHeading,
    ListSubHeading
} from "../../../../../containers/ListContainer";
import {
    OrderBadges,
    OrderBadge,
    AcceptedByBlock,
    OrderInfo,
    AcceptedByText,
    OrderDate
} from "../../../my-shop/containers/OrderBadgesContainer";

import OrderDetials from "../order-details";

import OrdersIcon from "../assets/order.svg";
import { ReactComponent as FilterIcon } from "../../../../../assets/filter.svg";
import { ReactComponent as SortIcon } from "../../../../../assets/sort.svg";
import OrderIcon from "../../../../../assets/order-icon.svg";

import { ReactComponent as MostRecent } from "../../../../../assets/most_recent.svg";
import { ReactComponent as Oldest } from "../../../../../assets/oldest.svg";
import { ReactComponent as Ascending } from "../../../../../assets/ascending.svg";
import { ReactComponent as Descending } from "../../../../../assets/descending.svg";
import { ReactComponent as ParkedOrderSVG } from "../../../../../assets/parked_order_icon.svg";
// import { ReactComponent as DeliveredOrderSVG } from "../../../../../assets/delivered_order_icon.svg";
// import { ReactComponent as RejectedOrderSVG } from "../../../../../assets/rejected_order_icon.svg";
import { ReactComponent as PendingOrderSVG } from "../../../../../assets/pending_order_icon.svg";
import { ReactComponent as AllOrderSVG } from "../../../../../assets/all_orders_icon.svg";
import { ReactComponent as TimePeriodIcon } from "../../../../../assets/time_period_icon.svg";
import { ReactComponent as IntroOrderLogo } from "../assets/introOrder.svg";

import { getOrderByID } from "../../../../../redux/ducks/applications/my-shop/actions/orders";
import { getOrders } from "../../../../../redux/ducks/applications/my-shop/actions/orders";
import { sortOrders } from "./sort";
import { filterOrders } from "./filter";
import { formatPrice } from "../../../../../utils/currency/formatPriceWithComma";
import { mixPanel } from '../../../../../utils/mix-panel/mixPanel';
import {
    SHOP_START_FULFILLING_ORDER
 } from '../../../../../utils/mix-panel/constants';

const OrdersList = () => {
    const dispatch = useDispatch();
    const [orderItem, setOrderItem] = useState({});
    const shops = useSelector(state => state.applications.myShop.shops);

    const fetchOrderDetails = (data, orderObjDetails) => {
        const params = data;
        params.branchId = shops[0].branchId;
        dispatch(getOrderByID(params, orderObjDetails));
    };

    const inventory = shops[0]? shops[0].inventory : [];
    const merchantId = shops[0] ? shops[0].merchantId : null;
    const orders = useSelector(state => state.applications.myShop.orders);

    const [allOrders, setAllOrders] = useState(orders || []);
    const isLoading = useSelector(state => state.applications.myShop.loadingShopOrder);
    const [searchValue, setSearchValue] = useState("");
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [sortOptionsOpen, setSortOptionsOpen] = useState(false);
    const [sortType, setSortType] = useState("Most Recent");
    const [filterType, setFilterType] = useState("All Orders");
    const [openTimePeriod, setOpenTimePeriod] = useState(false);
    const [openOrderDetails, setOpenOrderDetails] = useState(false);
    const [introductionPopup, setIntroductionPopup] = useState(
        localStorage.getItem("firstTimePromptState") === null ? true : false
    );

    const firstTimePrompt = () => {
        setIntroductionPopup(!introductionPopup);
        localStorage.setItem("firstTimePromptState", JSON.stringify(false));
    };

    useEffect(() => {
        shops.length && shops[0].branchId && dispatch(getOrders(shops[0]));
    }, [shops, dispatch]);

    useEffect(() => {
        orders &&  setAllOrders(
            orders.filter(
                data =>
                    data.userName.includes(searchValue) ||
                    String(data.orderNumber).includes(searchValue) ||
                    String(data.phoneNumber).includes(searchValue)
            )
        );
    }, [searchValue, orders]);

    useEffect(() => {
        filterOrders(filterType, orders|| [], setAllOrders);
    }, [filterType, orders, setAllOrders]);

    useEffect(() => {
        sortOrders(sortType, orders|| [], setAllOrders);
    }, [sortType, orders, setAllOrders]);

    if (isLoading) {
        return <Loader />;
    } else
        return (
            <Fragment>
                {(!orders || (orders && !orders.length)) ? (
                    <Fragment>
                        {!openOrderDetails && <TopHeader withSpacesHeader title={"Orders"} />}
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
                                withSpacesHeader
                                title={"Orders"}
                                right={"56px"}
                                sticky
                                placeholder={"Search for an order..."}
                                handleSearch={setSearchValue}
                           />
                        )}

                        <ScreenContainer paddingBottom={"65px"}>
                            <FilterAndSortSection top={"64px"}>
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
                            </FilterAndSortSection>
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
                                                        setOrderItem(item);
                                                        fetchOrderDetails(
                                                            item,
                                                            null
                                                        );
                                                        if(getOrderTypeName(item) === "Pending"){
                                                            mixPanel.track(SHOP_START_FULFILLING_ORDER,
                                                                {
                                                                    "Order ID": item.id,
                                                                    "Time": (new Date()).toLocaleDateString()
                                                                }
                                                            )
                                                        }
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
                                                        <ListHeading maxWidth={"180px"}>
                                                            Order No.
                                                            {item.orderNumber}
                                                        </ListHeading>
                                                        <OrderBadges>
                                                            <ListSubHeading>
                                                                {formatPrice(
                                                                    item.totalPrice
                                                                )}
                                                            </ListSubHeading>
                                                            <OrderBadge
                                                                nature={getOrderTypeName(
                                                                    item
                                                                )}
                                                            >
                                                                {getOrderTypeName(
                                                                    item
                                                                )}
                                                            </OrderBadge>
                                                            {item.noOfItems >
                                                                1 && (
                                                                <OrderBadge nature="Simple">
                                                                    {item.noOfItems +
                                                                        " Products"}
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
                                                        {formatCreationDate(
                                                            item.createdDate
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

                {orderItem.orderStatus && (
                    <OrderDetials
                        open={openOrderDetails}
                        setOpen={setOpenOrderDetails}
                        orderItem={orderItem}
                        setOrderItem={setOrderItem}
                        fetchOrderDetails={fetchOrderDetails}
                        inventory={inventory}
                        merchantId={merchantId}
                    />
                )}
                <IntroductionPopup
                    open={introductionPopup}
                    cancel={() => {
                        firstTimePrompt();
                    }}
                    title={"Managing orders"}
                    Logo={IntroOrderLogo}
                    logoSpacing={"30px"}
                    message={
                        "Manage your pending orders by selecting the items available in your stock."
                    }
                />
            </Fragment>
        );
};

export default OrdersList;
