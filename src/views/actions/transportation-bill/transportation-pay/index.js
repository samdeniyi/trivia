import React, { Fragment, useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { emptyValues } from '../../../../utils/inputs/conditions';
import { validateBillPayment, createBillPayment } from '../../../../redux/ducks/applications/bill-payments/actions';
import { formatPrice } from '../../../../utils/currency/formatPriceWithComma';

import { TopHeader, PageLogo, RippleButton, PaymentConfirmation, InputWithLabel, Loader } from '../../../../components';
import { ScreenContainer, FlexCenteredBlock } from '../../../../containers/ScreenContainer';
import { SubTitle } from '../../../../containers/MessageContainer';
import { InputBlock } from '../../../../containers/InputContainer';
import { TransportationBillValidationSchema } from './TransportationBillValidationSchema';

const TransportationPay = ({
    location,
    validateBillPayment
}) => {
    const selectedProvider = useRef(location.state);
    const lccNumber        = useRef(undefined);
    const amount           = useRef(undefined);
    const isLoading        = useSelector(state => state.applications.billPayments.isLoading);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Transportation Bill"} />
            <ScreenContainer>
                <FlexCenteredBlock top={"72px"}>
                    <PageLogo
                        Icon={selectedProvider.current.logo}
                        width={"48px"}
                        height={"48px"}
                        top={"8px"}
                    />
                    <SubTitle top={"8px"}>{selectedProvider.current.type}</SubTitle>
                    <Formik
                        initialValues={{
                            amount: 0,
                            lccNumber: "",
                        }}
                        validationSchema={TransportationBillValidationSchema}
                        onSubmit={(values) => {
                            setTimeout(async () => {
                                amount.current    = values.amount;
                                lccNumber.current = values.lccNumber;

                                const billValidation = await validateBillPayment(
                                    selectedProvider.current.biller_code,
                                    values.lccNumber,
                                    selectedProvider.current.item_code
                                );

                                if (billValidation) setOpenConfirmation(!openConfirmation);
                            }, 200);
                        }}
                    >
                        {({ errors, touched, setFieldValue, values, initialValues }) => (
                            <Form style={{ width: "100%" }}>
                                <InputBlock top={"24px"}>
                                    <InputWithLabel
                                        label={"Amount"}
                                        type={"text"}
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
                                        label={"LCC Account Number"}
                                        type={"text"}
                                        value={values.lccNumber}
                                        placeholder={"LCC Account Number"}
                                        name="lccNumber"
                                        inputMode={"decimal"}
                                        valid={`${(touched.lccNumber && !errors.lccNumber)}`}
                                        errors={(touched && touched.lccNumber) && (errors && errors.lccNumber)}
                                        setFieldValue={setFieldValue}
                                        initialValues={initialValues}
                                    />
                                    <RippleButton
                                        type="submit"
                                        disabled={
                                            !emptyValues(values) &&
                                            emptyValues(errors)
                                        }
                                    >
                                        Continue
                                    </RippleButton>
                                </InputBlock>
                                {openConfirmation &&
                                    <PaymentConfirmation
                                        open={openConfirmation}
                                        close={setOpenConfirmation}
                                        confirm={createBillPayment}
                                        transactionDetails={{
                                            billServiceCategoryId: selectedProvider.current.serviceId,
                                            lccNumber:             lccNumber.current,
                                            amount:                formatPrice(amount.current),
                                            providerLogo:          selectedProvider.current.logo,
                                            biller_name:           selectedProvider.current.biller_name,
                                            country:               selectedProvider.current.country,
                                            biller_code:           selectedProvider.current.biller_code,
                                            label_name:            selectedProvider.current.label_name
                                        }}
                                    />
                                }
                            </Form>
                        )}
                    </Formik>
                </FlexCenteredBlock>
            </ScreenContainer>
        </Fragment>
    );
};

export default connect(
    null,
    {
        createBillPayment,
        validateBillPayment
    }
)(withRouter(TransportationPay));