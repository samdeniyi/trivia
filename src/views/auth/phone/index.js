import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { bool, func } from 'prop-types';
import { PhoneNumberSignUpValidationSchema } from './PhoneNumberSignUpValidationSchema';
import { sendTelephone } from '../../../redux/ducks/auth/phone/actions';
import { flags, countriesData } from '../../../data/countries';
import { listToAlphabetMap } from '../../../utils/sorting/alphabeticSort';
import { getCategories } from '../../../redux/ducks/applications/my-shop/actions/shop';

import {
    Loader,
    InputWithLabel,
    TopHeader,
    RippleButton,
    PageLogo,
    SelectCountryOverlay
} from '../../../components';
import { Message } from '../../../containers/MessageContainer';
import { ScreenContainer } from '../../../containers/ScreenContainer';
import PhoneLogo       from './assets/phone.svg';
import ChevronDownIcon from '../../../assets/chevron_down.svg';

const CountryPhoneBlock = styled.div`
    position: relative;
`;

const CurrentSelectedCountry = styled.div`
    position: absolute;
    left: 16px;
    top: 12px;
    z-index: 2;
    cursor: pointer;

    &::after {
        content: url(${ ChevronDownIcon });
        position: absolute;
        width: 24px;
        height: 24px;
        text-align: center;
        cursor: pointer;
        top: 3px;
    }
`;

const CountryFlag = styled.img`
    width: 24px;
    height: 24px;
`;

const PhoneNumberSignUp = ({
    isLoading,
    sendTelephone,
    getCategories,
}) => {
    const [openCountrySelect, setOpenCountrySelect] = useState(false);
    const countriesInfo = listToAlphabetMap(
        countriesData.filter(country => country.name === "Nigeria").map(country => country.name)
    );

    useEffect(() => {
        getCategories();
	}, [getCategories]);

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={'Phone Number'} />
            <ScreenContainer>
                <PageLogo top={"64px"} Icon={PhoneLogo} />
                <Message bottom={"24px"} top={"24px"}>Enter your phone number to login or create a new account</Message>
                <Formik
                    initialValues={{
                        phoneNumber: '',
                        country: 'NG'
                    }}
                    validationSchema={PhoneNumberSignUpValidationSchema}
                    onSubmit={(values, { resetForm }) => {
                        setTimeout(() => {
                            resetForm();
                            sendTelephone(values.phoneNumber, values.country);
                        }, 1000);
                    }}
                >
                    {({ touched, values, errors, initialValues, setFieldValue }) => (
                        <Form>
                            <CountryPhoneBlock>
                                <CurrentSelectedCountry>
                                    <CountryFlag
                                        onClick={() => setOpenCountrySelect(!openCountrySelect)}
                                        src={flags.filter(flag => flag.customAbbreviation === values.country)[0].value}
                                        alt={flags.filter(flag => flag.customAbbreviation === values.country)[0].label}
                                    />
                                </CurrentSelectedCountry>
                                <SelectCountryOverlay
                                    open={openCountrySelect}
                                    setOpen={setOpenCountrySelect}
                                    countriesInfo={countriesInfo}
                                    currentCountry={values.country}
                                    setCountry={setFieldValue}
                                />
                                <InputWithLabel
                                    label="Phone number"
                                    placeholder="Phone number"
                                    name="phoneNumber"
                                    type="number"
                                    inputMode={"tel"}
                                    onKeyUp={e => e.target.value =  e.target.value.replace(/\s/g, '')}
                                    autoComplete={"tel"}
                                    countryselection={true}
                                    errors={(touched && touched.phoneNumber) && (errors && errors.phoneNumber)}
                                    valid={`${(touched.phoneNumber && !errors.phoneNumber)}`}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                            </CountryPhoneBlock>
                            <RippleButton
                                type="submit"
                                disabled={
                                    (values.phoneNumber.length < 10) ||
                                    (errors.phoneNumber)
                                }
                                top={"8px"}
                            >
                                Continue
                            </RippleButton>
                        </Form>
                    )}
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

PhoneNumberSignUp.propTypes = {
    isLoading:     bool,
    sendTelephone: func
};

const mapStateToProps = ({ auth }) => ({
	isLoading: auth.phone.isLoading
});

export default connect(
    mapStateToProps,
    { sendTelephone, getCategories }
)(PhoneNumberSignUp);