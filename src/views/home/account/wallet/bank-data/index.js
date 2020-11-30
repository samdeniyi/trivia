import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { bool, func } from "prop-types";
import { Formik, Form } from "formik";
import { autoSign } from "../../../../../utils/inputs/autoFormat";
import { emptyValues } from "../../../../../utils/inputs/conditions";
import { sendUserBankData } from "../../../../../redux/ducks/account/wallet/actions/rave-wallet";
import { BankDataValidationSchema } from './BankDataValidationSchema';

import { ScreenContainer } from "../../../../../containers/ScreenContainer";
import { InputBlock } from "../../../../../containers/InputContainer";
import {
    Loader,
    TopHeader,
    RippleButton,
    InputWithLabel,
    ApprovedField,
    IntroductionPopup
} from "../../../../../components";
import { ReactComponent as BvnIcon } from './assets/bvn.svg';

const BankDataPage = ({
    isLoading,
    sendUserBankData,
    status
}) => {
    const [openIntroduction, setOpenIntroduction] = useState((status === "INACTIVE") ? true : false);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Bank Data"} />
            <ScreenContainer>
            {status === "ACTIVE" ?
                <ApprovedField text={"BVN successfully validated"} /> : (
                <Formik
                    initialValues={{
                        bvn: '',
                        dob: ''
                    }}
                    validationSchema={BankDataValidationSchema}
                    onSubmit={(values) => {
                        setTimeout(() => {
                            sendUserBankData({
                                bvn: values.bvn,
                                dob: values.dob.split('/').reverse().join('-')
                            });
                        }, 200);
                    }}
                >
                    {({ errors, touched, setFieldValue, initialValues, values }) => (
                        <Form style={{ marginTop: "64px"}}>
                            <InputBlock>
                                <InputWithLabel
                                    label={"BVN"}
                                    type={"text"}
                                    value={values.bvn}
                                    placeholder={"BVN"}
                                    name="bvn"
                                    valid={`${(!touched.bvn && !errors.bvn)}`}
                                    errors={(touched && touched.bvn) && (errors && errors.bvn)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                    maxLength={11}
                                />
                                <InputWithLabel
                                    label={"Date of birth"}
                                    type={"text"}
                                    value={values.dob}
                                    placeholder={"DD/MM/YYYY"}
                                    name={"dob"}
                                    onKeyUp={(event) => {
                                        if (event.which !== 8) {
                                            event.target.value = autoSign('/', event.target.value, 8);

                                            if (event.target.value.length >= 9) {
                                                event.target.value = event.target.value.slice(0, 10);
                                            };
                                        };
                                    }}
                                    valid={`${(touched.dob && !errors.dob)}`}
                                    errors={(touched && touched.dob) && (errors && errors.dob)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                            </InputBlock>
                            <RippleButton
                                type="submit"
                                top={"24px"}
                                disabled={!emptyValues(values) && emptyValues(errors)}
                            >
                                Validate
                            </RippleButton>
                        </Form>
                    )}
                </Formik>
            )}
            <IntroductionPopup
                open={openIntroduction}
                cancel={() => setOpenIntroduction(!openIntroduction)}
                title={"Why we need your BVN?"}
                Logo={BvnIcon}
                logoSpacing={"48px 0"}
                message={"You need to provide your BVN and date of birth to activate your wallet for payment and transactions."}
                underlinedContent={"Your BVN does not give us access to your bank accounts or transactions."}
            />
            </ScreenContainer>
        </Fragment>
    );
};

BankDataPage.propTypes = {
    isLoading:        bool,
    sendUserBankData: func
};

const mapStateToProps = ({ account }) => ({
    isLoading: account.wallet.isLoading,
    status:    account.wallet.status
});

export default connect(
    mapStateToProps,
    { sendUserBankData }
)(BankDataPage);