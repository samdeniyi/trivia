import React, { Fragment, useState, useEffect } from "react";
import {
    getAvailableBanksNoAuth,
    updateAgentBankData
} from "../../../../redux/ducks/account/wallet/actions/bank-account";
import { Formik, Form } from "formik";
import { func, string, shape, } from "prop-types";
import { connect, useSelector } from "react-redux";
import { BankAccountValidationSchema } from "./BankAccountValidationSchema";
import {
    TopHeader,
    InputWithLabel,
    RippleButton,
    SelectBank
} from "../../../../components";
import { ScreenContainer, FlexContainer } from "../../../../containers/ScreenContainer";
import { VerificationStatus } from '../../../../components/verification-status';

import {
    InputBlock,
    OpenOverlaySelectBox
} from "../../../../containers/InputContainer";
import { Message } from '../../../../containers/MessageContainer';

const KYCAgentBankData = ({ 
    getAvailableBanksNoAuth, 
    updateAgentBankData,
    defaultBankAccountData
}) => {
    const INCOMPLETE = "INCOMPLETE"
    const APPROVED = "APPROVED"

    const banks = useSelector(state => state.account.wallet.availableBanks);
    const [selectedBank, setSelectedBank] = useState(undefined);
    const [openSelectBank, setOpenSelectBank] = useState(false);
    //const agentState = useSelector(state => state.user.agentState ? state.user.agentState : "PENDING")
    const agentState = useSelector(state => state.user.defaultBankAccountData && 
        state.user.defaultBankAccountData.accountNumber ? APPROVED : INCOMPLETE)
    
    useEffect(() => {
        getAvailableBanksNoAuth();
    }, [getAvailableBanksNoAuth]);
    
    return (
        <Fragment>
            <TopHeader title={"Bank Data"} />
            <ScreenContainer>
                <Formik
                    initialValues={{
                        accountNumber: (defaultBankAccountData && defaultBankAccountData.accountNumber) || '',
                        bank: banks.find(x => x.Code === defaultBankAccountData && defaultBankAccountData.bankCode) ?
                        banks.find(x => x.Code === defaultBankAccountData && defaultBankAccountData.bankCode).Name : "",
                        bankCode: (defaultBankAccountData && defaultBankAccountData.bankCode) || '',
                        currency: (defaultBankAccountData && defaultBankAccountData.currency) || "NGN"
                    }}
                    enableReinitialize
                    validationSchema={BankAccountValidationSchema}
                    onSubmit={values => {
                        values.bankCode = banks.find(
                            x => x.Name === values.bank
                        ).Code;
                        updateAgentBankData(values)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        setFieldValue,
                        initialValues
                    }) => (
                        <Form style={{ marginTop: "16px" }}>
                            <FlexContainer top={"64px"}>
                                <Message top={"0"}>Bank account details</Message>
                                {( agentState === INCOMPLETE) && (
                                     <VerificationStatus status={agentState} />
                                )}
                            </FlexContainer>
                            <InputBlock>
                                <InputWithLabel
                                    label={"Account number"}
                                    type={"text"}
                                    value={values.accountNumber}
                                    placeholder={"Account number"}
                                    inputMode={"numeric"}
                                    name="accountNumber"
                                    maxLength = "10"
                                    disabled={agentState === APPROVED}
                                    valid={`${
                                        !touched.accountNumber &&
                                        !errors.accountNumber
                                    }`}
                                    errors={
                                        touched &&
                                        touched.accountNumber &&
                                        errors &&
                                        errors.accountNumber
                                    }
                                    clear={() => {
                                        document.querySelector(
                                            `input[name='accountNumber']`
                                        ).value = "";
                                        setFieldValue(
                                            "accountNumber",
                                            initialValues.accountNumber
                                        );
                                    }}
                                />
                                <OpenOverlaySelectBox
                                    disabled={agentState === APPROVED}
                                    onClick={() =>
                                        setOpenSelectBank(!openSelectBank)
                                    }
                                >
                                    {/* {(selectedBank && values.bank) || "Bank"} */}
                                    {values.bank || "Bank"}
                                </OpenOverlaySelectBox>
                            </InputBlock>
                            {openSelectBank && (
                                <SelectBank
                                    open={openSelectBank}
                                    setOpen={setOpenSelectBank}
                                    selectedBank={selectedBank}
                                    setSelectedBank={setSelectedBank}
                                    setFieldValue={setFieldValue}
                                    fieldName={"bank"}
                                />
                            )}
                            
                            {(agentState === INCOMPLETE) && (
                            <RippleButton
                                type="submit"
                                top={"24px"}
                                disabled={!values.bank || String(values.accountNumber).length !==10}
                            >
                                Update
                            </RippleButton>
                         )}
                        </Form>
                    )}
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

KYCAgentBankData.propTypes = {
    getAvailableBanksNoAuth: func,
    updateAgentBankData: func,
    defaultBankAccountData:    
        shape({
            accountNumber: string,
            bankCode:      string,
            currency:      string
        })                 
};

const mapStateToProps = ({ user }) => ({
    defaultBankAccountData: user.defaultBankAccountData,
});

export default connect(
    mapStateToProps, 
    {
    getAvailableBanksNoAuth,
    updateAgentBankData
})(KYCAgentBankData);
