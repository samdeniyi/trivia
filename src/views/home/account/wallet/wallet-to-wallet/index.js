import React, { Fragment, useState } from "react";
import { Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { WalletToWalletTransfer } from '../../../../../redux/ducks/account/wallet/actions';
import { ScreenContainer } from "../../../../../containers/ScreenContainer";
import { InputBlock } from "../../../../../containers/InputContainer";
import {
    RippleButton,
    InputWithLabel,
    TopHeader,
    Loader,
    TextareaWithLabel
} from "../../../../../components";
import ValidatePasswordModal from "../../../../../components/validate-password";


import { WalletToWalletValidationSchema } from "./WalletToWalletValidationSchema";

const WalletToWallet = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.account.wallet.isLoading);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [transactionData, setTransactionData] = useState({});


    return isLoading ? (
        <Loader />
    ) : (
        <>
           {openPasswordModal ?
                    <ValidatePasswordModal
                        isLoading={isLoading}
                        setOpen={setOpenPasswordModal}
                        open={openPasswordModal}
                        next={() => dispatch(WalletToWalletTransfer(transactionData))}
                            />
                    :
        <Fragment>
            <TopHeader title={"Wallet to Wallet Transfer"} />
            <ScreenContainer>
                <Formik
                    initialValues={{
                        phoneNumber: "",
                        amount: "",
                        narration: ""
                    }}
                    validationSchema={WalletToWalletValidationSchema}
                    onSubmit={values => {
                        setTimeout(() => {
                            setTransactionData(values)
                            setOpenPasswordModal(true);
                            // dispatch(WalletToWalletTransfer(values))
                        }, 400);
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
                                    label={"Phone Number"}
                                    type={"text"}
                                    value={values.phoneNumber}
                                    placeholder={"Phone Number"}
                                    inputMode={"tel"}
                                    onKeyUp={e => e.target.value =  e.target.value.replace(/\s/g, '')}
                                    name="phoneNumber"
                                    valid={`${
                                        !touched.phoneNumber &&
                                        !errors.phoneNumber
                                    }`}
                                    errors={
                                        touched &&
                                        touched.phoneNumber &&
                                        errors &&
                                        errors.phoneNumber
                                    }
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <InputWithLabel
                                    label={"Amount"}
                                    type={"number"}
                                    // onBlur={e =>
                                    //     (e.target.value = formatPrice(
                                    //         values.amount
                                    //     ))
                                    // }
                                    onKeyUp={e =>
                                        (e.target.value = e.target.value.replace(
                                            /\s/g,
                                            ""
                                        ))
                                    }
                                    onFocus={e =>
                                        (e.target.value = values.amount)
                                    }
                                    placeholder={"Amount"}
                                    inputMode={"numeric"}
                                    name="amount"
                                    value={values.amount}
                                    valid={`${
                                        !touched.amount && !errors.amount
                                    }`}
                                    errors={
                                        touched &&
                                        touched.amount &&
                                        errors &&
                                        errors.amount
                                    }
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />

                                <TextareaWithLabel
                                    name={"narration"}
                                    value={values.narration}
                                    placeholder={
                                        "Enter the narration for this transfer"
                                    }
                                    height={"96px"}
                                    valid={`${
                                        !touched.narration && !errors.narration
                                    }`}
                                    errors={
                                        touched &&
                                        touched.narration &&
                                        errors &&
                                        errors.narration
                                    }
                                />
                            </InputBlock>
                            <RippleButton
                                type="submit"
                                top={"24px"}
                                disabled={!values.amount || !values.phoneNumber}
                            >
                                Send
                            </RippleButton>
                        </Form>
                    )}
                </Formik>
            </ScreenContainer>
        </Fragment>}
        </>
    );
};

export default WalletToWallet;
