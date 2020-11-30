import React, { Fragment, useState, useEffect } from "react";
import {
    getAvailableBanksNoAuth,
    AddBankDetailsOnRegistration
} from "../../../../../redux/ducks/account/wallet/actions/bank-account";
import { Formik, Form } from "formik";
import { func } from "prop-types";
import { connect, useSelector } from "react-redux";
import { BankAccountValidationSchema } from "./BankAccountValidationSchema";
import {
    TopHeader,
    InputWithLabel,
    PageProgress,
    RippleButton,
    PageLogo,
    SelectBank
} from "../../../../../components";
import { ScreenContainer } from "../../../../../containers/ScreenContainer";
import {
    InputBlock,
    OpenOverlaySelectBox
} from "../../../../../containers/InputContainer";


import AgentBankAccountIcon from "../../../../../assets/bank.svg";

const AgentBankAccount = ({ getAvailableBanksNoAuth, AddBankDetailsOnRegistration }) => {
    const banks = useSelector(state => state.account.wallet.availableBanks);
    const [selectedBank, setSelectedBank] = useState(undefined);
    const [openSelectBank, setOpenSelectBank] = useState(false);
    const firstName = useSelector(state => state.user.firstName);
    const lastName = useSelector(state => state.user.lastName);

    useEffect(() => {
        getAvailableBanksNoAuth();
    }, [getAvailableBanksNoAuth]);

    return (
        <Fragment>
            <TopHeader title={"Bank Account"} />
            <ScreenContainer>
                <PageLogo top={"64px"} Icon={AgentBankAccountIcon} />
                <PageProgress step={4} amount={6}></PageProgress>
                <Formik
                    initialValues={{
                        accountNumber: "",
                        bankName: "",
                        bankCode: "",
                        currency: "NGN"
                    }}
                    validationSchema={BankAccountValidationSchema}
                    onSubmit={values => {
                        values.bankCode = banks.find(
                            x => x.Name === values.bankName
                        ).Code;
                        values.accountOwnerName = firstName +" "+ lastName;
                        AddBankDetailsOnRegistration(values)
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
                                    maxLength = "10"
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
                                    onKeyPress={(event) => {
                                        if(event.charCode < 48 || event.charCode > 57) {
                                            event.preventDefault();
                                        };
                                    }}
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
                                    {(selectedBank && values.bankName) || "Bank"}
                                </OpenOverlaySelectBox>
                            </InputBlock>
                            {openSelectBank && (
                                <SelectBank
                                    open={openSelectBank}
                                    setOpen={setOpenSelectBank}
                                    selectedBank={selectedBank}
                                    setSelectedBank={setSelectedBank}
                                    setFieldValue={setFieldValue}
                                    fieldName={"bankName"}
                                />
                            )}
                            <RippleButton
                                type="submit"
                                top={"24px"}
                                disabled={!values.bankName || String(values.accountNumber).length !==10}
                            >
                                Continue
                            </RippleButton>
                        </Form>
                    )}
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

AgentBankAccount.propTypes = {
    getAvailableBanksNoAuth: func,
    AddBankDetailsOnRegistration: func
};

export default connect(null, {
    getAvailableBanksNoAuth,
    AddBankDetailsOnRegistration
})(AgentBankAccount);
