import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { PopUp, ConfirmButton, PopUpContent, CancelButton, PopUpHeader } from '../common';
import { Overlay, ActionBlock } from '../../../containers/OverlayContainer';
import { bool, func, shape, string } from 'prop-types';
import { BankAccountValidationSchema } from './BankAccountValidationSchema';
import { Formik, Form } from 'formik';
import { OpenOverlaySelectBox } from '../../../containers/InputContainer';
import { InputWithLabel } from '../../forms/input/text';
import { SelectBank } from '../../overlays';

const OpenSelectBank = styled(OpenOverlaySelectBox)`
    text-align: left;
`;

export const StorefrontAddBankAccount = ({
    open,
    cancel,
    accountDetails,
    addBankAccount
}) => {
    const [openSelectBank, setOpenSelectBank] = useState(false);
    const [selectedBank, setSelectedBank]     = useState(undefined);

    return (
        <Fragment>
            {open && (
                <Overlay
                    bgc={"rgba(0, 0, 0, 0.4)"}
                    zIndex={"99999"} 
                    onClick={cancel} 
                />
            )}
            <PopUp open={open} zIndex={"100000"}>
                <PopUpContent>
                    <PopUpHeader>Bank details</PopUpHeader>
                    <Formik
                        initialValues={{
                            bankName: (accountDetails && accountDetails.bankName) || "Bank",
                            accountNumber: (accountDetails && accountDetails.accountNumber) || "",
                            accountName: (accountDetails && accountDetails.accountName) || ""
                        }}
                        validationSchema={BankAccountValidationSchema}
                        onSubmit={values => {
                            setTimeout(() => {
                                addBankAccount(values);
                            }, 200);
                        }}
                    >
                    {({ errors, touched, setFieldValue, initialValues, values }) => (
                        <Form style={{ padding: "16px 16px 0 16px"}}>
                            <OpenSelectBank 
                               error={(touched && touched.bankName) && (errors && errors.bankName)}
                               onClick={() => setOpenSelectBank(!openSelectBank)}
                            >
                                {values.bankName}
                            </OpenSelectBank>
                            <InputWithLabel
                                label={"Account number"}
                                type={"text"}
                                noClearButton
                                value={values.accountNumber}
                                placeholder={"Account number"}
                                name={"accountNumber"}
                                maxLength={10}
                                valid={`${!(touched && touched.accountNumber) && !(errors && errors.accountNumber)}`}
                                errors={(touched && touched.accountNumber) && (errors && errors.accountNumber)}
                                setFieldValue={setFieldValue}
                                initialValues={initialValues}
                            />
                            <InputWithLabel
                                label={"Account name"}
                                type={"text"}
                                noClearButton
                                value={values.accountName}
                                placeholder={"Account name"}
                                name={"accountName"}
                                valid={`${!(touched && touched.accountName) && !(errors && errors.accountName)}`}
                                errors={(touched && touched.accountName) && (errors && errors.accountName)}
                                setFieldValue={setFieldValue}
                                initialValues={initialValues}
                            />
                            <ActionBlock direction={"row"}>
                                <CancelButton style={{ marginLeft: "-16px"}} type="button" onClick={cancel}>
                                    Cancel
                                </CancelButton>
                                <ConfirmButton style={{ marginRight: "-16px" }} type="submit">
                                    Save
                                </ConfirmButton>
                            </ActionBlock>
                            {openSelectBank && (
                                <SelectBank
                                    open={openSelectBank}
                                    setOpen={setOpenSelectBank}
                                    selectedBank={selectedBank}
                                    setSelectedBank={setSelectedBank}
                                    setFieldValue={setFieldValue}
                                    fieldName={"bankName"}
                                /> 
                            )}
                        </Form>
                    )}
                    </Formik>
                </PopUpContent>
            </PopUp>
        </Fragment>
    );
};

StorefrontAddBankAccount.propTypes = {
    open:           bool,
    cancel:         func,
    accountDetails:  shape({
        accountName: string,
        accountNumber: string,
        bankName: string,
    }),
    addBankAccount: func
};