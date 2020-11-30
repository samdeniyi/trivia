import React, { Fragment, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { func } from 'prop-types'; 
import { switchWalletUsageMode, saveWalletFundAmount, } from '../../../redux/ducks/account/wallet/actions';
import { addBankAccount, verifyBankAccount,saveTransactionRecord } from '../../../redux/ducks/account/wallet/actions/bank-account';
import { deleteBankAccount } from '../../../redux/ducks/account/wallet/actions/bank-account';
import { Add } from '../../../containers/HeaderContainer';
import { TopHeader, PageLogo, RippleLink, RippleButton, ConfirmPopupDialog, Loader, OTPValidation } from '../../../components';
import { FlexCenteredBlock, ScreenContainer, ViewContainer } from '../../../containers/ScreenContainer';
import { List, ListItem, ListHeading, ListHighlight, ListSubHeading, ListLeftBlock } from '../../../containers/ListContainer';
import { Message, Title } from '../../../containers/MessageContainer';
import NoBankAccount from './assets/no_bank_account.svg';
import { ReactComponent as AddButtonIcon } from './assets/add_bank_account.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete.svg';
import { ReactComponent as ArrowForward } from '../../../assets/arrow.svg';
import RedirectionModal from "../account/wallet/bank-account/redirectionModal";

const AddBankAccount = styled(AddButtonIcon)`
    position: absolute;
    top: 24px;
    right: 16px;
    cursor: pointer;
`;

const WithdrawalSettings = ({
    switchWalletUsageMode,
    deleteBankAccount,
    fund,
    addBankAccount,
    verifyBankAccount,
    saveTransactionRecord
}) => {
    const selectedBankAccount = useRef(null);
    const isLoading           = useSelector(state => state.account.wallet.isLoading);
    const bankAccounts        = useSelector(state => state.account.wallet.bankAccounts);
    const usageMode           = useSelector(state => state.account.wallet.mode);
    const [openConfirmDeletion, setOpenConfirmDeletion] = useState(false);
    const [openValidateOTP, setOpenValidateOTP] = useState(false);
    const [openOverlay, setOpenOverlay] = useState(false);
    
    const handleVerifyAccount = async code => {
        verifyBankAccount(code, 'bankExisted');
        setOpenValidateOTP(!openValidateOTP);
    }

    const [redirectionLink, setRedirectionLink] = useState("");

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={(usageMode === 'payment') ? "Bank Accounts" : "Withdrawal Settings"} backAction={() => switchWalletUsageMode("manage")} backLink={"/"}>
                <Link to="/user/wallet_add_bank_account">
                    <Add right={"true"} />
                </Link>
            </TopHeader>
        
            {bankAccounts.length === 0 ? (
                <ScreenContainer>
                    <FlexCenteredBlock top={"64px"}>
                        <PageLogo
                            Icon={NoBankAccount}
                            width={"184px"}
                            height={"184px"}
                            iconHeight={"auto"}
                            iconWidth={"auto"}
                            margin={"24px auto"}
                        />
                        <Title>No bank account</Title>
                        <Message
                            bottom={"24px"}
                            top={"8px"}
                            align={"center"}
                            padding={"0 1em"}
                        >
                            You’ve not added a bank account. Add a bank account where you want your commissions and bonuses to go to.
                        </Message>
                        <RippleLink to="/user/wallet_add_bank_account" style={{ width: "calc(100% - 32px)" }}>
                            <RippleButton top={"110px"}>Add a bank account</RippleButton>
                        </RippleLink>
                    </FlexCenteredBlock>
                </ScreenContainer>
            ) : (
                <Fragment>
                    <Link to="/user/wallet_add_bank_account">
                        <AddBankAccount />
                    </Link>
                    <ViewContainer top={"0"}>
                        <List top={"64px"}>
                            {bankAccounts.map((bankAccount, index) => (
                                <ListItem 
                                    key={index}
                                    bottom={"8px"}
                                    style={{ alignItems: 'center' }}
                                    pressedUpList
                                    onClick={() => selectedBankAccount.current = bankAccounts[index]}
                                >
                                    <ListLeftBlock>
                                        <ListHeading>{bankAccount.bankAccountDTO.bankName}</ListHeading>
                                        <ListSubHeading>{bankAccount.bankAccountDTO.accountNumber}</ListSubHeading>
                                    </ListLeftBlock>
                                    <ListHighlight>
                                    {(usageMode === 'payment') ? (
                                        <ArrowForward 
                                            onClick={(e) => {
                                                selectedBankAccount.current = bankAccounts[index].bankAccountDTO;
                                                setTimeout(async () => {
                                                    const validationResult = await addBankAccount(bankAccounts[index].bankAccountDTO.accountBank, bankAccounts[index].bankAccountDTO.accountNumber);;
                                                    
                                                    if (validationResult && validationResult.status) {
                                                        if (
                                                            bankAccounts[index].bankAccountDTO.accountBank === "011" ||
                                                            bankAccounts[index].bankAccountDTO.accountBank === "058"
                                                        ) {
                                                            const transactionRecord = await saveTransactionRecord(
                                                                validationResult.txRef,
                                                                validationResult.flwRef,
                                                                validationResult.amount,
                                                                '',
                                                                ''
                                                            )
                                                            if(transactionRecord){
                                                                setRedirectionLink(
                                                                    validationResult.authurl
                                                                );
                                                                setOpenOverlay(true);
                                                            }
                                                        } else {
                                                            setOpenValidateOTP(!openValidateOTP);
                                                        }
                                                    }

                                                }, 200);
                                            }} 
                                    />
                                    ) : (
                                        <DeleteIcon onClick={() => setOpenConfirmDeletion(!openConfirmDeletion)} />
                                    )}
                                    </ListHighlight>
                                </ListItem>
                            ))}
                        </List>
                    </ViewContainer>
                    <ConfirmPopupDialog 
                        open={openConfirmDeletion}
                        title={"Are you sure you want to remove this bank account?"}
                        confirmationText={"When you remove this bank account, it will no longer appear in saved bank accounts."}
                        answers={[
                            {
                                variant: "No",
                                action: () => setOpenConfirmDeletion(!openConfirmDeletion)
                            }, 
                            {
                                variant: "Yes",
                                action: () => {
                                    deleteBankAccount(selectedBankAccount.current.bankAccountId);
                                    setOpenConfirmDeletion(!openConfirmDeletion);
                                }
                            }
                        ]}
                    />
                </Fragment>
            )}
            {openValidateOTP && (
                <OTPValidation verifyBankAccount={handleVerifyAccount} />
            )}
            { openOverlay &&<RedirectionModal
                authurl={redirectionLink}
                open={openOverlay}
                setOpen={setOpenOverlay}
            />}
        </Fragment>
    );
};

WithdrawalSettings.propTypes = {
    switchWalletUsageMode: func,
    deleteBankAccount:     func,
    saveTransactionRecord: func
};

const mapStateToProps = ({ account }) => ({
    isLoading: account.wallet.isLoading,
    cards:     account.wallet.cards,
    mode:      account.wallet.mode,
    fund:      account.wallet.fund
});

export default connect(
    mapStateToProps, 
    { 
        addBankAccount,
        switchWalletUsageMode,
        saveWalletFundAmount,
        deleteBankAccount,
        verifyBankAccount,
        saveTransactionRecord
    }
)(WithdrawalSettings);
