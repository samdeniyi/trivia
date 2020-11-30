import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { transactionActions } from "../../../../redux/ducks/applications/transactions/actions";
import { formatCreationDate } from "../../../../utils/date/formatCreationDate";
import { parseTransactionsByDate } from "../../../../utils/date/parseTransactionsByDate";
import { sortTransactions } from "./sort";
import { filterTransactions } from "./filter";
import { formatPrice } from "../../../../utils/currency/formatPriceWithComma";

import {
    PageLogo,
    TopHeader,
    SearchHeader,
    Loader,
    RippleLink,
    OptionsPopupDialog,
    DropdownList,
} from "../../../../components";
import { Title, Message } from "../../../../containers/MessageContainer";
import {
    FlexCenteredBlock,
    ScreenContainer,
    FilterAndSortSection,
    SortFilterCell
} from "../../../../containers/ScreenContainer";
import { ReactComponent as FilterIcon } from "../../../../assets/header_filter.svg";
import { ReactComponent as SortIcon } from "../../../../assets/sort.svg";
import { ReactComponent as MostRecent } from "../../../../assets/most_recent.svg";
import { ReactComponent as Oldest } from "../../../../assets/oldest.svg";
import { ReactComponent as Ascending } from "../../../../assets/ascending.svg";
import { ReactComponent as Descending } from "../../../../assets/descending.svg";
import { ReactComponent as AllTransactionSVG } from "../assets/alltransactions.svg";
import { ReactComponent as CreditSVG } from "../assets/credit.svg";
import { ReactComponent as DebitSVG } from "../assets/debit.svg";
// import { ReactComponent as CommissionsSVG } from "../assets/commisions.svg";
// import { ReactComponent as BonusesSVG } from "../assets/bonuses.svg";

import {
    List,
    ListLeftBlock,
    ListItem,
    ListHeading,
    ListSubHeading
} from "../../../../containers/ListContainer";
import NoTransactionIcon from "../assets/noTransaction.svg";
import TransactionIcon from "../assets/transactionSVG.svg";

import {
    TransactionDateBox,
    TransactionAmount
} from "../styles";


const TransactionHomepage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.applications.transactions.isLoading);
    const transactions = useSelector(state => state.applications.transactions.allTransactions);

    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [sortOptionsOpen, setSortOptionsOpen] = useState(false);
    const [sortType, setSortType] = useState("Most Recent");
    const [allTransactions, setAllTransactions] = useState(transactions|| []);
    const [filterType, setFilterType] = useState("All Transactions");
    const [searchValue, setSearchValue] = useState("");


    useEffect(() => {
        dispatch(transactionActions.getAllTransactions());
    }, [dispatch]);

    useEffect(() => {
        transactions && setAllTransactions(
            transactions.filter(transaction =>
                String(transaction.details.toLowerCase()).includes(searchValue.toLowerCase()) ||
                String(transaction.amount).includes(searchValue)
            )
        );
    }, [transactions, searchValue]);

    useEffect(() => {
        filterTransactions(filterType, transactions, setAllTransactions);
    }, [filterType, transactions, setAllTransactions]);

    useEffect(() => {
        sortTransactions(sortType, transactions, setAllTransactions);
    }, [sortType, transactions, setAllTransactions]);
  
    if (isLoading) {
        return <Loader />;
    } else return (
        <Fragment>
            {(transactions && !transactions.length) ? (
                <Fragment>
                    <TopHeader title={"Transactions"} withSpacesHeader backLink={"/"} />
                    <ScreenContainer>
                        <FlexCenteredBlock top={"120px"}>
                            <PageLogo
                                Icon={NoTransactionIcon}
                                width={"184px"}
                                height={"184px"}
                                iconHeight={"auto"}
                                iconWidth={"auto"}
                                margin={"24px auto"}
                            />
                            <Title>No transactions</Title>
                            <Message
                                bottom={"24px"}
                                top={"8px"}
                                align={"center"}
                                padding={"0 1em"}
                            >
                               You’ve not made any transactions. Transactions you make will show here.
                            </Message>
                          
                        </FlexCenteredBlock>
                    </ScreenContainer>
                </Fragment>
            ) : (
                <Fragment>
                    <SearchHeader
                        withSpacesHeader
                        title={"Transactions"}
                        right={"24px"}
                        placeholder={"Search for a transaction..."}
                        handleSearch={setSearchValue}
                        backLink={"/"}
                    >
                    </SearchHeader>
                    <ScreenContainer>
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
                            allTransactions.map(data => data), "createdAt"
                        ).map((val, index) => (
                            <DropdownList
                                key={index}
                                customList={true}
                                transactionList={val.transactions}
                                title={val.date}
                                index={index}
                            >
                                <List fullScreen childLink>
                                {val.transactions.map((param, index) => (
                                    <RippleLink
                                        key={index}
                                        to={{
                                            pathname: "/actions/transactions/details/"+param.id,
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
                                                Icon={TransactionIcon}
                                            />
                                            <ListLeftBlock>
                                                <ListHeading maxWidth={'170px'}>{param.details && param.details.toLowerCase()}</ListHeading>
                                                <TransactionDateBox>
                                                    <ListSubHeading>
                                                    {formatCreationDate(param.createdAt)}
                                                    </ListSubHeading>
                                            
                                                </TransactionDateBox>
  
                                            </ListLeftBlock>
                                            <TransactionAmount color={param.flowType ==="IN"? "#4b8e03": "#e02020"}>{(param.flowType ==="IN"? "+ ": "- ") + formatPrice(param.amount)}</TransactionAmount>
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
                        setFilterType("All Transactions");
                        setOpenFilterOptions(!openFilterOptions);
                    }}
                    items={[
                        {
                            Icon: AllTransactionSVG,
                            title: "All Transactions",
                            click: () => {
                                setOpenFilterOptions(!openFilterOptions);
                                filterType !== "All Transactions" &&
                                    setFilterType("All Transactions");
                            }
                        },
                        {
                            Icon: CreditSVG,
                            title: "Credit",
                            click: () => {
                                setOpenFilterOptions(!openFilterOptions);
                                filterType !== "Credit" &&
                                    setFilterType("Credit");
                            }
                        },
                        {
                            Icon: DebitSVG,
                            title: "Debit",
                            click: () => {
                                setOpenFilterOptions(!openFilterOptions);
                                filterType !== "Debit" &&
                                    setFilterType("Debit");
                            }
                        },
                        // {
                        //     Icon: CommissionsSVG,
                        //     title: "Commissions",
                        //     click: () => {
                        //         setOpenFilterOptions(!openFilterOptions);
                        //         filterType !== "Commissions" &&
                        //             setFilterType("Commissions");
                        //     }
                        // },
                        // {
                        //     Icon: BonusesSVG,
                        //     title: "Bonuses",
                        //     click: () => {
                        //         setOpenFilterOptions(!openFilterOptions);
                        //         filterType !== "Bonuses" &&
                        //             setFilterType("Bonuses");
                        //     }
                        // }
                    ]}
                />
            )}
        </Fragment>
  );
};

export default withRouter(TransactionHomepage);


