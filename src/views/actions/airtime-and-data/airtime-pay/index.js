import React, { Fragment, useState, useEffect } from "react";
import styled from 'styled-components';
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import { insertZero } from "../../../../utils/inputs/formatPhoneNumber";
import { selectContact, contactPickerSupport } from '../../../../utils/inputs/contactPickerSupport';
import { purchaseAirtime, getDataPlans, purchaseDataPlan } from "../../../../redux/ducks/applications/bill-payments/actions/airtime-and-data";

import { DataValidationSchema } from "./DataValidationSchema";
import { AirtimeValidationSchema } from "./AirtimeValidationSchema";
import { TopHeader, PageLogo, ChooseTab, InputWithLabel, SelectBox, RippleButton, PaymentConfirmation, Loader } from "../../../../components";
import { ScreenContainer, FlexCenteredBlock } from "../../../../containers/ScreenContainer";
import { SubTitle } from "../../../../containers/MessageContainer";
import { InputBlock } from "../../../../containers/InputContainer";
import { ReactComponent as ContactPickerIcon } from '../../../../assets/contact.svg';

const SelectPaymentType = styled.section`
    margin-top: 24px;
    width: 100%;
`;

const ContactPicker = styled.div`
    position: relative;
`;

const OpenContactList = styled(ContactPickerIcon)`
    position: absolute;
    right: 16px;
    top: 16px;
    width: 16px;
    height: 16px;
    cursor: pointer;
`;

const AirtimePay = ({
    location,
    purchaseAirtime,
    getDataPlans,
    purchaseDataPlan
}) => {
    const isLoading = useSelector(state => state.applications.billPayments.isLoading);

    const [selectedProvider]                      = useState(location.state);
    const [amount, setAmount]                     = useState(0);
    const [phoneNumber, setPhoneNumber]           = useState("");
    const [paymentType, setPaymentType]           = useState("Airtime");
    const [dataPlans, setDataPlans]               = useState([]);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    useEffect(() => {
        if (paymentType === "Data") {
            getDataPlans(selectedProvider.billerId).then(plans => {
                plans && setDataPlans(plans);
            });
        };
    }, [paymentType, getDataPlans, selectedProvider.billerId]);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            {!openConfirmation && <TopHeader title={"Airtime & Data"} />}
            <ScreenContainer>
                <FlexCenteredBlock top={"56px"}>
                    <PageLogo
                        Icon={selectedProvider.logoUrl}
                        width={"48px"}
                        height={"48px"}
                        top={"8px"}
                    />
                    <SubTitle top={"8px"}>{selectedProvider.type}</SubTitle>
                    <SelectPaymentType>
                        <ChooseTab
                            variants={[
                                {
                                    title: "Airtime",
                                    callback: () => (paymentType !== "Airtime") && setPaymentType("Airtime")
                                },
                                {
                                    title: "Data",
                                    callback: () => (paymentType !== "Data") && setPaymentType("Data")
                                }
                            ]}
                        />
                        {paymentType === "Airtime" ? (
                            <Formik
                                initialValues={{
                                    amount: 0,
                                    phoneNumber: "",
                                }}
                                validationSchema={AirtimeValidationSchema}
                                onSubmit={() => {
                                    setTimeout(() => {
                                       setOpenConfirmation(!openConfirmation);
                                    }, 200);
                                }}
                            >
                            {({ errors, touched, setFieldValue, values, initialValues }) => (
                                <Form>
                                    <InputBlock top={"24px"}>
                                        <InputWithLabel
                                            label={"Amount"}
                                            type={"text"}
                                            value={values.amount}
                                            placeholder={"Amount"}
                                            name="amount"
                                            onKeyUp={e => setAmount(Number(e.target.value))}
                                            valid={`${(!touched.amount && !errors.amount)}`}
                                            errors={(touched && touched.amount) && (errors && errors.amount)}
                                            setFieldValue={setFieldValue}
                                            initialValues={initialValues}
                                        />
                                        <ContactPicker>
                                            <InputWithLabel
                                                label={"Phone number"}
                                                type={"text"}
                                                value={values.phoneNumber}
                                                placeholder={"Phone number"}
                                                name="phoneNumber"
                                                inputMode={"tel"}
                                                onKeyUp={() => setPhoneNumber(values.phoneNumber)}
                                                noClearButton={contactPickerSupport ? true : false}
                                                valid={`${(touched.phoneNumber && !errors.phoneNumber)}`}
                                                errors={(touched && touched.phoneNumber) && (errors && errors.phoneNumber)}
                                                setFieldValue={setFieldValue}
                                                initialValues={initialValues}
                                            />
                                            {contactPickerSupport &&
                                                <OpenContactList
                                                    onClick={() => selectContact(setFieldValue, "phoneNumber")}
                                                />
                                            }
                                        </ContactPicker>
                                        <RippleButton
                                            type="submit"
                                            disabled={
                                                Object.values(values).some(value => value.length === 0) ||
                                                isLoading
                                            }
                                        >
                                            Continue
                                        </RippleButton>
                                    </InputBlock>
                                    {openConfirmation && (
                                        <PaymentConfirmation
                                            open={openConfirmation}
                                            close={setOpenConfirmation}
                                            confirm={purchaseAirtime}
                                            transactionDetails={{
                                                billCategoryId:  selectedProvider.billCategoryId,
                                                customer:        insertZero(phoneNumber),
                                                amount,
                                                paymentItemCode: null,
                                                subChargeFee:    selectedProvider.subChargeFee,
                                                providerLogo:    selectedProvider.logoUrl,
                                                biller_name:     selectedProvider.name,
                                                billerId:        selectedProvider.billerId
                                            }}
                                        />
                                    )}
                                </Form>
                            )}
                            </Formik>
                        ) : (
                            <Formik
                                initialValues={{
                                    dataPlan: '',
                                    phoneNumber: ''
                                }}
                                validationSchema={DataValidationSchema}
                                onSubmit={() => {
                                    setTimeout(() => {
                                        setOpenConfirmation(!openConfirmation);
                                    }, 200);
                                }}
                            >
                            {({ errors, touched, setFieldValue, values, initialValues, handleChange }) => (
                                <Form>
                                    <InputBlock top={"24px"}>
                                        <SelectBox
                                            name={"dataPlan"}
                                            placeholder={(dataPlans && dataPlans.length) ? "Data plans" : "No data plans found"}
                                            value={values.dataPlan}
                                            options={
                                                dataPlans && dataPlans.length ?
                                                dataPlans.map(plan => ({
                                                    value: String(plan.paymentItemCode),
                                                    label: plan.name
                                                })) : []
                                            }
                                            handleChange={handleChange}
                                            valid={`${(!touched.dataPlan && !errors.dataPlan)}`}
                                            error={(touched && touched.dataPlan) && (errors && errors.dataPlan)}
                                        />
                                        <ContactPicker>
                                            <InputWithLabel
                                                label={"Phone number"}
                                                type={"text"}
                                                value={values.phoneNumber}
                                                placeholder={"Phone number"}
                                                name="phoneNumber"
                                                noClearButton={contactPickerSupport ? true : false}
                                                valid={`${(touched.phoneNumber && !errors.phoneNumber)}`}
                                                errors={(touched && touched.phoneNumber) && (errors && errors.phoneNumber)}
                                                setFieldValue={setFieldValue}
                                                initialValues={initialValues}
                                            />
                                            {contactPickerSupport && <OpenContactList onClick={() => selectContact(setFieldValue)} />}
                                        </ContactPicker>
                                        <RippleButton
                                            type="submit"
                                            disabled={
                                                Object.values(values).some(value => value.length === 0) ||
                                                isLoading
                                            }
                                        >
                                            Continue
                                        </RippleButton>
                                    </InputBlock>
                                    {openConfirmation && (
                                        <PaymentConfirmation
                                            open={openConfirmation}
                                            close={setOpenConfirmation}
                                            confirm={purchaseDataPlan}
                                            transactionDetails={{
                                                billCategoryId:  selectedProvider.billCategoryId,
                                                customer:        insertZero(values.phoneNumber),
                                                amount:          dataPlans.find(plan => values.dataPlan === plan.name).amount,
                                                subHeading:      values.dataPlan,
                                                subChargeFee:    selectedProvider.subChargeFee,
                                                paymentItemCode: dataPlans.find(plan => plan.name === values.dataPlan).paymentItemCode,
                                                providerLogo:    selectedProvider.logoUrl,
                                                biller_name:     selectedProvider.name,
                                                billerId:        selectedProvider.billerId
                                            }}
                                        />
                                    )}
                                </Form>
                            )}
                            </Formik>
                        )}
                    </SelectPaymentType>
                </FlexCenteredBlock>
            </ScreenContainer>
        </Fragment>
    );
};

export default connect(
    null,
    {
        purchaseAirtime,
        getDataPlans,
        purchaseDataPlan
    }
)(withRouter(AirtimePay));