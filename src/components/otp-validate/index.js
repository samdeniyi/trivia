import React, { Fragment } from 'react';
import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
// import { getInputValues } from '../../utils/inputs/getInputValues';
import { OTPValidationSchema } from './OTPValidationSchema';
import { RippleButton, InputWithLabel } from '../../components';
import { Message } from '../../containers/MessageContainer';
import { ScreenContainer } from '../../containers/ScreenContainer';

const OTPValidate = ({verifyBankAccount}) => {
    const isLoading = useSelector(state => state.account.wallet.isLoading);
    // const [value, setValue] = useState(null);
    return (
        <Fragment>
            <ScreenContainer>
            <Message align={"center"} bottom={"24px"}>
                Enter the OTP code sent to number associated with this bank account
            </Message>
            <Formik
                initialValues={{
                    code: ''
                }}
                validationSchema={OTPValidationSchema}
                onSubmit={(values) => {
                    setTimeout(() => {
                        verifyBankAccount(values.code);
                    }, 1000);
                }}
            >
                {({ errors, values, valid, touched, initialValues, setFieldValue }) => (
                    <Form>
                        <InputWithLabel
                                        label={"Token"}
                                        type={"number"}
                                        value={values.code}
                                        name={"code"}
                                        placeholder={"Token"}
                                        valid={`${
                                            !touched.code && !errors.code
                                        }`}
                                        errors={
                                            touched &&
                                            touched.code &&
                                            errors &&
                                            errors.code
                                        }
                                        setFieldValue={setFieldValue}
                                        initialValues={initialValues}
                                    />
                        <RippleButton
                            type="submit"
                            disabled={
                                (values.code.length < 5) ||
                                isLoading
                            }
                        >
                            Check
                        </RippleButton>
                    </Form>
                )}
            </Formik>
            </ScreenContainer>
        </Fragment>
    )
};

export default OTPValidate;
