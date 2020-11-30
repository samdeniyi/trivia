import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { func } from 'prop-types';
import { filterByDate } from './filter';
import { parseTransactionsByDate } from '../../../../utils/date/parseTransactionsByDate';
import { getWalletTransactions } from '../../../../redux/ducks/account/transactions/actions';

import Navigation from '../../navigation';
import { PageLogo, DropdownList, CheckPopupDialog, SearchHeader, TopHeader } from '../../../../components';
import { Message, Title } from '../../../../containers/MessageContainer';
import { CenteredBlock } from '../../../../containers/ScreenContainer';
import { Filter } from '../../../../containers/HeaderContainer';
import NoTransactionLogo                         from './assets/no_transactions.svg';
import { ReactComponent as AllTransactionsIcon } from './assets/all_transactions.svg';
import { ReactComponent as BonusesIcon }         from './assets/bonuses.svg';
import { ReactComponent as CreditIcon }          from './assets/credit.svg';
import { ReactComponent as DebitIcon }           from './assets/debit.svg';
import { ReactComponent as CommissionsIcon }     from './assets/notifications.svg';


const FragmentWrapper = styled(CenteredBlock)`
    animation: fromRight 0.5s ease;
    @keyframes fromRight {
        0% {
            left: 100%;
            margin-right: -100%;
        }
        100% {
            left: 50%;
            margin-right: -50%;
        }
    }
`;

const TransactionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    
`;

const AnimatedWrapper = styled.div`
    margin-top: 64px;
    animation: fromRightTransform 0.5s ease;
    @keyframes fromRightTransform {
        0% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(0);
        }
    }
`;

const TransactionPage = ({
    getWalletTransactions
}) => {
    const transactions = useSelector(state => state.account.transactions.transactionsList);
    const [filteredList, setFilteredList] = useState(parseTransactionsByDate(transactions));
    const [openFilterOptions, setOpenFilterOptions] = useState(false);
    const [searchValue, setSearchValue]    = useState("");
    const searchedFilteredList = filteredList && filteredList.filter(data => data.transactions.every(( x = data.transactions ) => x.type && x.type.includes(searchValue)));
    

    useEffect(() => {
        getWalletTransactions();
    }, [getWalletTransactions]);

    useEffect(() => {
        setFilteredList(parseTransactionsByDate(transactions));
    }, [transactions]);

    return (
        <Fragment>
            {(filteredList && filteredList.length > 0) ? (
                <TransactionsContainer>
                    <SearchHeader placeholder={"Search for transaction..."} title={"Transactions"} noArrow={true} handleSearch={setSearchValue}>
                        <Filter left={"true"} onClick={() => setOpenFilterOptions(!openFilterOptions)} />
                    </SearchHeader>
                    <AnimatedWrapper>
                        {(searchedFilteredList && searchedFilteredList.map((transactionsList, index) => (
                            <DropdownList
                                key={index}
                                title={transactionsList.date} 
                                subHeading={"count"} 
                                transactionList={transactionsList.transactions}
                                detailsLink={"/user/wallet_transaction_details"}
                            />
                        )))}
                        <CheckPopupDialog 
                            open={openFilterOptions}
                            title={"Filters"}
                            cancel={() => setOpenFilterOptions(!openFilterOptions)}
                            items={[
                                {
                                    Icon: AllTransactionsIcon,
                                    defaultChecked: true,
                                    title: "All transactions",
                                    click: () => {
                                        setFilteredList(filterByDate(transactions, "ALL"));
                                    }
                                }, 
                                {
                                    Icon: CreditIcon,
                                    title: "Credit",
                                    click: () => {
                                        setFilteredList(filterByDate(transactions, "CREDIT"));
                                    }
                                }, 
                                {
                                    Icon: DebitIcon,
                                    title: "Debit",
                                    click: () => {
                                        setFilteredList(filterByDate(transactions, "DEBIT"));
                                    }
                                }, 
                                {
                                    Icon: CommissionsIcon,
                                    title: "Commissions",
                                    click: () => {
                                        setFilteredList(filterByDate(transactions, "COMMISIONS"));
                                    }
                                }, 
                                {
                                    Icon: BonusesIcon,
                                    title: "Bonuses",
                                    click: () => {
                                        setFilteredList(filterByDate(transactions, "BONUSES"));
                                    }
                                }
                            ]}
                        />
                    </AnimatedWrapper>
                </TransactionsContainer>
            ) : ( 
                <Fragment>
                    <TopHeader title={"Transactions"} noArrow={true} />
                    <FragmentWrapper>
                        <PageLogo
                            Icon={NoTransactionLogo}
                            width={"184px"}
                            height={"184px"}
                            iconHeight={"auto"}
                            iconWidth={"auto"}
                            margin={"24px auto"}
                        />
                        <Title>No transactions</Title>
                        <Message
                            bottom={"24px"}
                            top={"0"}
                            align={"center"}
                        >
                            You’ve not made any transactions. Transactions you make will show here.
                        </Message>
                    </FragmentWrapper>
                </Fragment>
            )}
        <Navigation />
        </Fragment>
    );
};

TransactionPage.propTypes = {
    getWalletTransactions: func
};

export default connect(
    null, 
    { getWalletTransactions }
)(TransactionPage);