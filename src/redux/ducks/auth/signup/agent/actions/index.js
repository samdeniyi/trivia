import axios from "axios";
import { push } from "connected-react-router";
import { currentAPI } from "../../../../../../config";
import {
    getUserAdditionalInfo,
    sendUserInfoOnSignUp,
    resetMerchappPassword
} from "../../../../user/actions/index";
import { insertZero } from "../../../../../../utils/inputs/formatPhoneNumber";
//import { fileToFormData } from "../../../../../../utils/files/fileToFormData";
import { mixPanel } from '../../../../../../utils/mix-panel/mixPanel';
import { AUTH_PASSWORD_SETUP, SETTINGS_MERCHANT_UPGRADE_COMPLETE } from '../../../../../../utils/mix-panel/constants';
import {
    createInactiveRaveWallet
} from "../../../../account/wallet/actions/rave-wallet";
import { createWallet } from "../../../../account/wallet/actions/index";

import { toast } from "react-toastify";

import {
    CREATING_AGENT_ACCOUNT,
    CREATING_AGENT_ACCOUNT_SUCCESS,
    CREATING_AGENT_ACCOUNT_ERROR,
    LOADING
} from "../constants";

import {
    ACTIVATE_USER_ACCOUNT,
    SAVE_USER_NAME,
    SET_USER_LOGIN_STATUS,
    SAVE_USER_REGION,
    SAVE_USER_REFERRAL_CODE
} from "../../../../user/constants";
import { getShopFromMerchapp } from "../../../../applications/my-shop/actions/shop";

export const saveAgentReferralCode = code => dispatch => {
    dispatch({ type: SAVE_USER_REFERRAL_CODE, payload: code });
};

export const saveAgentName = payload => dispatch => {
    dispatch({ type: SAVE_USER_NAME, payload });
    dispatch(push("/user/create_agent_identity"));
};

export const saveAgentRegion = region => dispatch => {
    dispatch({ type: SAVE_USER_REGION, payload: region });
    dispatch(push("/user/create_agent_identity"));
};

// When a merchant wants to upgrade to an agent
export const saveMerchantRegion = region => dispatch => {
    dispatch({ type: SAVE_USER_REGION, payload: region });
    dispatch(push('/actions/um_agent_identity_check'));
};

export const sendUserRole = id => async () => {
    try {
        await axios.put(
            `${currentAPI}/api/users/public/setUserAgentRole/${id}`
        );
    } catch (error) {
        console.error(error);
    }
};

export const createAgentAccount = password => async (dispatch, getState) => {
    dispatch({ type: CREATING_AGENT_ACCOUNT });

    const phoneNumber = insertZero(getState().user.msisdn);
    const userId = getState().user.userId;
    const isOnMerchApp = getState().user.isOnMerchApp;
    const role = getState().user.role;
    const startTime = new Date();
    
    try {
        const responseSignUp = await axios.post(
            `${currentAPI}/api/authorize/${userId}`,
            { username: phoneNumber, password }
        );

        if (responseSignUp.status === 200) {
            const responseGenerateToken = await axios.post(
                `${currentAPI}/api/token/generate-token`,
                { username: phoneNumber, password }
            );

            if (responseGenerateToken.status === 200) {
                const tokenData = responseGenerateToken.data;

                localStorage.setItem(
                    "token",
                    JSON.stringify({
                        token: tokenData.token,
                        expiresIn: tokenData.expiresIn
                    })
                );

                localStorage.setItem(
                    "refreshToken",
                    JSON.stringify({
                        refreshToken: tokenData.refreshToken,
                        expiresIn: tokenData.refreshExpiresIn
                    })
                );

                isOnMerchApp && tokenData && await dispatch(
                    resetMerchappPassword(
                        phoneNumber,
                        password,
                        tokenData.token
                    )
                );

                !isOnMerchApp && tokenData && await dispatch(
                    createAgentAccountInMerchApp(
                        password,
                        phoneNumber,
                        tokenData.token
                    )
                );

                userId       && await dispatch(getUserAdditionalInfo());
                // tokenData    && await dispatch(createSpacesWallet());
                tokenData    && await dispatch(createWallet());
                tokenData    && await dispatch(createInactiveRaveWallet());
                isOnMerchApp && await dispatch(getShopFromMerchapp(phoneNumber));
                
                mixPanel.track(AUTH_PASSWORD_SETUP, 
                    { 
                        "Role": role === "ROLE_USER" ? "Merchant" : "Agent",
                        "Time": Math.round((new Date() - startTime) / 1000)
                    }
                )

                dispatch({ type: CREATING_AGENT_ACCOUNT_SUCCESS });
                dispatch({ type: ACTIVATE_USER_ACCOUNT });
                dispatch({ type: SET_USER_LOGIN_STATUS });
                dispatch(push("/"));
            }
        }
    } catch (error) {
        dispatch({
            type: CREATING_AGENT_ACCOUNT_ERROR,
            payload: error.message
        });

        toast.error(error.response.data.error);
    }
};

export const createAgentAccountInMerchApp = (
    password,
    username,
    token
) => async () => {
    try {
        await axios.post(
            `${currentAPI}/api/merchantAppIntegration/onboardAgent`,
            {
                password,
                username
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error(error);
    }
};

export const sendUserDocumentsOnRegistration = () => async (dispatch, getState) => {
    dispatch(request());

    try {
        //const msisdn = getState().user.msisdn;
        const userId = getState().user.userId;
        const document = getState().user.document;
        //const documentData = getState().user.documentData;
        const passport = getState().user.passport;
        //const passportData = getState().user.passportData;
        const docType = getState().user.document.label;

        //const formData = await fileToFormData(document.url, documentData);
        //const formData2 = await fileToFormData(passport.url, passportData);

        // const requestOne = axios.post(
        //     `${currentAPI}/api/storage/uploadAgentDocuments/${encodeURIComponent(msisdn)}/${document.label}`,
        //     formData,
        //     {
        //         headers: {
        //             "Content-Type": "multipart/form-data"
        //         }
        //     }
        // );
        // const requestTwo = axios.post(
        //     `${currentAPI}/api/storage/uploadAgentDocuments/${encodeURIComponent(msisdn)}/${passport.label}`,
        //     formData2,
        //     {
        //         headers: {
        //             "Content-Type": "multipart/form-data"
        //         }
        //     }
        // );

        const requestThree = (/*link1, link2*/) => axios.put(
            `${currentAPI}/api/users/public/documents/${userId}`,
           {
                documentList: [
                    {
                        documentName: document.url,
                        type: document.label
                    },  
                    {
                        documentName: passport.url,
                        type: passport.label
                    }
                ]
            }
        );

        // const sendUserDocumentResponse = await axios.all([
        //     requestOne,
        //     requestTwo
        // ]);

        await dispatch(
            sendUserInfoOnSignUp(userId, {
                documentType: docType
            })
        );

        if (document.url !== '' && passport.url !== '') {
        //if (sendUserDocumentResponse[0].status === 200 && sendUserDocumentResponse[1].status === 200) {
            await requestThree();
            dispatch(stoploading());
            dispatch(push("/user/create_agent_bank_account"));
        }
    } catch (error) {
        dispatch(stoploading());
        
        if (error && error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
    }
};

export const sendUserDocumentsOnUpgrade = () => async (dispatch, getState) => {
    dispatch(request());

    try {
        //const msisdn = getState().user.msisdn;
        const userId = getState().user.userId;
        const document = getState().user.document;
        //const documentData = getState().user.documentData;
        const passport = getState().user.passport;
        //const passportData = getState().user.passportData;
        const docType = getState().user.document.label;
        //const formData = await fileToFormData(document.url, documentData);
        //const formData2 = await fileToFormData(passport.url, passportData);

        // const requestOne = axios.post(
        //     `${currentAPI}/api/storage/uploadAgentDocuments/${encodeURIComponent(msisdn)}/${document.label}`,
        //     formData,
        //     {
        //         headers: {
        //             "Content-Type": "multipart/form-data"
        //         }
        //     }
        // );

        // const requestTwo = axios.post(
        //     `${currentAPI}/api/storage/uploadAgentDocuments/${encodeURIComponent(msisdn)}/${passport.label}`,
        //     formData2,
        //     {
        //         headers: {
        //             "Content-Type": "multipart/form-data"
        //         }
        //     }
        // );
        const requestThree = (/*link1, link2*/) => axios.put(
            `${currentAPI}/api/users/public/documents/${userId}`,
           {
                documentList: [
                    {
                        documentName: document.url,
                        type: document.label
                    },  
                    {
                        documentName: passport.url,
                        type: passport.label
                    }
                ]
            }
        );

        // const sendUserDocumentResponse = await axios.all([
        //     requestOne,
        //     requestTwo
        // ]);

        await dispatch(
            sendUserInfoOnSignUp(userId, {
                documentType: docType
            })
        );

        if (document.url !== '' && passport.url !== '') {
        //if (sendUserDocumentResponse[0].status === 200 && sendUserDocumentResponse[1].status === 200) {
            //await requestThree(sendUserDocumentResponse[0].data, sendUserDocumentResponse[1].data);
            await requestThree();
            dispatch(stoploading());
            dispatch(push("/actions/um_agent_bank_account"));
        }  
    } catch (error) {
        dispatch(stoploading());
        if (error && error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
    }
};       

export const upgradeMerchantToAgent = () => async (dispatch, getState) => {
    dispatch({ type: CREATING_AGENT_ACCOUNT });

    const firstName = getState().user.firstName;
    const lastName = getState().user.lastName;
    const userId = getState().user.userId;
    const email = getState().user.email;
    const documentType = getState().user.document.label;
    //passport
    const referralCode = getState().user.referralCode;
    const country = getState().user.country;
    const regionData = getState().user.regionData;
    //bank details

    try {
        await dispatch(sendUserRole(userId));
        await dispatch(
            sendUserInfoOnSignUp(userId, {
                firstName,
                lastName,
                email,
                documentType,
                //passport
                country,
                lga: regionData.lga,
                state: regionData.state,
                referralCode: referralCode || ""
            })
        );
                
        userId && (await dispatch(getUserAdditionalInfo()));
        mixPanel.track(SETTINGS_MERCHANT_UPGRADE_COMPLETE, 
            { 
                "User ID": userId,
                "Time": (new Date().toLocaleDateString())
            }
        )
        dispatch({ type: CREATING_AGENT_ACCOUNT_SUCCESS });
        dispatch({ type: ACTIVATE_USER_ACCOUNT });
        dispatch({ type: SET_USER_LOGIN_STATUS });
        dispatch(push("/"));
    } catch (error) {
        dispatch({
            type: CREATING_AGENT_ACCOUNT_ERROR,
            payload: error.message
        });

        toast.error(error.response.data.error);
    }
};


function stoploading() {
    return {
        type: LOADING,
        payload: false
    };
}

function request() {
    return {
        type: LOADING,
        payload: true
    };
}