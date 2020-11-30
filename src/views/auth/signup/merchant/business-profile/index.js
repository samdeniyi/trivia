import React, { Fragment, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { MerchantBusinessProfileValidationSchema } from './MerchantBusinessProfileValidationSchema';
import { saveMerchantBusinessProfile, verifyShopName } from '../../../../../redux/ducks/auth/signup/merchant/actions';
// import { getCategories } from '../../../../../redux/ducks/applications/my-shop/actions/shop';
import { localAreas } from '../../../../../data/countries/nigeria/localAreas';
import { states } from '../../../../../data/countries/nigeria/states';
import { selectAreasByState } from '../../../../../utils/inputs/selectAreasByState';
import { ScreenContainer } from '../../../../../containers/ScreenContainer';
import { Message } from '../../../../../containers/MessageContainer';
import { InputBlock } from '../../../../../containers/InputContainer';
import BusinessProfileIcon from './assets/business_profile.svg';
import { 
    TopHeader, 
    PageLogo, 
    PageProgress, 
    RippleButton, 
    InputWithLabel, 
    SelectBox,
    MultipleLabelsSelect,
    Loader
} from '../../../../../components';

const MerchantBusinessProfile = ({
    isLoading,
    saveMerchantBusinessProfile,
    // getCategories,
    verifyShopName
}) => {
    const selectedLabels = useRef([]);
    const businessPhoneNumber = useSelector(state => state.user.msisdn);
    const email = useSelector(state => state.user.email);
    const categories = useSelector(state => state.applications.myShop.businessCategories);
    
    // useEffect(() => {
    //     getCategories();
    // }, [getCategories]);
    
    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Business Profile"} />
            <ScreenContainer>
                <PageLogo top={"64px"} Icon={BusinessProfileIcon} />
                <PageProgress step={2} amount={3} />
                <Message align={"left"} bottom={"24px"}>
                    Please provide the following information to setup your business profile.
                </Message>
                <Formik
                    initialValues={{
                        businessName: "",
                        streetAddress: "",
                        state: "",
                        businessPhoneNumber,
                        email,
                        lga: "",
                        businessCategories: []
                    }}
                    validationSchema={MerchantBusinessProfileValidationSchema}
                    onSubmit={(values, { setErrors }) => {
                        verifyShopName(values.businessName, setErrors, "businessName").then(status => {
                            if (status === true) {
                                saveMerchantBusinessProfile({ 
                                    ...values, 
                                    businessCategories: categories
                                        .filter(category => values.businessCategories.includes(category.name))
                                        .map(category => category.id)
                                });
                            };
                        });
                    }}
                >
                {({ handleChange, errors, values, touched, setFieldValue, initialValues }) => (
                    <Form>
                        <InputBlock>
                            <InputWithLabel
                                label="Business name"
                                placeholder="Business name" 
                                value={values.businessName}
                                name="businessName" 
                                type="text"                         
                                errors={(touched && touched.businessName) && (errors && errors.businessName)}
                                valid={`${(touched.businessName && !errors.businessName)}`}
                                setFieldValue={setFieldValue}
                                initialValues={initialValues}
                            />
                            {!email && (
                                <InputWithLabel
                                    label="email"
                                    placeholder="Email" 
                                    value={values.email}
                                    name="email" 
                                    type="text"                         
                                    errors={(touched && touched.email) && (errors && errors.email)}
                                    valid={`${(touched.email && !errors.email)}`}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                            )}
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
                                value={values && values.lga}
                                options={values.state ? selectAreasByState(values.state, localAreas) : []}
                                handleChange={handleChange}
                                valid={`${(!touched.lga && !errors.lga)}`}
                                error={(touched && touched.lga) && (errors && errors.lga)}  
                            />
                            <MultipleLabelsSelect
                                title={"Business categories"}
                                selectedLabels={selectedLabels}
                                setValue={setFieldValue}
                                name={"businessCategories"}
                                sortedList={categories.map(category => category.name)}
                            />
                        </InputBlock>
                        <RippleButton
                            type="submit"
                            top={"24px"}
                            disabled={Object.values(values).some(value => value.length === 0)}
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

export default connect(
    null,
    { 
        saveMerchantBusinessProfile,
        // getCategories,
        verifyShopName
    }
)(MerchantBusinessProfile);