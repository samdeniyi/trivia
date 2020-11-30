import React from "react";
import {
    PopUp,
    PopUpContent,
    PopUpHeader,
    InfoMessage,
    ConfirmButton
} from "../common";
import { Overlay } from "../../../containers/OverlayContainer";
import styled from "styled-components";
import { Formik, Form } from "formik";

import { bool, func, any} from "prop-types";
import { DeliveryLocationValidationSchema } from "./DeliveryLocationValidationSchema";

import { mapLgaByAvaliableStates } from "../../../utils/inputs/mapLgaByAvaliableStates";
import { mapAvailableStates } from "../../../utils/inputs/mapAvailableStates"
import { InputBlock } from "../../../containers/InputContainer";
import { SelectBox } from "../../../components";

const Header = styled(PopUpHeader)`
    font-weight: 700;
`;

const Block = styled(InputBlock)`
    width: 90%;
    margin: 0 auto;
    padding-bottom: 20px;
`;

export const DeliveryLocationPopup = ({ open, data, getLocation }) => {
    return (
        <PopUp open={open}>
            <Overlay nonSliding={true}></Overlay>
            <PopUpContent>
                <Header align={"left"}>Delivery Location</Header>
                <InfoMessage></InfoMessage>

                <Formik
                    initialValues={{
                
                    }}
                    validationSchema={DeliveryLocationValidationSchema}
                    onSubmit={values => {
                        setTimeout(() => {
                            getLocation(values);
                        }, 400);
                    }}
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <Block>
                                <SelectBox
                                    name={"state"}
                                    placeholder={"State"}
                                    value={values.state}
                                    options={mapAvailableStates(data)}
                                    handleChange={handleChange}
                                    valid={`${!touched.state && !errors.state}`}
                                    error={
                                        touched &&
                                        touched.state &&
                                        errors &&
                                        errors.state
                                    }
                                />
                                <SelectBox
                                    name={"lga"}
                                    placeholder={"Local Government Area"}
                                    value={values.lga}
                                    options={
                                        values.state
                                            ? mapLgaByAvaliableStates(
                                                  values.state,
                                                  data
                                              )
                                            : []
                                    }
                                    handleChange={handleChange}
                                    valid={`${!touched.lga && !errors.lga}`}
                                    error={
                                        touched &&
                                        touched.lga &&
                                        errors &&
                                        errors.lga
                                    }
                                />
                            </Block>
                            <ConfirmButton
                                type="submit"
                                disabled={
                                    Object.entries(values).length !== 2 && Object.entries(errors) !== 0
                                }
                            >
                                Okay
                            </ConfirmButton>
                        </Form>
                    )}
                </Formik>
            </PopUpContent>
        </PopUp>
    );
};

DeliveryLocationPopup.propTypes = {
    open: bool,
    data: any,
    getLocation: func
};
