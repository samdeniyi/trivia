import React from "react";
import { Formik, Form } from "formik";
import {
    PopUp,
    PopUpContent,
    PopUpHeader,
    InfoMessage,
    ConfirmButton
} from "../popup/common";
import { Overlay } from "../../containers/OverlayContainer";
import styled from "styled-components";

import { bool, func } from "prop-types";
import { InputWithLabel } from "../forms/input/text";
import { ValidationSchema } from "./validationSchema";

const Header = styled(PopUpHeader)`
    font-weight: 700;
    padding: 12px 8px;
`;

export const EnterReferralCodePopup = ({ open, setCode, cancel }) => {
    return (
        <PopUp open={open}>
            <Overlay onClick={cancel} nonSliding={true}></Overlay>
            <PopUpContent>
                <Header align={"left"}>My Agent</Header>
                <InfoMessage>Please enter agent referral code.</InfoMessage>
                <Formik
                    initialValues={{}}
                    validationSchema={ValidationSchema}
                    onSubmit={values => {
                        setTimeout(() => {
                            setCode(values.REFERALCODES);
                        }, 400);
                    }}
                   >
                    {({ errors, values, isValid, dirty }) => (
                        <Form>
                            <InputWithLabel
                                label={"referral code"}
                                type={"text"}
                                placeholder={"referral code"}
                                name="REFERALCODES"
                                width={"90%"}
                                left={"5%"}
                                right={"5%"}
                                top={"20px"}
                           />
                            <ConfirmButton
                                type="submit"
                                disabled={!(isValid && dirty)}
                                >
                                Submit
                            </ConfirmButton>
                        </Form>
                    )}
                </Formik>
            </PopUpContent>
        </PopUp>
    );
};

EnterReferralCodePopup.propTypes = {
    open: bool,
    setCode: func,
    cancel: func
};