import React, { Fragment, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { func } from "prop-types";
import { connect, useSelector } from "react-redux";
import {
    getAvailableBanks,
    addBankAccount,
    verifyBankAccount,
    saveTransactionRecord,
    sendBankAccount
} from "../../../../../redux/ducks/account/wallet/actions/bank-account";

import { OTPValidationSchema } from "./OTPValidationSchema";
import { BankAccountValidationSchema } from "./BankAccountValidationSchema";
import {
    TopHeader,
    InputWithLabel,
    RippleButton,
    Loader,
    SelectBank
} from "../../../../../components";
import { ScreenContainer } from "../../../../../containers/ScreenContainer";
import {
    InputBlock,
    OpenOverlaySelectBox
} from "../../../../../containers/InputContainer";
import { Message } from "../../../../../containers/MessageContainer";

import RedirectionModal from "./redirectionModal";

const AddBankAccount = ({
    getAvailableBanks,
    addBankAccount,
    verifyBankAccount,
    saveTransactionRecord,
    sendBankAccount
}) => {
    const isLoading = useSelector(state => state.account.wallet.isLoading);
    // const [value, setValue] = useState(null);
    const [selectedBank, setSelectedBank] = useState(undefined);
    const [openValidateOTP, setOpenValidateOTP] = useState(false);
    const [openSelectBank, setOpenSelectBank] = useState(false);
    const [openOverlay, setOpenOverlay] = useState(false);
    const [redirectionLink, setRedirectionLink] = useState("");

    useEffect(() => {
        setOpenSelectBank(false);
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <Fragment>
            {!openValidateOTP && <TopHeader title={"Add A Bank Account"} />}
            {!openValidateOTP && (
                <ScreenContainer>
                    <Formik
                        initialValues={{
                            accountNumber: "",
                            bank: ""
                        }}
                        validationSchema={BankAccountValidationSchema}
                        onSubmit={values => {
                            setTimeout(async () => {
                                const validationResult = await addBankAccount(
                                    selectedBank,
                                    values.accountNumber
                                );

                                if (validationResult && validationResult.status) {
                                    if (
                                        selectedBank === "011" ||
                                        selectedBank === "058"
                                    ) {
                                        // sendBankAccount(validationResult.bankAccountDTO)
                                        const transactionRecord = await saveTransactionRecord(
                                            validationResult.txRef,
                                            validationResult.flwRef,
                                            validationResult.amount,
                                            selectedBank,
                                            values.accountNumber
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
                    >
                        {({
                            values,
                            errors,
                            touched,
                            setFieldValue,
                            initialValues
                        }) => (
                            <Form style={{ marginTop: "64px" }}>
                                <InputBlock>
                                    <InputWithLabel
                                        label={"Account number"}
                                        type={"text"}
                                        value={values.accountNumber}
                                        placeholder={"Account number"}
                                        name="accountNumber"
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
                                        onClick={() =>
                                            setOpenSelectBank(!openSelectBank)
                                        }
                                    >
                                        {(selectedBank && values.bank) ||
                                            "Bank"}
                                    </OpenOverlaySelectBox>
                                </InputBlock>
                                {openSelectBank && (
                                    <SelectBank
                                        open={openSelectBank}
                                        setOpen={setOpenSelectBank}
                                        selectedBank={
                                            selectedBank && selectedBank.Name
                                        }
                                        setSelectedBank={setSelectedBank}
                                        getAvailableBanks={getAvailableBanks}
                                        setFieldValue={setFieldValue}
                                        fieldName={"bank"}
                                    />
                                )}
                                <RippleButton
                                    type="submit"
                                    top={"24px"}
                                    disabled={isLoading}
                                >
                                    Continue
                                </RippleButton>
                            </Form>
                        )}
                    </Formik>
                </ScreenContainer>
            )}

            {openValidateOTP && <TopHeader title={"Enter OTP"} />}

            <ScreenContainer>
                {openValidateOTP && (
                    <Fragment>
                        <Message align={"center"} bottom={"24px"} style={{ marginTop: "30px" }}>
                            Enter the OTP code sent to number associated with
                            this bank account
                        </Message>
                        <Formik
                            initialValues={{
                                code: ""
                            }}
                            validationSchema={OTPValidationSchema}
                            onSubmit={values => {
                                setTimeout(() => {
                                    verifyBankAccount(values.code);
                                }, 1000);
                            }}
                        >
                            {({
                                errors,
                                values,
                                valid,
                                touched,
                                initialValues,
                                setFieldValue
                            }) => (
                                <Form>
                                    <InputWithLabel
                                        label={"Token"}
                                        type={"number"}
                                        value={values.code}
                                        name={"code"}
                                        placeholder={"Token"}
                                        valid={`${
                                            !touched.code && !errors.code
                                        }`}
                                        errors={
                                            touched &&
                                            touched.code &&
                                            errors &&
                                            errors.code
                                        }
                                        setFieldValue={setFieldValue}
                                        initialValues={initialValues}
                                    />

                                    <RippleButton
                                        type="submit"
                                        disabled={
                                            values.code.length < 5 || isLoading
                                        }
                                    >
                                        Check
                                    </RippleButton>
                                </Form>
                            )}
                        </Formik>
                    </Fragment>
                )}
            </ScreenContainer>
           { openOverlay &&<RedirectionModal
                authurl={redirectionLink}
                open={openOverlay}
                setOpen={setOpenOverlay}
            />}
        </Fragment>
    );
};

AddBankAccount.propTypes = {
    getAvailableBanks: func,
    addBankAccount: func,
    verifyBankAccount: func,
    saveTransactionRecord: func,
    sendBankAccount: func
};

export default connect(null, {
    getAvailableBanks,
    addBankAccount,
    verifyBankAccount,
    saveTransactionRecord,
    sendBankAccount
})(AddBankAccount);
