import React, {Fragment, useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Form, Formik} from 'formik';
import {useSelector, connect} from 'react-redux';
import {
    cabelSubscriptionPurchase,
    getSubscriptionPlansByProviderId,
    validateCabelCustomer
} from '../../../../redux/ducks/applications/bill-payments/actions/entertainment';

import {
    TopHeader,
    PageLogo,
    RippleButton,
    PaymentConfirmation,
    InputWithLabel,
    Loader,
    SelectBox
} from '../../../../components';
import {ScreenContainer, FlexCenteredBlock} from '../../../../containers/ScreenContainer';
import {SubTitle} from '../../../../containers/MessageContainer';
import {InputBlock} from '../../../../containers/InputContainer';
import {EntertainmentPayValidationSchema} from './EntertainmentPayValidationSchema';
import ValidatePasswordModal from "../../../../components/validate-password";

const EntertainmentPay = ({
                              location,
                              cabelSubscriptionPurchase,
                              getSubscriptionPlansByProviderId,
                              validateCabelCustomer
                          }) => {
    const isLoading = useSelector(({applications}) => applications.billPayments.isLoading);
    const allPlans = useSelector(({applications}) => applications.billPayments.allProvidersItems)

    const [selectedProvider] = useState(location.state);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    //const [chosenItem, setChosenItem] = useState({});
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [transactionData, setTransactionData] = useState({});

    useEffect(() => {
        getSubscriptionPlansByProviderId(selectedProvider.billerId);
    }, [selectedProvider, getSubscriptionPlansByProviderId]);

    const selectOptions = allPlans ? allPlans.map(providerItem => (
        {value: providerItem.name, label: providerItem.name})) : [];

    return (
        isLoading ?
            <Loader/> : <>
                {openPasswordModal ?
                    <ValidatePasswordModal
                        title={"Entertainment"}
                        isLoading={isLoading}
                        setOpen={setOpenPasswordModal}
                        open={openPasswordModal}
                        next={() => cabelSubscriptionPurchase(transactionData.amount,
                            selectedProvider.billerId,
                            transactionData.paymentItemCode,
                            transactionData.decoderNumber)}/>
                    :
                    <Fragment>
                        <TopHeader title={"Entertainment"}/>
                        <ScreenContainer>
                            <FlexCenteredBlock top={"56px"}>
                                <PageLogo
                                    Icon={selectedProvider.logoUrl}
                                    width={"48px"}
                                    height={"48px"}
                                    top={"8px"}
                                />
                                <SubTitle top={"8px"}>{selectedProvider.type}</SubTitle>
                                <Formik
                                    initialValues={{
                                        subscriptionPlan: "",
                                        amount: 0,
                                        decoderNumber: "",

                                    }}
                                    validationSchema={EntertainmentPayValidationSchema}
                                    onSubmit={async (values, {setErrors}) => {
                                        const chosenItem = allPlans.find(item => item.name === values.subscriptionPlan);


                                        const customerValid = await validateCabelCustomer(
                                            selectedProvider.billerId,
                                            allPlans.find(plan => plan.name === values.subscriptionPlan).paymentItemCode,
                                            values.decoderNumber,
                                            setErrors
                                        );

                                        if (!customerValid) return;
                                        let updatedTransactionData = {
                                            ...chosenItem,
                                            amount: Number(values.amount),
                                            decoderNumber: values.decoderNumber,
                                            fullName: customerValid.fullName
                                        }

                                        setTransactionData(updatedTransactionData)
                                        setOpenConfirmation(!openConfirmation);
                                    }}
                                >
                                    {({errors, touched, setFieldValue, values, initialValues, handleChange}) => (
                                        <Form style={{width: '100%'}}>
                                            <InputBlock top={"24px"}>
                                                <SelectBox
                                                    name={"subscriptionPlan"}
                                                    placeholder={
                                                        allPlans && allPlans.length ?
                                                            "Data plans" :
                                                            "No data plans found"
                                                    }
                                                    value={values.subscriptionPlan}
                                                    options={selectOptions}
                                                    handleChange={handleChange}
                                                    valid={`${(!touched.subscriptionPlan && !errors.subscriptionPlan)}`}
                                                    error={(touched && touched.subscriptionPlan) && (errors && errors.subscriptionPlan)}
                                                />
                                                <InputWithLabel
                                                    label={"Amount"}
                                                    type={"number"}
                                                    value={values.amount}
                                                    placeholder={"Amount"}
                                                    name="amount"
                                                    inputMode={"decimal"}
                                                    valid={`${(!touched.amount && !errors.amount)}`}
                                                    errors={(touched && touched.amount) && (errors && errors.amount)}
                                                    setFieldValue={setFieldValue}
                                                    initialValues={initialValues}
                                                />
                                                <InputWithLabel
                                                    label={"Decoder Number (ICU)"}
                                                    type={"text"}
                                                    value={values.decoderNumber}
                                                    placeholder={"Decoder Number (ICU)"}
                                                    name="decoderNumber"
                                                    inputMode={"decimal"}
                                                    valid={`${(touched.decoderNumber && !errors.decoderNumber)}`}
                                                    errors={(touched && touched.decoderNumber) && (errors && errors.decoderNumber)}
                                                    setFieldValue={setFieldValue}
                                                    initialValues={initialValues}
                                                />
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
                                            {openConfirmation &&
                                            <PaymentConfirmation
                                                open={openConfirmation}
                                                close={setOpenConfirmation}
                                                confirm={setOpenPasswordModal}
                                                transactionDetails={{
                                                    fullName: transactionData.fullName,
                                                    billCategoryId: selectedProvider.billCategoryId,
                                                    customer: transactionData.decoderNumber,
                                                    amount: transactionData.amount,
                                                    subHeading: values.subscriptionPlan,
                                                    subChargeFee: selectedProvider.subChargeFee,
                                                    paymentItemCode: transactionData.paymentItemCode,
                                                    providerLogo: selectedProvider.logoUrl,
                                                    biller_name: selectedProvider.name,
                                                    billerId: selectedProvider.billerId
                                                }}
                                            />
                                            }
                                        </Form>
                                    )}
                                </Formik>
                            </FlexCenteredBlock>
                        </ScreenContainer>
                    </Fragment>
                }
            </>
    );
};

export default connect(
    null,
    {
        getSubscriptionPlansByProviderId,
        cabelSubscriptionPurchase,
        validateCabelCustomer
    }
)(withRouter(EntertainmentPay));