import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sortCustomers } from './sort';
import { filterCustomers } from './filter';

import CustomerDetails from '../customer-details';
import { Add } from '../../../../../containers/HeaderContainer';
import { TopHeader, PageLogo, RippleButton, RippleLink, SearchHeader, OptionsPopupDialog } from '../../../../../components';
import { ScreenContainer, FlexCenteredBlock, FilterAndSortSection, SortFilterCell, ViewContainer } from '../../../../../containers/ScreenContainer';
import { Title, Message } from '../../../../../containers/MessageContainer';
import { List, ListItem, ListHeading, ListLeftBlock, ListSubHeading, ListHighlight } from '../../../../../containers/ListContainer';
import CustomersLogo from './assets/customers.svg';
import { ReactComponent as CustomerLogo } from '../assets/customer.svg';
import { ReactComponent as FilterIcon }   from '../../../../../assets/header_filter.svg';
import { ReactComponent as SortIcon }     from '../../../../../assets/sort.svg';
import { ReactComponent as MostRecent } from "../../../../../assets/most_recent.svg";
import { ReactComponent as Oldest } from "../../../../../assets/oldest.svg";
import { ReactComponent as Ascending } from "../../../../../assets/ascending.svg";
import { ReactComponent as Descending } from "../../../../../assets/descending.svg";
import { ReactComponent as Customer }   from '../../../../../assets/user.svg';
import { ReactComponent as Caution } from '../../../../../assets/caution.svg';

const CustomersList = () => {
    const customers = useSelector(state => state.applications.myShop.customers);
    const [allCustomers, setAllCustomers] = useState([...customers]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [customerDetailsOpen, setCustomerDetailsOpen] = useState(false);
    const [sortType, setSortType] = useState("Most Recent");
    const [filterType, setFilterType] = useState("All Customers");
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [sortOptionsOpen, setSortOptionsOpen] = useState(false);

    useEffect(() => {
        setAllCustomers(
            customers.filter(
                customer =>
                customer.name.includes(searchValue) ||
                customer.name.toLowerCase().includes(searchValue) ||
                customer.phoneNumber.includes(searchValue)
            )
        );
    }, [searchValue, customers]);

    useEffect(() => {
		sortCustomers(sortType, customers, setAllCustomers);
    }, [sortType, customers, setAllCustomers]);

    useEffect(() => {
		filterCustomers(filterType, customers, setAllCustomers);
	}, [filterType, customers, setAllCustomers]);

    return (
        <Fragment>
            {(customers.length === 0) ? (
                <Fragment>
                    <TopHeader title={"Customers"} withSpacesHeader backLink={"/"} />
                    <ScreenContainer>
                        <FlexCenteredBlock top={"96px"}>
                            <PageLogo
                                Icon={CustomersLogo}
                                width={"184px"}
                                height={"184px"}
                                iconHeight={"auto"}
                                iconWidth={"auto"}
                                margin={"24px auto"}
                            />
                            <Title>No Customers</Title>
                            <Message
                                bottom={"24px"}
                                top={"8px"}
                                align={"center"}
                                padding={"0 1em"}
                            >
                                You’ve don’t have any customers. Customers will show here.
                            </Message>
                            <RippleLink
                                style={{ width: '100%', marginTop: '101px' }}
                                to={"/actions/shop_customers_add"}
                            >
                                <RippleButton>Add a customer</RippleButton>
                            </RippleLink>
                        </FlexCenteredBlock>
                    </ScreenContainer>
                </Fragment>
            ) : (
                <Fragment>
                    {!customerDetailsOpen && (
                        <SearchHeader
                            withSpacesHeader
                            placeholder={"Find customer..."}
                            right={"64px"}
                            title={"Customers"}
                            handleSearch={setSearchValue}
                            backLink={"/"}
                        >
                            <Link to={"/actions/shop_customers_add"}>
                                <Add right={"16px"} />
                            </Link>
                        </SearchHeader>
                    )}
                    <ScreenContainer>
                        <FilterAndSortSection top={"80px"}>
                            <SortFilterCell onClick={() => setSortOptionsOpen(!sortOptionsOpen)}>
                                <SortIcon />
                                {sortType}
                            </SortFilterCell>
                            <SortFilterCell onClick={() => setOpenFilterOptions(!openFilterOptions)}>
                                <FilterIcon />
                                {filterType}
                            </SortFilterCell>
                        </FilterAndSortSection>
                        <ViewContainer top={"24px"}>
                            <Message top={"24px"} bottom={"24px"} align={"left"}>
                                Showing all customers:
                            </Message>
                            <List fullScreen>
                            {allCustomers.map((customer, index) => (
                                <ListItem
                                    key={index}
                                    onClick={() => {
                                        setSelectedCustomer(customer);
                                        selectedCustomer && setCustomerDetailsOpen(!customerDetailsOpen);
                                    }}
                                >
                                    <CustomerLogo />
                                    <ListLeftBlock>
                                        <ListHeading>{customer.name}</ListHeading>
                                        <ListSubHeading>{customer.phoneNumber}</ListSubHeading>
                                    </ListLeftBlock>
                                    {(customer.owing && customer.owing === true) && (
                                        <ListHighlight>
                                            <Caution style={{ marginTop: '8px' }} />
                                        </ListHighlight>
                                    )}
                                </ListItem>
                            ))}
                            </List>
                        </ViewContainer>
                        {sortOptionsOpen && (
                            <OptionsPopupDialog
                                open={sortOptionsOpen}
                                title={"Sort"}
                                cancel={() => {
                                    setSortType("Most Recent")
                                    setSortOptionsOpen(!sortOptionsOpen)
                                }}
                                items={[
                                    {
                                        title: "Most Recent",
                                        Icon: MostRecent,
                                        click: () => {
                                            (sortType !== "Most Recent") && setSortType("Most Recent");
                                            setSortOptionsOpen(!sortOptionsOpen);
                                        }
                                    },
                                    {
                                        title: "Oldest",
                                        Icon: Oldest,
                                        click: () => {
                                            (sortType !== "Oldest") && setSortType("Oldest");
                                            setSortOptionsOpen(!sortOptionsOpen);
                                        }
                                    },
                                    {
                                        title: "A-Z",
                                        Icon: Ascending,
                                        click: () => {
                                            (sortType !== "A-Z") && setSortType("A-Z");
                                            setSortOptionsOpen(!sortOptionsOpen);
                                        }
                                    },
                                    {
                                        title: "Z-A",
                                        Icon: Descending,
                                        click: () => {
                                            (sortType !== "Z-A") && setSortType("Z-A");
                                            setSortOptionsOpen(!sortOptionsOpen);
                                        }
                                    }
                                ]}
                            />
                        )}
                        {sortOptionsOpen && (
                            <OptionsPopupDialog
                                open={sortOptionsOpen}
                                title={"Sort"}
                                cancel={() => {
                                    setSortType("Most Recent")
                                    setSortOptionsOpen(!sortOptionsOpen)
                                }}
                                items={[
                                    {
                                        title: "Most Recent",
                                        Icon: MostRecent,
                                        click: () => {
                                            (sortType !== "Most Recent") && setSortType("Most Recent");
                                            setSortOptionsOpen(!sortOptionsOpen);
                                        }
                                    },
                                    {
                                        title: "Oldest",
                                        Icon: Oldest,
                                        click: () => {
                                            (sortType !== "Oldest") && setSortType("Oldest");
                                            setSortOptionsOpen(!sortOptionsOpen);
                                        }
                                    },
                                    {
                                        title: "A-Z",
                                        Icon: Ascending,
                                        click: () => {
                                            (sortType !== "A-Z") && setSortType("A-Z");
                                            setSortOptionsOpen(!sortOptionsOpen);
                                        }
                                    },
                                    {
                                        title: "Z-A",
                                        Icon: Descending,
                                        click: () => {
                                            (sortType !== "Z-A") && setSortType("Z-A");
                                            setSortOptionsOpen(!sortOptionsOpen);
                                        }
                                    }
                                ]}
                            />
                        )}
                        {openFilterOptions && (
                            <OptionsPopupDialog
                                title={"Filter"}
                                open={openFilterOptions}
                                cancel={() => {
                                    setFilterType("All Customers");
                                    setOpenFilterOptions(!openFilterOptions);
                                }}
                                items={[
                                    {
                                        title: "Owing Customers",
                                        Icon: Customer,
                                        click: () => {
                                            (filterType !== "Owing Customers") && setFilterType("Owing Customers");
                                            setOpenFilterOptions(!openFilterOptions);
                                        }
                                    }
                                ]}
                            />
                        )}
                        {customerDetailsOpen && (
                            <CustomerDetails
                                customer={selectedCustomer}
                                open={customerDetailsOpen}
                                setOpen={setCustomerDetailsOpen}
                            />
                        )}
                    </ScreenContainer>
                </Fragment>
            )}
        </Fragment>
    );
};

export default CustomersList;