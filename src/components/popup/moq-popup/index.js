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
import { bool, func } from "prop-types";
import { ValidationSchema } from "./ValidationSchema";

import { InputWithLabel } from "../../../components/forms/input/text";


const Header = styled(PopUpHeader)`
    font-weight: 700;
`;

export const MoqPopup = ({ open, setMoq, cancel }) => {
    return (
        <PopUp open={open}>
            <Overlay onClick={cancel} nonSliding={true}></Overlay>
            <PopUpContent>
                <Header align={"left"}>MOQ</Header>
                <InfoMessage>Please enter minimum order quantity.</InfoMessage>
                <Formik
                    initialValues={{}}
                    validationSchema={ValidationSchema}
                    onSubmit={values => {
                        setTimeout(() => {
                            setMoq(values);
                        }, 400);
                    }}
                >
                    {({ errors, values }) => (
                        <Form>
                            <InputWithLabel
                              label={"Minimum order quantity (MOQ)"}
                              type={"number"}
                              placeholder={"MOQ"}
                              name="moq"
                              width={'90%'}
                              left={"5%"}
                              top={"20px"}
                            />
                            <ConfirmButton
                                type="submit"
                                disabled={
                                    Object.entries(values).length !== 1 &&
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

MoqPopup.propTypes = {
    open: bool,
    setMoq: func,
    cancel: func
};
