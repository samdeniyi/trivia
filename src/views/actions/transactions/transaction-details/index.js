import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath } from "react-router-dom";
import useRouter from "use-react-router";
import { transactionActions } from "../../../../redux/ducks/applications/transactions/actions";
import { formatCreationDate } from "../../../../utils/date/formatCreationDate";
import { formatPrice } from "../../../../utils/currency/formatPriceWithComma";
import { categoryName } from "./categoryName";

import { TopHeader, PageLogo, Loader } from "../../../../components";
// import { Options } from '../../../../containers/HeaderContainer';
import {
    ScreenContainer,
    FlexCenteredBlock
} from "../../../../containers/ScreenContainer";
import {
    List,
    ListItem,
    ListSubHeading,
    ListHighlight
} from "../../../../containers/ListContainer";
import TransactionIcon from "../assets/transactionSVG.svg";

import {
    TransactionDetail,
    SubTitle,
    TransactionValue,
    TransactionStatus
} from "../styles";

const TransactionDetails = () => {
    const { location } = useRouter();
    const { pathname } = location;
    const pattern = `(.*)?${"/actions/transactions/details/:id"}`;
    const match = matchPath(pathname, { path: pattern }) || {};
    const dispatch = useDispatch();
    const isLoading = useSelector(
        state => state.applications.transactions.isLoading
    );
    const transactionById = useSelector(
        state => state.applications.transactions.transactionById
    ) || {};

    useEffect(() => {
        dispatch(transactionActions.getTransactionDetials(match.params.id));
    }, [match.params.id, dispatch]);

    if (isLoading) {
        return <Loader />;
    } else
        return (
            <Fragment>
                <TopHeader
                    title={"Transaction details"}
                    withSpacesHeader
                    backLink={"/actions/transactions/index"}
                >
                    {/* <Options right={"16px"} onClick={() => setOpenOptions(!openOptions)} /> */}
                </TopHeader>
                <ScreenContainer top={"60px"}>
                    <FlexCenteredBlock>
                        <PageLogo
                            top={"8px"}
                            background={"transparent"}
                            width={"48px"}
                            height={"48px"}
                            iconWidth={"48px"}
                            iconHeight={"48px"}
                            Icon={TransactionIcon}
                        />
                        <SubTitle top={"8px"}>
                            {transactionById.details && transactionById.details.toLowerCase()}
                        </SubTitle>
                        <TransactionValue
                            color={
                                transactionById.status === "SUCCESS"
                                    ? "#4b8e03"
                                    : "#ffc106"
                            }
                        >
                            {(transactionById.flowType === "IN" ? "+ " : "- ") +
                                (transactionById.amount &&
                                    formatPrice(transactionById.amount))}
                        </TransactionValue>
                    </FlexCenteredBlock>
                    <List fullScreen>
                        <ListItem height={"48px"} top={"16px"}>
                            <ListSubHeading top={"0"}>Status</ListSubHeading>
                            <ListHighlight>
                                <TransactionStatus
                                    color={
                                        transactionById.status === "SUCCESS"
                                            ? "#4b8e03"
                                            : "#ffc106"
                                    }
                                >
                                    {transactionById.status &&
                                        transactionById.status.toLowerCase()}
                                </TransactionStatus>
                            </ListHighlight>
                        </ListItem>
                        <ListItem height={"48px"} top={"16px"}>
                            <ListSubHeading top={"0"}>
                                Time stamp
                            </ListSubHeading>
                            <TransactionDetail>
                                {transactionById.createdAt &&
                                    formatCreationDate(
                                        transactionById.createdAt
                                    )}
                            </TransactionDetail>
                        </ListItem>
                        <ListItem height={"48px"} top={"16px"}>
                            <ListSubHeading top={"0"}>
                                Transaction type
                            </ListSubHeading>
                            <TransactionDetail>
                                {transactionById.flowType === "IN"
                                    ? "Credit"
                                    : "Debit"}
                            </TransactionDetail>
                        </ListItem>
                        <ListItem height={"48px"} top={"16px"}>
                            <ListSubHeading top={"0"}>
                                Payment method
                            </ListSubHeading>
                            <TransactionDetail>
                                {transactionById.paymentMethod}
                            </TransactionDetail>
                        </ListItem>
                        <ListItem height={"48px"} top={"16px"}>
                            <ListSubHeading top={"0"}>Category</ListSubHeading>
                            <TransactionDetail>
                                {transactionById.category &&
                                    categoryName(transactionById.category)}
                            </TransactionDetail>
                        </ListItem>
                        <ListItem height={"48px"} top={"16px"}>
                            <ListSubHeading top={"0"}>
                                Transaction I.D.
                            </ListSubHeading>
                            <TransactionDetail>
                                {transactionById.transactionRef}
                            </TransactionDetail>
                        </ListItem>
                    </List>

                    {/* <ConfirmPopupDialog
                    open={confirmDeletionOpen}
                    title={"Are you sure you want to delete this sale?"}
                    confirmationText={"Deleting a sale will remove it from the list of sales."}
                    answers={[
                        {
                            variant: "No",
                            action: () => setConfirmDeletionOpen(!confirmDeletionOpen)
                        },
                        {
                            variant: "Yes",
                            action: () => {
                                setConfirmDeletionOpen(!confirmDeletionOpen);
                                setOpenOptions(!openOptions);
                                deleteSale(id);
                            }
                        }
                    ]}
                /> */}
                </ScreenContainer>
            </Fragment>
        );
};

export default TransactionDetails;
