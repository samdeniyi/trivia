import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { string, array, bool } from 'prop-types';
import { colors } from '../../styles';
import { formatCreationDate } from '../../utils/date/formatCreationDate';
import { formatPrice } from '../../utils/currency/formatPriceWithComma';
import { countAmount } from '../../utils/currency/countAmount';
import { parseTextCountRender } from '../../utils/inputs/parseTextCountRender';

import { RippleLink } from '../button';
import { List, ListItem, ListHeading, ListSubHeading, ListHighlight, ListLeftBlock } from '../../containers/ListContainer';
import { SubTitle, SecondaryText } from '../../containers/MessageContainer';
import { ReactComponent as UpwardsIcon } from './assets/upward.svg';
import { ReactComponent as PendingIcon } from '../../assets/pending.svg';
import { ReactComponent as DownwardsIcon } from './assets/down.svg';

const DropdownBodyIncative = styled.div`
    position: relative;
    margin: 24px 16px;
    padding: 16px;
    height: 73px;
    border-radius: 13px;
    border: 1px solid ${colors.gray3};
`;

const DropdownBodyActive = styled.div`
    position: relative;
    margin: 24px 0 54px 0;
`;

const DropdownTitle = styled(SubTitle)`
    color: ${colors.themeTextColor3};
    text-transform: uppercase;
`;

const DropdownTitleActive = styled(DropdownTitle)`
    padding: 0 16px;
    margin: 16px 0;
`;

const TransactionsCount = styled(SecondaryText)`
    margin: 5px 0 0 0;
`;

const CollapseIcon = styled(UpwardsIcon)`
    position: absolute;
    top: 0;
    right: 24px;
    cursor: pointer;
`;

const ShowIcon = styled(DownwardsIcon)`
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
`;

const PendingStatus = styled(PendingIcon)`
    position: absolute;
    right: 16px;
    bottom: 8px;
`;

const DropdownContainer = styled.div`
    margin-top: ${({ top }) => top || null};
`;

export const DropdownList = ({
    title,
    top,
    transactionList,
    subHeading,
    detailsLink,
    customList = false,
    children,
    index
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (index === 0) setOpen(true);
    }, [setOpen, index])

    return (
        <DropdownContainer top={top}>
            {!open ? (
                <DropdownBodyIncative onClick={() => setOpen(!open)}>
                    <DropdownTitle>{title}</DropdownTitle>
                    {subHeading === "amount" ?
                        <TransactionsCount>{countAmount(transactionList, "amount")}</TransactionsCount> :
                        <TransactionsCount>{parseTextCountRender(transactionList.length, "Transaction")}</TransactionsCount>
                    }
                    <ShowIcon />
                </DropdownBodyIncative>
            ) : (
                <DropdownBodyActive>
                    <DropdownTitleActive onClick={() => setOpen(!open)}>{title}</DropdownTitleActive>
                    <CollapseIcon />
                    {(customList === false) ? (
                        <List>
                        {transactionList && transactionList.map((transaction, index) => (
                            <Fragment key={index}>
                            {detailsLink ? (
                                <RippleLink to={{ pathname: detailsLink, state: transaction }}>
                                    <ListItem style={{ paddingBottom: '8px' }}>
                                        <ListLeftBlock>
                                            <ListHeading>{transaction.type}</ListHeading>
                                            <ListSubHeading>{formatCreationDate(transaction.createdAt)}</ListSubHeading>
                                        </ListLeftBlock>
                                        <ListHighlight>{`${formatPrice(transaction.amount)}`}</ListHighlight>
                                        {transaction.commissionDetails && transaction.commissionDetails.status === "PENDING" ? <PendingStatus /> : null}
                                    </ListItem>
                                </RippleLink>
                            ) : (
                                <ListItem>
                                    <ListLeftBlock>
                                        <ListHeading>{transaction.details}</ListHeading>
                                        <ListSubHeading>{formatCreationDate(transaction.createdAt)}</ListSubHeading>
                                    </ListLeftBlock>
                                    {/* <ListHighlight>{`${formatPrice(transaction.amount)}`}</ListHighlight> */}
                                    {transaction.commissionDetails && transaction.commissionDetails.status === "PENDING" ? <PendingStatus /> : null}
                                </ListItem>
                            )}
                            </Fragment>
                        ))}
                    </List>
                ) : (
                    <Fragment>{children}</Fragment>
                )}
            </DropdownBodyActive>
        )}
        </DropdownContainer>
    );
};

DropdownList.propTypes = {
    transactionList: array,
    title:           string,
    subHeading:      string,
    customList:      bool,
    detailsLink:     string
};