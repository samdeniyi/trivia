import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { string, func, bool } from 'prop-types';
import { Close } from '../../../../../containers/HeaderContainer';
import { UpdateDeliveryDetailsValidationSchema } from './UpdateDeliveryDetailsValidationSchema';
import { ScreenContainer } from '../../../../../containers/ScreenContainer';
import { InputBlock } from '../../../../../containers/InputContainer';
import {
    TopHeader,
    RippleButton,
    InputWithLabel,
    SelectBox
} from '../../../../../components';
import { merchbuyActions } from "../../../../../redux/ducks/applications/merchbuy/actions";
import { mapLgaByAvaliableStates } from "../../../../../utils/inputs/mapLgaByAvaliableStates";
import { mapAvailableStates } from "../../../../../utils/inputs/mapAvailableStates"

const UpdateDeliveryContainer = styled.div`
    margin-top: 24px;
`;

const Modal = styled.div`
    position: fixed; 
    z-index: 5000000; 
    padding: 50px 0;
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: white
`;

export const UpdateDeliveryDetails = ({
    open,
    cancel,
    //receiverName,
    //shopName,
    //streetAddress,
    //lga,
    //state,
    //msisdn,
    //instruction,
    getDeliveryDetails
}) => {

    const dispatch = useDispatch();
    const deliveryLocation = useSelector(
        state => state.applications.merchbuy.deliveryLocation
    );
    const listOfAvailableStates = useSelector(
        (state) => state.applications.merchbuy.availableStates
    );
    useEffect(() => {
        dispatch(merchbuyActions.getAVailableStates());
    }, [dispatch]);
     
    return (
        open && (
            <Modal>
            <TopHeader title={"Delivery Details"} noArrow>
                <Close left={"16px"} onClick={
                    cancel
                } />
            </TopHeader>
            <ScreenContainer>
                <UpdateDeliveryContainer>
                    <Formik
                        initialValues={{
                            receiverName: (deliveryLocation && deliveryLocation.receiverName) || "",
                            shopName: (deliveryLocation && deliveryLocation.shopName) || "",
                            streetAddress: (deliveryLocation && deliveryLocation.streetAddress) || "",
                            state: (deliveryLocation && deliveryLocation.state) || "",
                            lga: (deliveryLocation && deliveryLocation.lga) || "",
                            msisdn: (deliveryLocation && deliveryLocation.msisdn) || "",
                            instruction: (deliveryLocation && deliveryLocation.instruction) || ""
                        }}
                        validationSchema={UpdateDeliveryDetailsValidationSchema}
                        onSubmit={values => {
                            setTimeout(() => {
                                dispatch(merchbuyActions.updateDeliveryLocation(values));
                                getDeliveryDetails(values)
                            }, 200);
                        }}
                    >
                    {({ errors, touched, values, handleChange, setFieldValue, initialValues }) => (
                        <Form>
                            <InputBlock>
                                
                                <InputWithLabel
                                    label={"Receiver's name"}
                                    type={"text"}
                                    value={values.receiverName} 
                                    placeholder={"Receiver's name"} 
                                    name="receiverName"
                                    valid={`${(!touched.receiverName && !errors.receiverName)}`}
                                    errors={(touched && touched.receiverName) && (errors && errors.receiverName)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                
                                <InputWithLabel 
                                    label={"Shop name"}
                                    type={"text"}
                                    value={values.shopName} 
                                    placeholder={"Shop name(Optional)"} 
                                    name="shopName"
                                    valid={`${(touched.shopName && !errors.shopName)}`}
                                    errors={(touched && touched.shopName) && (errors && errors.shopName)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />

                                <InputWithLabel 
                                    label={"Street address"}
                                    type={"text"}
                                    value={values.streetAddress} 
                                    placeholder={"Street address"} 
                                    name="streetAddress"
                                    valid={`${(touched.streetAddress && !errors.streetAddress)}`}
                                    errors={(touched && touched.streetAddress) && (errors && errors.streetAddress)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />

                                <SelectBox
                                    name={"state"}
                                    placeholder={"State"}
                                    value={values.state}
                                    options={mapAvailableStates(listOfAvailableStates)}
                                    handleChange={handleChange}
                                    valid={`${!touched.state && !errors.state}`}
                                    error={touched && touched.state && errors && errors.state}
                                />

                                <SelectBox
                                    name={"lga"}
                                    placeholder={"Local Government Area"}
                                    value={values.lga}
                                    options={
                                        values.state
                                            ? mapLgaByAvaliableStates(
                                                  values.state,
                                                  listOfAvailableStates
                                              )
                                            : []
                                    }
                                    handleChange={handleChange}
                                    valid={`${!touched.lga && !errors.lga}`}
                                    error={touched && touched.lga && errors && errors.lga}
                                />

                                <InputWithLabel 
                                    label={"Phone Number"}
                                    type={"text"}
                                    value={values.msisdn} 
                                    placeholder={"Phone Number"}
                                    name="msisdn"
                                    valid={`${(touched.msisdn && !errors.msisdn)}`}
                                    errors={(touched && touched.msisdn) && (errors && errors.msisdn)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                               
                               <InputWithLabel 
                                    label={"Delivery Instructions"}
                                    type={"text"}
                                    value={values.instruction} 
                                    placeholder={"Delivery Instructions(Optional)"} 
                                    name="instruction"
                                    valid={`${(touched.instruction && !errors.instruction)}`}
                                    errors={(touched && touched.instruction) && (errors && errors.instruction)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                            
                                <RippleButton 
                                    type="submit"
                                >
                                    Save
                                </RippleButton>
                            </InputBlock>
                        </Form>
                    )}
                    </Formik>
                </UpdateDeliveryContainer>
            </ScreenContainer>
        </Modal>
         )
    );

};

UpdateDeliveryDetails.propTypes = {
    open:                   bool,
    cancel:                 func,
    receiverName:           string,
    shopName:               string,
    streetAddress:          string,
    state:                  string,
    lga:                    string,
    instruction:            string,
    msisdn:                 string,
    getDeliveryDetails:     func,
};