import React, {Fragment, useState} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Formik, Form} from 'formik';
import {string, func, bool} from 'prop-types';
import {UpdatePersonalDetailsValidationSchema} from './UpdatePersonalDetailsValidationSchema';
import {sendAvatar} from '../../../redux/ducks/user/actions/avatar';
import {updateUserData} from '../../../redux/ducks/auth/update-user-data/actions';
import {checkExistingEmail} from '../../../redux/ducks/auth/check/actions';

import {ScreenContainer} from '../../../containers/ScreenContainer';
import {InputBlock} from '../../../containers/InputContainer';
import {
    TopHeader,
    RippleButton,
    InputWithLabel,
    UploadPicture,
    Loader
} from '../../../components';
import { ImageCropper } from '../../../components/popup/image-cropper';
import { toast } from 'react-toastify';

const UpdateUserDataContainer = styled.div`
    margin-top: 64px;
`;

const UpdatePersonalDetails = ({
                                   isLoading,
                                   avatar,
                                   sendAvatar,
                                   firstName,
                                   lastName,
                                   msisdn,
                                   email,
                                   houseAddress,
                                   updateUserData,
                                   checkExistingEmail
                               }) => {
    const [showCropper, setShowCropper] = useState(false);
    const [picture, setPicture] = useState(avatar);
    
    const onCropperCancel = () => {
        setShowCropper(false);
        setPicture(avatar);
    }
    
    const onCropperSave = url => {
        if(url)
        {
            setShowCropper(false);
            sendAvatar(url);
            setPicture(url);
        } else {
            toast.error("Image is still processing, wait for a sec...")
        }
    }

    const pAction = (image) => {
        const url = URL.createObjectURL(image);
        setShowCropper(true);
        setPicture(url)
    }
    return (
        isLoading ?
        <Loader/> :
        <Fragment>
        <Fragment>
                {showCropper && <ImageCropper avatar={picture} onCancel={onCropperCancel} onSave={onCropperSave} /> }
                <TopHeader title={"Personal Details"} />
                <ScreenContainer>
                    <UpdateUserDataContainer>
                    <UploadPicture
                        text={"Tap to change profile picture"}
                        pictureAction={pAction}
                        showCropper={showCropper}
                        picture={picture}
                    />
                    <Formik
                        initialValues={{
                            firstName: firstName || "",
                            lastName: lastName || "",
                            houseAddress: houseAddress || '',
                            email: email || ''
                        }}
                        validationSchema={UpdatePersonalDetailsValidationSchema}
                        onSubmit={async (values, {setErrors}) => {
                            if (!values.email) {
                                values.email = `${msisdn}@spaceso2o.com`;
                            };

                            if (values.email === email) {
                                delete values.email;
                                updateUserData(values);
                            } else {
                                const hasExistingEmail = await checkExistingEmail(values.email);

                                if (!hasExistingEmail) {
                                    updateUserData(values);
                                } else {
                                    setErrors({email: "Email already exists"});
                                }
                                ;
                            }
                            ;
                        }}
                    >
                        {({errors, touched, values, setFieldValue, initialValues}) => (
                            <Form>
                                <InputBlock>
                                    <InputWithLabel
                                        label={"First name"}
                                        type={"text"}
                                        value={values.firstName}
                                        placeholder={"First name"}
                                        name="firstName"
                                        valid={`${(!touched.firstName && !errors.firstName)}`}
                                        errors={(touched && touched.firstName) && (errors && errors.firstName)}
                                        setFieldValue={setFieldValue}
                                        initialValues={initialValues}
                                    />
                                    <InputWithLabel
                                        label={"Last name"}
                                        type={"text"}
                                        value={values.lastName}
                                        placeholder={"Last name"}
                                        name="lastName"
                                        valid={`${(touched.lastName && !errors.lastName)}`}
                                        errors={(touched && touched.lastName) && (errors && errors.lastName)}
                                        setFieldValue={setFieldValue}
                                        initialValues={initialValues}
                                    />
                                    <InputWithLabel
                                        label={"Phone Number"}
                                        type={"text"}
                                        value={msisdn}
                                        placeholder={"+234 808 1234 567"}
                                        name="msisdn"
                                        readOnly
                                        valid={`${(touched.msisdn && !errors.msisdn)}`}
                                        errors={(touched && touched.msisdn) && (errors && errors.msisdn)}
                                    />
                                    <InputWithLabel
                                        label={"Email address"}
                                        type={"text"}
                                        value={values.email}
                                        placeholder={"Email address"}
                                        name={"email"}
                                        inputMode={"email"}
                                        autoComplete={"email"}
                                        valid={`${(touched.email && !errors.email)}`}
                                        errors={(touched && touched.email) && (errors && errors.email)}
                                        setFieldValue={setFieldValue}
                                        onBlur={e => {
                                            if (!e.target.value) {
                                                e.target.value = email;
                                            }
                                        }}
                                        onFocus={e => {
                                            if (values.email.startsWith(msisdn)) {
                                                e.target.value = "";
                                            }
                                            ;
                                        }}
                                        initialValues={initialValues}
                                    />
                                    <InputWithLabel
                                        label={"House address"}
                                        type={"text"}
                                        value={values.houseAddress}
                                        placeholder={"House address"}
                                        name="houseAddress"
                                        valid={`${(touched.houseAddress && !errors.houseAddress)}`}
                                        errors={(touched && touched.houseAddress) && (errors && errors.houseAddress)}
                                        setFieldValue={setFieldValue}
                                        initialValues={initialValues}
                                    />
                                    {!showCropper && (
                                        <RippleButton type="submit">
                                            Save
                                        </RippleButton>
                                    )}
                                </InputBlock>
                            </Form>
                        )}
                    </Formik>
                </UpdateUserDataContainer>
            </ScreenContainer>
            </Fragment>
        </Fragment>
    );
};

UpdatePersonalDetails.propTypes = {
    isLoading: bool,
    avatar: string,
    sendAvatar: func,
    updateUserData: func,
    firstName: string,
    lastName: string,
    msisdn: string,
    houseAddress: string,
    email: string
};

const mapStateToProps = ({user, auth}) => ({
    isLoading: auth.updateUserData.isLoading,
    avatar: user.avatar,
    firstName: user.firstName,
    lastName: user.lastName,
    msisdn: user.msisdn,
    houseAddress: user.houseAddress,
    email: user.email
});

export default connect(
    mapStateToProps,
    {
        sendAvatar,
        updateUserData,
        checkExistingEmail
    }
)(UpdatePersonalDetails);