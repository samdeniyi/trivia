import React, { Fragment, useEffect, memo, useState } from 'react';
import { string, func, array, bool } from 'prop-types';
import { connect } from 'react-redux';
import { filterByDate } from './filter';
import { colors } from '../../../../styles';
import { getWalletTransactions } from '../../../../redux/ducks/account/transactions/actions';
import { getAgentReferrals, updateAgentCommissions } from '../../../../redux/ducks/applications/agents/actions';
import { countAmount, amountShare } from '../../../../utils/currency/countAmount';
import { unparseBalance } from '../../../../utils/currency/parseBalance';
import { getMerchantReferrals, updateMerchantCommissions } from '../../../../redux/ducks/applications/merchants/actions';
import { formatPrice } from '../../../../utils/currency/formatPriceWithComma';

import { PieChart } from 'react-minimal-pie-chart';
import { ListItem, ListLeftBlock, ListHeading, ListSubHeading } from '../../../../containers/ListContainer';
import { NameLabel, ActivitiesList, ActivityBlock, ActivityInfo, ActivityCount, ActivityLabel, ActivitiesGraph, ActivitiesGraphHeader, ChartBlock, ChartDescription, ChartDescriptionElement, CommissionsCategories, CommissionsCategoriesList, CommissionsCategoriesLink, ActivitySummaryBlock, ActivityTotal, TotalCommissionsAmount, FilterCommissionsData, FilterCommissionsHeading } from './styles';
import { TopHeader, UserAvatar, PageLogo, RippleLink, CheckPopupDialog } from '../../../../components';
import { ScreenContainer, FlexCenteredBlock } from '../../../../containers/ScreenContainer';
import { ActivityGraphBlock } from '../../../../containers/ActivityContainer';
import { Message } from '../../../../containers/MessageContainer';
import { ReactComponent as CurrencyIcon } from '../../../../assets/currency.svg';
import { ReactComponent as CalendarIcon } from '../../../../assets/calendar.svg';
import { ReactComponent as ForwardIcon }  from '../../../../assets/arrow.svg';
import AgentsIcon      from '../../../../assets/agents_icon.svg';
import TeamIcon        from '../../../../assets/group.svg';
import ReceiptIcon     from '../../../../assets/receipt.svg';
import MerchantsIcon   from '../../../../assets/team.svg';
// import ShoppingBagIcon from '../../../../assets/shopping_bag.svg';
// import OrdersIcon      from './assets/bag.svg';

const PerformancePage = ({
    avatar,
    firstName,
    lastName,
    transactionsList,
    agents,
    merchants,
    orders,
    getWalletTransactions,
    getAgentReferrals,
    updateAgentCommissions,
    getMerchantReferrals,
    updateMerchantCommissions
}) => {
    const [filterOpen, setFilterOpen]         = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Today");

    useEffect(() => {
        getWalletTransactions();
    }, [getWalletTransactions]);

    useEffect(() => {
        getAgentReferrals().then(() => updateAgentCommissions());
    }, [getAgentReferrals, updateAgentCommissions]);

    useEffect(() => {
        getMerchantReferrals().then(() => updateMerchantCommissions());
    }, [getMerchantReferrals, updateMerchantCommissions]);

    const merchantsCommissions = merchants.flatMap(merchant => merchant.commissionsList);
    const agentsCommissions    = agents.flatMap(agent => agent.commissionsList);
    const ordersCommissions    =
        orders.map(order => ({
            createdAt: order.createdAt,
            amount: order.amount
        }));

    const initialCommissions = [
        { type: "ORDERS",    commissions: ordersCommissions },
        { type: "AGENTS",    commissions: agentsCommissions },
        { type: "MERCHANTS", commissions: merchantsCommissions },
    ];

    const [totalCommissions, setTotalCommissions] = useState(initialCommissions);

    const totalValues =
        totalCommissions.map(element => element && ({
            [element.type]: countAmount(totalCommissions.filter(commission => commission.type === element.type)[0].commissions, "amount")
        }));

    const activityData =
        totalCommissions.map((commission, index) => ({
            title: `${commission.type.slice(0, 1)}${commission.type.slice(1).toLowerCase()}`,
            value: unparseBalance(totalValues[index][commission.type]) || 0,
            color: colors.performanceChart[commission.type]
        }));

    const commissionsTotal = (activityData.length > 0) && countAmount(activityData, "value");

    const activityValues = 
        activityData.map(activity => ({
            type: activity.title,
            value: amountShare(commissionsTotal, activity.value)
        }));

    return (
        <Fragment>
            <TopHeader title={"Performance"} />
            <ScreenContainer>
                <FlexCenteredBlock top={"64px"}>
                    <UserAvatar
                        width={"72px"}
                        height={"72px"}
                        avatar={avatar}
                    />
                    <NameLabel>{firstName} {lastName}</NameLabel>
                    <ActivitiesList>
                        <RippleLink to="/actions/agents">
                            <ActivityBlock>
                                <PageLogo
                                    width={"32px"}
                                    height={"32px"}
                                    iconWidth={"16px"}
                                    iconHeight={"16px"}
                                    Icon={TeamIcon}
                                />
                                <ActivityInfo>
                                    <ActivityCount>{agents && agents.length}</ActivityCount>
                                    <ActivityLabel>Agents</ActivityLabel>
                                </ActivityInfo>
                            </ActivityBlock>
                        </RippleLink>
                        <RippleLink to="/user/wallet_transactions">
                            <ActivityBlock>
                                <PageLogo
                                    width={"32px"}
                                    height={"32px"}
                                    iconWidth={"16px"}
                                    iconHeight={"16px"}
                                    Icon={TeamIcon}
                                />
                                <ActivityInfo>
                                    <ActivityCount>{transactionsList && transactionsList.length}</ActivityCount>
                                    <ActivityLabel>Transactions</ActivityLabel>
                                </ActivityInfo>
                            </ActivityBlock>
                        </RippleLink>
                        <RippleLink to="/actions/merchants">
                            <ActivityBlock>
                                <PageLogo
                                    width={"32px"}
                                    height={"32px"}
                                    iconWidth={"16px"}
                                    iconHeight={"16px"}
                                    Icon={ReceiptIcon}
                                />
                                <ActivityInfo>
                                    <ActivityCount>{merchants && merchants.length}</ActivityCount>
                                    <ActivityLabel>Merchants</ActivityLabel>
                                </ActivityInfo>
                            </ActivityBlock>
                        </RippleLink>
                        {/* <RippleLink
                            to={{
                                pathname: "/user/performance_orders",
                                state: orders
                            }}
                        >
                            <ActivityBlock>
                                <PageLogo
                                    width={"32px"}
                                    height={"32px"}
                                    iconWidth={"16px"}
                                    iconHeight={"16px"}
                                    Icon={ShoppingBagIcon}
                                />
                                <ActivityInfo>
                                    <ActivityCount>{orders && orders.length}</ActivityCount>
                                    <ActivityLabel>Orders placed</ActivityLabel>
                                </ActivityInfo>
                            </ActivityBlock>
                        </RippleLink> */}
                    </ActivitiesList>
                    <ActivitiesGraph>
                        <ActivitiesGraphHeader>Your activities</ActivitiesGraphHeader>
                        {(unparseBalance(commissionsTotal) === 0) ? (
                            <ActivityGraphBlock>
                                <CurrencyIcon />
                                <Message align={"center"}>You have not carried out any activity. When you carry out an activity, the summary will be displayed here.</Message>
                            </ActivityGraphBlock>
                        ) : (
                            <ActivityGraphBlock noBottomBorder padding={"16px 16px 0 16px"}>
                                <ActivitySummaryBlock>
                                    <ActivityTotal>
                                        <TotalCommissionsAmount>{commissionsTotal}</TotalCommissionsAmount>
                                        <ActivityLabel>Total Commissions</ActivityLabel>
                                    </ActivityTotal>
                                    <FilterCommissionsData onClick={() => setFilterOpen(!filterOpen)}>
                                        <FilterCommissionsHeading>
                                            {selectedFilter}
                                        </FilterCommissionsHeading>
                                    </FilterCommissionsData>
                                </ActivitySummaryBlock>
                                <ChartBlock>
                                    <PieChart
                                        lineWidth={32}
                                        data={activityData}
                                    />
                                    <ChartDescription>
                                        {activityValues && activityValues.map((element, index) => (
                                            <ChartDescriptionElement key={index} type={element.type.toUpperCase()}>
                                                {element.value} From {element.type}
                                            </ChartDescriptionElement>
                                        ))}
                                    </ChartDescription>
                                </ChartBlock>
                                <CommissionsCategories>
                                    <NameLabel>Commission Categories</NameLabel>
                                    <CommissionsCategoriesList fullScreen>
                                        {/* <RippleLink
                                            to={{
                                                pathname: "/user/performance_orders",
                                                state: orders
                                            }}
                                        >
                                            <ListItem>
                                                <PageLogo
                                                    iconHeight={"16px"}
                                                    iconWidth={"16px"}
                                                    width={"32px"}
                                                    height={"32px"}
                                                    Icon={OrdersIcon}
                                                />
                                                <ListLeftBlock>
                                                    <ListHeading>{activityData[0].title}</ListHeading>
                                                    <ListSubHeading>{formatPrice(activityData[0].value)}</ListSubHeading>
                                                </ListLeftBlock>
                                                <CommissionsCategoriesLink>
                                                    <ForwardIcon />
                                                </CommissionsCategoriesLink>
                                            </ListItem>
                                        </RippleLink> */}
                                        <RippleLink to="/actions/agents">
                                            <ListItem>
                                                <PageLogo
                                                    iconHeight={"16px"}
                                                    iconWidth={"16px"}
                                                    width={"32px"}
                                                    height={"32px"}
                                                    Icon={MerchantsIcon}
                                                />
                                                <ListLeftBlock>
                                                    <ListHeading>{activityData[1].title}</ListHeading>
                                                    <ListSubHeading>{formatPrice(activityData[1].value)}</ListSubHeading>
                                                </ListLeftBlock>
                                                <CommissionsCategoriesLink>
                                                    <ForwardIcon />
                                                </CommissionsCategoriesLink>
                                            </ListItem>
                                        </RippleLink>
                                        <RippleLink to="/actions/merchants">
                                            <ListItem>
                                                <PageLogo
                                                    iconHeight={"16px"}
                                                    iconWidth={"16px"}
                                                    width={"32px"}
                                                    height={"32px"}
                                                    Icon={AgentsIcon}
                                                />
                                                <ListLeftBlock>
                                                    <ListHeading>{activityData[2].title}</ListHeading>
                                                    <ListSubHeading>{formatPrice(activityData[2].value)}</ListSubHeading>
                                                </ListLeftBlock>
                                                <CommissionsCategoriesLink>
                                                    <ForwardIcon />
                                                </CommissionsCategoriesLink>
                                            </ListItem>
                                        </RippleLink>
                                    </CommissionsCategoriesList>
                                </CommissionsCategories>
                            </ActivityGraphBlock>
                        )}
                    </ActivitiesGraph>
                </FlexCenteredBlock>
                <CheckPopupDialog
                    open={filterOpen}
                    title={"Filters"}
                    cancel={() => setFilterOpen(!filterOpen)}
                    items={[
                        {
                            Icon: CalendarIcon,
                            title: "Today",
                            click: () => {
                                setTotalCommissions(filterByDate(initialCommissions, "TODAY"));
                                setSelectedFilter("Today");
                            }
                        },
                        {
                            Icon: CalendarIcon,
                            title: "This week",
                            click: () => {
                                setTotalCommissions(filterByDate(initialCommissions, "THIS_WEEK"));
                                setSelectedFilter("This week");
                            }
                        },
                        {
                            Icon: CalendarIcon,
                            title: "This month",
                            click: () => {
                                setTotalCommissions(filterByDate(initialCommissions, "THIS_MONTH"))
                                setSelectedFilter("This month");
                            }
                        },
                        {
                            Icon: CalendarIcon,
                            title: "This year",
                            click: () => {
                                setTotalCommissions(filterByDate(initialCommissions, "THIS_YEAR"));
                                setSelectedFilter("This year");
                            }
                        }
                    ]}
                />
            </ScreenContainer>
        </Fragment>
    );
};

PerformancePage.propTypes = {
    isLoading:             bool,
    avatar:                string,
    firstName:             string,
    lastName:              string,
    transactionsList:      array,
    agents:                array,
    merchants:             array,
    orders:                array,
    getAgentReferrals:     func,
    getWalletTransactions: func,
    getMerchantReferrals:  func
};

const mapStateToProps = ({ user, applications, account }) => ({
    isLoading:        applications.merchlist.isLoading,
    agents:           applications.agents.referrals,
    merchants:        applications.merchants.merchantsList,
    orders:           applications.merchlist.orders,
    transactionsList: account.transactions.transactionsList,
    avatar:           user.avatar,
    firstName:        user.firstName,
    lastName:         user.lastName,
});

export default connect(
    mapStateToProps,
    {
        getWalletTransactions,
        getAgentReferrals,
        updateAgentCommissions,
        getMerchantReferrals,
        updateMerchantCommissions
    }
)(memo(PerformancePage));