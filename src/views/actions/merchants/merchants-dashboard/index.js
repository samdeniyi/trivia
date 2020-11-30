import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from "moment";
import { useSelector } from 'react-redux';
import { colors } from '../../../../styles';
import { relativeTimeFormat } from '../../../../utils/date/relativeTimeFormat';

import { TopHeader, MerchantsBadge, MerchantShareLink, UserAvatar, OptionsPopupDialog, CheckPopupDialog, RippleLink, SearchHeader, Loader, RippleButton, QrShare, DateRangePopup, CopyReferralBadge } from '../../../../components';
import { FlexCenteredBlock, ScreenContainer, ViewContainer, EmptyListContainer } from '../../../../containers/ScreenContainer';
import { Message, SubTitle, PageSeeAll, CategoryLabel, SmallLightText } from '../../../../containers/MessageContainer';
import { List, ListItem, ListHeading, ListSubHeading, ListLeftBlock, NoRecordFoundTitle, EmptyList, ListHighlight } from '../../../../containers/ListContainer';
import { Options } from '../../../../containers/HeaderContainer';
import { ReactComponent as MerchantsIcon  } from './assets/merchants.svg';
import { ReactComponent as LinkIcon }       from './assets/link.svg';
import { ReactComponent as QrIcon }         from './assets/qr_code.svg';
import { ReactComponent as CalendarIcon }   from '../../../../assets/calendar.svg';

const RecentlyAddedTitle = styled(SubTitle)`
    margin: 0 0 16px 0;
    text-align: left;
`;

const MerchantListBlock = styled.div`
    margin-top: 8px;
`;

const MerchantsListNav = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
`;

const EmptyListWrapper = styled(FlexCenteredBlock)`
    border-radius: 13px;
    border: 1px solid ${colors.border.default};
    padding: 24px 16px 16px;
`;

const ShopName = styled(CategoryLabel)`
    height: 14px;
    line-height: unset;
    font-size: 10px;
    text-align: center;
    min-height: unset;
    padding: 2px 4px;
`;

const LastActive = styled.span`
    display: block;

    &:before {
        content: "⬤";
        display: inline-block;
        width: 8px;
        height: 8px;
        color: ${({ online }) => online ? colors.green : colors.red};
        margin-right: 8px;
    }
    
    ${SmallLightText};
    line-height: 12px;
    color: ${colors.themeTextColor3};
    margin: 0;
`;

const MerchantsPhone = styled.span`
    display: block;
    ${SmallLightText};
    text-align: right;
    font-weight: 500;
    line-height: 12px;
    color: ${colors.themeTextColor3};
    margin-bottom: 8px;
`;

const ShopNameWrapper = styled.div`
    margin-top: 7px; 
`;

const MerchantsDashboard = () => {
    const isLoading        = useSelector(state => state.applications.merchants.isLoading);
    const merchants        = useSelector(state => state.applications.merchants.merchantsList);
    const agentCodeToShare = useSelector(state => state.user.agentCodeToShare);
    const avatar           = useSelector(state => state.user.avatar);
    const firstName        = useSelector(state => state.user.firstName);
    const lastName         = useSelector(state => state.user.lastName);
    const [selectedFilter, setSelectedFilter]       = useState("Lifetime");
    const [startDate, setStartDate]                 = useState(undefined);
    const [endDate, setEndDate]                     = useState(undefined);
    const [searchValue, setSearchValue]             = useState("");
    const [merchantsList, setMerchantsList]         = useState([...merchants]);
    const [openShareLinks, setOpenShareLinks]       = useState(false);
    const [openDateRange, setOpenDateRange]         = useState(false);
    const [filterType, setFilterType]               = useState("All Merchants");
    const [openQrShare, setOpenQrShare]             = useState(false);
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [filterParameter, setFilterParameter]     = useState("updatedAt");
    const [openOptions, setOpenOptions]             = useState(false);
    const [openDateFilters, setOpenDateFilters]     = useState(false);

    useEffect(() => {
        setMerchantsList(
            merchants.filter(merchant => (merchant.firstName ||  merchant.lastName) && (
                merchant.firstName.toLowerCase().includes(searchValue.toLowerCase()) || 
                merchant.lastName.toLowerCase().includes(searchValue.toLowerCase()) )
            )
        );
    }, [searchValue, merchants]);

    useEffect(() => {
        if (selectedFilter === "Lifetime") {
            setMerchantsList(merchants);
        } else if (selectedFilter === "Today") {
            setMerchantsList(
                [...merchants].filter(merchant => moment(merchant[filterParameter]).isSame(new Date(), "day"))
            );
        } else if (selectedFilter === "This week") {
            setMerchantsList(
                [...merchants].filter(merchant => moment(merchant[filterParameter]).isBetween(
                    moment(merchant[filterParameter]).subtract(7, 'day'), new Date()
                ))
            );
        } else if (selectedFilter === "This month") {
            setMerchantsList(
                [...merchants].filter(merchant => moment(merchant[filterParameter]).isSame(new Date(), "month"))
            );
        } else if (selectedFilter === "This year") {
            setMerchantsList(
                [...merchants].filter(merchant => moment(merchant[filterParameter]).isSame(new Date(), "year"))
            );
        } else if (selectedFilter === "Date range") {
            setMerchantsList(
                [...merchants].filter(merchant => 
                    moment(startDate).isSame(endDate) ?
                    new Date(merchant[filterParameter]).getDay() === new Date(startDate).getDay() :
                    moment(merchant[filterParameter]).isBetween(startDate, endDate)
                )     
            );
        };
    }, [selectedFilter, filterParameter, merchants, startDate, endDate]);

    const filterOptions =  [
        {
            Icon: CalendarIcon,
            title: "Lifetime",
            click: () => {
                selectedFilter !== "Lifetime" && setSelectedFilter("Lifetime");
                setOpenDateFilters(!openDateFilters);
            }
        },
        {
            Icon: CalendarIcon,
            title: "Today",
            click: () => {
                selectedFilter !== "Today" && setSelectedFilter("Today");
                setOpenDateFilters(!openDateFilters);
            }
        },
        {
            Icon: CalendarIcon,
            title: "This week",
            click: () => {
                selectedFilter !== "This week" && setSelectedFilter("This week");
                setOpenDateFilters(!openDateFilters);
            }
        },
        {
            Icon: CalendarIcon,
            title: "This month",
            click: () => {
                selectedFilter !== "This month" && setSelectedFilter("This month");
                setOpenDateFilters(!openDateFilters);
            }
        },
        {
            Icon: CalendarIcon,
            title: "This year",
            click: () => {
                selectedFilter !== "This year" && setSelectedFilter("This year");
                setOpenDateFilters(!openDateFilters);
            }
        },
        {
            Icon: CalendarIcon,
            title: "Date range",
            click: () => {
                setOpenDateFilters(!openDateFilters);
                setOpenDateRange(!openDateRange);
            }
        }
    ];

    if (isLoading) {
        return <Loader />;
    } else {
        return (
            <Fragment>
                {(merchants && merchants.length === 0) ? (
                    <Fragment>
                    {!openQrShare && <TopHeader title={"Merchants"} />}
                        <ScreenContainer>
                            <FlexCenteredBlock top={"72px"}>
                                <MerchantsBadge
                                    title={"Total Merchants"}
                                    merchantsCount={merchantsList.length}
                                    currentFilter={selectedFilter}
                                    openFilters={openDateFilters}
                                    setOpenFilters={setOpenDateFilters}
                                />
                                <EmptyList>
                                    <RecentlyAddedTitle>Recently Added</RecentlyAddedTitle>
                                    <EmptyListWrapper>
                                        <MerchantsIcon />
                                        <Message
                                            bottom={"24px"}
                                            top={"24px"}
                                            align={"center"}
                                            padding={"0 1em"}
                                        >
                                            You’ve not added any merchant. Add merchants to monitor their perfomance.
                                        </Message>
                                        <CopyReferralBadge referralCode={agentCodeToShare} />
                                        <RippleButton onClick={() => setOpenOptions(!openOptions)}>
                                            Share
                                        </RippleButton>
                                    </EmptyListWrapper>
                                </EmptyList>
                            </FlexCenteredBlock>
                        </ScreenContainer>
                    </Fragment>
                ) : (
                    <Fragment>
                        {!openQrShare && (
                            <SearchHeader 
                                title={"Merchants"} 
                                right={"48px"}
                                placeholder={"Search for a merchant…"}
                                handleSearch={setSearchValue}
                            >
                                <Options right={"true"} onClick={() => setOpenOptions(!openOptions)} />
                            </SearchHeader>
                        )}
                        <ViewContainer style={{ padding: '0 16px' }} top={"72px"}>
                            {(merchantsList && merchantsList.length === 0) ? (
                                <Fragment>
                                    <MerchantsBadge
                                        title={"Total Merchants"}
                                        merchantsCount={merchantsList.length}
                                        currentFilter={selectedFilter}
                                        openFilters={openDateFilters}
                                        setOpenFilters={setOpenDateFilters}
                                    />
                                    <NoRecordFoundTitle top={"24px"} bottom={"24px"}>
                                        No record found
                                    </NoRecordFoundTitle>
                                    <EmptyListContainer>
                                        No record found
                                    </EmptyListContainer>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <MerchantsBadge
                                        title={"Total Merchants"}
                                        merchantsCount={merchantsList.length}
                                        currentFilter={selectedFilter}
                                        openFilters={openDateFilters}
                                        setOpenFilters={setOpenDateFilters}
                                        bottom={"24px"}
                                    />
                                    <MerchantListBlock>
                                        <MerchantsListNav>
                                            <RecentlyAddedTitle>Recently Added</RecentlyAddedTitle>
                                            {(merchants && merchants.length > 5) && (
                                                <RippleLink to={"/actions/merchants_listing"}>
                                                    <PageSeeAll>See All</PageSeeAll>
                                                </RippleLink>
                                            )}
                                        </MerchantsListNav>
                                        <List fullScreen>
                                        {merchantsList && merchantsList
                                            .slice(0, 5)
                                            .map((merchant, index) => (
                                                <RippleLink
                                                    key={index} 
                                                    to={{
                                                        pathname: "/actions/merchant_details",
                                                        state: merchants[index]
                                                    }}
                                                >
                                                    <ListItem bottom={"8px"}>     
                                                        <UserAvatar 
                                                            avatar={merchant.avatar}
                                                            width={"32px"}
                                                            height={"32px"}
                                                        />
                                                        <ListLeftBlock>
                                                        <ListHeading maxWidth={"180px"}>{`${merchant.firstName || ""} ${merchant.lastName || ""}`}</ListHeading>
                                                            {merchant.businessProfile && (
                                                                <ListSubHeading style={{ fontSize: '10px' }} maxWidth={'180px'}>
                                                                    {merchant.businessProfile.lga} L.G.A. 
                                                                    {merchant.businessProfile.state} State
                                                                </ListSubHeading>
                                                            )}
                                                            {merchant.businessProfile && (
                                                                <ShopNameWrapper>
                                                                    <ShopName>
                                                                    {merchant.businessProfile.businessName}
                                                                    </ShopName>
                                                                </ShopNameWrapper>
                                                            )}
                                                        </ListLeftBlock>
                                                        <ListHighlight>
                                                            <MerchantsPhone>{merchant.msisdn}</MerchantsPhone>
                                                            <LastActive online={new Date(merchant.lastSeen).getDate() - new Date().getDate() === 0}>
                                                                {relativeTimeFormat(merchant.lastSeen)}
                                                            </LastActive>
                                                        </ListHighlight> 
                                                    </ListItem>
                                                </RippleLink>
                                            ))}
                                        </List>
                                    </MerchantListBlock>
                                </Fragment>
                            )}
                        </ViewContainer>
                    </Fragment>
                )}
                {openOptions && (
                    <OptionsPopupDialog
                        open={openOptions}
                        title={"Sharing options"}
                        cancel={() => setOpenOptions(!openOptions)}
                        items={[
                            {
                                Icon: QrIcon,
                                title: "QR code",
                                more: true,
                                click: () => {
                                    setOpenOptions(!openOptions);
                                    setOpenQrShare(!openQrShare);
                                }
                            }, {
                                Icon: LinkIcon,
                                title: "Share referral link",
                                more: true,
                                click: () => {
                                    setOpenOptions(!openOptions);
                                    setOpenShareLinks(!openShareLinks);
                                }
                            }
                        ]}
                    />
                )}
                {openQrShare && (
                    <QrShare 
                        open={openQrShare}
                        cancel={() => setOpenQrShare(!openQrShare)}
                        referralCode={agentCodeToShare}
                        avatar={avatar}
                        fullName={`${firstName} ${lastName}`}
                    />
                )}
                {openDateFilters && (
                    <CheckPopupDialog
                        open={openDateFilters}
                        title={"Filters"}
                        cancel={() => {
                            if (filterType !== "Last Active" || filterType !== "Date Added") {
                                setSelectedFilter("Lifetime");
                            };

                            setOpenDateFilters(!openDateFilters);
                        }}
                        items={
                            (filterType === "Last Active" || filterType === "Date Added") ?
                            filterOptions.slice(1) :
                            filterOptions
                        }
                    />
                )}
                {openDateRange && (
                    <DateRangePopup 
                        open={openDateRange}
                        setOpen={setOpenDateRange}
                        startDate={startDate}
                        setSelectedFilter={setSelectedFilter}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                )}
                {openShareLinks && (
                    <MerchantShareLink 
                        open={openShareLinks}
                        setOpen={setOpenShareLinks}
                        referralCode={agentCodeToShare}
                    />
                )}
                {openFilterOptions && (
                    <OptionsPopupDialog
                        open={openFilterOptions}
                        title={"Filter"}
                        cancel={() => {
                            setFilterType("All Merchants");
                            setOpenFilterOptions(!openFilterOptions);
                        }}
                        items={[
                            {
                                Icon: CalendarIcon,
                                title: "Date Added",
                                more: true,
                                click: () => {
                                    setOpenFilterOptions(!openFilterOptions);
                                    setOpenDateFilters(!openDateFilters);
                                    setFilterType("Date Added");
                                    setFilterParameter("createdAt");
                                }
                            },
                            {
                                Icon: CalendarIcon,
                                title: "Last Active",
                                more: true,
                                click: () => {
                                    setOpenFilterOptions(!openFilterOptions);
                                    setOpenDateFilters(!openDateFilters);
                                    setFilterType("Last Active");
                                    setFilterParameter("lastSeen");
                                }
                            },
                        ]}
                    />
                )}
            </Fragment>
        );
    };
};

export default MerchantsDashboard;