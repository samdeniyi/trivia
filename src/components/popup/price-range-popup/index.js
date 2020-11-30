import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { bool, func } from "prop-types";
import { ValidationSchema } from "./validationSchema";

import {
    PopUp,
    PopUpContent,
    PopUpHeader,
    InfoMessage,
    ConfirmButton
} from "../common";
import { Overlay, ActionBlock } from "../../../containers/OverlayContainer";
import { InputWithLabel } from "../../../components/forms/input/text";

const Header = styled(PopUpHeader)`
    font-weight: 700;
`;

export const PriceRangePopup = ({
    open,
    setFilterPrice,
    cancel,
}) => {
    return (
        <PopUp open={open}>
            <Overlay onClick={cancel} nonSliding={true}></Overlay>
            <PopUpContent>
                <Header align={"left"}>Price</Header>
                <InfoMessage>Please enter amount range.</InfoMessage>
                <Formik
                    initialValues={{}}
                    validationSchema={ValidationSchema}
                    onSubmit={values => {
                        setTimeout(() => {
                            setFilterPrice(values);
                        }, 400);
                    }}
                >
                    {({ errors, values }) => (
                        <Form>
                            <ActionBlock direction={"row"} top={"10px"}>
                                <InputWithLabel
                                    label={"Minimum"}
                                    type={"number"}
                                    placeholder={"Minimum"}
                                    name="minPrice"
                                    width={"90%"}
                                    left={"5%"}
                                    right={"5%"}
                                    top={"20px"}
                                />
                                <InputWithLabel
                                    label={"Maximum"}
                                    type={"number"}
                                    placeholder={"Maximum"}
                                    name="maxPrice"
                                    width={"90%"}
                                    left={"5%"}
                                    right={"5%"}
                                    top={"20px"}
                                />
                            </ActionBlock>
                            <ConfirmButton
                                type="submit"
                                disabled={
                                    Object.entries(values).length !== 2 &&
                                    Object.entries(errors) !== 0
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

PriceRangePopup.propTypes = {
    open: bool,
    setFilterPrice: func,
    cancel: func
};