import React, {Fragment, useState } from "react";
import {Formik, Form} from "formik";
import {func} from "prop-types";
import {connect, useSelector} from "react-redux";
import {AgentSignUpValidationSchema} from "./AgentSignUpValidationSchema";
import {
    saveUserData,
    sendUserInfoOnSignUp
} from "../../../../../redux/ducks/user/actions";
import {checkExistingEmail} from "../../../../../redux/ducks/auth/check/actions";

import {
    TopHeader,
    PageProgress,
    PageLogo,
    RippleButton,
    InputWithLabel,
    CameraInput
} from "../../../../../components";
import {ScreenContainer} from "../../../../../containers/ScreenContainer";
import {InputBlock} from "../../../../../containers/InputContainer";
import {Message} from "../../../../../containers/MessageContainer";
import DocumentLogo from "./assets/document.svg";

const AgentProfileCreation = ({
                                  saveUserData,
                                  checkExistingEmail,
                                  sendUserInfoOnSignUp,
                                  firstName,
                                  lastName,
                                  email
                              }) => {
    const phoneNumber = useSelector(state => state.user.msisdn);
    const userID = useSelector(state => state.user.userId);
    //const [referralCode, setReferralCode] = useState(localStorage.getItem("referralCode") || "");
    const [referralCode] = useState(localStorage.getItem("referralCode") || "");

    return (
        <Fragment>
            <TopHeader title={"Profile Creation"}/>
            <ScreenContainer>
                <PageLogo top={"64px"} Icon={DocumentLogo}/>
                <PageProgress step={1} amount={6}/>
                <Message align={"left"} bottom={"24px"}>
                    Welcome to Spaces Super App, please provide the following
                    details to get started
                </Message>
                <Formik
                    initialValues={{
                        firstName: firstName || "",
                        lastName: lastName || "",
                        email: email || "",
                        referralCode: referralCode ? referralCode.trim() : ""
                    }}
                    enableReinitialize={true}
                    validationSchema={AgentSignUpValidationSchema}
                    onSubmit={(values, {setErrors}) => {
                        setTimeout(async () => {
                            if (!values.email) {
                                values.email = `${phoneNumber}@spaceso2o.com`;
                            }
                            ;

                            const hasExistingEmail = await checkExistingEmail(values.email);
                            if (hasExistingEmail) return setErrors({email: "Email already exists"});
                            sendUserInfoOnSignUp(userID, values).then(
                                saveUserData(values, "/user/create_agent_region")
                            );
                        }, 200);
                    }}
                >
                    {({
                          errors,
                          touched,
                          setFieldValue,
                          values,
                          initialValues
                      }) => (
                        <Form>
                            <InputBlock>
                                <InputWithLabel
                                    label={"First name"}
                                    type={"text"}
                                    value={values.firstName}
                                    placeholder={"First name"}
                                    name="firstName"
                                    valid={`${!touched.firstName && !errors.firstName}`}
                                    errors={
                                        touched && touched.firstName &&
                                        errors && errors.firstName
                                    }
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <InputWithLabel
                                    label={"Last name"}
                                    type={"text"}
                                    value={values.lastName}
                                    placeholder={"Last name"}
                                    name="lastName"
                                    valid={`${touched.lastName && !errors.lastName}`}
                                    errors={
                                        touched && touched.lastName &&
                                        errors && errors.lastName
                                    }
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
                                    valid={`${!touched.email && !errors.email}`}
                                    errors={
                                        touched && touched.email &&
                                        errors && errors.email
                                    }
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <CameraInput initialValues={initialValues.referralCode} saveReferralCode={setFieldValue}/>
                                <RippleButton
                                    type="submit"
                                    disabled={
                                        values.firstName === "" ||
                                        values.lastName === ""
                                    }
                                >
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

const mapStateToProps = ({user}) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
});

AgentProfileCreation.propTypes = {
    saveUserData: func,
    checkExistingEmail: func,
    sendUserInfoOnSignUp: func
};

export default connect(mapStateToProps, {
    saveUserData,
    checkExistingEmail,
    sendUserInfoOnSignUp
})(AgentProfileCreation);

