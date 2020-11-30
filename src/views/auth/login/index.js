import React, {Fragment, useState, useEffect} from 'react';
import styled from 'styled-components';
import {connect, useSelector} from 'react-redux';
import {bool, func} from 'prop-types';
import {getInputValues} from '../../../utils/inputs/getInputValues';
import {loginUser} from '../../../redux/ducks/user/actions';
import {resetPassword} from '../../../redux/ducks/user/actions/password';
import FallbackUserAvatar from './assets/user.svg';
import {Formik, Form} from 'formik';
import {LoginValidationSchema} from './LoginValidationSchema';
import {ScreenContainer} from '../../../containers/ScreenContainer';
import {Message, Title} from '../../../containers/MessageContainer';
import {Link} from 'react-router-dom';
import {
    Loader,
    TopHeader,
    PasswordGroup,
    RippleButton,
    PageLogo
} from '../../../components';
import {getUserPublicData} from '../../../redux/ducks/auth/login/actions';

const LoginContainer = styled.div`
    margin-top: 8px;
`;

const ForgotPassword = styled(Link)`
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
`;

const SwitchAccount = styled.span`
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
`;

const AlternativeOptionBlock = styled.section`
    display: flex;
    flex-direction: column;
`;

const Login = ({
                   isLoading,
                   loginUser,
                   resetPassword,
                   getUserPublicData,
                   avatar,
                   firstName
               }) => {
    const [value, setValue] = useState(null);
    const [userData, setUserData] = useState(null);
    const userId = useSelector(state => state.user.userId);

    useEffect(() => {
        userId && getUserPublicData(userId).then(data => setUserData(data));
    }, [getUserPublicData, userId, firstName]);

    return (
        isLoading ?
            <Loader/> :
            <Fragment>
                <TopHeader title={"Login"}/>
                <ScreenContainer>
                    {userData &&
                        <Fragment>
                            <PageLogo
                                top={"64px"}
                                Icon={avatar && avatar !== "Not Set" ? avatar : FallbackUserAvatar}
                                iconWidth={(avatar || userData.avatar) ? '100%' : '84%'}
                                iconHeight={(avatar || userData.avatar) ? '72px' : '100%'}
                                objectFit="cover"
                            />
                            <Title top={"20px"} textAlign="left">Welcome back, {firstName || userData.firstName}!</Title>
                        </Fragment>
                    }
                    <LoginContainer>
                        <Message bottom={"24px"} top={"0"}>Enter your pin to login to your account</Message>
                        <Formik
                            initialValues={{
                                password: ''
                            }}
                            validationSchema={LoginValidationSchema}
                            onSubmit={values => loginUser(values.password)}
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
                                        enteredValue={value || undefined}
                                        handleChange={event => {
                                            setValue(event.target.value);
                                            setFieldValue('password', getInputValues('password'));
                                        }}
                                    />
                                    <RippleButton
                                        type="submit"
                                        disabled={
                                            (values.password.length < 6) ||
                                            isLoading
                                        }
                                    >
                                        Login
                                    </RippleButton>
                                </Form>
                            )}
                        </Formik>
                        <AlternativeOptionBlock>
                            <ForgotPassword to="/user/password_forgot" onClick={() => resetPassword()}>Forgot Your
                                Pin?</ForgotPassword>
                            <SwitchAccount>Not you? <Link to="/phone-signup">Switch Account</Link></SwitchAccount>
                        </AlternativeOptionBlock>
                    </LoginContainer>
                </ScreenContainer>
            </Fragment>
    );
};

Login.propTypes = {
    isLoading: bool,
    loginUser: func,
    resetPassword: func
};

const mapStateToProps = ({user, auth}) => ({
    isLoading: auth.login.isLoading,
    avatar: user.avatar,
    firstName: user.firstName
});

export default connect(
    mapStateToProps,
    {
        loginUser,
        resetPassword,
        getUserPublicData
    }
)(Login);