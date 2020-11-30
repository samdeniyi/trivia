import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { colors } from '../../../../styles';
import { TopHeader, PageLogo, OptionsPopupDialog } from '../../../../components';
import { formatCreationDate } from '../../../../utils/date/formatCreationDate';
import { formatPrice } from '../../../../utils/currency/formatPriceWithComma';

import { FlexCenteredBlock, ScreenContainer } from '../../../../containers/ScreenContainer';
import { TransactionAmount, TransactionStatus } from '../../../../containers/MessageContainer';
import { List, ListItem, ListSubHeading, ListHighlight } from '../../../../containers/ListContainer';
import { Options } from '../../../../containers/HeaderContainer';
import CommisionsIcon from './assets/commissions.svg';
import { ReactComponent as ShareIcon }              from '../../../../assets/share.svg';
import { ReactComponent as CommisionsCategoryIcon } from './assets/commissions.svg';
import { ReactComponent as FundWalletCategoryIcon } from './assets/wallet.svg';
import { ReactComponent as ReportIcon }             from './assets/report.svg';

const TransactionDetail = styled(ListHighlight)`
    color: ${colors.themeTextColor3};
    min-width: auto;
    max-width: 240px;
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const TransactionCategory = styled(ListSubHeading)`
    margin: 0;
`;

const TransactionListItem = styled(ListItem)`
    padding: 16px;
`;

const CategoryType = styled.div`
    position: absolute;
    top: 8px;
    right: 16px;
    display: flex;
    flex-direction: row;
    margin: 0;

    & > p {
        margin: auto 0 auto 8px;
        min-width: unset;
        max-width: unset;
        position: unset;
        right: unset;
    }
    
    & > svg {
        width: 32px;
        height: 32px;
    }
`;

const categoryIndicator = transactionType => {
    switch (transactionType) {
        case "COMMISSION": {
            return (
                <CategoryType type={transactionType}>
                    <CommisionsCategoryIcon />
                    <TransactionDetail>Commissions</TransactionDetail>
                </CategoryType>
            );
        }

        // case "CREDIT": {
        //     return (
        //         <CategoryType type={transactionType}>
        //             <FundWalletCategoryIcon />
        //             <TransactionDetail>Fund wallet</TransactionDetail>
        //         </CategoryType>
        //     );
        // }

        case "DEBIT": {
            return (
                <CategoryType type={transactionType}>
                    <FundWalletCategoryIcon />
                    <TransactionDetail>Wallet transfer</TransactionDetail>
                </CategoryType>
            )
        }

        default: {
            return null;
        }
    };
};

const TransactionDetails = ({
    location
}) => {
    const transaction = location.state;
    const [openOption, setOpenOptions] = useState(false);

    return (
        <Fragment>
            <TopHeader title={"Transaction details"}>
                <Options right={"true"} onClick={() => setOpenOptions(!openOption)} />
            </TopHeader>
            <ScreenContainer>
                <FlexCenteredBlock top={"72px"}>
                    <PageLogo
                        top={"8px"}
                        background={"transparent"}
                        width={"48px"}
                        height={"48px"}
                        iconWidth={"48px"}
                        iconHeight={"48px"}
                        Icon={CommisionsIcon}
                    />
                    <TransactionAmount type={transaction.commissionDetails && transaction.commissionDetails.status}>
                        {formatPrice(transaction.amount)}
                    </TransactionAmount>
                </FlexCenteredBlock>
                <List fullScreen>
                    <TransactionListItem>
                        <TransactionCategory>Status</TransactionCategory>
                        <ListHighlight>
                            <TransactionStatus type={transaction.commissionDetails && transaction.commissionDetails.status}>
                                {transaction.commissionDetails && transaction.commissionDetails.status}
                            </TransactionStatus>
                        </ListHighlight>
                    </TransactionListItem>
                    <TransactionListItem>
                        <TransactionCategory>Time stamp</TransactionCategory>
                        <TransactionDetail>{formatCreationDate(transaction.createdAt)}</TransactionDetail>
                    </TransactionListItem>
                    <TransactionListItem>
                        <TransactionCategory>Transaction type</TransactionCategory>
                        <TransactionDetail>{transaction.type}</TransactionDetail>
                    </TransactionListItem>
                    <TransactionListItem>
                        <TransactionCategory>Category</TransactionCategory>
                        {categoryIndicator(transaction.type)}
                    </TransactionListItem>
                    <TransactionListItem>
                        <TransactionCategory>Transaction I.D.</TransactionCategory>
                        <TransactionDetail>{transaction.id}</TransactionDetail>
                    </TransactionListItem>
                </List>
                <OptionsPopupDialog
                    open={openOption}
                    cancel={() => setOpenOptions(!openOption)}
                    title={"Options"}
                    items={[
                        {
                            Icon: ShareIcon,
                            title: "Share",
                            click: () => {
                                
                            }
                        },
                        {
                            Icon: ReportIcon,
                            title: "Report",
                            click: () => {
                                
                            }
                        }
                    ]}
                />
            </ScreenContainer>
        </Fragment>
    );
};

export default withRouter(TransactionDetails);