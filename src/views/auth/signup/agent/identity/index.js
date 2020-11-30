import React, { Fragment, useState } from "react";
import { Formik, Form } from "formik";
import { bool, func, string, shape } from "prop-types";
import { connect, useSelector } from "react-redux";
import {
    saveUserDocument,
    saveUserDocumentData,
    uploadUserDocument,
    savePassport,
    savePassportData,
    uploadPassport,
} from "../../../../../redux/ducks/user/actions";
import { sendUserDocumentsOnRegistration } from "../../../../../redux/ducks/auth/signup/agent/actions";
//import styled from "styled-components";

import { AgentIdentityValidationSchema } from "./AgentIdentityValidationSchema";

import {
    //Loader,
    TopHeader,
    PageProgress,
    PageLogo,
    RippleButton,
    SelectBox,
    //FileInput,
    FileInput2,
} from "../../../../../components";

import { 
    NORMAL,
    SUCCESS
} from '../../../../../components/forms/input/file2';

import {compressImage} from "../../../../../utils/files/compressImage"

// import { InputBlock } from '../../../../../containers/InputContainer';
import { ScreenContainer } from "../../../../../containers/ScreenContainer";
import { Message } from "../../../../../containers/MessageContainer";
import BadgeLogo from "../../../../../assets/passport.svg";

// const ErrorMessage = styled.div`
//     color: red;
//     margin: 10px 0;
//     font-style: oblique;
//     font-size: 10px;
// `;

const AgentIdentityCheck = ({
    loading,
    sendUserDocumentsOnRegistration,
    
    userDocumentData,
    saveUserDocument,
    saveUserDocumentData,
    uploadUserDocument,

    passportData,
    savePassport,
    savePassportData,
    uploadPassport,
}) => {
    //const [documentLoaded, setDocumentLoaded] = useState(false);
    //const [passportLoaded, setPassportLoaded] = useState(false);
    //const [documentError, setDocumentError] = useState("");
    //const [passportError, setPassportError] = useState("");

    //Passport
    const [passportRetryCount, setPassportRetryCount] = useState(0);
    const passportUploadProgress = useSelector(
        state => state.user.passportState && 
                 state.user.passportState.progress ? 
                 state.user.passportState.progress : 0
    );
    const passportState = useSelector(
        state => state.user.passportState && 
                 state.user.passportState.state ?
                 state.user.passportState.state : NORMAL
    );

    //Document
    const [userDocumentRetryCount, setUserDocumentRetryCount] = useState(0);
    const userDocumentUploadProgress = useSelector(
        state => state.user.documentState && 
                 state.user.documentState.progress ? 
                 state.user.documentState.progress : 0
    );
    const userDocumentState = useSelector(
        state => state.user.documentState && 
                 state.user.documentState.state ?
                 state.user.documentState.state : NORMAL
    );

    return (
        //loading ?
        //<Loader /> :
        <Fragment>
            <TopHeader title={"Means of Identification"} />
            <ScreenContainer>
                <PageLogo top={"64px"} Icon={BadgeLogo} />
                <PageProgress step={3} amount={6} />
                <Formik
                    initialValues={{
                        selectedDocument: "",
                        passportPhotograph: 'PassportPhotograph'
                    }}
                    validationSchema={AgentIdentityValidationSchema}
                    onSubmit={values => {
                        setTimeout(() => {
                            sendUserDocumentsOnRegistration(
                                 values.selectedDocument,
                                 "/user/create_agent_region"
                            );
                        }, 1000);
                    }}
                >
                    {({ values, handleChange }) => (
                        <Form encType="multipart/form-data">
                            <Message align={"left"} bottom={"24px"}>
                                Upload a passport photograph.
                            </Message>
                            
                            {/* <FileInput
                                accept={"image/*"}
                                loadedState={passportLoaded}
                                fileName={passportData && passportData.name}
                                defaultText={"Passport photograph"}
                                removeFile={() => {
                                    setTimeout(() => {
                                        setPassportLoaded(false);
                                        savePassport({ label: "", url: "" });
                                        savePassportData({
                                            name: "",
                                            type: ""
                                        });
                                    }, 300);
                                }}
                                handleFile={event => {
                                    if (event.target.files[0]) {
                                        const file = event.target.files[0];
                                        if (file.size > 5000 * 1024) {
                                            setPassportError(
                                                "File size exceeds 5mb"
                                            );
                                        } else {
                                            setPassportError("");
                                            setPassportLoaded(true);
                                            compressImage(event.target.files[0]).then(data => {
                                                savePassport({
                                                    label: "PassportPhotograph",
                                                    url: URL.createObjectURL(data)
                                                });
                                            })
                                            savePassportData({
                                                name: file.name,
                                                type: file.type
                                            });
                                        }
                                    }
                                }}
                            />
                            <ErrorMessage>{passportError}</ErrorMessage>
               */}

                            <FileInput2
                                accept={"image/*"}
                                defaultFileName={"Passport photograph"}
                                fileName={(passportData && passportData.name)}
                                progress={passportUploadProgress}
                                documentState={passportState}
                                deleteFile={() => {
                                    setTimeout(() => {
                                        savePassport({ label: '', url: '' });
                                        savePassportData({ name: '', type: '' });
                                    }, 300);
                                }}
                                cancelFile={() => {
                                    setTimeout(() => {
                                        //intercept the call and cancel
                                        //savePassport({ label: '', url: '' });
                                        //savePassportData({ name: '', type: '' });
                                    }, 300);
                                }}
                                handleFile={(event) => {
                                    if (event.target.files[0]) {
                                        const file = event.target.files[0];
                                        compressImage(event.target.files[0]).then(data => {
                                            savePassport({
                                                label: values.passportPhotograph,
                                                url: URL.createObjectURL(data)
                                            });
                                            savePassportData({ name: file.name, type: file.type });
                                            uploadPassport(values.passportPhotograph)
                                        })
                                    };
                                }}
                                retryFile={() => {
                                     setPassportRetryCount(passportRetryCount + 1)
                                     if (passportRetryCount >= 2) {
                                        setPassportRetryCount(0)
                                        savePassport({ label: '', url: '' });
                                        savePassportData({ name: '', type: '' });
                                     } else {
                                        uploadPassport(values.passportPhotograph)
                                     }
                                }}
                            />
                        
                            <Message align={"left"} bottom={"24px"}>
                                Select a means of identification and upload the
                                document.
                            </Message>

                            <SelectBox
                                name="selectedDocument"
                                placeholder={"Select a means of identification"}
                                value={values.selectedDocument}
                                handleChange={ handleChange }
                                options={[
                                    {
                                        value: "driversLicense",
                                        label: "Driver's License"
                                    },
                                    {
                                        value: "personalId",
                                        label: "Personal ID"
                                    },
                                    {
                                        value: "wordId",
                                        label: "Work ID"
                                    }
                                ]}
                            />       

                          {/*                      
                            <FileInput
                                accept={"image/*"}
                                loadedState={documentLoaded}
                                fileName={userDocumentData && userDocumentData.name}
                                removeFile={() => {
                                    setTimeout(() => {
                                        setDocumentLoaded(false);
                                        saveUserDocument({
                                            label: "",
                                            url: ""
                                        });
                                        saveUserDocumentData({
                                            name: "",
                                            type: ""
                                        });
                                    }, 300);
                                }}
                                handleFile={event => {
                                    if (event.target.files[0]) {
                                        const file = event.target.files[0];
                                        if (file.size > 5000 * 1024) {
                                            setDocumentError(
                                                "File size exceeds 5mb"
                                            );
                                        } else {
                                            setDocumentError("");
                                            setDocumentLoaded(true);
                                            saveUserDocument({
                                                label: values.selectedDocument,
                                                url: URL.createObjectURL(
                                                    event.target.files[0]
                                                )
                                            });
                                            saveUserDocumentData({
                                                name: file.name,
                                                type: file.type
                                            });
                                        }
                                    }
                                }}
                            />
                            <ErrorMessage>{documentError}</ErrorMessage> */}

                            <FileInput2
                                accept={"image/*"}
                                fileName={(userDocumentData && userDocumentData.name)}
                                progress={userDocumentUploadProgress}
                                documentState={userDocumentState}
                                disabled={!values.selectedDocument}
                                deleteFile={() => {
                                    setTimeout(() => {
                                        saveUserDocument({ label: '', url: '' });
                                        saveUserDocumentData({ name: '', type: '' });
                                    }, 300);
                                }}
                                cancelFile={() => {
                                    setTimeout(() => {
                                        //intercept the call and cancel
                                        //saveUserDocument({ label: '', url: '' });
                                        //saveUserDocumentData({ name: '', type: '' });
                                    }, 300);
                                }}
                                handleFile={(event) => {
                                    if (event.target.files[0]) {
                                        const file = event.target.files[0];
                                        saveUserDocument({
                                            label: values.selectedDocument,
                                            url: URL.createObjectURL(event.target.files[0])
                                        });
                                        saveUserDocumentData({ name: file.name, type: file.type });
                                        uploadUserDocument(values.selectedDocument)
                                    };
                                }}
                                retryFile={() => {
                                    setUserDocumentRetryCount(userDocumentRetryCount + 1)
                                     if (userDocumentRetryCount >= 2) {
                                        setUserDocumentRetryCount(0)
                                        saveUserDocument({ label: '', url: '' });
                                        saveUserDocumentData({ name: '', type: '' });
                                     } else {
                                        uploadUserDocument(values.selectedDocument)
                                     }
                                }}
                            />

                            <RippleButton
                                type="submit"
                                disabled={
                                    !values.selectedDocument ||
                                    userDocumentState !== SUCCESS ||
                                    passportState !== SUCCESS || 
                                    loading
                                    //!values.selectedDocument ||
                                    //!documentLoaded ||
                                    //!passportLoaded ||
                                    //loading
                                }
                            >
                                {loading ? "loading" : "save & continue"}
                            </RippleButton>
                        </Form>
                    )}
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

AgentIdentityCheck.propTypes = {
    loading: bool,
    sendUserDocumentsOnRegistration: func,
    saveUserDocument:     func,
    saveUserDocumentData: func,
    uploadUserDocument:   func,
    savePassport:         func,
    savePassportData:     func,
    uploadPassport:       func,
    userDocumentData: shape({ name: string, type: string }),
    passportData: shape({ name: string, type: string }),
};

const mapStateToProps = ({ user, auth }) => ({
    loading: auth.signup.agent.isLoading,
    userDocumentData: user.documentData,
    passportData: user.passportData,
    user
});

export default connect(mapStateToProps, {
    sendUserDocumentsOnRegistration,
    saveUserDocument,
    saveUserDocumentData,
    uploadUserDocument,
    savePassport,
    savePassportData,
    uploadPassport,
})(AgentIdentityCheck);
