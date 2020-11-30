import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { addCustomer } from '../../../../../redux/ducks/applications/my-shop/actions/customers';
import { insertZero } from '../../../../../utils/inputs/formatPhoneNumber';
import { states } from '../../../../../data/countries/nigeria/states';
import { localAreas } from '../../../../../data/countries/nigeria/localAreas';
import { selectAreasByState } from '../../../../../utils/inputs/selectAreasByState';

import { TopHeader, RippleButton, InputWithLabel, SelectBox, SelectBank } from '../../../../../components';
import { Message, Error } from '../../../../../containers/MessageContainer';
import { ScreenContainer } from '../../../../../containers/ScreenContainer';
import { InputBlock, OpenOverlaySelectBox } from '../../../../../containers/InputContainer';
import { AddCustomerValidationSchema } from './AddCustomerValidationSchema';
import { LightRippleButton } from '../../../../../components/button';
import { AddFields } from '../add-fields';
import { getAvailableBanks } from '../../../../../redux/ducks/account/wallet/actions/bank-account';

const AddCustomerContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 72px;
`;

const AddCustomer = ({
    addCustomer,
    getAvailableBanks
}) => {
    const [selectedFields, setSelectedFields] = useState([]);
    const [openSelectBank, setOpenSelectBank] = useState(false);
    const [selectedBank, setSelectedBank]     = useState(undefined);
    const [openAddFields, setOpenAddFields]   = useState(false);

    return (
        <Fragment>
            {(!openAddFields && !openSelectBank) && <TopHeader title={"Customers"} />}
            <ScreenContainer>
                <AddCustomerContainer>
                    <Message top={"0"} bottom={"24px"}>Please provide the following details to add a new customer.</Message>
                    <Formik
                        initialValues={{
                            name: "",
                            phoneNumber: "",
                            email: "",
                            homeAddress: {
                                address: "",
                                state: "",
                                lga: ""
                            },
                            officeAddress: {
                                address: "",
                                state: "",
                                lga: ""
                            },
                            bank: {
                                name: "",
                                accountNumber: ""
                            }
                        }}
                        validationSchema={AddCustomerValidationSchema}
                        onSubmit={values => {
                            setTimeout(() => {
                                values.phoneNumber = insertZero(values.phoneNumber);
                                addCustomer(values);
                            }, 200);
                        }}
                    >
                    {({ errors, touched, setFieldValue, initialValues, handleChange, values }) => (
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
                                    type={"number"}
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
                                                noClearButton
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
                                            {errors && errors.homeAddress && errors.homeAddress.state && (<Error>{errors.homeAddress.state}</Error>)}
                                            <SelectBox
                                                name={"homeAddress.lga"}
                                                placeholder={"Local Government Area"}
                                                value={values.homeAddress.lga}
                                                options={(values.homeAddress && values.homeAddress.state) ? selectAreasByState(values.homeAddress.state, localAreas) : []}
                                                handleChange={handleChange}
                                                valid={`${(!(touched && touched.homeAddress && touched.homeAddress.lga) && !(errors && errors.homeAddress && errors.homeAddress.lga))}`}
                                                errors={(touched && touched.homeAddress && touched.homeAddress.lga) && (errors && errors.homeAddress && errors.homeAddress.lga)}
                                            />
                                            {errors && errors.homeAddress && errors.homeAddress.lga && (<Error>{errors.homeAddress.lga}</Error>)}
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
                                            {errors && errors.officeAddress && errors.officeAddress.state && (<Error>{errors.officeAddress.state}</Error>)}
                                            <SelectBox
                                                name={"officeAddress.lga"}
                                                placeholder={"Local Government Area"}
                                                value={values.officeAddress.lga}
                                                options={(values.officeAddress && values.officeAddress.state) ? selectAreasByState(values.officeAddress.state, localAreas) : []}
                                                handleChange={handleChange}
                                                valid={`${(!(touched && touched.officeAddress && touched.officeAddress.lga) && !(errors && errors.officeAddress && errors.officeAddress.lga))}`}
                                                errors={(touched && touched.officeAddress && touched.officeAddress.lga) && (errors && errors.officeAddress && errors.officeAddress.lga)}
                                            />
                                            {errors && errors.officeAddress && errors.officeAddress.lga && (<Error>{errors.officeAddress.lga}</Error>)}
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
                                            {(errors && errors.bank && errors.bank.name) && <Error>{errors.bank.name}</Error>}
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
                                Create Customer
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
                </AddCustomerContainer>
            </ScreenContainer>
        </Fragment>
    );
};

export default connect(
    null,
    { 
        addCustomer,
        getAvailableBanks
    }
)(AddCustomer);