import React, {useState} from "react";

import {Form, Formik} from "formik";
import {connect} from "react-redux";
import styled from "styled-components"
import {LoginValidationSchema} from "../../views/auth/login/LoginValidationSchema";
import {PasswordGroup} from "../forms/password";
import {getInputValues} from "../../utils/inputs/getInputValues";
import {RippleButton} from "../button";
import {reloginUser} from "../../redux/ducks/user/actions";
import {Message} from "../../containers/MessageContainer";
import {toast} from "react-toastify";
import {TopHeader} from "../header";

const ModalContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content:center;
width:93%;
margin: 0 auto;
height:100vh;
`

const ValidatePasswordModal = ({isLoading, reloginUser, setOpen, next, nextProps = null, title}) => {
    const [value, setValue] = useState("");
    const [altLoading, setAltLoading] = useState(false);

    return <ModalContainer>
        <TopHeader title={title}/>
        <Message bottom={"24px"} top={"0"}>Please, enter your password to continue</Message>
        <Formik
            initialValues={{
                password: ''
            }}
            validationSchema={LoginValidationSchema}
            onSubmit={async values => {
               setAltLoading(true)
                const res = await reloginUser(values.password);
                setAltLoading(false);
                if (res.status !== 200) return toast.error("You've provided the wrong password");
                setAltLoading(true);
                await next(nextProps)
                return setOpen(false)

            }}
        >
            {({errors, valid, values, touched, setFieldValue}) => (
                <Form>
                    <PasswordGroup
                        align={"center"}
                        count={6}
                        startIndex={1}
                        type="password"
                        valid={valid}
                        name="password"
                        errors={errors}
                        touched={touched}
                        disabled={isLoading}
                        enteredValue={value || null}
                        handleChange={event => {
                            setValue(event.target.value);
                            setFieldValue('password', getInputValues('password'));
                        }}
                    />
                    <RippleButton
                        type="submit"
                        disabled={
                            (values.password.length < 6) ||
                            isLoading ||
                            altLoading
                        }
                    >
                        Confirm
                    </RippleButton>
                </Form>)
            }
        </Formik>
    </ModalContainer>
};
export default connect(null, {
    reloginUser
})(ValidatePasswordModal)