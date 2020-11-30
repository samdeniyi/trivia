import React, { Fragment, useEffect, useState } from 'react';
import moment from "moment";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { colors } from '../../../../styles';
import { relativeTimeFormat } from '../../../../utils/date/relativeTimeFormat';

import { List, ListItem, NoRecordFoundTitle, ListLeftBlock, ListHeading, ListSubHeading, ListHighlight } from '../../../../containers/ListContainer';
import { SearchHeader, OptionsPopupDialog, RippleLink, UserAvatar, DateRangePopup, CheckPopupDialog } from '../../../../components';
import { FilterAndSortSection, SortFilterCell, ViewContainer, EmptyListContainer } from '../../../../containers/ScreenContainer';
import { ShowOption, SmallLightText, CategoryLabel } from '../../../../containers/MessageContainer';
import { ReactComponent as FilterIcon }     from "../../../../assets/header_filter.svg";
import { ReactComponent as SortIcon }       from "../../../../assets/sort.svg";
import { ReactComponent as MostRecent }     from "../../../../assets/most_recent.svg";
import { ReactComponent as Oldest }         from "../../../../assets/oldest.svg";
import { ReactComponent as Ascending }      from "../../../../assets/ascending.svg";
import { ReactComponent as Descending }     from "../../../../assets/descending.svg";
import { ReactComponent as CalendarIcon }   from '../../../../assets/calendar.svg';

const ShopName = styled(CategoryLabel)`
    height: 14px;
    line-height: unset;
    font-size: 10px;
    text-align: center;
    min-height: unset;
    padding: 2px 4px;
`;

const LastActive = styled.span`
    &:before {
        content: "⬤";
        display: inline-block;
        width: 8px;
        height: 8px;
        color: ${({ online }) => online ? colors.green : colors.red};
        margin-right: 8px;
    }
    
    display: block;
    ${SmallLightText};
    line-height: 12px;
    color: ${colors.themeTextColor3};
    margin: 0;
`;

const MerchantsPhone = styled.span`
    ${SmallLightText};
    display: block;
    text-align: right;
    font-weight: 500;
    line-height: 12px;
    color: ${colors.themeTextColor3};
    margin-bottom: 8px;
`;

const ShopNameWrapper = styled.div`
    margin-top: 7px; 
`;

const MerchantsListing = () => {
    const merchants = useSelector(state => state.applications.merchants.merchantsList);
    const [sortOptionsOpen, setSortOptionsOpen]     = useState(false);
    const [sortType, setSortType]                   = useState("Most Recent");
    const [merchantsList, setMerchantsList]         = useState([...merchants]);
    const [searchValue, setSearchValue]             = useState("");
    const [startDate, setStartDate]                 = useState(undefined);
    const [endDate, setEndDate]                     = useState(undefined);
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [openDateFilters, setOpenDateFilters]     = useState(false);
    const [openDateRange, setOpenDateRange]         = useState(false);
    const [filterParameter, setFilterParameter]     = useState("createdAt");
    const [filterType, setFilterType]               = useState("All Merchants");
      
    useEffect(() => {
        if (filterType === "All Merchants") {
            setMerchantsList(merchants);
        } else if (filterType === "Today") {
            setMerchantsList(
                merchants.filter(merchant => moment(merchant[filterParameter]).isSame(new Date(), "day"))
            );
        } else if (filterType === "This week") {
            setMerchantsList(
                merchants.filter(merchant => moment(merchant[filterParameter]).isBetween(
                    moment(merchant[filterParameter]).subtract(7, 'day'), new Date()
                ))
            );
        } else if (filterType === "This month") {
            setMerchantsList(
                merchants.filter(merchant => moment(merchant[filterParameter]).isSame(new Date(), "month"))
            );
        } else if (filterType === "This year") {
            setMerchantsList(
                merchants.filter(merchant => moment(merchant[filterParameter]).isSame(new Date(), "year"))
            );
        } else if (filterType === "Date range") {
            setMerchantsList(
                merchants.filter(merchant => 
                    moment(startDate).isSame(endDate) ?
                    new Date(merchant[filterParameter]).getDay() === new Date(startDate).getDay() :
                    moment(merchant[filterParameter]).isBetween(startDate, endDate)
                )     
            );
        };
    }, [filterType, filterParameter, merchants, startDate, endDate]);

    useEffect(() => {
        if (sortType === "Most Recent") {
            setMerchantsList([...merchants].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else if (sortType === "Oldest") {
            setMerchantsList([...merchants].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
        } else if (sortType === "A-Z") {
            setMerchantsList([...merchants].sort((a, b) => a.firstName.localeCompare(b.firstName)));
        } else if (sortType === "Z-A") {
            setMerchantsList([...merchants].sort((a, b) => b.firstName.localeCompare(a.firstName)));
        };
    }, [sortType, merchants]);

    useEffect(() => {
        setMerchantsList(
            merchants.filter(merchant => (merchant.firstName ||  merchant.lastName) && (
                merchant.firstName.toLowerCase().includes(searchValue.toLowerCase()) || 
                merchant.lastName.toLowerCase().includes(searchValue.toLowerCase()) )
            )
        );
    }, [searchValue, merchants]);
    return (
        <Fragment>
            <SearchHeader 
                title={"Merchants"} 
                right={"24px"}
                placeholder={"Search for a merchant…"}
                handleSearch={setSearchValue}
            />
            <ViewContainer style={{ padding: '0 16px' }} top={"72px"}>
                <FilterAndSortSection>
                    <SortFilterCell onClick={() => setSortOptionsOpen(!sortOptionsOpen)}>
                        <SortIcon />
                        {sortType}
                    </SortFilterCell>
                    <SortFilterCell onClick={() => setOpenFilterOptions(!openFilterOptions)}>
                        {filterType}
                        <FilterIcon />
                    </SortFilterCell>
                </FilterAndSortSection>
                {(merchantsList && merchantsList.length === 0) ? (
                    <Fragment>
                        <NoRecordFoundTitle top={"24px"} bottom={"24px"}>
                            No record found
                        </NoRecordFoundTitle>
                        <EmptyListContainer>
                            No record found
                        </EmptyListContainer>
                    </Fragment>
                ) : (
                    <Fragment>
                        <ShowOption>Showing {merchantsList.length} merchants</ShowOption>
                        <List fullScreen>
                        {merchantsList && merchantsList.map((merchant, index) => (
                            <RippleLink
                                key={index} 
                                to={{
                                    pathname: "/actions/merchant_details",
                                    state: merchant
                                }}
                            >
                                <ListItem bottom={"8px"}>     
                                    <UserAvatar 
                                        avatar={merchant.avatar}
                                        width={"32px"}
                                        height={"32px"}
                                    />
                                    <ListLeftBlock>
                                        <ListHeading  maxWidth={'180px'}>{`${merchant.firstName} ${merchant.lastName}`}</ListHeading>
                                        {merchant.businessProfile && (
                                            <ListSubHeading style={{ fontSize: '10px' }} maxWidth={'180px'}>
                                                {merchant.businessProfile.lga} L.G.A. 
                                                {merchant.businessProfile.state} State
                                            </ListSubHeading>
                                        )}
                                        {merchant.businessProfile && (
                                            <ShopNameWrapper>
                                                <ShopName>{merchant.businessProfile.businessName}</ShopName>
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
                    </Fragment>
                )}
            </ViewContainer>
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
            {openDateFilters && (
                <CheckPopupDialog
                    open={openDateFilters}
                    title={"Filters"}
                    cancel={() => {
                        if (filterType !== "Last Active" || filterType !== "Date Added") {
                            setFilterType("All Merchants");
                        };

                        setOpenDateFilters(!openDateFilters);
                    }}
                    items={[
                        {
                            Icon: CalendarIcon,
                            title: "Today",
                            click: () => {
                                filterType !== "Today" && setFilterType("Today");
                                setOpenDateFilters(!openDateFilters);
                            }
                        },
                        {
                            Icon: CalendarIcon,
                            title: "This week",
                            click: () => {
                                filterType !== "This week" && setFilterType("This week");
                                setOpenDateFilters(!openDateFilters);
                            }
                        },
                        {
                            Icon: CalendarIcon,
                            title: "This month",
                            click: () => {
                                filterType !== "This month" && setFilterType("This month");
                                setOpenDateFilters(!openDateFilters);
                            }
                        },
                        {
                            Icon: CalendarIcon,
                            title: "This year",
                            click: () => {
                                filterType !== "This year" && setFilterType("This year");
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
                    ]}
                />
            )}
            {openDateRange && (
                <DateRangePopup
                    open={openDateRange}
                    setOpen={setOpenDateRange}
                    startDate={startDate}
                    setSelectedFilter={setFilterType}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
            )}
        </Fragment>
    );
};

export default MerchantsListing;