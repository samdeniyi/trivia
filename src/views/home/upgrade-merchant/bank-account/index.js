import React, { Fragment, useState, useEffect } from "react";
import {
    getAvailableBanksNoAuth,
    AddBankDetailsOnUpgrade
} from "../../../../redux/ducks/account/wallet/actions/bank-account";
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
} from "../../../../components";
import { ScreenContainer } from "../../../../containers/ScreenContainer";
import {
    InputBlock,
    OpenOverlaySelectBox
} from "../../../../containers/InputContainer";
import { Message } from '../../../../containers/MessageContainer';
import AgentBankAccountIcon from "../../../../assets/bank.svg";

const UMAgentBankAccount = ({ getAvailableBanksNoAuth, AddBankDetailsOnUpgrade }) => {
    const banks = useSelector(state => state.account.wallet.availableBanks);
    const [selectedBank, setSelectedBank] = useState(undefined);
    const [openSelectBank, setOpenSelectBank] = useState(false);
    
    useEffect(() => {
        getAvailableBanksNoAuth();
    }, [getAvailableBanksNoAuth]);

    return (
        <Fragment>
            <TopHeader title={"Bank Account"} />
            <ScreenContainer>
                <PageLogo top={"64px"} Icon={AgentBankAccountIcon} />
                <PageProgress step={3} amount={4}></PageProgress>
                <Message align={"left"}>Please provide your bank account details.</Message>
                <Formik
                    initialValues={{
                        accountNumber: "",
                        bank: "",
                        bankCode: "",
                        currency: "NGN"
                    }}
                    validationSchema={BankAccountValidationSchema}
                    onSubmit={values => {
                        values.bankCode = banks.find(
                            x => x.Name === values.bank
                        ).Code;
                        AddBankDetailsOnUpgrade(values)
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
                            <InputBlock>
                                <InputWithLabel
                                    label={"Account number"}
                                    type={"text"}
                                    value={values.accountNumber}
                                    placeholder={"Account number"}
                                    inputMode={"numeric"}
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
                                    {(selectedBank && values.bank) || "Bank"}
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
                            <RippleButton
                                type="submit"
                                top={"24px"}
                                disabled={!values.bank || String(values.accountNumber).length !==10}
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

UMAgentBankAccount.propTypes = {
    getAvailableBanksNoAuth: func,
    AddBankDetailsOnUpgrade: func
};

export default connect(null, {
    getAvailableBanksNoAuth,
    AddBankDetailsOnUpgrade
})(UMAgentBankAccount);
