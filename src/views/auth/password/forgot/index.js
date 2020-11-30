import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ForgotPasswordValidationSchema } from './ForgotPasswordValidationSchema';
import { bool, func, number } from 'prop-types';
import { getInputValues } from '../../../../utils/inputs/getInputValues';
import { tick, setExpired } from '../../../../redux/ducks/timer/actions';
import { resendCode, sendUssd, sendOTPToWhatsapp } from '../../../../redux/ducks/auth/check/actions'; 
import { forgotPasswordCheck } from '../../../../redux/ducks/auth/password/actions';

import { Formik, Form } from 'formik';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import { Message } from '../../../../containers/MessageContainer';
import { 
    Loader, 
    TopHeader,
    PasswordGroup,
    RippleButton,
    ResendCodeTimer
} from '../../../../components';

const ForgotPinContainer = styled.div`
    margin-top: 72px;
`;

const ForgotPassword = ({ 
    isLoading,
    counter,
    expired,
    resendCode,
    sendUssd,
    sendOTPToWhatsapp,
    tick,
    setExpired,
    forgotPasswordCheck
}) => {
    const [value, setValue] = useState(undefined);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Forgot Pin"} />
            <ScreenContainer>
                <ForgotPinContainer>
                    <Message>Enter the OTP code sent to the phone number.</Message>
                    <Formik
                        initialValues={{
                            code: ''
                        }}
                        validationSchema={ForgotPasswordValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            setTimeout(() => {
                                resetForm({ code: '' });
                                forgotPasswordCheck(values.code);
                            }, 1000);
                        }}
                    >
                        {({ values, errors, valid, touched, setFieldValue }) => (
                            <Form>
                                <PasswordGroup
                                    count={6}
                                    startIndex={1}
                                    type="number"
                                    valid={valid}
                                    name="code"
                                    align={"center"}
                                    errors={errors}
                                    touched={touched}
                                    enteredValue={value || ''}
                                    marginTop={"24px"}
                                    handleChange={event => {
                                        if (document.querySelector('input[name="code"]').value.length === 6) {
                                            const instantOTP = document.querySelector('input[name="code"]').value;
                                            setValue(instantOTP);
                                            forgotPasswordCheck(instantOTP);
                                        } else {
                                            setValue(event.target.value);
                                            setFieldValue('code', getInputValues('code'));
                                        };  
                                    }}
                                />
                                <RippleButton
                                    type="submit"
                                    top={"1em"}
                                    disabled={
                                        (values.code.length < 6) ||
                                        isLoading || 
                                        expired
                                    }
                                >
                                    Send
                                </RippleButton>
                                <ResendCodeTimer 
                                    counter={counter}
                                    expired={expired}
                                    sendUssd={sendUssd}
                                    sendViaWhatsApp={sendOTPToWhatsapp}
                                    setExpired={setExpired}
                                    tick={tick}
                                    resendCode={resendCode}
                                />
                            </Form>
                        )}
                    </Formik>
                </ForgotPinContainer>
            </ScreenContainer>
        </Fragment>
    );
};

ForgotPassword.propTypes = {
    isLoading:           bool,
    counter:             number,
    forgotPasswordCheck: func,
    sendUssd:            func,
    setExpired:          func,
    tick:                func,
    resendCode:          func,
    sendOTPToWhatsapp:   func
};

const mapStateToProps = ({ auth, timer }) => ({
    isLoading: auth.password.isLoading,
    expired:   timer.expired,
    counter:   timer.counter
});

export default connect(
    mapStateToProps,
    { 
        forgotPasswordCheck,
        sendOTPToWhatsapp,
        tick,
        setExpired,
        resendCode,
        sendUssd
    }
)(ForgotPassword);