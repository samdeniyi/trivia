import React, { Fragment } from "react";
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

export const CouponCodePopup = ({ open, setCouponCode, cancel }) => {
    return (
      <Fragment>
          {open && (
            <Overlay
                bgc={"rgba(0, 0, 0, 0.4)"}
                zIndex={"99999"} 
                onClick={cancel} 
                nonSliding={true}
            />
        )}
        <PopUp open={open} zIndex={"100000"}>
            <PopUpContent>
                <Header align={"left"}>Coupon Code</Header>
                <InfoMessage>Enter a coupon code to get discount on this order.</InfoMessage>
                <Formik
                    initialValues={{}}
                    validationSchema={ValidationSchema}
                    onSubmit={values => {
                        setTimeout(() => {
                            setCouponCode(values);
                        }, 400);
                    }}
                >
                    {({ errors, values }) => (
                        <Form>
                            <InputWithLabel
                              label={"Coupon Code"}
                              type={"text"}
                              placeholder={"Coupon Code"}
                              name="coupon"
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
        </Fragment>
    );
};

CouponCodePopup.propTypes = {
    open: bool,
    setCouponCode: func,
    cancel: func
};