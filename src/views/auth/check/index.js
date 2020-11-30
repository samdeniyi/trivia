import React, { Fragment, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { bool, string, func, number } from 'prop-types';
import { getInputValues } from '../../../utils/inputs/getInputValues';
import { sendCode, sendOTPToWhatsapp } from '../../../redux/ducks/auth/check/actions';
import { tick, setExpired } from '../../../redux/ducks/timer/actions';
import { resendCode, sendUssd } from '../../../redux/ducks/auth/check/actions'; 

import { Message } from '../../../containers/MessageContainer';
import { ScreenContainer } from '../../../containers/ScreenContainer';
import { CodeCheckFormValidationSchema } from './CodeCheckFormValidationSchema';
import { 
    RippleButton,
    Loader,
    TopHeader,
    PasswordGroup,
    ResendCodeTimer,
    PageLogo
} from '../../../components';
import MessageLogo from './assets/message.svg';
import { insertZero } from '../../../utils/inputs/formatPhoneNumber';

const Check = ({
    isLoading,
    expired,
    counter,
    sendCode,
    tick,
    setExpired,
    resendCode,
    sendUssd,
    sendOTPToWhatsapp,
    phoneNumber
}) => {
    const [value, setValue] = useState('');
    const [startTime, setStartTime] = useState('');
    
    useEffect(() => {
        setStartTime(new Date())
    },[])

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Verification code"} backAction={() => localStorage.removeItem("persist:root")} />
            <ScreenContainer>
                <PageLogo top={"64px"} Icon={MessageLogo} />
                <Message align={"center"} bottom={"24px"}>
                    Enter the OTP code sent to <strong>{insertZero(phoneNumber)}</strong>
                </Message>
                <Formik
                    initialValues={{
                        code: ''
                    }}
                    validationSchema={CodeCheckFormValidationSchema}
                    onSubmit={(values) => {
                        setTimeout(() => {
                            sendCode(values.code, startTime);
                        }, 1000);
                    }}
                >
                    {({ errors, values, valid, touched, setFieldValue }) => (
                        <Form>
                            <PasswordGroup
                                align={"center"}
                                count={6}
                                startIndex={1}
                                type="number"
                                valid={valid}
                                name="code"
                                errors={errors}
                                touched={touched}
                                enteredValue={value}
                                handleChange={event => {
                                    if (document.querySelector('input[name="code"]').value.length === 6) {
                                        const instantOTP = document.querySelector('input[name="code"]').value;
                                        setValue(instantOTP);
                                        sendCode(instantOTP);
                                    } else {
                                        setValue(event.target.value);
                                        setFieldValue('code', getInputValues('code'));
                                    };  
                                }}
                            />
                            <RippleButton
                                type="submit"
                                disabled={
                                    (values.code.length < 6) ||
                                    isLoading
                                }
                            >
                                Check
                            </RippleButton>
                            <ResendCodeTimer 
                                counter={counter}
                                expired={expired}
                                sendUssd={sendUssd}
                                setExpired={setExpired}
                                sendViaWhatsApp={sendOTPToWhatsapp}
                                tick={tick}
                                resendCode={resendCode}
                            />
                        </Form>
                    )}
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

Check.propTypes = {
    isLoading:         bool,
    phoneNumber:       string,
    counter:           number,
    sendCode:          func,
    tick:              func,
    setExpired:        func,
    resendCode:        func,
    sendUssd:          func,
    sendOTPToWhatsapp: func,
    expired:           bool
};

const mapStateToProps = ({ user, auth, timer }) => ({
    phoneNumber: user.msisdn,
    isLoading:   auth.check.isLoading,
    expired:     timer.expired,
    counter:     timer.counter
});

export default connect(
    mapStateToProps,
    {
        sendCode,
        tick,
        setExpired,
        resendCode,
        sendUssd,
        sendOTPToWhatsapp
    }
)(Check);