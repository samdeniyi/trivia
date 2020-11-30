import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { FourDigitPinValidationSchema } from './FourDigitPinValidationSchema';
import { PasswordGroup, RippleButton } from '../../../../../../../../components';
import { Message } from '../../../../../../../../containers/MessageContainer';
import { getInputValues } from '../../../../../../../../utils/inputs/getInputValues';
import { func, string, shape, bool } from 'prop-types';

const PinConfirmContainer = styled.div`
    margin-top: 72px;
`;

export const EnterPINForm = ({
    sendDebitCardWithPin,
    cardToAdd,
    pinFormOpen,
    setPinFormOpen,
    enteredPin,
    setEnteredPin,
    pinApproved,
    setPinApproved
}) => {
    return (
        <PinConfirmContainer>
        <Message align={"center"}>Enter your 4-digit card pin to add this card</Message>
            <Formik 
                initialValues={{
                    pin: ''
                }}
                validationSchema={FourDigitPinValidationSchema}
                onSubmit={(values) => {
                    setTimeout(async () => {
                        const pinApproval = await sendDebitCardWithPin(cardToAdd, values.pin);
                            
                        if (pinApproval) {
                            setPinFormOpen(!pinFormOpen);
                            setPinApproved(!pinApproved);
                        };
                    }, 1000);
                }}
            >
                {({ errors, valid, touched, setFieldValue }) => (
                    <Form>
                        <PasswordGroup 
                            startIndex={1}
                            type={"password"}
                            count={4}
                            name={"pin"}
                            align={"center"}
                            errors={errors}
                            valid={valid}
                            touched={touched}
                            marginTop={"24px"}
                            enteredValue={enteredPin || ''}
                            handleChange={event => {
                                setEnteredPin(event.target.value);
                                setFieldValue('pin', getInputValues('pin'));
                            }}
                        />
                        <RippleButton type="submit">
                            Send
                        </RippleButton>
                    </Form>
                )}
            </Formik>
        </PinConfirmContainer>
    );
};

EnterPINForm.propTypes = {
    cardToAdd:            shape({ cardNumber: string, expirationDate: string, cvv: string }),
    sendDebitCardWithPin: func,
    pinFormOpen:          bool,
    setPinFormOpen:       func,
    enteredPin:           string,
    setEnteredPin:        func,
    pinApproved:          bool,
    setPinApproved:       func,
};