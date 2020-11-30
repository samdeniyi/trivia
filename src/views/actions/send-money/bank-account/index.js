import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { bool, func } from 'prop-types';
import {
    Loader,
    InputWithLabel, 
    TopHeader,
    RippleButton,
    TransferConfirmation,
    PageLogo,
    SwitchTrigger,
    SelectBank,
} from '../../../../components';
import { Message, SubTitle, Error } from '../../../../containers/MessageContainer';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import { OptionName } from '../../../../containers/MenuContainer';
import { ReactComponent as TimeIcon } from './assets/time_management.svg';
import uniqBy from 'lodash.uniqby';
import { InputBlock, OpenOverlaySelectBox } from '../../../../containers/InputContainer';
import { validateBankAccount, transferFromWalletToBankAccount, saveBeneficiary } from '../../../../redux/ducks/account/wallet/actions/bank-account';
import { BankAccountValidationSchema } from './BankAccountValidationSchema';

const SubtitleWithIcon = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

const MostRecentBlock = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    overflow-x: auto;
    margin-bottom: 20px;
`;

const MostRecentPersonWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin: 20px;
`;

const NameText = styled.p`
    font-size: 10px;
    color: #56636d;
    margin: 0;
    margin-top: 2px;
`;

const OptionWithSwitch = styled.div`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;

const SendToBankAccount = ({ 
    isLoading, 
    transferFromWalletToBankAccount,
    validateBankAccount,
    saveBeneficiary,
}) => {    
    const [openSelectBank, setOpenSelectBank] = useState(false);
    const [selectedBank, setSelectedBank]     = useState(undefined);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [addBeneficiary, setAddBeneficiary] = useState(false);
    const amount = useSelector(state => state.account.wallet.transfer.amount);
    const recipients = useSelector(state => state.account.wallet.recipients);
    const filteredCustomers = uniqBy(recipients, 'id');
    const fromBeneficiaryLine = useSelector(state => state.account.wallet.personForTransfer);
    
    useEffect(() => {
        if (fromBeneficiaryLine && !openConfirmation) setSelectedBank(fromBeneficiaryLine.bank_code);
    }, [fromBeneficiaryLine, openConfirmation]);

    return (
        isLoading ?
        <Loader /> 
        : (<Fragment>
            <TopHeader title={"Bank Account"} />
            <ScreenContainer top={"80px"}>
                <SubtitleWithIcon>
                    <TimeIcon style={{marginRight: '10px'}} />
                    <SubTitle>Most recent</SubTitle>
                </SubtitleWithIcon>
                <MostRecentBlock>
                    {filteredCustomers.map((person, index) => (
                        <MostRecentPersonWrapper key={index}>
                            <PageLogo 
                                width={"32px"}
                                height={"32px"}
                                iconWidth={"32px"}
                                iconHeight={"32px"}
                                Icon={person.first_name}
                                margin={"0 0 5px 0"}
                            />
                            <NameText>{person.first_name}</NameText>
                            <NameText>{person.last_name}</NameText>
                        </MostRecentPersonWrapper>
                    ))}
                </MostRecentBlock>
                <Message bottom={"24px"} top={"8px"}>Please fill in the recipient’s details</Message>
                <Formik
                    initialValues={{
                        name: (fromBeneficiaryLine && fromBeneficiaryLine.bank_name) || "",
                        accountNumber: (fromBeneficiaryLine && fromBeneficiaryLine.account_number) || "",
                    }}
                    validationSchema={BankAccountValidationSchema}
                    onSubmit={(values) => {
                        setTimeout(() => {
                            if (addBeneficiary) saveBeneficiary(selectedBank, values.accountNumber);
                            validateBankAccount(selectedBank, values.accountNumber)
                                .then(() => setOpenConfirmation(!openConfirmation));
                        }, 1000);
                    }}
                >
                    {({ touched, values, errors, initialValues, setFieldValue, handleBlur }) => (
                        <Form>
                            <InputBlock>
                                <OpenOverlaySelectBox onClick={() => setOpenSelectBank(!openSelectBank)}>
                                    {values.name || "Bank"}
                                </OpenOverlaySelectBox>
                                <InputWithLabel
                                    label={"Account Number"}
                                    type={"text"}
                                    noClearButton
                                    value={values.accountNumber}
                                    placeholder={"Account Number"}
                                    name={"accountNumber"}
                                    valid={`${!(touched && touched.accountNumber) && !(errors && errors.accountNumber)}`}
                                    errors={(touched && touched.accountNumber) && (errors && errors.accountNumber)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                {(errors && errors.name) && <Error>{errors.name}</Error>}
                            </InputBlock>
                            {openSelectBank && (
                                <SelectBank
                                    open={openSelectBank}
                                    setOpen={setOpenSelectBank}
                                    selectedBank={selectedBank}
                                    setSelectedBank={setSelectedBank}
                                    setFieldValue={setFieldValue}
                                    fieldName={"name"}
                                /> 
                            )}
                            <InputWithLabel
                                label="What is this money for?"
                                placeholder="What is this money for?" 
                                name="whatFor" 
                                type="text"
                                inputMode={"text"}
                                autoComplete={'no'}                  
                                errors={(touched && touched.phoneNumber) && (errors && errors.phoneNumber)}
                                valid={`${(touched.phoneNumber && !errors.phoneNumber)}`}
                                setFieldValue={setFieldValue}
                                initialValues={initialValues}
                                top={'16px'}
                            />
                            <OptionWithSwitch>
                                <OptionName>Add to beneficiaries</OptionName>
                                <SwitchTrigger checkStatus={addBeneficiary} switchStatus={setAddBeneficiary} top={"0"} />
                            </OptionWithSwitch>
                            <RippleButton 
                                type="submit"
                                // disabled={}
                            >
                                Continue
                            </RippleButton>
                            {openConfirmation && 
                                <TransferConfirmation
                                    isLoading={isLoading}
                                    open={openConfirmation}
                                    close={setOpenConfirmation}
                                    confirm={transferFromWalletToBankAccount}
                                    transactionDetails={{
                                        message:        values.whatFor,
                                        amount:         amount,
                                        bank_name:      values.name,
                                        accountNumber:  values.accountNumber,
                                        accountBank:    selectedBank,
                                    }}
                                />
                            }
                        </Form>
                    )}
                </Formik>
            </ScreenContainer>
        </Fragment>
        )
    );
};

SendToBankAccount.propTypes = {
    isLoading:     bool,
    saveWalletTransferData: func,
    findCustomerOnRave: func,
    transferFromWalletToBankAccount: func, 
    saveLastTransferedRecipient: func, 
};

const mapStateToProps = ({ account }) => ({
	isLoading: account.wallet.isLoading
});

export default connect(
    mapStateToProps,
    { 
        transferFromWalletToBankAccount,
        validateBankAccount,
        saveBeneficiary,
    }
)(withRouter(SendToBankAccount));