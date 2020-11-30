import React, { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { createAgentAccount } from '../../../../../redux/ducks/auth/signup/agent/actions';
import { AgentPinCreationValidationSchema } from './AgentPinCreationValidationSchema';
import { getInputValues } from '../../../../../utils/inputs/getInputValues';

import { 
    Loader,
    RippleButton,
    TopHeader,
    PageLogo,
    PasswordGroup,
    PageProgress
} from '../../../../../components';
import { Message } from '../../../../../containers/MessageContainer';
import { ScreenContainer } from '../../../../../containers/ScreenContainer';
import PinCode from './assets/pincode.svg';

const CreatePin = ({
    isLoading,
    createAgentAccount
}) => {
    const [value, setValue] = useState(undefined);
    const [confirmValue, setConfirmValue] = useState(undefined);
    const [submitAction, setSubmitAction] = useState(false);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Pin Code Creation"} />
            <ScreenContainer>
                <PageLogo top={"64px"} Icon={PinCode} />
                <PageProgress step={6} amount={6} />
                <Message align={"center"} bottom={"24px"}>Create a pin to secure your account.</Message>
                <Formik
                    initialValues={{
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={AgentPinCreationValidationSchema}
                    onSubmit={(values) => {
                        setSubmitAction(true)
                        setTimeout(() => {
                            createAgentAccount(values.password).then(
                                setSubmitAction(false)
                              );
                        }, 1000);
                    }}
                >
                    {({ values, valid, touched, errors, setFieldValue }) => (
                        <Form>
                            <Message top={"24px"} bottom={"16px"}>Password</Message>
                            <PasswordGroup 
                                count={6}
                                startIndex={1}
                                type={"password"}
                                valid={valid}
                                errors={errors}
                                name={"password"}
                                touched={touched}
                                align={"center"}
                                enteredValue={value}
                                handleChange={event => {
                                    setValue(event.target.value);
                                    setFieldValue('password', getInputValues('password'));
                                }}
                            />
                            <Message top={"24px"} bottom={"16px"}>Confirm Password</Message>
                            <PasswordGroup 
                                count={6}
                                startIndex={7}
                                type={"password"}
                                valid={valid}
                                errors={errors}
                                name={"confirmPassword"}
                                touched={touched}
                                align={"center"}
                                enteredValue={confirmValue}
                                handleChange={event => {
                                    setConfirmValue(event.target.value);
                                    setFieldValue('confirmPassword', getInputValues('confirmPassword'));
                                }}
                            />
                            <RippleButton
                                type="submit"
                                disabled={
                                    (values.password.length < 6) ||
                                    (values.confirmPassword.length < 6) ||
                                    (values.password !== values.confirmPassword)||
                                    submitAction
                                }
                            >
                                Create Account
                            </RippleButton>
                        </Form>
                    )}
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

CreatePin.propTypes = {
    isLoading:          bool,
    createAgentAccount: func
};

const mapStateToProps = ({ auth }) => ({
    isLoading: auth.signup.agent.isLoading
});

export default connect(
    mapStateToProps,
    { createAgentAccount }
)(CreatePin);

