import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect, useSelector } from "react-redux";
import { func, shape, string } from 'prop-types';
import { Formik, Form } from 'formik';
import { UserMeansOfIDValidationSchema } from './UserMeansOfIDValidationSchema';
import { 
    sendUserDocument, 
    saveUserDocument, 
    saveUserDocumentData,
    uploadUserDocument,
    savePassport,
    savePassportData,
    uploadPassport,
    getRejectedReasons
} from '../../../../../redux/ducks/user/actions';

import { InputBlock } from '../../../../../containers/InputContainer';
import { ScreenContainer, FlexContainer } from '../../../../../containers/ScreenContainer';
import { 
    //Loader, 
    TopHeader,
    SelectBox,
    //FileInput,
    FileInput2,
    RippleButton
} from '../../../../../components';
import { NORMAL } from '../../../../../components/forms/input/file2';

import { VerificationStatus } from '../../../../../components/verification-status';
import { Message } from '../../../../../containers/MessageContainer';
import { colors } from '../../../../../styles';
import { getAgentActivationStatus } from "../../../../../redux/ducks/applications/agents/actions";
import {compressImage} from "../../../../../utils/files/compressImage"

import { toast } from "react-toastify";

const RejectedWrapper = styled.div`
    margin-top: 80px;
    background: ${colors.lightRed};
    border-radius: 10px;
    padding: 12px;
`;

const RejectedReasonBlock = styled.div`
    display: flex;
    padding: 2px;
    width: calc(100% - 40px);
    justify-content: start;
    align-items: start;
`;

const KYCMeansOfID = ({
    loading,
    sendUserDocument, 
    documentName,
    userDocumentData,
    saveUserDocumentData,
    saveUserDocument,
    uploadUserDocument,
    savePassport,
    savePassportData,
    uploadPassport,
    passportName,
    passportData,
    user,
    getRejectedReasons,
    getAgentActivationStatus,
}) => {
    const PENDING = "PENDING"
    const APPROVED = "APPROVED"
    const INCOMPLETE = "INCOMPLETE"

    //Passport
    const [passportLoaded, setPassportLoaded] = useState(false);
    const [passportState, setPassportState] = useState(PENDING);
    const [passportRetryCount, setPassportRetryCount] = useState(0);
    const passportUploadProgress = useSelector(
        state => state.user.passportState && 
        state.user.passportState.progress ? 
        state.user.passportState.progress : 0
    );
    const passportDocumentState = useSelector(
        state => state.user.passportState && 
        state.user.passportState.state ?
        state.user.passportState.state : NORMAL
    );

     //Document
     const [documentLoaded, setDocumentLoaded] = useState(false);
     const [docState, setDocState] = useState(PENDING);
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

    const userId = useSelector(state => state.user.userId);
    const rejectedReasons = useSelector(state => state.user.rejectedReasons)
    const agentState = useSelector(state => state.user.agentState ? state.user.agentState : "PENDING")  
    const [documentLink, setDocumentLink] = useState("");
    const [passportLink, setPassportLink] = useState("");

    useEffect(() => {
        if(agentState !== APPROVED) {
            getRejectedReasons(userId);
        } 
    }, [agentState, getRejectedReasons, userId]);

    useEffect(() => {
        getAgentActivationStatus();
        if(agentState === PENDING) {
            setPassportState(PENDING)
            setDocState(PENDING)
        } else if(agentState === INCOMPLETE) {
            if(rejectedReasons) {
                let passApproved = true;
                let docApproved = true;

                rejectedReasons.forEach(element => {
                    if(element.name === "passportPhoto") {
                        passApproved = element.resolved;
                    }

                    if(element.name === "workId") {
                        docApproved = element.resolved;
                    } else if(element.name === "driversLicense") {
                        docApproved = element.resolved;
                    } else if(element.name === "personalId") {
                        docApproved = element.resolved;
                    }
                });

                setPassportState(passApproved ? APPROVED : agentState)
                setDocState(docApproved ? APPROVED : agentState)
            }
        } else if(agentState === APPROVED) {
            setPassportState(APPROVED)
            setDocState(APPROVED)
        }
    }, [getAgentActivationStatus, rejectedReasons, agentState, getRejectedReasons, userId]);

    useEffect(() => {
        if(user.documentList && !documentLoaded && !passportLoaded) {
             user.documentList.map(i => {
                if(i.type === 'PassportPhotograph') {
                    return setPassportLink(i.documentName)
                } else {
                    return setDocumentLink(i.documentName)
                }
            })
        }
    }, [documentLoaded, passportLoaded, user.documentList, savePassport, saveUserDocument]);

    return (
        //isLoading ?
        //<Loader /> :
        <Fragment>
            <TopHeader title={"Means of Identification"} />
            <ScreenContainer>
                {agentState === INCOMPLETE && (
                    <RejectedWrapper>
                        {rejectedReasons && rejectedReasons.map((reason, index) => (
                           <RejectedReasonBlock key={index}>
                               {(reason && !reason.resolved  &&
                                    <Message top={'0'}>{`- ${reason.details.docType}: ${reason.details.text}`}</Message>
                               )}
                           </RejectedReasonBlock>
                        ))}
                    </RejectedWrapper>
                )}
                <Formik
                    initialValues={{
                        selectedDocument: documentName || "",
                        passportPhotograph: 'PassportPhotograph'
                    }}
                    validationSchema={/*documentLoaded && */UserMeansOfIDValidationSchema}
                    onSubmit={values => {
                        setTimeout(() => {
                            if(!passportLoaded && passportState !== APPROVED){
                                toast.error("Please upload passport photograph");
                                return
                            }

                            if(!documentLoaded && docState !== APPROVED){
                                toast.error("Please upload means of identification");
                                return
                            }

                            if(documentLoaded && passportLoaded){
                                sendUserDocument("", "", passportLoaded, documentLoaded);
                            } else if (documentLoaded) {
                                sendUserDocument(values.selectedDocument, passportLink, passportLoaded, documentLoaded);
                            } else if (passportLoaded) {
                                sendUserDocument(values.passportPhotograph, documentLink, passportLoaded, documentLoaded);
                            }
                            
                        }, 300);
                    }}
                >
                    {({ values, handleChange }) => (
                        <Form style={{ marginTop: agentState === INCOMPLETE ? "32px" : "64px" }} encType="multipart/form-data">
                            
                            <FlexContainer>
                                <Message top={"0"}>Passport photograph</Message>
                                <VerificationStatus status={passportState} />
                            </FlexContainer>

                            <InputBlock>
                                <FileInput2
                                    name={"passport"}
                                    accept={"image/*"}
                                    defaultFileName={"Passport photograph"}
                                    fileName={(user.passportData && user.passportData.name)}
                                    progress={passportUploadProgress}
                                    documentState={passportDocumentState}
                                    disabled={passportState === APPROVED}
                                    deleteFile={() => {
                                        setTimeout(() => {
                                            setPassportLoaded(false)
                                            savePassport({ label: '', url: '' });
                                            savePassportData({ name: '', type: '' });
                                        }, 300);
                                    }}
                                    cancelFile={() => {
                                        setTimeout(() => {
                                            //intercept the call and cancel
                                            //setPassportLoaded(false)
                                            //savePassport({ label: '', url: '' });
                                            //savePassportData({ name: '', type: '' });
                                        }, 300);
                                    }}
                                    handleFile={(event) => {
                                        if (event.target.files[0]) {
                                            const file = event.target.files[0];
                                            setPassportLoaded(true)
                                            compressImage(event.target.files[0]).then(data => {
                                                savePassport({
                                                    label: values.passportPhotograph,
                                                    url: URL.createObjectURL(data) 
                                                });
                                                savePassportData({ name: file.name, type: file.type });
                                                //uploadPassport(values.passportPhotograph)
                                                uploadPassport()
                                            })
                                        };
                                    }}
                                    retryFile={() => {
                                         setPassportRetryCount(passportRetryCount + 1)
                                         if (passportRetryCount >= 2) {
                                            setPassportRetryCount(0)
                                            setPassportLoaded(false);
                                            savePassport({ label: '', url: '' });
                                            savePassportData({ name: '', type: '' });
                                         } else {
                                            //uploadPassport(values.passportPhotograph)
                                            uploadPassport()
                                         }
                                    }}
                                />
                            </InputBlock>

                            {/* <InputBlock>
                                <FileInput
                                    name={"passport"}
                                    accept={"image/*"}
                                    disabled={passportState === APPROVED}
                                    loadedState={user.passportData && !!user.passportData.name}
                                    fileName={(user.passportData && user.passportData.name)}
                                    removeFile={() => {
                                        setTimeout(() => {
                                            setPassportLoaded(false);
                                            savePassport({ label: '', url: '' });
                                            savePassportData({ name: '', type: '' });
                                        }, 300);
                                    }}
                                    handleFile={(event) => {
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
                                                    label: values.passportPhotograph,
                                                    url: URL.createObjectURL(data)
                                                });
                                            })
                                            savePassportData({ 
                                                name: file.name, 
                                                type: file.type 
                                            });
                                            }
                                        };
                                    }}
                                />
                            </InputBlock>
                            <ErrorMessage>{passportError}</ErrorMessage>
                             */}
                            
                            <FlexContainer>
                                <Message top={"0"}>Means of Identification</Message>
                                    <VerificationStatus status={docState} />
                            </FlexContainer>
                           
                            <InputBlock>
                                <SelectBox
                                    name="selectedDocument"
                                    placeholder={"Select a means of identification"}
                                    value={values.selectedDocument}
                                    handleChange={handleChange}
                                    disabled={docState === APPROVED}
                                    options={[
                                        {
                                            value: 'driversLicense',
                                            label: 'Driver\'s License'
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

                                {/* <FileInput
                                    name={"document"}
                                    accept={"image/*"}
                                    disabled={!values.selectedDocument || docState === APPROVED }
                                    loadedState={(user.documentData && !!user.documentData.name) || documentLoaded}
                                    fileName={
                                        (user.documentData && user.documentData.name) ||
                                         (userDocumentData && userDocumentData.name)}
                                    removeFile={() => {
                                        setTimeout(() => {
                                            setDocumentLoaded(false);
                                            saveUserDocument({ label: '', url: '' });
                                            saveUserDocumentData({ name: '', type: '' });
                                        }, 300);
                                    }}
                                    handleFile={(event) => {
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
                                                   url: URL.createObjectURL(event.target.files[0]) 
                                                });
                                                saveUserDocumentData({ 
                                                    name: file.name, 
                                                    type: file.type 
                                                });
                                            }
                                        };
                                    }}
                                />
                                 <ErrorMessage>{documentError}</ErrorMessage>
                                */}

                            <FileInput2
                                accept={"image/*"}
                                fileName={(userDocumentData && userDocumentData.name)}
                                progress={userDocumentUploadProgress}
                                documentState={userDocumentState}
                                disabled={!values.selectedDocument || docState === APPROVED }
                                deleteFile={() => {
                                    setTimeout(() => {
                                        setDocumentLoaded(false);
                                        saveUserDocument({ label: '', url: '' });
                                        saveUserDocumentData({ name: '', type: '' });
                                    }, 300);
                                }}
                                cancelFile={() => {
                                    setTimeout(() => {
                                        //intercept the call and cancel
                                        //setDocumentLoaded(false);
                                        //saveUserDocument({ label: '', url: '' });
                                        //saveUserDocumentData({ name: '', type: '' });
                                    }, 300);
                                }}
                                handleFile={(event) => {
                                    if (event.target.files[0]) {
                                        const file = event.target.files[0];
                                        //compressImage(event.target.files[0]).then(data => {
                                            setDocumentLoaded(true);
                                            saveUserDocument({
                                                label: values.selectedDocument,
                                                url: URL.createObjectURL(event.target.files[0])
                                            });
                                            saveUserDocumentData({ name: file.name, type: file.type });
                                            uploadUserDocument(values.selectedDocument)
                                        //})
                                    };
                                }}
                                retryFile={() => {
                                    setUserDocumentRetryCount(userDocumentRetryCount + 1)
                                     if (userDocumentRetryCount >= 2) {
                                        setDocumentLoaded(false);
                                        setUserDocumentRetryCount(0)
                                        saveUserDocument({ label: '', url: '' });
                                        saveUserDocumentData({ name: '', type: '' });
                                     } else {
                                        uploadUserDocument(values.selectedDocument)
                                     }
                                }}
                            />

                                {(agentState === PENDING || agentState === INCOMPLETE) && (
                                    <RippleButton
                                        type="submit"
                                        disabled={
                                            !values.selectedDocument ||
                                            //(passportDocumentState !== SUCCESS || passportState !== APPROVED) ||
                                            //(userDocumentState !== SUCCESS || docState !== APPROVED) || 
                                            loading
                                        }
                                    >
                                        {(loading)? "loading": "Update"}
                                    </RippleButton>
                             )}
                            </InputBlock>
                        </Form>
                    )}
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

KYCMeansOfID.propTypes = {
    sendUserDocument:     func,
    saveUserDocumentData: func,
    saveUserDocument:     func,
    getAgentActivationStatus: func,
    userDocumentData:     shape({ name: string, type: string })
};

const mapStateToProps = ({ user, account }) => ({
    loading:          account.kyc.isLoading,
    documentName:     user.document && user.document.label,
    userDocumentData: user.documentData,
    passportName:     user.passport && user.passport.label,
    passportData:     user.passportData,
    verified:         user.verified,
    user
});

export default connect(
    mapStateToProps,
    { 
        sendUserDocument,
        saveUserDocument,
        saveUserDocumentData,
        uploadUserDocument,
        savePassport,
        savePassportData,
        uploadPassport,
        getRejectedReasons,
        getAgentActivationStatus
    }
)(KYCMeansOfID);