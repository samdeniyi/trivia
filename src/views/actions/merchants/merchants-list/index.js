import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from "moment";
import { useSelector } from 'react-redux';
import { colors } from '../../../../styles';

import { TopHeader, MerchantsBadge, MerchantShareLink, UserAvatar, OptionsPopupDialog, CheckPopupDialog, RippleLink, SearchHeader, Loader, RippleButton, QrShare, DateRangePopup, CopyReferralBadge } from '../../../../components';
import { FlexCenteredBlock, ScreenContainer, EmptyListContainer, ViewContainer, FilterAndSortSection, SortFilterCell } from '../../../../containers/ScreenContainer';
import { Message, SubTitle, SecondaryText } from '../../../../containers/MessageContainer';
import { List, ListItem, ListHeading, ListSubHeading, ListLeftBlock } from '../../../../containers/ListContainer';
import { Options } from '../../../../containers/HeaderContainer';
import { ReactComponent as MerchantsIcon  } from './assets/merchants.svg';
import { ReactComponent as LinkIcon }       from './assets/link.svg';
import { ReactComponent as QrIcon }         from './assets/qr_code.svg';
import { ReactComponent as CalendarIcon }   from '../../../../assets/calendar.svg';
import { ReactComponent as FilterIcon }     from "../../../../assets/header_filter.svg";
import { ReactComponent as SortIcon }       from "../../../../assets/sort.svg";
import { ReactComponent as MostRecent }     from "../../../../assets/most_recent.svg";
import { ReactComponent as Oldest }         from "../../../../assets/oldest.svg";
import { ReactComponent as Ascending }      from "../../../../assets/ascending.svg";
import { ReactComponent as Descending }     from "../../../../assets/descending.svg";

const EmptyMerchantsList = styled.div`
    margin-top: 32px;
`;

const RecentlyAddedTitle = styled(SubTitle)`
    margin: 0 0 16px 0;
    text-align: left;
`;

const EmptyMerchantsWrapper = styled(FlexCenteredBlock)`
    border-radius: 13px;
    border: 1px solid ${colors.border.default};
    padding: 24px 16px 16px;
`;

const NoRecordFoundTitle = styled(SecondaryText)`
    margin-left: 16px;
`;

const MerchantsList = () => {
    const merchants        = useSelector(state => state.applications.merchants.merchantsList);
    const isLoading        = useSelector(state => state.applications.merchants.isLoading);
    const agentCodeToShare = useSelector(state => state.user.agentCodeToShare);
    const avatar           = useSelector(state => state.user.avatar);
    const firstName        = useSelector(state => state.user.firstName);
    const lastName         = useSelector(state => state.user.lastName);
    const [selectedFilter, setSelectedFilter]       = useState("Lifetime");
    const [startDate, setStartDate]                 = useState(undefined);
    const [endDate, setEndDate]                     = useState(undefined);
    const [searchValue, setSearchValue]             = useState("");
    const [merchantsList, setMerchantsList]         = useState(merchants);
    const [openShareLinks, setOpenShareLinks]       = useState(false);
    const [openDateRange, setOpenDateRange]         = useState(false);
    const [openQrShare, setOpenQrShare]             = useState(false);
    const [sortOptionsOpen, setSortOptionsOpen]     = useState(false);
    const [sortType, setSortType]                   = useState("Most Recent");
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [filterParameter, setFilterParameter]     = useState("createdAt");
    const [filterType, setFilterType]               = useState("All Merchants");
    const [openOptions, setOpenOptions]             = useState(false);
    const [openDateFilters, setOpenDateFilters]     = useState(false);
    const searchedMerchantsList =
        merchantsList.filter(merchant =>
            merchant.firstName.toLowerCase().includes(searchValue.toLowerCase()) || 
            merchant.lastName.toLowerCase().includes(searchValue.toLowerCase())  
        );

    useEffect(() => {
        setMerchantsList(merchants);
    }, [merchants]);

    useEffect(() => {
        if (selectedFilter === "Lifetime") {
            setMerchantsList(merchants);
        } else if (selectedFilter === "Today") {
            setMerchantsList(
                merchants => 
                merchants.filter(merchant => moment(merchant[filterParameter]).isSame(new Date(), "day"))
            );
        } else if (selectedFilter === "This week") {
            setMerchantsList(
                merchants => 
                merchants.filter(merchant => moment(merchant[filterParameter]).isSame(new Date(), "week"))
            );
        } else if (selectedFilter === "This month") {
            setMerchantsList(
                merchants => 
                merchants.filter(merchant => moment(merchant[filterParameter]).isSame(new Date(), "month"))
            );
        } else if (selectedFilter === "This year") {
            setMerchantsList(
                merchants => 
                merchants.filter(merchant => moment(merchant[filterParameter]).isSame(new Date(), "year"))
            );
        } else if (selectedFilter === "Date range") {
            setMerchantsList(
                merchants => 
                merchants.filter(merchant => 
                    new Date(merchant[filterParameter]) > new Date(startDate) &&
                    new Date(merchant[filterParameter]) < new Date(endDate)
                )
            );
        };
    }, [selectedFilter, filterParameter, merchants, startDate, endDate]);

    useEffect(() => {
        if (sortType === "Most Recent") {
            setMerchantsList(merchants => [...merchants]);
        } else if (sortType === "Oldest") {
            setMerchantsList(merchants => [...merchants.reverse()]);
        } else if (sortType === "A-Z") {
            setMerchantsList(merchants => merchants.sort((a, b) => b.firstName.localeCompare(a.firstName)));
        } else if (sortType === "Z-A") {
            setMerchantsList(merchants => merchants.sort((a, b) => a.firstName.localeCompare(b.firstName)));
        };
    }, [sortType]);

    const filterOptions =  [
        {
            Icon: CalendarIcon,
            title: "Lifetime",
            click: () => {
                (selectedFilter !== "Lifetime") && setSelectedFilter("Lifetime");
                setOpenDateFilters(!openDateFilters);
            }
        },
        {
            Icon: CalendarIcon,
            title: "Today",
            click: () => {
                (selectedFilter !== "Today") && setSelectedFilter("Today");
                setOpenDateFilters(!openDateFilters);
            }
        },
        {
            Icon: CalendarIcon,
            title: "This week",
            click: () => {
                (selectedFilter !== "This week") && setSelectedFilter("This week");
                setOpenDateFilters(!openDateFilters);
            }
        },
        {
            Icon: CalendarIcon,
            title: "This month",
            click: () => {
                (selectedFilter !== "This month") && setSelectedFilter("This month");
                setOpenDateFilters(!openDateFilters);
            }
        },
        {
            Icon: CalendarIcon,
            title: "This year",
            click: () => {
                (selectedFilter !== "This year") && setSelectedFilter("This year");
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
                                <EmptyMerchantsList>
                                    <RecentlyAddedTitle>Recently Added</RecentlyAddedTitle>
                                    <EmptyMerchantsWrapper>
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
                                    </EmptyMerchantsWrapper>
                                </EmptyMerchantsList>
                            </FlexCenteredBlock>
                        </ScreenContainer>
                    </Fragment>
                ) : (
                    <Fragment>
                        <SearchHeader 
                            title={"Merchants"} 
                            right={"48px"}
                            placeholder={"Search for a merchant…"}
                            handleSearch={setSearchValue}
                        >
                            <Options right={"true"} onClick={() => setOpenOptions(!openOptions)} />
                        </SearchHeader>
                        <ViewContainer style={{ padding: '0 16px' }} top={"72px"}>
                            <FilterAndSortSection bottom={"24px"}>
                                <SortFilterCell onClick={() => setSortOptionsOpen(!sortOptionsOpen)}>
                                    <SortIcon />
                                    {sortType}
                                </SortFilterCell>
                                <SortFilterCell onClick={() => setOpenFilterOptions(!openFilterOptions)}>
                                    {filterType}
                                    <FilterIcon />
                                </SortFilterCell>
                            </FilterAndSortSection>
                            {(merchantsList && merchantsList.length === 0) || 
                            (searchedMerchantsList && searchedMerchantsList.length === 0) ? (
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
                                    <List fullScreen>
                                    {searchedMerchantsList && searchedMerchantsList.map((merchant, index) => (
                                        <RippleLink
                                            key={index} 
                                            to={{
                                                pathname: "/actions/merchant_details",
                                                state: merchants[index]
                                            }}
                                        >
                                            <ListItem>     
                                                <UserAvatar 
                                                    avatar={merchant.avatar}
                                                    width={"32px"}
                                                    height={"32px"}
                                                />
                                                <ListLeftBlock>
                                                    <ListHeading maxWidth={"180px"}>{`${merchant.firstName} ${merchant.lastName}`}</ListHeading>
                                                    <ListSubHeading style={{ fontSize: '10px' }} maxWidth={'180px'}>
                                                        {merchant.lastSeen}</ListSubHeading>
                                                </ListLeftBlock>
                                            </ListItem>
                                        </RippleLink>
                                    ))}
                                </List>
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
                                    (sortType !== "Most Recent") && setSortType("Most Recent");
                                }
                            },
                            {
                                Icon: Oldest,
                                title: "Oldest",
                                click: () => {
                                    setSortOptionsOpen(!sortOptionsOpen);
                                    (sortType !== "Oldest") && setSortType("Oldest");
                                }
                            },
                            {
                                Icon: Ascending,
                                title: "A - Z",
                                click: () => {
                                    setSortOptionsOpen(!sortOptionsOpen);
                                    (sortType !== "A-Z") && setSortType("A-Z");
                                }
                            },
                            {
                                Icon: Descending,
                                title: "Z - A",
                                click: () => {
                                    setSortOptionsOpen(!sortOptionsOpen);
                                    (sortType !== "Z-A") && setSortType("Z-A");
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
                                    setFilterParameter("updatedAt");
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
                                    setFilterParameter("updatedAt");
                                }
                            },
                        ]}
                    />
                )}
            </Fragment>
        );
    };
};

export default MerchantsList;
