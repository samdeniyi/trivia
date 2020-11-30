import React, { Fragment, useRef, useState } from 'react';
import { func } from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { states } from '../../../../../data/countries/nigeria/states';
import { localAreas } from '../../../../../data/countries/nigeria/localAreas';
import { selectAreasByState } from '../../../../../utils/inputs/selectAreasByState';
import { createShop, createAgentShop } from '../../../../../redux/ducks/applications/my-shop/actions/shop';

import { ScreenContainer } from '../../../../../containers/ScreenContainer';
import { ShopSetupValidationSchema } from './ShopSetupValidationSchema';
import { InputBlock } from '../../../../../containers/InputContainer';
import {
    TopHeader,
    InputWithLabel,
    SelectBox,
    MultipleLabelsSelect,
    RippleButton,
    NoConnection
} from '../../../../../components';

const SetupShop = ({
    createShop,
    createAgentShop
}) => {
    const selectedLabels = useRef([]);
    const setFormikErrors = useRef(undefined);
    const [networkErrorOpen, setNetworkErrorOpen] = useState(false);
    const businessPhoneNumber = useSelector(state => state.user.msisdn);
    const email = useSelector(state => state.user.email);
    const categories = useSelector(state => state.applications.myShop.businessCategories);
    const role = useSelector(state => state.user.role);

    const submitShop = (values, setErrors, setNetworkErrorOpen) => {
        if (role === 'ROLE_AGENT') {
            const categoriesObjects = categories
                .filter(category => values.businessCategories.includes(category.name))
                .map(category => ({ businessId: category.id, name: category.name }));

            const data = {
                adress: values.streetAddress,
                localGovt: values.lga,
                businessCategories: categoriesObjects,
                name: values.shopName,
                state: values.countryState
            };

            createAgentShop(data, setErrors, setNetworkErrorOpen);
        } else {
            createShop(values, setErrors, setNetworkErrorOpen);
        };
    };

    return (
        <Fragment>
            {!networkErrorOpen && <TopHeader title={"Shop setup"} withSpacesHeader/>}
            <ScreenContainer>
                <Formik
                    initialValues={{
                        shopName: "",
                        streetAddress: "",
                        countryState: "",
                        businessPhoneNumber,
                        email,
                        lga: "",
                        businessCategories: []
                    }}
                    validationSchema={ShopSetupValidationSchema}
                    onSubmit={(values, { setErrors }) => {
                        setFormikErrors.current = setErrors;
                        submitShop(values, setErrors, setNetworkErrorOpen)
                    }}
                >
                {({ handleChange, errors, values, touched, setFieldValue, initialValues }) => (
                    <Form style={{ marginTop: "64px"}}>
                        <InputBlock>
                            <InputWithLabel
                                label="Shop name"
                                placeholder="Shop name"
                                value={values.shopName}
                                name="shopName"
                                type="text"
                                errors={(touched && touched.shopName) && (errors && errors.shopName)}
                                valid={`${(touched.shopName && !errors.shopName)}`}
                                setFieldValue={setFieldValue}
                                initialValues={initialValues}
                                bottom={"23px"}
                            />
                            <InputWithLabel
                                label="Street address"
                                placeholder="Street address"
                                value={values.streetAddress}
                                name="streetAddress"
                                type="text"
                                errors={(touched && touched.streetAddress) && (errors && errors.streetAddress)}
                                valid={`${(touched.streetAddress && !errors.streetAddress)}`}
                                setFieldValue={setFieldValue}
                                initialValues={initialValues}
                                bottom={"15px"}
                            />
                            <SelectBox
                                name={"countryState"}
                                placeholder={"State"}
                                value={values.countryState}
                                options={states}
                                bottom={"15px"}
                                handleChange={handleChange}
                                valid={`${(!touched.countryState && !errors.countryState)}`}
                                error={(touched && touched.countryState) && (errors && errors.countryState)}
                            />
                            <SelectBox
                                name={"lga"}
                                placeholder={"Local Government Area"}
                                value={values.lga}
                                options={values.countryState ? selectAreasByState(values.countryState, localAreas) : []}
                                handleChange={handleChange}
                                valid={`${(!touched.lga && !errors.lga)}`}
                                error={(touched && touched.lga) && (errors && errors.lga)}
                                bottom={"15px"}
                            />
                            <MultipleLabelsSelect
                                title={"Business categories"}
                                selectedLabels={selectedLabels}
                                setValue={setFieldValue}
                                name={"businessCategories"}
                                sortedList={categories.map(category => category.name)}
                            />
                            {networkErrorOpen && (
                                <NoConnection
                                    open={networkErrorOpen}
                                    setOpen={setNetworkErrorOpen}
                                    tryAgain={() => {
                                        setNetworkErrorOpen(!networkErrorOpen)
                                        createShop(values, setFormikErrors.current, setNetworkErrorOpen)
                                    }}
                                />
                            )}
                            <ErrorMessage
                                name={"businessCategories"}
                                component="div"
                                className="form-error"
                            />
                        </InputBlock>
                        <RippleButton
                            type="submit"
                            top={"24px"}
                            disabled={Object.values(values).some(value => value && value.length === 0)}
                        >
                            Save
                        </RippleButton>

                    </Form>
                )}
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

SetupShop.propTypes = {
    createShop: func
};

export default connect(
    null,
    { createShop, createAgentShop }
)(SetupShop);