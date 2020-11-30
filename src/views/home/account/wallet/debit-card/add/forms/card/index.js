import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { func, bool, shape, string } from 'prop-types';
import { AddDebitCardValidationSchema } from './AddDebitCardValidationSchema';
import { InputWithLabel, RippleButton } from '../../../../../../../../components';
import { autoSpace } from '../../../../../../../../utils/inputs/autoFormat';

const InputCardBlock = styled.div`
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr, 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;

    & > #cardNumber {
        grid-column: 1 / 3;
    }

    & > #expirationDate {
        grid-column: 2 / 1;
    }
`;

export const DebitCardForm = ({
    addCardInitial,
    setPinFormOpen,
    pinFormOpen,
    otpModalOpen,
    setOtpModalOpen,
    cardToAdd
}) => {
    return (
        <Formik
            initialValues={{
                cardNumber: '',
                expirationDate: '',
                cvv: ''
            }}
            validationSchema={AddDebitCardValidationSchema}
            onSubmit={(values) => {
                setTimeout(async () => {
                    const debitCard = {
                        cardNumber: values.cardNumber.split(' ').join(''),
                        expirationDate: values.expirationDate,
                        cvv: values.cvv
                    };

                    const addCardResponse = await addCardInitial(debitCard);

                    if (
                        addCardResponse && addCardResponse.suggestedAuth === "PIN" && 
                        addCardResponse && addCardResponse.valid
                    ) {
                        cardToAdd.current = debitCard;
                        setPinFormOpen(!pinFormOpen);
                    } else if (
                        addCardResponse && addCardResponse.suggestedAuth === "VBVSECURECODE" &&
                        addCardResponse && addCardResponse.valid
                    ) {
                        cardToAdd.current = debitCard;
                        setOtpModalOpen(!otpModalOpen);
                    } else if (
                        addCardResponse && !addCardResponse.suggestedAuth &&
                        addCardResponse && !addCardResponse.valid
                    ) return null;
                }, 200);
            }}
        >
        {({ errors, touched, setFieldValue, initialValues, values }) => (
            <Form style={{ marginTop: '72px' }}>
                <InputCardBlock>
                    <InputWithLabel
                        label={"Card number"}
                        type={"text"}
                        id={"cardNumber"}
                        value={values.cardNumber}
                        autoComplete={"true"}
                        inputMode={"decimal"}
                        onKeyPress={(event) => {
                            if(event.charCode < 47 || event.charCode > 57) {
                                event.preventDefault();
                            };
                            event.target.value = autoSpace(event.target.value);
                        }}
                        placeholder={"Card number"}
                        name={"cardNumber"}
                        valid={`${(!touched.cardNumber && !errors.cardNumber)}`}
                        errors={(touched && touched.cardNumber) && (errors && errors.cardNumber)}
                        setFieldValue={setFieldValue}
                        initialValues={initialValues}
                        maxLength={19}
                        bottom={"0"}
                    />
                    <InputWithLabel
                        label={"Expiration date"}
                        type={"text"}
                        value={values.expirationDate} 
                        placeholder={"MM/YY"}
                        inputMode={"numeric"}
                        id={"expirationDate"}
                        name={"expirationDate"}
                        maxLength={5}
                        onKeyPress={(e) => {
                            let input = e.target;
                            if(e.charCode < 47 || e.charCode > 57) {
                                e.preventDefault();
                            }
                            const len = input.value.length;
                            if(len !== 1 || len !== 3) {
                                if(e.charCode === 47) {
                                    e.preventDefault();
                                }
                            }
                            if(len === 2) {
                                input.value += '/';
                            }
                        }}
                        autoComplete={"true"}
                        valid={`${(!touched.expirationDate && !errors.expirationDate)}`}
                        errors={(touched && touched.expirationDate) && (errors && errors.expirationDate)}
                        setFieldValue={setFieldValue}
                        initialValues={initialValues}
                        bottom={"0"}
                    />
                    <InputWithLabel
                        label={"CVV Code"}
                        type={"password"}
                        value={values.cvv} 
                        placeholder={"CVV"}
                        id={"cvv"}
                        name={"cvv"}
                        inputMode={"decimal"}
                        autoComplete={"true"}
                        valid={`${(!touched.cvv && !errors.cvv)}`}
                        errors={(touched && touched.cvv) && (errors && errors.cvv)}
                        setFieldValue={setFieldValue}
                        initialValues={initialValues}
                        maxLength={3}
                        bottom={"0"}
                        onKeyPress={(event) => {
                            if(event.charCode < 47 || event.charCode > 57) {
                                event.preventDefault();
                            };
                        }}
                    />
                </InputCardBlock>
                <RippleButton type="submit" top={"24px"}>
                    Continue
                </RippleButton>
            </Form>
        )}
        </Formik>
    );
};

DebitCardForm.propTypes = {
    addCardInitial:  func,
    pinFormOpen:     bool,
    otpModalOpen:    bool,
    setOtpModalOpen: func,
    setPinFormOpen:  func,
    cardToAdd:       shape({ cardNumber: string, expirationDate: string, cvv: string })
};