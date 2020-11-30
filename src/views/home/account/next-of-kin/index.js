import React, { Fragment } from "react"
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { func } from "prop-types";
import { sendUserNextOfKin } from "../../../../redux/ducks/user/actions";
import { emptyValues } from "../../../../utils/inputs/conditions";
import { checkExistingEmail } from "../../../../redux/ducks/auth/check/actions";

import { TopHeader, InputWithLabel, RippleButton, SelectBox } from "../../../../components"
import { ScreenContainer } from "../../../../containers/ScreenContainer"
import { NextOfKinValidationSchema } from "./NextOfKinValidationSchema";
import { InputBlock } from "../../../../containers/InputContainer";

const NextOfKin = ({
    isLoading,
    sendUserNextOfKin,
    checkExistingEmail
}) => {
    return (
        <Fragment>
            <TopHeader title={"Next Of Kin"} />
            <ScreenContainer>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        houseAddress: '',
                        msisdn: '',
                        relationShip: ''
                    }}
                    validationSchema={NextOfKinValidationSchema}
                    onSubmit={(values, { setErrors }) => {
                        setTimeout(async () => {
                            const hasExistingEmail = await checkExistingEmail(values.email);

                            if (hasExistingEmail === false) {
                                sendUserNextOfKin(values);
                            } else {
                                setErrors({ 'email': "Email already exists" });
                            };
                        }, 200);
                    }}
                >
                {({ errors, touched, setFieldValue, handleChange, values, initialValues }) => (
                    <Form style={{ marginTop: "64px"}}>
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
                            <InputWithLabel
                                label={"House address"}
                                type={"text"}
                                value={values.houseAddress} 
                                placeholder={"House Address"} 
                                name="houseAddress"
                                valid={`${(!touched.houseAddress && !errors.houseAddress)}`}
                                errors={(touched && touched.houseAddress) && (errors && errors.houseAddress)}
                                setFieldValue={setFieldValue}
                                initialValues={initialValues}
                            />
                            <InputWithLabel
                                label={"Phone number"}
                                type={"text"}
                                inputMode={"tel"}
                                value={values.msisdn} 
                                placeholder={"Phone number"} 
                                name="msisdn"
                                valid={`${(!touched.msisdn && !errors.msisdn)}`}
                                errors={(touched && touched.msisdn) && (errors && errors.msisdn)}
                                setFieldValue={setFieldValue}
                                initialValues={initialValues}
                            />
                            <SelectBox
                                name={"relationShip"}
                                placeholder={"Relationship"}
                                value={values.relationShip}
                                options={[
                                    {
                                        value: "wife",
                                        label: "Wife"
                                    }, 
                                    {
                                        value: "husband",
                                        label: "Husband"
                                    }, 
                                    {
                                        value: "child",
                                        label: "Child"
                                    }, 
                                    {
                                        value: "parent",
                                        label: "Parent" 
                                    }, 
                                    {
                                        value: "sibling",
                                        label: "Sibling"
                                    }
                                ]}
                                handleChange={handleChange}
                                valid={`${(!touched.relationShip && !errors.relationShip)}`}
                                error={(touched && touched.relationShip) && (errors && errors.relationShip)}  
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
                    </Form>
                )}
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

NextOfKin.propTypes = {
    sendUserNextOfKin:  func,
    checkExistingEmail: func
};

export default connect(
    null, 
    { 
        sendUserNextOfKin,
        checkExistingEmail
    }
)(NextOfKin);