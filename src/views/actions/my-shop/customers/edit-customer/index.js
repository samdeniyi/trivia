import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { withRouter } from 'react-router-dom';
import { getAvailableBanks } from '../../../../../redux/ducks/account/wallet/actions/bank-account';
import { updateCustomer } from '../../../../../redux/ducks/applications/my-shop/actions/customers';
import { states } from '../../../../../data/countries/nigeria/states';
import { selectAreasByState } from '../../../../../utils/inputs/selectAreasByState';
import { insertZero } from '../../../../../utils/inputs/formatPhoneNumber';
import { localAreas } from '../../../../../data/countries/nigeria/localAreas';
import { ViewContainer, ScreenContainer } from '../../../../../containers/ScreenContainer';
import { TopHeader, InputWithLabel, SelectBox, SelectBank } from '../../../../../components';
import { EditCustomerValidationSchema } from './EditCustomerValidationSchema';
import { InputBlock, OpenOverlaySelectBox } from '../../../../../containers/InputContainer';
import { Message } from '../../../../../containers/MessageContainer';
import { LightRippleButton, RippleButton } from '../../../../../components/button';
import { AddFields } from '../add-fields';

const identifySelectedFields = customer => {
    const selectedFields = [];

    if (customer.email) selectedFields.push('EMAIL');
    
    if (customer.homeAddress && Object.values(customer.homeAddress).every(value => value !== "")) {
        selectedFields.push('HOUSE_ADDRESS');
    };
    
    if (customer.officeAddress && Object.values(customer.officeAddress).every(value => value !== "")) {
        selectedFields.push('OFFICE_ADDRESS');
    };
    
    if (customer.bank && Object.values(customer.bank).every(value => value !== "")) {
        selectedFields.push('BANK_ACCOUNT');
    };

    return selectedFields;
};

const EditCustomerDetails = ({
    updateCustomer,
    getAvailableBanks,
    location
}) => {
    const customer = location.state;
    const [openSelectBank, setOpenSelectBank] = useState(false);
    const [selectedBank, setSelectedBank]     = useState(undefined);
    const [openAddFields, setOpenAddFields]   = useState(false);
    const [selectedFields, setSelectedFields] = useState(identifySelectedFields(customer));

    return (
        <Fragment>
            {(!openSelectBank && !openAddFields) && (
                <TopHeader title={"Edit Customer"} />
            )}
            <ScreenContainer>
                <ViewContainer>
                    <Formik
                        initialValues={{
                            name: customer.name,
                            phoneNumber: customer.phoneNumber,
                            email: customer.email,
                            homeAddress: customer.homeAddress ? {
                                address: customer.homeAddress.address,
                                state: customer.homeAddress.state,
                                lga: customer.homeAddress.lga
                            } : {
                                address: "",
                                state: "",
                                lga: ""
                            },
                            officeAddress: customer.officeAddress ? {
                                address: customer.officeAddress.address,
                                state: customer.officeAddress.state,
                                lga: customer.officeAddress.lga
                            } : {
                                address: "",
                                state: "",
                                lga: ""
                            },
                            bank: customer.bank ? {
                                name: customer.bank.name,
                                accountNumber: customer.bank.accountNumber
                            } : {
                                name: "",
                                accountNumber: ""
                            }
                        }}
                        validationSchema={EditCustomerValidationSchema}
                        onSubmit={values => {
                            setTimeout(() => {
                                values.phoneNumber = insertZero(values.phoneNumber);
                                updateCustomer(customer.id, values);
                            }, 200);
                        }}
                    >
                    {({ errors, touched, setFieldValue, initialValues, handleChange, handleBlur, values }) => (
                        <Form>
                            <InputBlock>
                                <InputWithLabel
                                    label={"Full name"}
                                    type={"text"}
                                    value={values.name}
                                    placeholder={"Full name"}
                                    name={"name"}
                                    valid={`${(!touched.name && !errors.name)}`}
                                    errors={(touched && touched.name) && (errors && errors.name)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <InputWithLabel
                                    label={"Phone Number"}
                                    type={"text"}
                                    value={values.phoneNumber}
                                    placeholder={"Phone Number"}
                                    name={"phoneNumber"}
                                    onKeyUp={e => e.target.value = e.target.value.replace(/\s/g, '')}
                                    valid={`${(!touched.phoneNumber && !errors.phoneNumber)}`}
                                    errors={(touched && touched.phoneNumber) && (errors && errors.phoneNumber)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                {selectedFields.includes("EMAIL") && (
                                    <InputWithLabel
                                        label={"Email Address"}
                                        type={"text"}
                                        value={values.email}
                                        placeholder={"Email Address"}
                                        name={"email"}
                                        valid={`${(!touched.email && !errors.email)}`}
                                        errors={(touched && touched.email) && (errors && errors.email)}
                                        setFieldValue={setFieldValue}
                                        initialValues={initialValues}
                                    />
                                )}
                                {selectedFields.includes('HOUSE_ADDRESS') && (
                                    <Fragment>
                                        <Message top={"16px"} bottom={"0"}>House address:</Message>
                                        <InputBlock>
                                            <InputWithLabel
                                                label={"Home Address"}
                                                type={"text"}
                                                value={values.homeAddress.address}
                                                placeholder={"Home Address"}
                                                name={"homeAddress.address"}
                                                valid={`${(!(touched && touched.homeAddress && touched.homeAddress.address) && !(errors && errors.homeAddress && errors.homeAddress.address))}`}
                                                errors={(touched && touched.homeAddress && touched.homeAddress.address) && (errors && errors.homeAddress && errors.homeAddress.address)}
                                                setFieldValue={setFieldValue}
                                                initialValues={initialValues}
                                            />
                                            <SelectBox
                                                name={"homeAddress.state"}
                                                placeholder={"State"}
                                                value={values.homeAddress.state}
                                                options={states}
                                                handleChange={handleChange}
                                                valid={`${(!(touched && touched.homeAddress && touched.homeAddress.state) && !(errors && errors.homeAddress && errors.homeAddress.state))}`}
                                                error={(touched && touched.homeAddress && touched.homeAddress.state) && (errors && errors.homeAddress && errors.homeAddress.state)}
                                            />
                                            <SelectBox
                                                name={"homeAddress.lga"}
                                                placeholder={"Local Government Area"}
                                                value={values.homeAddress.lga}
                                                options={(values.homeAddress && values.homeAddress.state) ? selectAreasByState(values.homeAddress.state, localAreas) : []}
                                                handleChange={handleChange}
                                                valid={`${(!(touched && touched.homeAddress && touched.homeAddress.lga) && !(errors && errors.homeAddress && errors.homeAddress.lga))}`}
                                                errors={(touched && touched.homeAddress && touched.homeAddress.lga) && (errors && errors.homeAddress && errors.homeAddress.lga)}
                                            />
                                        </InputBlock>
                                    </Fragment>
                                )}
                                {selectedFields.includes('OFFICE_ADDRESS') && (
                                    <Fragment>
                                        <Message top={"16px"} bottom={"0"}>Office address:</Message>
                                        <InputBlock>
                                            <InputWithLabel
                                                label={"Office Address"}
                                                type={"text"}
                                                noClearButton
                                                value={values.officeAddress.address}
                                                placeholder={"Office Address"}
                                                name={"officeAddress.address"}
                                                valid={`${(!(touched && touched.officeAddress && touched.officeAddress.address) && !(errors && errors.officeAddress && errors.officeAddress.address))}`}
                                                errors={(touched && touched.officeAddress && touched.officeAddress.address) && (errors && errors.officeAddress && errors.officeAddress.address)}
                                                setFieldValue={setFieldValue}
                                                initialValues={initialValues}
                                            />
                                            <SelectBox
                                                name={"officeAddress.state"}
                                                placeholder={"State"}
                                                value={values.officeAddress.state}
                                                options={states}
                                                handleChange={handleChange}
                                                valid={`${(!(touched && touched.officeAddress && touched.officeAddress.state) && !(errors && errors.officeAddress && errors.officeAddress.state))}`}
                                                error={(touched && touched.officeAddress && touched.officeAddress.state) && (errors && errors.officeAddress && errors.officeAddress.state)}
                                            />
                                            <SelectBox
                                                name={"officeAddress.lga"}
                                                placeholder={"Local Government Area"}
                                                value={values.officeAddress.lga}
                                                options={(values.officeAddress && values.officeAddress.state) ? selectAreasByState(values.officeAddress.state, localAreas) : []}
                                                handleChange={handleChange}
                                                valid={`${(!(touched && touched.officeAddress && touched.officeAddress.lga) && !(errors && errors.officeAddress && errors.officeAddress.lga))}`}
                                                errors={(touched && touched.officeAddress && touched.officeAddress.lga) && (errors && errors.officeAddress && errors.officeAddress.lga)}
                                            />
                                        </InputBlock>
                                    </Fragment>
                                )}
                                {selectedFields.includes('BANK_ACCOUNT') && (
                                    <Fragment>
                                        <Message top={"16px"} bottom={"0"}>Bank account:</Message>
                                        <InputBlock>
                                            <InputWithLabel
                                                label={"Account Number"}
                                                type={"text"}
                                                noClearButton
                                                value={values.bank.accountNumber}
                                                placeholder={"Account Number"}
                                                name={"bank.accountNumber"}
                                                valid={`${!(touched && touched.bank && touched.bank.accountNumber) && !(errors && errors.bank && errors.bank.accountNumber)}`}
                                                errors={(touched && touched.bank && touched.bank.accountNumber) && (errors && errors.bank && errors.bank.accountNumber)}
                                                setFieldValue={setFieldValue}
                                                initialValues={initialValues}
                                            />
                                            <OpenOverlaySelectBox onClick={() => setOpenSelectBank(!openSelectBank)}>
                                                {values.bank.name || "Bank"}
                                            </OpenOverlaySelectBox>
                                        </InputBlock>
                                        {openSelectBank && (
                                            <SelectBank
                                                open={openSelectBank}
                                                setOpen={setOpenSelectBank}
                                                selectedBank={selectedBank}
                                                setSelectedBank={setSelectedBank}
                                                getAvailableBanks={getAvailableBanks}
                                                setFieldValue={setFieldValue}
                                                fieldName={"bank.name"}
                                            /> 
                                        )}
                                    </Fragment>
                                )}
                            </InputBlock>
                            <LightRippleButton
                                top={"8px"} 
                                type={"button"}
                                onClick={() => setOpenAddFields(!openAddFields)}
                            >
                                Add New Field
                            </LightRippleButton>                       
                            <RippleButton
                                disabled={
                                    (values.phoneNumber === "") || 
                                    (values.name === "")
                                } 
                                top={"36px"} 
                                type={"submit"}
                            >
                                Update Customer
                            </RippleButton>
                        </Form>
                    )}    
                    </Formik>
                    {openAddFields && (
                        <AddFields
                            open={openAddFields}
                            setOpen={setOpenAddFields}
                            selectedFields={selectedFields}
                            setSelectedFields={setSelectedFields}
                        />
                    )}
                </ViewContainer>
            </ScreenContainer>
        </Fragment>
    )
};

export default connect(
    null,
    { 
        updateCustomer,
        getAvailableBanks
    }
)(withRouter(EditCustomerDetails));