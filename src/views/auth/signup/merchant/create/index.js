import React, {Fragment, useState} from 'react';
import {Formik, Form} from 'formik';
import {func} from 'prop-types';
import {connect, useSelector} from 'react-redux';
import {saveUserData, sendUserInfoOnSignUp} from '../../../../../redux/ducks/user/actions';
import {checkExistingEmail} from '../../../../../redux/ducks/auth/check/actions';
import {UserSignUpValidationSchema} from './UserSignUpValidationSchema';

import {
    TopHeader,
    PageProgress,
    PageLogo,
    RippleButton,
    InputWithLabel,
    CameraInput
} from '../../../../../components';
import {Message} from '../../../../../containers/MessageContainer';
import {ScreenContainer} from '../../../../../containers/ScreenContainer';
import {InputBlock} from '../../../../../containers/InputContainer';
import DocumentLogo from './assets/document.svg';


const MerchantSignUp = ({
                            saveUserData,
                            sendUserInfoOnSignUp,
                            checkExistingEmail,
                            firstName,
                            lastName,
                            email
                        }) => {
    const isOnMerchApp = useSelector(state => state.user.isOnMerchApp);
    const phoneNumber = useSelector(state => state.user.msisdn);
    const userID = useSelector(state => state.user.userId);
    const country = useSelector(state => state.user.country);
    //const [referralCode, setReferralCode] = useState(localStorage.getItem("referralCode") || "");
    const [referralCode] = useState(localStorage.getItem("referralCode") || "");

    return (
        <Fragment>
            <TopHeader title={"Profile Creation"}/>
            <ScreenContainer>
                <PageLogo top={"64px"} Icon={DocumentLogo}/>
                <PageProgress step={1} amount={3}/>
                <Message bottom={"16px"} align={"left"}>Welcome to Spaces Super App, please provide the following
                    details to get started</Message>
                <Formik
                    initialValues={{
                        firstName: (firstName !== "Not Set") ? firstName : "",
                        lastName: (lastName !== "Not Set") ? lastName : "",
                        email: email || "",
                        referralCode: referralCode ? referralCode.trim() : "",
                        country
                    }}
                    enableReinitialize={true}
                    validationSchema={UserSignUpValidationSchema}
                    onSubmit={(values, {setErrors}) => {
                        setTimeout(async () => {
                            if (!values.email) values.email = `${phoneNumber}@spaceso2o.com`;

                            const hasExistingEmail = await checkExistingEmail(values.email);

                            if (hasExistingEmail) return setErrors({'email': "Email already exists"});
                            sendUserInfoOnSignUp(userID, values).then(
                                saveUserData(
                                    values,
                                    isOnMerchApp ? '/user/create_pin' : '/user/create_business_profile'
                                )
                            );

                        }, 200);
                    }}
                >
                    {({errors, touched, setFieldValue, values, initialValues}) => (
                        <Form>
                            <InputBlock>
                                <InputWithLabel
                                    label={"First name"}
                                    type={"text"}
                                    value={values.firstName}
                                    placeholder={"First name"}
                                    name="firstName"
                                    valid={`${(!touched.firstName && !errors.firstName)}`}
                                    errors={(touched && touched.firstName) && (errors && errors.firstName)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <InputWithLabel
                                    label={"Last name"}
                                    type={"text"}
                                    value={values.lastName}
                                    placeholder={"Last name"}
                                    name="lastName"
                                    valid={`${(touched.lastName && !errors.lastName)}`}
                                    errors={(touched && touched.lastName) && (errors && errors.lastName)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <InputWithLabel
                                    label={"Email"}
                                    type={"email"}
                                    inputMode={"email"}
                                    value={values.email}
                                    placeholder={"Email"}
                                    name="email"
                                    valid={`${(!touched.email && !errors.email)}`}
                                    errors={(touched && touched.email) && (errors && errors.email)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <CameraInput initialValues={initialValues.referralCode} saveReferralCode={setFieldValue}/>
                                <RippleButton type="submit">
                                    Continue
                                </RippleButton>
                            </InputBlock>
                        </Form>
                    )}
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

MerchantSignUp.propTypes = {
    saveUserData: func,
    checkExistingEmail: func,
    sendUserInfoOnSignUp: func
};

const mapStateToProps = ({user}) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
});

export default connect(
    mapStateToProps,
    {
        saveUserData,
        checkExistingEmail,
        sendUserInfoOnSignUp
    }
)(MerchantSignUp);