import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { bool, func } from 'prop-types';
import { Formik, Form } from 'formik';
import { KYCAddressValidationSchema } from './KYCAddressValidationSchema'
import { states } from '../../../../../data/countries/nigeria/states';
import { localAreas } from '../../../../../data/countries/nigeria/localAreas';
import { selectAreasByState } from '../../../../../utils/inputs/selectAreasByState';
import { emptyValues } from '../../../../../utils/inputs/conditions';
import { parseAddressToObject } from '../../../../../utils/inputs/parseAddressToObject';
import { sendKYCAddress } from '../../../../../redux/ducks/account/kyc/actions';

import {
    TopHeader,
    SelectBox,
    RippleButton,
    Loader,
    InputWithLabel,
    SelectCountry
} from '../../../../../components';
import { Message } from '../../../../../containers/MessageContainer';
import { ScreenContainer } from '../../../../../containers/ScreenContainer';
import { InputBlock } from '../../../../../containers/InputContainer';

const AddressContainer = styled.div`
    margin-top: 72px;
`;

const KYCAddressSelection = ({
    isLoading,
    sendKYCAddress,
    houseAddress
}) => {
    const addressData = parseAddressToObject(houseAddress);
    const country     = useSelector(state => state.user.country);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Address"} />
            <ScreenContainer>
                <AddressContainer>
                    <Message align={"left"}>Please provide your residential address.</Message>
                    <Formik
                        initialValues={{
                            streetAddress: addressData.streetAddress || "",
                            country: addressData.country ? addressData.country : country ? country : "",
                            state: addressData.state || "",
                            lga: addressData.lga || ""
                        }}
                        enableReinitialize
                        validationSchema={KYCAddressValidationSchema}
                        onSubmit={(values) => {
                            setTimeout(() => {
                                sendKYCAddress(values);
                            }, 400);
                        }}
                    >
                    {({ errors, touched, setFieldValue, initialValues, values, handleChange }) => (
                        <Form>
                            <InputBlock>
                                <InputWithLabel
                                    label={"Street Address"}
                                    type={"text"}
                                    value={values.streetAddress} 
                                    placeholder={"Street Address"}
                                    name="streetAddress"
                                    valid={`${(!touched.streetAddress && !errors.streetAddress)}`}
                                    errors={(touched && touched.streetAddress) && (errors && errors.streetAddress)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <SelectCountry
                                    name={"country"}
                                    handleChange={setFieldValue}
                                    value={values.country}
                                />
                                <SelectBox
                                    name={"state"}
                                    placeholder={"State"}
                                    value={values.state}
                                    options={states}
                                    handleChange={handleChange}
                                    valid={`${(!touched.state && !errors.state)}`}
                                    error={(touched && touched.state) && (errors && errors.state)}
                                />
                                <SelectBox
                                    name={"lga"}
                                    placeholder={"Local Government Area"}
                                    value={values.lga}
                                    options={values.state ? selectAreasByState(values.state, localAreas) : []}
                                    handleChange={handleChange}
                                    valid={`${(!touched.lga && !errors.lga)}`}
                                    error={(touched && touched.lga) && (errors && errors.lga)}
                                />
                                <RippleButton
                                    type="submit"
                                    top={"24px"}
                                    disabled={
                                        !emptyValues(values) &&
                                        emptyValues(errors)
                                    }
                                >
                                    Update
                                </RippleButton>
                            </InputBlock>
                        </Form>
                    )}
                    </Formik>
                </AddressContainer>
            </ScreenContainer>
        </Fragment>
    );
};

KYCAddressSelection.propTypes = {
    isLoading:      bool,
    sendKYCAddress: func
};

const mapStateToProps = ({ user, account }) => ({
    isLoading:    account.kyc.isLoading,
    houseAddress: user.houseAddress
});

export default connect(
    mapStateToProps,
    { sendKYCAddress }
)(KYCAddressSelection);