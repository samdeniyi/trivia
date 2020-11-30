import React, { Fragment, useState } from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import { UpdatePasswordValidationSchema } from './UpdatePasswordValidationSchema';
import { getInputValues } from '../../../../utils/inputs/getInputValues';
import { updateUserPassword, resetPassword } from '../../../../redux/ducks/user/actions/password';

import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import { Message } from "../../../../containers/MessageContainer";
import { 
    Loader, 
    TopHeader,
    PasswordGroup,
    RippleButton
} from '../../../../components';
import { InputBlock } from "../../../../containers/InputContainer";

const ForgotPassword = styled(Link)`
    margin: 0 auto;
    text-align: center;
    font-size: 14px;
`;

const AlternativeOptionBlock = styled.section`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
`;

const UpdatePassword = ({ 
    isLoading,
    resetPassword,
    updateUserPassword
}) => {
    const [oldPin, setOldPin] = useState(undefined);
    const [newPin, setNewPin] = useState(undefined);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Pin"} />
            <ScreenContainer>
                <Formik
                    initialValues={{
                        oldPin: '',
                        newPin: ''
                    }}
                    validationSchema={UpdatePasswordValidationSchema}
                    onSubmit={(values, { resetForm }) => {
                        setTimeout(() => {
                            resetForm({ oldPin: '', newPin: '' });
                            updateUserPassword(values.oldPin, values.newPin);
                        }, 1000);
                    }}
                >
                    {({ errors, valid, touched, setFieldValue }) => (
                        <Form style={{ marginTop: '80px'}}>
                            <InputBlock>
                                <Message top={"0"} left={"8px"} bottom={"0px"}>Old Pin</Message>
                                <PasswordGroup
                                    count={6}
                                    startIndex={1}
                                    type="password"
                                    valid={valid}
                                    name="oldPin"
                                    errors={errors}
                                    touched={touched}
                                    align={"center"}
                                    enteredValue={oldPin}
                                    handleChange={event => {
                                        setOldPin(event.target.value);
                                        setFieldValue('oldPin', getInputValues('oldPin'));
                                    }}
                                />
                                <Message top={"24px"} left={"8px"} bottom={"0px"}>New Pin</Message>
                                <PasswordGroup
                                    count={6}
                                    startIndex={7}
                                    type="password"
                                    align={"center"}
                                    valid={valid}
                                    name="newPin"
                                    errors={errors}
                                    touched={touched}
                                    enteredValue={newPin}
                                    handleChange={event => {
                                        setNewPin(event.target.value);
                                        setFieldValue('newPin', getInputValues('newPin'));
                                    }}
                                />
                            </InputBlock>
                            <AlternativeOptionBlock>
                                <ForgotPassword 
                                    to="/user/password_forgot" 
                                    onClick={resetPassword}
                                >
                                    Forgot Your Pin?
                                </ForgotPassword>
                            </AlternativeOptionBlock>
                            <RippleButton
                                type="submit"
                                top={"1.5em"}
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

const mapStateToProps = ({ auth }) => ({
    isLoading: auth.password.isLoading
});

UpdatePassword.propTypes = {
    isLoading: bool,
    updateUserPassword: func,
    resetPassword: func
};

export default connect(
    mapStateToProps, 
    { 
        updateUserPassword,
        resetPassword 
    }
)(UpdatePassword);