import React, { Fragment } from 'react';
import { Formik, Form } from 'formik';
import { func } from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { AgentSelectRegionValidationSchema } from './AgentSelectRegionValidationSchema';
import { states } from '../../../../data/countries/nigeria/states';
import { localAreas } from '../../../../data/countries/nigeria/localAreas';
import { selectAreasByState } from '../../../../utils/inputs/selectAreasByState';
import { saveMerchantRegion } from '../../../../redux/ducks/auth/signup/agent/actions';
import { countriesMap } from '../../../../data/countries';
import { findMapKeyByValues } from '../../../../utils/inputs/findMapKeyByValues';

import {
    TopHeader,
    PageProgress,
    PageLogo,
    RippleButton,
    SelectBox
} from '../../../../components';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import { InputBlock } from '../../../../containers/InputContainer';
import { Message } from '../../../../containers/MessageContainer';
import GlobeLogo from './assets/globe.svg';

const UMAgentRegionSelection = ({
    saveMerchantRegion
}) => {
    const regionData = useSelector(state => state.user.regionData);
    
    return (
        <Fragment>
            <TopHeader title={"Region Selection"} />
            <ScreenContainer>
                <PageLogo top={"64px"} Icon={GlobeLogo} />
                <PageProgress step={1} amount={4} />
                <Message align={"left"} bottom={"24px"}>Select a location where you’ll be using the app to help us customize your experience.</Message>
                <Formik
                    initialValues={{
                        country: (regionData.country && findMapKeyByValues(countriesMap, regionData.country)) || '',
                        state: regionData.state || '',
                        lga: regionData.lga || ''
                    }}
                    validationSchema={AgentSelectRegionValidationSchema}
                    onSubmit={(values) => {
                        setTimeout(() => {
                            saveMerchantRegion({
                                country: findMapKeyByValues(countriesMap, values.country),
                                state: values.state,
                                lga: values.lga
                            });
                        }, 400);
                    }}>
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <InputBlock>
                                <SelectBox 
                                    name={"country"}
                                    placeholder={"Select country"}
                                    value={values && values.country}
                                    options={[{ value: "NG", label: "Nigeria" }]}
                                    handleChange={handleChange}
                                    valid={`${(!touched.state && !errors.state)}`}
                                    error={(touched && touched.state) && (errors && errors.state)}
                                />
                                <SelectBox 
                                    name={"state"}
                                    placeholder={"State"}
                                    value={values && values.state}
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
                                <RippleButton
                                    type="submit"
                                    disabled={Object.values(values).some(value => value.length === 0)}
                                >
                                    Continue
                                </RippleButton>
                            </InputBlock>
                        </Form>
                    )}
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

UMAgentRegionSelection.propTypes = {
    saveMerchantRegion: func
};

export default connect(
    null, 
    { saveMerchantRegion }
)(UMAgentRegionSelection)
