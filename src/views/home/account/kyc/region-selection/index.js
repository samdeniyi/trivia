import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { bool, func, string, shape } from 'prop-types';
import { KYCRegionValidationSchema } from './KYCRegionValidationSchema'
import { states } from '../../../../../data/countries/nigeria/states';
import { localAreas } from '../../../../../data/countries/nigeria/localAreas';
import { selectAreasByState } from '../../../../../utils/inputs/selectAreasByState';
import { emptyValues } from '../../../../../utils/inputs/conditions';
import { sendKYCRegion } from '../../../../../redux/ducks/account/kyc/actions';

import { Message } from '../../../../../containers/MessageContainer';
import { ScreenContainer } from '../../../../../containers/ScreenContainer';
import { InputBlock } from '../../../../../containers/InputContainer';
import {
    TopHeader,
    SelectBox,
    RippleButton,
    Loader,
    SelectCountry
} from '../../../../../components';
// import { VerificationStatus } from '../../../../../components/verification-status';

const RegionSelectionContainer = styled.div`
    margin-top: 72px;
`;

const KYCRegionSelection = ({
    isLoading,
    sendKYCRegion,
    regionData,
}) => {
    //const INCOMPLETE = "INCOMPLETE"
    const country = useSelector(state => state.user.country);
    //const agentState = useSelector(state => state.user.agentState ? state.user.agentState : "PENDING")

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Region Selection"} />
            <ScreenContainer>
                <RegionSelectionContainer>
                     {/* <FlexContainer> */}
                     {/* <VerificationStatus status={agentState} /> */}
                     <Message align={"left"}>Select a location where you’ll be using the app to help us customize your experience.</Message>
                    {/* </FlexContainer> */}
                    <Formik
                        initialValues={{
                            country: regionData.country ? regionData.country : country ? country : "",
                            state: regionData.state || "",
                            lga: regionData.lga || ""
                        }}
                        enableReinitialize
                        validationSchema={KYCRegionValidationSchema}
                        onSubmit={(values) => {
                            setTimeout(() => {
                                sendKYCRegion(values);
                            }, 400);
                        }}
                    >
                    {({ errors, touched, values, handleChange, setFieldValue }) => (
                        <Form>
                            <InputBlock>
                                <SelectCountry
                                    name={"country"}
                                    handleChange={setFieldValue}
                                    value={values.country}
                                    // disabled={agentState !== INCOMPLETE}
                                />
                                <SelectBox
                                    name={"state"}
                                    placeholder={"State"}
                                    value={values.state}
                                    options={states}
                                    handleChange={handleChange}
                                    // disabled={agentState !== INCOMPLETE}
                                    valid={`${(!touched.state && !errors.state)}`}
                                    error={(touched && touched.state) && (errors && errors.state)}
                                />
                                <SelectBox
                                    name={"lga"}
                                    placeholder={"Local Government Area"}
                                    handleChange={handleChange}
                                    value={values.lga}
                                    // disabled={agentState !== INCOMPLETE}
                                    options={values.state ? selectAreasByState(values.state, localAreas) : []}
                                    valid={`${(!touched.lga && !errors.lga)}`}
                                    error={(touched && touched.lga) && (errors && errors.lga)}
                                />
                                {/* {(agentState === INCOMPLETE) && ( */}
                                <RippleButton
                                    type="submit"
                                    top={"24px"}
                                    disabled={!emptyValues(values)}
                                >
                                    Update
                                </RippleButton>
                                {/* )} */}
                            </InputBlock>
                        </Form>
                    )}
                    </Formik>
                </RegionSelectionContainer>
            </ScreenContainer>
        </Fragment>
    );
};

KYCRegionSelection.propTypes = {
    isLoading:     bool,
    sendKYCRegion: func,
    regionData:    
        shape({
            country: string,
            state:   string,
            lga:     string
        })
};

const mapStateToProps = ({ user, account }) => ({
    isLoading:  account.kyc.isLoading,
    regionData: user.regionData,
});

export default connect(
    mapStateToProps,
    { sendKYCRegion }
)(KYCRegionSelection);