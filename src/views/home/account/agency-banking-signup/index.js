import { Form, Formik } from 'formik';
import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from "../../../../config";
import { toast } from 'react-toastify';
import { FileInput2, Loader, InputWithLabel, RippleButton, SelectBox, SelectGender, TopHeader } from '../../../../components';
import { InputBlock } from '../../../../containers/InputContainer';
import { Message } from '../../../../containers/MessageContainer';
import { VerificationStatus } from '../../../../components/verification-status';
import { ScreenContainer, ViewContainer, FlexContainer } from '../../../../containers/ScreenContainer';
import { localAreas } from '../../../../data/countries/nigeria/localAreas';
import { states } from '../../../../data/countries/nigeria/states';
import { compressImage } from '../../../../utils/files/compressImage';
import { autoSign } from '../../../../utils/inputs/autoFormat';
import { selectAreasByState } from '../../../../utils/inputs/selectAreasByState';
import { NORMAL, PROGRESS, SUCCESS } from '../../../../components/forms/input/file2'
import { AgencyBankingValidationSchema } from './AgencyBankingValidationSchema';
import { getAgencyBankingSignupState, agencyBankingSignup, updateAgencyBankingSignup, uploadFile, 
    saveAgencyBankingIdCardImage, saveAgencyBankingUtilityImage, saveAgencyBankingPassportImage
} from '../../../../redux/ducks/account/agency-banking/actions'
import styled from 'styled-components';
import { colors } from '../../../../styles';
import { modifyRejectedReasons } from './utils';

const RejectedWrapper = styled.div`
    margin-top: 20px;
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

const AgencyBankingSignup = () => {
    const isLoading              = useSelector(state => state.account.agencyBanking.isLoading); 
    const agencyBankDetails      = useSelector(state => state.account.agencyBanking.agencyBankDetails); 
    const idCardImage            = useSelector(state => state.account.agencyBanking.idCard);
    const utilityBillImage       = useSelector(state => state.account.agencyBanking.utilityBill);
    const passportPhotoImage     = useSelector(state => state.account.agencyBanking.passportPhoto);
    const user                   = useSelector(state => state.user);
    const shops                  = useSelector(state => state.applications.myShop.shops);
    
    const [idCard, setIdCard]                                                   = useState(undefined);
    const [idCardUrl, setIdCardUrl]                                             = useState("");
    const [idCardState, setIdCardState]                                         = useState({ state: NORMAL, progress: 0});
    const [idCardRetry, setIdCardRetry]                                         = useState(0);
    const [idCardVerificationState, setIdCardVerificationState]                 = useState("");
    const [utilityBill, setUtilityBill]                                         = useState(undefined);
    const [utilityBillUrl, setUtilityBillUrl]                                   = useState("");
    const [utilityBillState, setUtilityBillState]                               = useState({ state: NORMAL, progress: 0});
    const [utilityBillRetry, setUtilityBillRetry]                               = useState(0);
    const [utilityBillVerificationState, setUtilityBillVerificationState]       = useState("");
    const [passportPhoto, setPassportPhoto]                                     = useState(undefined);
    const [passportPhotoUrl, setPassportPhotoUrl]                               = useState("");
    const [passportPhotoState, setPassportPhotoState]                           = useState({ state: NORMAL, progress: 0});
    const [passportPhotoRetry, setPassportPhotoRetry]                           = useState(0);
    const [passportPhotoVerificationState, setPassportPhotoVerificationState]   = useState("");
    
    const agentState = (agencyBankDetails && agencyBankDetails.status) || "";
    const rejectedReasons = (agencyBankDetails && agencyBankDetails.rejectionReasons) || {}; 
    const rejectedReasonsList = Object.entries(rejectedReasons);
    const rejectedReasonsModifiedList = modifyRejectedReasons(rejectedReasonsList);
    
    const dispatch = useDispatch();
    const source = axios.CancelToken.source();

    useEffect(() => {
        dispatch(getAgencyBankingSignupState());
    }, [dispatch]);

    useEffect(() => {
        if(agentState === "REJECTED") {
            if(rejectedReasonsList) {
                let idCardApproved = true;
                let billApproved = true;
                let passportApproved = true;
                
                rejectedReasonsList.forEach(([key, value]) => {
                    if(key === "identificationCardImageUrl") {
                        idCardApproved = false;
                    } else if(key === "billImageUrl") {
                        billApproved = false;
                    } else if(key === "passportPhotograph") {
                        passportApproved = false;
                    }
                });

                setIdCardVerificationState(idCardApproved ? "APPROVED" : agentState)
                setUtilityBillVerificationState(billApproved ? "APPROVED" : agentState)
                setPassportPhotoVerificationState(passportApproved ? "APPROVED" : agentState)
            }
        } else {
            setIdCardVerificationState(agentState)
            setUtilityBillVerificationState(agentState)
            setPassportPhotoVerificationState(agentState)
        }
    },[agentState, rejectedReasonsList]);

    useEffect(() => {
        //console.log("agencyBankDetails", "agencyBankDetails changed")
        if(agencyBankDetails && Object.keys(agencyBankDetails).includes('id')){
            setIdCardState({ state: SUCCESS, progress: 0})
            setUtilityBillState({ state: SUCCESS, progress: 0})
            setPassportPhotoState({ state: SUCCESS, progress: 0})
        }
                                   
        if(idCardVerificationState === "REJECTED"){
            setIdCardUrl("")
        } else {
            setIdCardUrl((agencyBankDetails && agencyBankDetails.identificationCardImageUrl) || "")
        }

        if(utilityBillVerificationState === "REJECTED"){
            setUtilityBillUrl("")
        } else {
            setUtilityBillUrl((agencyBankDetails && agencyBankDetails.billImageUrl) || "")
        }

        if(passportPhotoVerificationState === "REJECTED"){
            setPassportPhotoUrl("")
        } else {
            setPassportPhotoUrl((agencyBankDetails && agencyBankDetails.passportPhotograph) || "")        
        }
    }, [ agencyBankDetails, 
         idCardVerificationState, 
         utilityBillVerificationState, 
         passportPhotoVerificationState
        ]
    )

    useEffect(() => {
        //setIdCard(idCardImage)
        //setUtilityBill(utilityBillImage)
        //setPassportPhoto(passportPhotoImage)
    },[idCardImage, utilityBillImage, passportPhotoImage])

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Agency Banking Requirements"} />
            <ViewContainer top={"48px"}>
                <ScreenContainer>
                    {agentState === "REJECTED" && 
                        rejectedReasonsModifiedList && rejectedReasonsModifiedList.length > 0 && (
                        <RejectedWrapper>
                            { rejectedReasonsModifiedList.map(([key, value], index) => (
                                <RejectedReasonBlock key={index}>
                                    <Message top={'0'}>{`- ${key}: ${value}`}</Message>
                                </RejectedReasonBlock>
                            ))}
                        </RejectedWrapper>
                    )}
                    <Message bottom={"16px"}>
                        You need to provide the following information to offer agency banking services to your customers.
                    </Message>
                    <Formik
                        initialValues={{
                            title: (agencyBankDetails && agencyBankDetails.title) || "",
                            firstName: (agencyBankDetails && agencyBankDetails.firstName) || 
                                    (user && user.firstName) || "",
                            middleName: (agencyBankDetails && agencyBankDetails.middleName) || "",
                            lastName: (agencyBankDetails && agencyBankDetails.lastName) || 
                                    (user && user.lastName) || "",
                            dateOfBirth: (agencyBankDetails && agencyBankDetails.dateOfBirth) || "",
                            gender: (agencyBankDetails && agencyBankDetails.gender) || "",
                            email: (agencyBankDetails && agencyBankDetails.email) || 
                                    (user && user.email) || "",
                            phoneNumber: (agencyBankDetails && agencyBankDetails.phoneNumber) || 
                                    (user && user.msisdn) || "",
                            streetAddress: (agencyBankDetails && agencyBankDetails.streetAddress) ||
                                    (user && user.houseAddress) || "",
                            state: (agencyBankDetails && agencyBankDetails.state) || 
                                    (user && user.regionData &&  user.regionData.state) || "",
                            localGovernmentArea: (agencyBankDetails && agencyBankDetails.localGovernmentArea) || 
                                    (user && user.regionData &&  user.regionData.lga) || "",
                            businessName: (agencyBankDetails && agencyBankDetails.businessName) ||
                                    (shops && shops[0] && shops[0].shopName) || "",
                            businessMobileNumber: (agencyBankDetails && agencyBankDetails.businessMobileNumber) || 
                                    (shops && shops[0] && shops[0].businessPhoneNumber) || "",
                            businessStartDate: (agencyBankDetails && agencyBankDetails.businessStartDate) || "",
                            businessLocation: (agencyBankDetails && agencyBankDetails.businessLocation) ||
                                    (shops && shops[0] && shops[0].streetAddress) || "",
                            businessRegistrationType: (agencyBankDetails && agencyBankDetails.businessRegistrationType) || "",
                            bvn: (agencyBankDetails && agencyBankDetails.bvn) || "",
                            highestLevelOfEducation: (agencyBankDetails && agencyBankDetails.highestLevelOfEducation) || "",
                            identificationCard: (agencyBankDetails && agencyBankDetails.identificationCard) || "",
                            identificationNumber: (agencyBankDetails && agencyBankDetails.identificationNumber) || "",
                            billType: (agencyBankDetails && agencyBankDetails.billType) || "",
                            userId: (user && user.userId) || ""
                        }}
                        enableReinitialize
                        validationSchema={AgencyBankingValidationSchema}
                        onSubmit={(values, { setErrors }) => {
                            setTimeout(() => {

                                if(!idCardUrl) {
                                    toast.error("No file upload for ID Card");
                                    return;
                                }

                                if(!utilityBillUrl) {
                                    toast.error("No file upload for Utility Bill");
                                    return;
                                }

                                if(!passportPhotoUrl) {
                                    toast.error("No file upload for Passport photograph");
                                    return;
                                }

                                //We want to update the form
                                if(agencyBankDetails && 
                                    Object.keys(agencyBankDetails).includes('id')){
                                        let params = {
                                            ...values,
                                            identificationCardImageUrl: idCardUrl,
                                            billImageUrl: utilityBillUrl,
                                            passportPhotograph: passportPhotoUrl,
                                            bankRegistrationId: agencyBankDetails.id,
                                            status: "PENDING",
                                            rejectionReasons: {}
                                        };
                                        dispatch(updateAgencyBankingSignup(params));
                                } else {
                                    let params = {
                                        ...values,
                                        identificationCardImageUrl: idCardUrl,
                                        billImageUrl: utilityBillUrl,
                                        passportPhotograph: passportPhotoUrl
                                    };
                                    dispatch(agencyBankingSignup(params));
                                }
                            }, 300);
                        }}
                    >
                    {({ handleChange, errors, values, touched, setFieldValue, initialValues }) => (
                        <Form>
                            <InputBlock>
                                <SelectBox
                                    name={"title"}
                                    placeholder={"Title"}
                                    value={values.title}
                                    options={[ 
                                        { value: "mr", label: "Mr" }, 
                                        { value: "mrs", label: "Mrs" },
                                        { value: "miss", label: "Miss"}
                                    ]}
                                    disabled={agentState === "PENDING"}
                                    handleChange={handleChange}
                                    valid={`${(!touched.title && !errors.title)}`}
                                    errors={(touched && touched.title) && (errors && errors.title)}
                                />
                                <InputWithLabel
                                    label="First name"
                                    placeholder="First name" 
                                    value={values.firstName}
                                    name="firstName" 
                                    type="text"   
                                    disabled={agentState === "PENDING"}                      
                                    errors={(touched && touched.firstName) && (errors && errors.firstName)}
                                    valid={`${(touched.firstName && !errors.firstName)}`}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <InputWithLabel
                                    label="Middle name"
                                    placeholder="Middle name" 
                                    value={values.middleName}
                                    name="middleName" 
                                    type="text"   
                                    disabled={agentState === "PENDING"}                     
                                    errors={(touched && touched.middleName) && (errors && errors.middleName)}
                                    valid={`${(touched.middleName && !errors.middleName)}`}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <InputWithLabel
                                    label="Last name"
                                    placeholder="Last name" 
                                    value={values.lastName}
                                    name="lastName" 
                                    type="text"  
                                    disabled={agentState === "PENDING"}                      
                                    errors={(touched && touched.lastName) && (errors && errors.lastName)}
                                    valid={`${(touched.middleName && !errors.middleName)}`}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <InputWithLabel
                                    label={"Date of birth"}
                                    type={"text"}
                                    value={values.dateOfBirth}
                                    placeholder={"DD/MM/YYYY"}
                                    name={"dateOfBirth"}
                                    inputMode={"numeric"}
                                    disabled={agentState === "PENDING"}
                                    onKeyUp={event => {
                                        if (event.which !== 8) {
                                            event.target.value = autoSign('/', event.target.value, 8);

                                            if (event.target.value.length >= 9) {
                                                event.target.value = event.target.value.slice(0, 10);
                                            };
                                        };
                                    }}
                                    valid={`${(touched.dateOfBirth && !errors.dateOfBirth)}`}
                                    errors={(touched && touched.dateOfBirth) && (errors && errors.dateOfBirth)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <SelectGender
                                    title={"What's your gender?"}
                                    setAnswer={setFieldValue}
                                    answer={values.gender}
                                    name={"gender"}
                                    disabled={agentState === "PENDING"}
                                    errors={(touched && touched.gender) && (errors && errors.gender)}
                                />
                                <InputWithLabel
                                    label={"Email Address"}
                                    type={"text"}
                                    value={values.email}
                                    placeholder={"Email Address"}
                                    name={"email"}
                                    disabled={agentState === "PENDING"}
                                    valid={`${(!touched.email && !errors.email)}`}
                                    errors={(touched && touched.email) && (errors && errors.email)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <InputWithLabel
                                    label={"Phone Number"}
                                    type={"text"}
                                    value={values.phoneNumber}
                                    placeholder={"Phone Number"}
                                    name={"phoneNumber"}
                                    maxLength = "13"
                                    disabled={agentState === "PENDING"}
                                    onKeyPress={(event) => {
                                        if(event.charCode < 48 || event.charCode > 57) {
                                            event.preventDefault();
                                        };
                                    }}
                                    onKeyUp={e => e.target.value = e.target.value.replace(/\s/g, '')}
                                    valid={`${(!touched.phoneNumber && !errors.phoneNumber)}`}
                                    errors={(touched && touched.phoneNumber) && (errors && errors.phoneNumber)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <Message top={"16px"} bottom={"16px"}>House address</Message>
                                <InputWithLabel
                                    label={"Home Address"}
                                    type={"text"}
                                    noClearButton
                                    value={values.streetAddress}
                                    placeholder={"Home Address"}
                                    name={"streetAddress"}
                                    disabled={agentState === "PENDING"}
                                    valid={`${(!(touched && touched.streetAddress) && !(errors && errors.streetAddress))}`}
                                    errors={(touched && touched.streetAddress) && (errors && errors.streetAddress)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <SelectBox
                                    name={"state"}
                                    placeholder={"State"}
                                    value={values.state}
                                    options={states}
                                    disabled={agentState === "PENDING"}
                                    handleChange={handleChange}
                                    valid={`${(!(touched && touched.state) && !(errors && errors.state))}`}
                                    errors={(touched && touched.state) && (errors && errors.state)}
                                />
                                <SelectBox
                                    name={"localGovernmentArea"}
                                    placeholder={"Local Government Area"}
                                    value={values.localGovernmentArea}
                                    disabled={agentState === "PENDING"}
                                    options={(values.state) ? selectAreasByState(values.state, localAreas) : []}
                                    handleChange={handleChange}
                                    valid={`${(!(touched && touched.localGovernmentArea) && !(errors && errors.localGovernmentArea))}`}
                                    errors={(touched && touched.localGovernmentArea) && (errors && errors.localGovernmentArea)}
                                />
                                <Message top={"16px"} bottom={"16px"}>Business information</Message>
                                <InputWithLabel
                                    label={"Business Name"}
                                    type={"text"}
                                    noClearButton
                                    value={values.businessName}
                                    placeholder={"Business Name"}
                                    name={"businessName"}
                                    disabled={agentState === "PENDING"}
                                    valid={`${(!(touched && touched.businessName) && !(errors && errors.businessName))}`}
                                    errors={(touched && touched.businessName) && (errors && errors.businessName)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <InputWithLabel
                                    label={"Business Mobile Number"}
                                    type={"text"}
                                    noClearButton
                                    value={values.businessMobileNumber}
                                    placeholder={"Business Mobile Number"}
                                    name={"businessMobileNumber"}
                                    maxLength = "13"
                                    disabled={agentState === "PENDING"}
                                    onKeyPress={(event) => {
                                        if(event.charCode < 48 || event.charCode > 57) {
                                            event.preventDefault();
                                        };
                                    }}
                                    onKeyUp={e => e.target.value = e.target.value.replace(/\s/g, '')}
                                    valid={`${(!(touched && touched.businessMobileNumber) && !(errors && errors.businessMobileNumber))}`}
                                    errors={(touched && touched.businessMobileNumber) && (errors && errors.businessMobileNumber)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <InputWithLabel
                                    label={"Business Start Date"}
                                    type={"text"}
                                    value={values.businessStartDate}
                                    placeholder={"DD/MM/YYYY"}
                                    name={"businessStartDate"}
                                    inputMode={"numeric"}
                                    disabled={agentState === "PENDING"}
                                    onKeyUp={event => {
                                        if (event.which !== 8) {
                                            event.target.value = autoSign('/', event.target.value, 8);

                                            if (event.target.value.length >= 9) {
                                                event.target.value = event.target.value.slice(0, 10);
                                            };
                                        };
                                    }}
                                    valid={`${(touched.businessStartDate && !errors.businessStartDate)}`}
                                    errors={(touched && touched.businessStartDate) && (errors && errors.businessStartDate)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <InputWithLabel
                                    label={"Business Location"}
                                    type={"text"}
                                    value={values.businessLocation}
                                    placeholder={"Business Location"}
                                    name={"businessLocation"}
                                    disabled={agentState === "PENDING"}
                                    valid={`${(!touched.businessLocation && !errors.businessLocation)}`}
                                    errors={(touched && touched.businessLocation) && (errors && errors.businessLocation)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <SelectBox
                                    name={"businessRegistrationType"}
                                    placeholder={"Business registration type"}
                                    value={values.businessRegistrationType}
                                    options={[
                                        { value: "starter business", label: "Starter Business" },
                                        { value: "registered business", label: "Registered Business" }
                                    ]}
                                    disabled={agentState === "PENDING"}
                                    handleChange={handleChange}
                                    valid={`${(!touched.businessRegistrationType && !errors.businessRegistrationType)}`}
                                    errors={(touched && touched.businessRegistrationType) && (errors && errors.businessRegistrationType)}
                                />
                                <Message top={"16px"} bottom={"16px"}>Identity Verification</Message>
                                <InputWithLabel
                                    label={"BVN"}
                                    type={"text"}
                                    value={values.bvn}
                                    placeholder={"BVN"}
                                    name="bvn"
                                    disabled={agentState === "PENDING"}
                                    valid={`${(!touched.bvn && !errors.bvn)}`}
                                    errors={(touched && touched.bvn) && (errors && errors.bvn)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                    maxLength={11}
                                />
                                <SelectBox
                                    name={"highestLevelOfEducation"}
                                    placeholder={"Highest level of education"}
                                    value={values.highestLevelOfEducation}
                                    options={[
                                        { value: "fslc", label: "FSLC" },
                                        { value: "ssce", label: "SSCE" },
                                        { value: "diploma", label: "Diploma" },
                                        { value: "nce", label: "NCE" },
                                        { value: "ond", label: "OND" },
                                        { value: "hnd", label: "HND" },
                                        { value: "bsc", label: "BSC" },
                                        { value: "msc", label: "MSC" },
                                        { value: "phd", label: "PHD" }
                                    ]}
                                    disabled={agentState === "PENDING"}
                                    handleChange={handleChange}
                                    valid={`${(!touched.highestLevelOfEducation && !errors.highestLevelOfEducation)}`}
                                    errors={(touched && touched.highestLevelOfEducation) && (errors && errors.highestLevelOfEducation)}
                                />
                                <FlexContainer>
                                    <Message top={"0"}>Upload a ID Card</Message>
                                    {(idCardVerificationState && <VerificationStatus status={idCardVerificationState} />)}
                                </FlexContainer>
                                <SelectBox
                                    name={"identificationCard"}
                                    placeholder={"Identification Card"}
                                    value={values.identificationCard}
                                    options={[
                                        { value: "nationalId", label: "National ID" },
                                        { value: "votersCard", label: "Voter's Card" },
                                        { value: "intlPassport", label: "Intl Passport" },
                                        { value: "driversLicense", label: "Driver's License" }
                                    ]}
                                    disabled={agentState === "PENDING"}
                                    handleChange={handleChange}
                                    valid={`${(!touched.identificationCard && !errors.identificationCard)}`}
                                    errors={(touched && touched.identificationCard) && (errors && errors.identificationCard)}
                                />
                                <InputWithLabel
                                    label={"Identification Number"}
                                    type={"text"}
                                    inputMode={"numeric"}
                                    value={values.identificationNumber}
                                    placeholder={"Identification Number"}
                                    name={"identificationNumber"}
                                    disabled={agentState === "PENDING"}
                                    valid={`${(!touched.identificationNumber && !errors.identificationNumber)}`}
                                    errors={(touched && touched.identificationNumber) && (errors && errors.identificationNumber)}
                                    setFieldValue={setFieldValue}
                                    initialValues={initialValues}
                                />
                                <FileInput2
                                    name={"idCard"}
                                    accept={"image/*"}
                                    defaultFileName={"ID Card"}
                                    fileName={(idCard && idCard.name)}
                                    progress={(idCardState && idCardState.progress)}
                                    documentState={(idCardState && idCardState.state)}
                                    disabled={
                                        idCardVerificationState === "APPROVED" || 
                                        agentState === "PENDING"
                                    }
                                    deleteFile={() => {
                                        setTimeout(() => {
                                            setIdCardUrl("")
                                            setIdCard(undefined)
                                            dispatch(saveAgencyBankingIdCardImage(undefined))
                                            setIdCardState({ state: NORMAL, progress: 0})
                                        }, 300);
                                    }}
                                    cancelFile={() => {
                                        setTimeout(() => {
                                            //intercept the call and cancel
                                            //source.cancel();
                                            //setIdCardUrl("")
                                            //setIdCard(undefined)
                                            //setIdCardState({ state: NORMAL, progress: 0})
                                        }, 10);
                                    }}
                                    handleFile={async event => {
                                        if (event.target.files[0]) {
                                            const file = event.target.files[0];

                                            setIdCardState({ state: PROGRESS, progress: 5})       
                                            const image = await compressImage(file)
                                            image && setIdCard(image);
                                            dispatch(saveAgencyBankingIdCardImage(image))
                                
                                            const idCardLink = await dispatch(
                                                uploadFile(
                                                    "ID Card",//label
                                                    URL.createObjectURL(image), //url
                                                    image, //fileData
                                                    setIdCardState,
                                                    source
                                                )
                                            );
                                            setIdCardUrl(idCardLink)
                                        }
                                    }}
                                    retryFile={async () => {
                                        setIdCardRetry(idCardRetry + 1)
                                        if (idCardRetry >= 2) {
                                            setIdCardRetry(0)
                                            setIdCardUrl("")
                                            setIdCard(undefined)
                                            dispatch(saveAgencyBankingIdCardImage(undefined))
                                            setIdCardState({ state: NORMAL, progress: 0})
                                         } else {
                                            const idCardLink = await dispatch(
                                                uploadFile(
                                                    "ID Card",//label
                                                    URL.createObjectURL(idCard), //url
                                                    idCard, //fileData
                                                    setIdCardState,
                                                    source
                                                )
                                            );
                                            setIdCardUrl(idCardLink)
                                         }
                                    }}
                                />
                                <FlexContainer>
                                    <Message top={"0"}>Utility Bill (Electricity, Waste bills etc)</Message>
                                    {(utilityBillVerificationState && <VerificationStatus status={utilityBillVerificationState} />)}
                                </FlexContainer>
                                <SelectBox
                                    name={"billType"}
                                    placeholder={"Select Bill"}
                                    value={values.billType}
                                    options={[
                                        {
                                            value: "waste",
                                            label: "Waste Bill"
                                        },
                                        {
                                            value: "water",
                                            label: "Water Bill"
                                        },
                                        {
                                            value: "electricity",
                                            label: "Electricity Bill"
                                        },
                                        {
                                            value: "entertainment",
                                            label: "Entertainment Bill"
                                        }
                                    ]}
                                    disabled={agentState === "PENDING"}
                                    handleChange={handleChange}
                                    valid={`${(!touched.billType && !errors.billType)}`}
                                    errors={(touched && touched.billType) && (errors && errors.billType)}
                                />
                                <FileInput2
                                    name={"utilityBill"}
                                    accept={"image/*"}
                                    defaultFileName={"Utility Bill"}
                                    fileName={(utilityBill && utilityBill.name)}
                                    progress={(utilityBillState && utilityBillState.progress)}
                                    documentState={(utilityBillState && utilityBillState.state)}
                                    disabled={
                                        utilityBillVerificationState === "APPROVED" || 
                                        agentState === "PENDING"
                                    }
                                    deleteFile={() => {
                                        setTimeout(() => {
                                            setUtilityBillUrl("")
                                            setUtilityBill(undefined)
                                            dispatch(saveAgencyBankingUtilityImage(undefined))
                                            setUtilityBillState({ state: NORMAL, progress: 0})
                                        }, 300);
                                    }}
                                    cancelFile={() => {
                                        setTimeout(() => {
                                            //intercept the call and cancel
                                            //source.cancel();
                                            //setUtilityBillUrl("")
                                            //setUtilityBill(undefined)
                                            //setUtilityBillState({ state: NORMAL, progress: 0})
                                        }, 10);
                                    }}
                                    handleFile={async event => {
                                        if (event.target.files[0]) {
                                            const file = event.target.files[0];

                                            setUtilityBillState({ state: PROGRESS, progress: 5})
                                            const image = await compressImage(file)
                                            image && setUtilityBill(image);
                                            dispatch(saveAgencyBankingUtilityImage(image))
                                            
                                            const utilityBillLink = await dispatch(
                                                uploadFile(
                                                    "Utility Bill",//label
                                                    URL.createObjectURL(image), //url
                                                    image,//fileData
                                                    setUtilityBillState,
                                                    source
                                                )
                                            );
                                            setUtilityBillUrl(utilityBillLink)
                                        }
                                    }}
                                    retryFile={async () => {
                                        setUtilityBillRetry(utilityBillRetry + 1)
                                        if (utilityBillRetry >= 2) {
                                            setUtilityBillRetry(0)
                                            setUtilityBillUrl("")
                                            setUtilityBill(undefined)
                                            dispatch(saveAgencyBankingUtilityImage(undefined))
                                            setUtilityBillState({ state: NORMAL, progress: 0})
                                         } else {
                                            const utilityBillLink = await dispatch(
                                                uploadFile(
                                                    "Utility Bill",//label
                                                    URL.createObjectURL(utilityBill), //url
                                                    utilityBill, //fileData
                                                    setUtilityBillState,
                                                    source
                                                )
                                            );
                                            setUtilityBillUrl(utilityBillLink)
                                         }
                                    }}
                                />
                                 <FlexContainer>
                                    <Message top={"0"}>Passport Photograph (Passport sized)</Message>
                                    {(passportPhotoVerificationState && <VerificationStatus status={passportPhotoVerificationState} />)}
                                </FlexContainer>
                                <FileInput2
                                    name={"passportPhoto"}
                                    accept={"image/*"}
                                    defaultFileName={"Passport Photograph"}
                                    fileName={(passportPhoto && passportPhoto.name)}
                                    progress={(passportPhotoState && passportPhotoState.progress)}
                                    documentState={(passportPhotoState && passportPhotoState.state)}
                                    disabled={
                                        passportPhotoVerificationState === "APPROVED" || 
                                        agentState === "PENDING"
                                    }
                                    deleteFile={() => {
                                        setTimeout(() => {
                                            setPassportPhotoUrl("")
                                            setPassportPhoto(undefined)
                                            dispatch(saveAgencyBankingPassportImage(undefined))
                                            setPassportPhotoState({ state: NORMAL, progress: 0})
                                        }, 300);
                                    }}
                                    cancelFile={() => {
                                        setTimeout(() => {
                                            //intercept the call and cancel
                                            //source.cancel();
                                            //setPassportPhotoUrl("")
                                            //setPassportPhoto(undefined)
                                            //setPassportPhotoState({ state: NORMAL, progress: 0})
                                        }, 10);
                                    }}
                                    handleFile={async event => {
                                        if (event.target.files[0]) {
                                            const file = event.target.files[0];

                                            setPassportPhotoState({ state: PROGRESS, progress: 5})      
                                            const image = await compressImage(file)
                                            image && setPassportPhoto(image);
                                            dispatch(saveAgencyBankingPassportImage(image))
                                                
                                            const passportPhotoLink = await dispatch(
                                                uploadFile(
                                                    "Passport",//label
                                                    URL.createObjectURL(image), //url
                                                    image, //fileData
                                                    setPassportPhotoState,
                                                    source
                                                )
                                            );
                                            setPassportPhotoUrl(passportPhotoLink)
                                        }
                                    }}
                                    retryFile={async () => {
                                        setPassportPhotoRetry(passportPhotoRetry + 1)
                                        if (passportPhotoRetry >= 2) {
                                            setPassportPhotoRetry(0)
                                            setPassportPhotoUrl("")
                                            setPassportPhoto(undefined)
                                            dispatch(saveAgencyBankingPassportImage(undefined))
                                            setPassportPhotoState({ state: NORMAL, progress: 0})
                                         } else {
                                            const passportPhotoLink = await dispatch(
                                                uploadFile(
                                                    "Passport",//label
                                                    URL.createObjectURL(passportPhoto), //url
                                                    passportPhoto, //fileData
                                                    setPassportPhotoState,
                                                    source
                                                )
                                            );
                                            setPassportPhotoUrl(passportPhotoLink)
                                         }
                                    }}
                                />
                            </InputBlock>
                            <RippleButton
                                type="submit"
                                top={"8px"}
                                disabled={
                                    agentState === "PENDING"
                                }
                                //disabled={
                                //    Object.values(values).some(value => value.length === 0) 
                                    // || !idCardUrl || !utilityBillUrl || !passportPhotoUrl
                                //}
                            >
                                Upgrade account
                            </RippleButton>
                        </Form>
                    )}
                    </Formik>
                </ScreenContainer>
            </ViewContainer>
        </Fragment>
    );
};

export default AgencyBankingSignup;