import React from "react";
import styled from 'styled-components';
import { Formik, Form } from "formik";
import { OTPValidationSchema } from './OTPValidationSchema';
import { RippleButton, InputWithLabel } from "../../../../../../../../components";
import { Message } from "../../../../../../../../containers/MessageContainer";
import { func, string, shape } from "prop-types";

const OtpConfirmContainer = styled.div`
    margin-top: 72px;
`;

export const OTPForm = ({
    cardToAdd,
    msisdn,
    sendOTPAndVerifyWallet
}) => {
    return (
        <OtpConfirmContainer>
            <Message align={"center"} bottom={"24px"}>
                Kindly enter the OTP sent to {`${msisdn.slice(0, 6)}***${msisdn.slice(9)}`}
            </Message>
            <Formik
                initialValues={{
                    otp: ''
                }}
                validationSchema={OTPValidationSchema}
                onSubmit={(values) => {
                    setTimeout(() => {
                        sendOTPAndVerifyWallet(cardToAdd, values.otp);
                    }, 1000);
                }}
            >
                {({ errors, touched, setFieldValue, initialValues, values }) => (
                    <Form>
                        <InputWithLabel
                            label={"OTP"}
                            type={"decimal"}
                            value={values.otp}
                            inputMode={"numeric"}
                            placeholder={"OTP"}
                            name={"otp"}
                            valid={`${(!touched.otp && !errors.otp)}`}
                            errors={(touched && touched.otp) && (errors && errors.otp)}
                            setFieldValue={setFieldValue}
                            initialValues={initialValues}
                        />
                        <RippleButton 
                            type="submit"
                            top="24px"
                        >
                            Add card
                        </RippleButton>
                    </Form>
                )}
            </Formik>
        </OtpConfirmContainer>
    );
};

OTPForm.propTypes = {
    sendOTPAndVerifyWallet: func,
    msisdn:                 string,
    cardToAdd:              shape({ cardNumber: string, expirationDate: string, cvv: string })
};