import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';
import { SetPasswordValidationSchema } from './SetPasswordValidationSchema';
import { bool, func } from 'prop-types';
import { getInputValues } from '../../../../utils/inputs/getInputValues';
import { setNewPassword } from '../../../../redux/ducks/auth/password/actions';

import { Formik, Form } from 'formik';
import { Message } from '../../../../containers/MessageContainer';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import { 
    Loader, 
    TopHeader,
    PasswordGroup,
    RippleButton
} from '../../../../components';

const SetPassword = ({ 
    isLoading,
    setNewPassword
}) => {
    const [value, setValue] = useState(undefined);
    const [confirmValue, setConfirmValue] = useState(undefined);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"New Pin"} />
            <ScreenContainer>
                <Formik
                    initialValues={{
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={SetPasswordValidationSchema}
                    onSubmit={(values, { resetForm }) => {
                        setTimeout(() => {
                            resetForm({ password: '' });
                            setNewPassword(values.password);
                        }, 1000);
                    }}
                >
                    {({ errors, valid, touched, setFieldValue, values }) => (
                        <Form style={{ marginTop: '64px'}}>
                           <Message top={"24px"} bottom={"16px"}>New Pin</Message>
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
                            <Message top={"24px"} bottom={"16px"}>Confirm New Pin</Message>
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
                                top={"24px"}
                                disabled={
                                    (values.password.length < 6) ||
                                    (values.confirmPassword.length < 6) ||
                                    (values.password !== values.confirmPassword)
                                }
                            >
                                Save
                            </RippleButton>
                        </Form>
                    )}
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

SetPassword.propTypes = {
    setNewPassword: func,
    isLoading:      bool,
};

const mapStateToProps = ({ auth }) => ({
    isLoading: auth.password.isLoading
});

export default connect(
    mapStateToProps, 
    { setNewPassword }
)(SetPassword);