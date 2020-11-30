import {Form, Formik} from 'formik';
import React, {Fragment, useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
    InputWithLabel,
    Loader,
    PageLogo,
    PaymentConfirmation,
    RippleButton,
    SelectBox,
    TopHeader
} from '../../../../components';
import {InputBlock} from '../../../../containers/InputContainer';
import {SubTitle} from '../../../../containers/MessageContainer';
import {FlexCenteredBlock, ScreenContainer} from '../../../../containers/ScreenContainer';
import {
    utilityPayment,
    validateUtilityCustomer,
    getUtilitiesProvidersItems
} from '../../../../redux/ducks/applications/bill-payments/actions/utility-services';
import {WaterPayValidationSchema} from './WaterPayValidationSchema';
import ValidatePasswordModal from "../../../../components/validate-password";

const WaterPay = ({
                      location,
                      validateUtilityCustomer,
                      getUtilitiesProvidersItems,
                      utilityPayment
                  }) => {
    const isLoading = useSelector(({applications}) => applications.billPayments.isLoading);
    const allProvidersItems = useSelector(({applications}) => applications.billPayments.allProvidersItems);
    const [selectedProvider] = useState(location.state);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [transactionData, setTransactionData] = useState({});
    const [openPasswordModal, setOpenPasswordModal] = useState(false);

    useEffect(() => {
        getUtilitiesProvidersItems(selectedProvider.billerId);
    }, [getUtilitiesProvidersItems, selectedProvider]);

    const selectOptions = allProvidersItems ? allProvidersItems.map(providerItem => (
        {value: providerItem.name, label: providerItem.name})) : [];
    return (
        isLoading ?
            <Loader/> : <>
                {openPasswordModal ?
                    <ValidatePasswordModal
                        isLoading={isLoading}
                        setOpen={setOpenPasswordModal}
                        open={openPasswordModal}
                        next={() => utilityPayment(transactionData.amount,
                            selectedProvider.billerId,
                            transactionData.paymentItemCode,
                            transactionData.meterNumber)}
                            />
                    :
                    <Fragment>
                        <TopHeader title={"Water Bill"}/>
                        <ScreenContainer>
                            <FlexCenteredBlock top={"56px"}>
                                <PageLogo
                                    Icon={selectedProvider.logoUrl}
                                    width={"48px"}
                                    height={"48px"}
                                    top={"8px"}
                                />
                                <SubTitle top={"8px"}>{selectedProvider.name}</SubTitle>
                                <Formik
                                    initialValues={{
                                        amount: 0,
                                        meterNumber: "",
                                        paymentName: ""
                                    }}
                                    validationSchema={WaterPayValidationSchema}
                                    onSubmit={async (values, {setErrors}) => {
                                        const chosenItem = allProvidersItems.find(item => item.name === values.paymentName);

                                        const validCustomer = await validateUtilityCustomer(
                                            selectedProvider.billerId,
                                            chosenItem.paymentItemCode,
                                            values.meterNumber,
                                            setErrors
                                        );

                                        if (!validCustomer) return
                                        let updatedTransactionData = {
                                            ...chosenItem,
                                            meterNumber: values.meterNumber,
                                            amount: values.amount,
                                            fullName: validCustomer.fullName
                                        }
                                        setTransactionData(updatedTransactionData)
                                        setOpenConfirmation(!openConfirmation);
                                    }}
                                >
                                    {({errors, touched, handleChange, setFieldValue, values, initialValues}) => (
                                        <Form style={{width: '100%'}}>
                                            <InputBlock top={"24px"}>
                                                <SelectBox
                                                    name={"paymentName"}
                                                    setSelectedValue={setFieldValue}
                                                    placeholder={"Choose payment type"}
                                                    options={selectOptions}
                                                    value={values.paymentName}
                                                    handleChange={handleChange}
                                                    valid={`${(!touched.paymentName && !errors.paymentName)}`}
                                                    initialValues={initialValues}
                                                    error={(touched && touched.paymentName) && (errors && errors.paymentName)}
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
                                                    label={"Meter number"}
                                                    type={"text"}
                                                    value={values.meterNumber}
                                                    placeholder={"Meter number"}
                                                    name="meterNumber"
                                                    inputMode={"decimal"}
                                                    valid={`${(touched.meterNumber && !errors.meterNumber)}`}
                                                    errors={(touched && touched.meterNumber) && (errors && errors.meterNumber)}
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
                                                    customer: transactionData.meterNumber,
                                                    amount: Number(transactionData.amount),
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
        validateUtilityCustomer,
        utilityPayment,
        getUtilitiesProvidersItems
    }
)(withRouter(WaterPay));