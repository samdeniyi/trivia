import React, { Fragment, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { colors } from "../../../../../styles";
import { formatCreationDate } from "../../../../../utils/date/formatCreationDate";
import { parseTransactionsByDate } from "../../../../../utils/date/parseTransactionsByDate";
import { sortSales } from "./sort";
import { filterSales } from "./filter";
import { formatPrice } from "../../../../../utils/currency/formatPriceWithComma";

import {
    PageLogo,
    TopHeader,
    SearchHeader,
    Loader,
    RippleLink,
    OptionsPopupDialog,
    DropdownList,
    RippleButton
} from "../../../../../components";
import { Title, Message } from "../../../../../containers/MessageContainer";
import {
    FlexCenteredBlock,
    ScreenContainer,
    FilterAndSortSection,
    SortFilterCell
} from "../../../../../containers/ScreenContainer";
import { Add } from "../../../../../containers/HeaderContainer";
import { ReactComponent as FilterIcon } from "../../../../../assets/header_filter.svg";
import { ReactComponent as SortIcon } from "../../../../../assets/sort.svg";
import { ReactComponent as MostRecent } from "../../../../../assets/most_recent.svg";
import { ReactComponent as Oldest } from "../../../../../assets/oldest.svg";
import { ReactComponent as Ascending } from "../../../../../assets/ascending.svg";
import { ReactComponent as Descending } from "../../../../../assets/descending.svg";
import { ReactComponent as SalesSVG } from "../../../../../assets/sale.svg";
import { ReactComponent as Group8 } from "../../../../../assets/group_8.svg";
import { ReactComponent as Group9 } from "../../../../../assets/group_9.svg";

import {
    List,
    ListLeftBlock,
    ListItem,
    ListHeading,
    ListSubHeading
} from "../../../../../containers/ListContainer";
import SalesIcon from "./assets/cart.svg";
import SaleIcon from "../../../../../assets/sale.svg";
import {
    SaleBadge,
    SaleBadges,
    SoldToBlock,
    SaleInfo,
    SaleByText,
    SaleDate
} from "../../../my-shop/containers/SaleBadgesContainer";
import { mixPanel } from '../../../../../utils/mix-panel/mixPanel';
import {
    SHOP_START_CREATE_SALE
 } from '../../../../../utils/mix-panel/constants';

const SelectSaleBadge = ({ type }) => {
    switch (type) {
        case true: {
            return (
                <SaleBadge
                    bg={colors.myShop.totalSales.bg}
                    color={colors.myShop.totalSales.text}
                >
                    Complete Sale
                </SaleBadge>
            );
        }

        case false: {
            return (
                <SaleBadge
                    bg={colors.myShop.pending.bg}
                    color={colors.myShop.pending.text}
                >
                    Incomplete Sale
                </SaleBadge>
            );
        }

        default: {
            return null;
        }
    }
};

const Sales = ({
    location
}) => {
    const isLoading = useSelector(state => state.applications.myShop.isLoading);
    const sales = useSelector(state => state.applications.myShop.sales);
    const passedFilterType = useSelector(
        state =>
        state.router.location.state ? state.router.location.state.filterType: null
    );
    const userId = useSelector(state => state.user.userId);
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [sortOptionsOpen, setSortOptionsOpen] = useState(false);
    const [sortType, setSortType] = useState("Most Recent");
    const [allSales, setAllSales] = useState(sales);
    const [filterType, setFilterType] = useState(passedFilterType || "All Sales");
    const [searchValue, setSearchValue] = useState("");
    const [filteredSales] = useState(
        passedFilterType ? sales.filter(data => data.salesInfo.paymentCompleteStatus === false) : sales
    );
    const defaultShop = useSelector(state => state.applications.myShop.shops[0]) || {};
    const merchantId = (location && location.state) ? location.state.merchantId : defaultShop.merchantId;
    const branchId = (location && location.state) ? location.state.branchId : defaultShop.branchId;

    useEffect(() => {
        setAllSales(
            filteredSales.filter(sale =>
                String(sale.salesInfo.amountCollected).includes(searchValue) ||
                (sale.salesInfo.customer && sale.salesInfo.customer.name.includes(searchValue)) ||
                (sale.salesInfo.customer && sale.salesInfo.customer.phoneNumber.includes(searchValue)) ||
                String(sale.salesInfo.id).includes(searchValue)
            )
        );
    }, [filteredSales, searchValue]);

    useEffect(() => {
        filterSales(filterType, sales, setAllSales);
    }, [filterType, sales, setAllSales]);

    useEffect(() => {
        sortSales(sortType, filteredSales, setAllSales);
    }, [sortType, filteredSales, setAllSales]);

    if (isLoading) {
        return <Loader />;
    } else return (
        <Fragment>
            {sales.length === 0 ? (
                <Fragment>
                    <TopHeader title={"Sales"} withSpacesHeader backLink={"/actions/shop"} />
                    <ScreenContainer>
                        <FlexCenteredBlock top={"64px"}>
                            <PageLogo
                                Icon={SalesIcon}
                                width={"184px"}
                                height={"184px"}
                                iconHeight={"auto"}
                                iconWidth={"auto"}
                                margin={"24px auto"}
                            />
                            <Title>No sales made</Title>
                            <Message
                                bottom={"24px"}
                                top={"8px"}
                                align={"center"}
                                padding={"0 1em"}
                            >
                                You’ve not recorded any sale. Sales you make
                                will appear here.
                            </Message>
                            <RippleLink
                                style={{ width: "100%" }}
                                to={{
                                    pathname: "/actions/shop_sales_add",
                                    state: { merchantId, branchId }
                                }}
                            >
                                <RippleButton type={"button"}>
                                    Add a sale
                                </RippleButton>
                            </RippleLink>
                        </FlexCenteredBlock>
                    </ScreenContainer>
                </Fragment>
            ) : (
                <Fragment>
                    <SearchHeader
                        withSpacesHeader
                        title={"Sales"}
                        right={"56px"}
                        placeholder={"Search for a sale..."}
                        handleSearch={setSearchValue}
                        backLink={"/actions/shop"}
                    >
                        <Link
                            to={{
                                pathname: "/actions/shop_sales_add",
                                state: { merchantId, branchId }
                            }}
                            onClick={()=>{
                                mixPanel.track(SHOP_START_CREATE_SALE,
                                    {
                                        "Entry Point": "Sales",
                                        "Time": (new Date()).toLocaleDateString(),
                                        "User ID": userId,
                                        "shop ID": defaultShop.id
                                    }
                                )
                            }}
                        >
                            <Add right={"16px"} />
                        </Link>
                    </SearchHeader>
                    <ScreenContainer paddingBottom={"65px"}>
                        <FilterAndSortSection top={"64px"}>
                            <SortFilterCell onClick={() => setSortOptionsOpen(!sortOptionsOpen)}>
                                <SortIcon />
                                {sortType}
                            </SortFilterCell>
                            <SortFilterCell onClick={() => setOpenFilterOptions(!openFilterOptions)}>
                                <FilterIcon />
                                {filterType}
                            </SortFilterCell>
                        </FilterAndSortSection>
                        {parseTransactionsByDate(
                            allSales.map(sale => sale.salesInfo), "localSalesDate"
                        ).map((sales, index) => (
                            <DropdownList
                                key={index}
                                customList={true}
                                transactionList={sales.transactions}
                                title={sales.date}
                                index={index}
                            >
                                <List fullScreen childLink>
                                {sales.transactions.map((sale, index) => (
                                    <RippleLink
                                        key={index}
                                        to={{
                                            pathname: "/actions/shop_sale_details",
                                            state: { sale, shopId: defaultShop.id }
                                        }}
                                    >
                                        <ListItem
                                            key={index}
                                            pressedUpList
                                            top={"16px"}
                                            bottom={"16px"}
                                        >
                                            <PageLogo
                                                width={"32px"}
                                                height={"32px"}
                                                iconWidth={"32px"}
                                                iconHeight={"32px"}
                                                Icon={SaleIcon}
                                            />
                                            <ListLeftBlock>
                                                <ListHeading>Sales No.{" "}{sale.id}</ListHeading>
                                                <SaleBadges>
                                                    <ListSubHeading>
                                                        {formatPrice(sale.totalAmount)}
                                                    </ListSubHeading>
                                                    <SelectSaleBadge type={sale.paymentCompleteStatus} />
                                                    {sale.salesItemDetails && sale.salesItemDetails.length > 0 && (
                                                        <SaleBadge
                                                            bg={colors.blueish}
                                                            color={colors.blue}
                                                        >
                                                            {sale.salesItemDetails.length}{" "}Products
                                                        </SaleBadge>
                                                    )}
                                                </SaleBadges>
                                                <SoldToBlock>
                                                {sale.salesPersonName && (
                                                    <SaleInfo>
                                                        <SaleByText>Sale by:</SaleByText>
                                                        <SaleBadge>
                                                        {sale.salesPersonName.split(" ")[0]}
                                                        </SaleBadge>
                                                    </SaleInfo>
                                                )}
                                                {sale.customer && (
                                                    <SaleInfo>
                                                        <SaleByText>Customer:{" "}</SaleByText>
                                                        <SaleBadge>
                                                        {sale.customer.name}
                                                        </SaleBadge>
                                                    </SaleInfo>
                                                )}
                                                </SoldToBlock>
                                            </ListLeftBlock>
                                            <SaleDate>{formatCreationDate(sale.localSalesDate)}</SaleDate>
                                        </ListItem>
                                    </RippleLink>
                                ))}
                                </List>
                            </DropdownList>
                        ))}
                    </ScreenContainer>
                </Fragment>
            )}
            {sortOptionsOpen && (
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
            )}
            {openFilterOptions && (
                <OptionsPopupDialog
                    open={openFilterOptions}
                    title={"Filter"}
                    cancel={() => {
                        setFilterType("All Sales");
                        setOpenFilterOptions(!openFilterOptions);
                    }}
                    items={[
                        {
                            Icon: SalesSVG,
                            title: "All Sales",
                            click: () => {
                                setOpenFilterOptions(!openFilterOptions);
                                filterType !== "All Sales" &&
                                    setFilterType("All Sales");
                            }
                        },
                        {
                            Icon: Group8,
                            title: "Complete Payment",
                            click: () => {
                                setOpenFilterOptions(!openFilterOptions);
                                filterType !== "Complete Payment" &&
                                    setFilterType("Complete Payment");
                            }
                        },
                        {
                            Icon: Group9,
                            title: "Incomplete Payment",
                            click: () => {
                                setOpenFilterOptions(!openFilterOptions);
                                filterType !== "Incomplete Payment" &&
                                    setFilterType("Incomplete Payment");
                            }
                        }
                    ]}
                />
            )}
        </Fragment>
    );
};

export default withRouter(Sales);
