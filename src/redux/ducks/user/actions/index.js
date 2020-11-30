import {
    SAVE_USER_NAME,
    SAVE_USER_ROLE,
    SAVE_USER_DATA,
    SAVE_USER_AGENT_DATA,
    SAVE_USER_DOCUMENT,
    SAVE_USER_DOCUMENT_DATA,
    SAVE_USER_PASSPORT,
    SAVE_USER_PASSPORT_DATA,
    SAVE_USER_REFERRAL_CODE,
    SAVE_USER_CREATION_DATE,
    SAVE_AGENT_SHARE_CODE,
    SAVE_USER_VERIFICATION_STATUS,
    SET_USER_LOGIN_STATUS,
    USER_LOGOUT,
    SAVE_USER_REGION,
    SAVE_USER_ADDRESS,
    SAVE_USER_EMAIL,
    SAVE_USER_AVATAR,
    SET_USER_MERCHAPP_PRESENT,
    SAVE_REJECTED_REASONS,
    GET_USER_DOCUMENTS,
    GET_DEFAULT_BANK_DATA,
    GET_USER_KYC_VERIFICATION_STATE,
    SAVE_USER_DOCUMENT_STATE,
    SAVE_USER_PASSPORT_STATE,
    GET_USER_TIER_LEVEL
} from "../constants";

import { LOGGING_USER_IN, LOGIN_SUCCESS, LOGIN_ERROR } from "../../auth/login/constants";
import { LOADING } from "../../account/kyc/constants"

import axios from 'axios';
import { push } from 'connected-react-router';
import { toast } from "react-toastify";
import { currentAPI } from '../../../../config';
import { fileToFormData } from "../../../../utils/files/fileToFormData";
import { getUserWalletData, getUserCardData, getAllBankAccounts } from "../../account/wallet/actions";
import { sendUserRole } from "../../auth/signup/agent/actions";
import { setUserRoleMerchant } from "../../auth/signup/merchant/actions";

import { countAmount } from "../../../../utils/currency/countAmount";
import { insertZero } from "../../../../utils/inputs/formatPhoneNumber";
import { formatCreationDate } from "../../../../utils/date/formatCreationDate";
import {
    NORMAL,
    PROGRESS,
    FAILED,
    SUCCESS
} from '../../../../components/forms/input/file2'
import { mixPanel } from '../../../../utils/mix-panel/mixPanel';
import { AUTH_USER_LOGIN, AUTH_LOGOUT, AUTH_PROVIDE_ACCOUNT_INFO, SETTINGS_KYC } from '../../../../utils/mix-panel/constants';

export const saveUserRole = role => dispatch => {
    dispatch({ type: SAVE_USER_ROLE, payload: role });
};

export const logoutUser = () => (dispatch, getState) => {
    const date = (new Date()).toLocaleDateString();
    const userId = getState().user.userId;
    const role = getState().user.role;
    mixPanel.track(AUTH_LOGOUT,
        {
            "User ID": userId,
            "Role": role === "ROLE_USER" ? "Merchant" : "Agent",
            "Time": date
        }
    )
    dispatch({ type: USER_LOGOUT });
};

export const saveUserKycVerificationState = state => dispatch => {
    dispatch({ type: GET_USER_KYC_VERIFICATION_STATE, payload: state });
};

export const saveUserTierLevel = state => dispatch => {
    dispatch({ type: GET_USER_TIER_LEVEL, payload: state });
};

export const saveUserData = ({ firstName, lastName, email, referralCode }, redirect) => dispatch => {
    dispatch({ type: SAVE_USER_NAME, payload: { firstName, lastName } });
    dispatch({ type: SAVE_USER_EMAIL, payload: email });
    dispatch({ type: SAVE_USER_REFERRAL_CODE, payload: referralCode });
    redirect && dispatch(push(redirect));
};

export const reloginUser = password => async (dispatch, getState) => {
    dispatch({type: LOGGING_USER_IN});

    try {
        const msisdn = insertZero(getState().user.msisdn);
        const userId = getState().user.userId;
        const role = getState().user.role;

        const responseGenerateToken = await axios.post(
            `${currentAPI}/api/token/generate-token`,
            {password, username: msisdn}
        );

        if (responseGenerateToken.status === 200) {
            const tokenData = responseGenerateToken.data;

            localStorage.setItem(
                'token',
                JSON.stringify({
                    token: tokenData.token,
                    expiresIn: tokenData.expiresIn
                })
            );

            localStorage.setItem(
                'refreshToken',
                JSON.stringify({
                    refreshToken: tokenData.refreshToken,
                    expiresIn: tokenData.refreshExpiresIn
                })
            );
            mixPanel.track(AUTH_USER_LOGIN, {"User ID": userId, "Role": role})
            dispatch({type: LOGIN_SUCCESS});
            dispatch({type: SET_USER_LOGIN_STATUS, payload: true});
        }
        return responseGenerateToken;
    } catch (error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: error.message
        });
        return error.request
    }
}
export const loginUser = password => async (dispatch, getState) => {
    dispatch({ type: LOGGING_USER_IN });

    try {
        const msisdn = insertZero(getState().user.msisdn);
        const userId = getState().user.userId;
        const role = getState().user.role;

        const responseGenerateToken = await axios.post(
            `${currentAPI}/api/token/generate-token`,
            { password, username: msisdn }
        );

        if (responseGenerateToken.status === 200) {
            const tokenData = responseGenerateToken.data;

            localStorage.setItem(
                'token',
                JSON.stringify({
                    token: tokenData.token,
                    expiresIn: tokenData.expiresIn
                })
            );

            localStorage.setItem(
                'refreshToken',
                JSON.stringify({
                    refreshToken: tokenData.refreshToken,
                    expiresIn: tokenData.refreshExpiresIn
                })
            );

            tokenData && await dispatch(getUserData());
            tokenData && await dispatch(getUserWalletData());
            tokenData && await dispatch(getUserCardData());
            tokenData && await dispatch(getAllBankAccounts());
            tokenData && await dispatch(getUserAdditionalInfo());
            tokenData && await dispatch(getUserAgentByReferralCode());
            mixPanel.track(AUTH_USER_LOGIN,
                {
                    "User ID": userId,
                    "Role": role === "ROLE_USER" ? "Merchant" : "Agent"
                }
            )
            dispatch({ type: LOGIN_SUCCESS });
            dispatch({ type: SET_USER_LOGIN_STATUS, payload: true });
            dispatch(push('/'));
        };
    } catch (error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: error.message
        });

        if (error.response && error.response.status === 400) {
            toast.error("You've provided the wrong password");
        } else if(error.response && error.response.status === 500){
            toast.error("You've provided the wrong password");
        } else {
            toast.error(error.message);
        };
    }
};

export const getUserAgentByReferralCode = code => async (dispatch, getState) => {
    let referralCode;
    if (code) {
        referralCode = code;
    } else {
        referralCode = getState().user.referralCode;
    };

    if (!referralCode) {
        return
    }

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const getAgentByReferralResponse = await axios.get(
            `${currentAPI}/api/users/agent/${referralCode}?referralCode=${referralCode}`,
            {
               headers: {
                   "Authorization": `Bearer ${token}`
               }
            }
        );

        if (getAgentByReferralResponse.status === 200) {
            const {
                firstName,
                lastName,
                msisdn,
                email,
                country,
                state,
                lga,
                avatar,
                agentCodeToShare
            } = getAgentByReferralResponse.data;

            const agentData = {
                firstName,
                lastName,
                msisdn,
                email,
                country,
                state,
                lga,
                avatar,
                agentCodeToShare,
              }

             agentData && dispatch({
                type: SAVE_USER_AGENT_DATA,
                payload: agentData
            });
        };
    } catch (error) {
        console.error(error)
    }
};

export const sendAgentReferral = (agentCodeToShare) => async dispatch => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const sendAgentReferralResponse = await axios.patch(
            `${currentAPI}/api/users/merchantAgent/${agentCodeToShare.referralCode}`,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (sendAgentReferralResponse.status === 200) {
            const { referralCode } = sendAgentReferralResponse.data;

            referralCode && dispatch({
                type: SAVE_USER_REFERRAL_CODE,
                payload: referralCode
            });

            referralCode && await dispatch(getUserAgentByReferralCode(referralCode));

            toast.success("Your agent information was successfully updated");
        };
    } catch (error) {
        toast.error("Failed to update agent information");
    }
};

export const getUserAdditionalInfo = () => async (dispatch, getState) => {
    const userId = getState().user.userId;

    try {
        const getUserByIdResponse = await axios.get(`${currentAPI}/api/users/${userId}`);

        if (getUserByIdResponse.status === 200) {
            const { role, createdAt, agentDocuments, defaultBankAccountData } = getUserByIdResponse.data;
            const { agentCodeToShare, documentType, agentState, tier  } = getUserByIdResponse.data.data;
        
            agentState && dispatch(saveUserKycVerificationState(agentState));

            tier && dispatch(saveUserTierLevel(tier));

            defaultBankAccountData && dispatch({
                type: GET_DEFAULT_BANK_DATA,
                payload: defaultBankAccountData
            })

            agentDocuments && dispatch({
                type: GET_USER_DOCUMENTS,
                payload: agentDocuments
            });

            const passportData = getState().user.passportData;
            const documentData = getState().user.documentData;

            if (passportData && !passportData.name && role.name !== "ROLE_USER") {
                dispatch({
                    type: SAVE_USER_PASSPORT_DATA,
                    payload: { name: "PassportPhotograph.png", type: ".png" }
                });
                dispatch({
                    type: SAVE_USER_PASSPORT_STATE,
                    payload: {
                        state: SUCCESS,
                        progress: 0
                    }
                });
            }

            if (documentData && !documentData.name && role.name !== "ROLE_USER") {
                dispatch({
                    type: SAVE_USER_DOCUMENT_DATA,
                    payload: { name: documentType+".png", type: ".png" }
                });
                dispatch({
                    type: SAVE_USER_DOCUMENT_STATE,
                    payload: {
                        state: SUCCESS,
                        progress: 0
                    }
                });
            }

            agentCodeToShare && dispatch({
                type: SAVE_AGENT_SHARE_CODE,
                payload: agentCodeToShare
            });

            role && dispatch(saveUserRole(role.name));

            dispatch({
                type: SAVE_USER_CREATION_DATE,
                payload: new Date(createdAt)
            });

            agentDocuments && agentDocuments.documentList &&
                [...agentDocuments.documentList].forEach(element => {
                if(element.type === 'PassportPhotograph') {
                    return dispatch({
                        type: SAVE_USER_PASSPORT,
                        payload: { label: element.type, url: element.documentName }
                    });
                } else {
                    return dispatch({
                        type: SAVE_USER_DOCUMENT,
                        payload: { label: element.type, url: element.documentName }
                    });
                }
            })

            // (documentType !== 'PassportPhotograph') && dispatch({
            //     type: SAVE_USER_DOCUMENT,
            //     payload: { label: documentType, url: "" }
            // });

        };
    } catch (error) {
        console.error(error);
    }
};

export const getAllUsers = () => async () => {
    await axios.get(`${currentAPI}/api/users/`);
};

export const getUserById = id => async (dispatch, getState) => {
    let userId;
    if (id) {
        userId = id;
    } else {
        userId = getState().user.userId;
    };

    const getUserByIdResponse = await axios.get(`${currentAPI}/api/users/${userId}`);
    return getUserByIdResponse.data.data;
};

export const deleteUser = (id) => async() => {
    await axios.delete(`${currentAPI}/api/users/${id}`);
};

export const updateToken = () => async () => {
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken')).refreshToken || null;

    const responseUpdateToken = await axios.post(
        `${currentAPI}/api/token/refresh-token`,
        { refreshToken }
    );

    if (responseUpdateToken.status === 200) {
        const tokenData = responseUpdateToken.data;

        localStorage.setItem(
            'token',
            JSON.stringify({
                token: tokenData.token,
                expiresIn: tokenData.expiresIn
            })
        );

        localStorage.setItem(
            'refreshToken',
            JSON.stringify({
                refreshToken: tokenData.refreshToken,
                expiresIn: tokenData.refreshExpiresIn
            })
        );
    };
};

export const getUserData = () => async dispatch => {
    try {
        const getUserDataResponse = await axios.get(
            `${currentAPI}/api/users/userData`
        );

        //console.log(getUserDataResponse)

        if (getUserDataResponse.status === 200) {
            const {
                firstName,
                lastName,
                email,
                houseAddress,
                country,
                state,
                lga,
                documentType,
                agentCodeToShare,
                referralCode,
                avatar,
                tier
            } = getUserDataResponse.data;

            const regionData = {
                country,
                state,
                lga
            };

            tier && dispatch(saveUserTierLevel(tier));
            
            regionData && dispatch({
                type: SAVE_USER_REGION,
                payload: regionData
            });

            houseAddress && dispatch({
                type: SAVE_USER_ADDRESS,
                payload: houseAddress
            });

            if (documentType !== 'PassportPhotograph') {
                dispatch({
                    type: SAVE_USER_DOCUMENT,
                    payload: { label: documentType, url: "" }
                });

                dispatch(setUserVerificationStatus(true));
            };

            agentCodeToShare && dispatch({
                type: SAVE_AGENT_SHARE_CODE,
                payload: agentCodeToShare
            });

            referralCode && dispatch({
                type: SAVE_USER_REFERRAL_CODE,
                payload: referralCode
            });

            avatar && dispatch({
                type: SAVE_USER_AVATAR,
                payload: avatar
            });

            dispatch({
                type: SAVE_USER_DATA,
                payload: {
                    firstName,
                    lastName,
                    email,
                    houseAddress
                }
            });
        };
    } catch(error) {
        console.error(error);
    }
};

export const sendUserDocument = (
    documentType,
    oldLink,
    hasPassport = false,
    hasDocument = false,
    redirect = null
) => async (dispatch, getState) => {

    dispatch({type: LOADING, payload: true});

    try {
        const userId       = getState().user.userId;
        const passport     = getState().user.passport;
        const document     = getState().user.document;
        const docType      = getState().user.document.label;
        const role         = getState().user.role;

        if (hasPassport && hasDocument) {
           const requestThree = () => axios.put(
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

            if (document.url !== '' && passport.url !== '') {
                await requestThree();
                await dispatch(
                    sendUserInfoOnSignUp(userId, {
                        documentType: docType
                    })
                );
                await dispatch(sendUserInfo({
                    agentState: "PENDING",
                }));
                await dispatch(getUserAdditionalInfo());
                dispatch(setUserVerificationStatus(true));
                dispatch({type: LOADING, payload: false});
                mixPanel.track(SETTINGS_KYC, { "User ID": userId, "Role": role })
                toast.success("Document was successfully uploaded");
                if (redirect) dispatch(push(redirect));
            };

        } else {
            const requestThree = (link1, link2) => axios.put(
                `${currentAPI}/api/users/public/documents/${userId}`,
                {
                documentList: [
                    {
                        documentName: link1,
                        type: document.label
                    },
                    {
                        documentName: link2,
                        type: passport.label
                    }
                ]
                }
            );

            if(oldLink !== '') {
                if (documentType === 'PassportPhotograph') {
                    await requestThree(oldLink, passport.url);
                } else {
                    await requestThree(document.url, oldLink);
                }

                if(documentType !== 'PassportPhotograph') {
                     await dispatch(
                        sendUserInfo({
                            documentType: documentType
                        })
                    );
                }

                await dispatch(sendUserInfo({
                    agentState: "PENDING",
                }));
                await dispatch(getUserAdditionalInfo());
                dispatch(setUserVerificationStatus(true));
                dispatch({type: LOADING, payload: false});
                mixPanel.track(SETTINGS_KYC, { "User ID": userId, "Role": role })
                toast.success("Document was successfully uploaded");
                if (redirect) dispatch(push(redirect));
            };
        }
    } catch (error) {
        dispatch({type: LOADING, payload: false});
        if (error && error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        };
    }
};

//Document

export const saveUserDocument = url => dispatch => {
    dispatch({ type: SAVE_USER_DOCUMENT, payload: url });
};

export const saveUserDocumentData = (documentData) => dispatch => {
    dispatch({ type: SAVE_USER_DOCUMENT_DATA, payload: documentData });
    if (!documentData.name) {
        dispatch({
            type: SAVE_USER_DOCUMENT_STATE,
            payload: {
                state: NORMAL,
                progress: 0
            }
        });
    }
};

export const uploadUserDocument = () => async (dispatch, getState) => {
    dispatch({
        type: SAVE_USER_DOCUMENT_STATE,
        payload: { state: PROGRESS, progress: 20}
    });

    try {
        const msisdn       = getState().user.msisdn;
        const document     = getState().user.document;
        const documentData = getState().user.documentData;
        const formData = await fileToFormData(document.url, documentData);
        dispatch({
            type: SAVE_USER_DOCUMENT_STATE,
            payload: { state: PROGRESS, progress: 60}
        });
        const sendUserDocumentResponse = await axios.post(
            `${currentAPI}/api/storage/uploadAgentDocuments/${encodeURIComponent(msisdn)}/${document.label}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        dispatch({
            type: SAVE_USER_DOCUMENT_STATE,
            payload: { state: PROGRESS, progress: 80}
        });

        if (sendUserDocumentResponse.status === 200) {
            dispatch({
                type: SAVE_USER_DOCUMENT,
                payload: {
                    label: document.label,
                    url: sendUserDocumentResponse.data
                }
            });
           dispatch({
              type: SAVE_USER_DOCUMENT_STATE,
              payload: { state: SUCCESS, progress: 0}
           });
        } else {
            dispatch({
                type: SAVE_USER_DOCUMENT_STATE,
                payload: { state: FAILED, progress: 0}
            });
        }
    } catch (error) {
        dispatch({
            type: SAVE_USER_DOCUMENT_STATE,
            payload: { state: FAILED, progress: 0}
        });
        if (error && error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        };
    }
};

//Passport

export const savePassport = url => dispatch => {
    dispatch({ type: SAVE_USER_PASSPORT, payload: url });
};

export const savePassportData = (passport) => dispatch => {
    dispatch({ type: SAVE_USER_PASSPORT_DATA, payload: passport});
    if (!passport.name) {
        dispatch({
            type: SAVE_USER_PASSPORT_STATE,
            payload: {
                state: NORMAL,
                progress: 0
            }
        });
    }
};

export const uploadPassport = () => async (dispatch, getState) => {
    dispatch({
        type: SAVE_USER_PASSPORT_STATE,
        payload: { state: PROGRESS, progress: 20}
    });

    try {
        const msisdn       = getState().user.msisdn;
        const passport     = getState().user.passport;
        const passportData = getState().user.passportData;
        const formData = await fileToFormData(passport.url, passportData);

        dispatch({
            type: SAVE_USER_PASSPORT_STATE,
            payload: { state: PROGRESS, progress: 60}
        });

        const sendUserPassportResponse = await axios.post(
            `${currentAPI}/api/storage/uploadAgentDocuments/${encodeURIComponent(msisdn)}/${passport.label}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        dispatch({
            type: SAVE_USER_PASSPORT_STATE,
            payload: { state: PROGRESS, progress: 80}
        });

        if (sendUserPassportResponse.status === 200) {
            dispatch({
                type: SAVE_USER_PASSPORT,
                payload: {
                    label: passport.label,
                    url: sendUserPassportResponse.data
                }
            });
            dispatch({
                type: SAVE_USER_PASSPORT_STATE,
                payload: { state: SUCCESS, progress: 0}
            });
        } else {
            dispatch({
                type: SAVE_USER_PASSPORT_STATE,
                payload: { state: FAILED, progress: 0}
            });
        }
    } catch (error) {
        dispatch({
            type: SAVE_USER_PASSPORT_STATE,
            payload: { state: FAILED, progress: 0}
        });
        if (error && error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        };
    }
};

export const setUserVerificationStatus = status => dispatch => {
    dispatch({ type: SAVE_USER_VERIFICATION_STATUS, payload: status });
};

export const sendUserInfo = info => async () => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const sendUserInfoResponse = await axios.patch(
            `${currentAPI}/api/users/`,
            JSON.stringify(info),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (sendUserInfoResponse.status === 200) {
            return sendUserInfoResponse;
        };
    } catch (error) {
        toast.error(error.data.response.error);
    }
};

export const sendUserInfoOnSignUp = (userId, info) => async () => {
    try {
        const response =  await axios.put(
            `${currentAPI}/api/users/public/userData/${userId}`,
            JSON.stringify(info),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.status === 200) {
            const role = response.data.role.name;
            if(info.email){
                mixPanel.track(AUTH_PROVIDE_ACCOUNT_INFO,
                    {
                        "Was Referred": info.referralCode !== "",
                        "Role": role === "ROLE_USER" ? "Merchant" : "Agent",
                        "Email Provided": !info.email.includes('@spaceso2o.com')
                    }
                )
            }
        }
    } catch (error) {
        console.error(error);
    }
};

export const getAllCommissions = () => async () => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const getReferralCommissionsResponse = await axios.get(
            `${currentAPI}/api/transactions/filter?page=0&resultsPerPage=1000000&types=COMMISSION`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (getReferralCommissionsResponse.status === 200) {
            const transactions = getReferralCommissionsResponse.data;
            const totalCommission = countAmount(transactions, "amount");

            return {
                totalCommission,
                transactions
            };
        };
    } catch (error) {
        console.error(error);
    }
};

export const sendUserNextOfKin = nextOfKin => async (dispatch, getState) => {
    try {
        const userId = getState().user.userId;

        const sendUserNextOfKinResponse = await axios.put(
            `${currentAPI}/api/users/nextOfKin/${userId}`,
            JSON.stringify(nextOfKin),
            {
                headers: {
                    "Content-Type": 'application/json',
                }
            }
        );

        if (sendUserNextOfKinResponse.status === 200) {
            toast.success("Your next of kin was added successfully");
        };
    } catch (error) {
        toast.error("Error while adding next of kin");
        console.error(error);
    }
};

export const getUserLastActiveState = (id, cb) => async () => {
    try {
        const lastUserActiveResponse = await axios.get(
            `${currentAPI}/api/users/lastActive?userId=${id}`
        );

        if (lastUserActiveResponse.status === 200) {
            const lastActive = lastUserActiveResponse.data.updatedAt || lastUserActiveResponse.data.createdAt;

            if (cb) {
                cb(id, formatCreationDate(lastActive));
            } else return lastActive;
        };
    } catch (error) {
        console.error(error);
    };
};

export const checkUserOnMerchapp = role => async (dispatch, getState) => {
    const phoneNumber = getState().user.msisdn;
    const userId = getState().user.userId;

    try {
        const merchappResponse = await axios.get(`
            ${currentAPI}/api/merchantAppIntegration/public/spaces-verify/${phoneNumber}
        `);


        if (merchappResponse.status === 200) {
            const { firstName, lastName, email } = merchappResponse.data;

            dispatch(saveUserRole(role));
            dispatch({ type: SET_USER_MERCHAPP_PRESENT, payload: true });

            if (role === 'user') {
                dispatch(push('/user/create_user'));
                await dispatch(setUserRoleMerchant(userId));

            } else {
                dispatch(push('/user/create_agent'));
                await dispatch(sendUserRole(userId));

            };

            dispatch(saveUserData({ firstName, lastName, email }, null));
            toast.success(`Hi, ${firstName} ${lastName}, welcome to Spaces Super App!`);
        } else if (merchappResponse.status === 202) {
            dispatch({ type: SET_USER_MERCHAPP_PRESENT, payload: false });

            if (role === 'user') {
                dispatch(push('/user/create_user'));
                await dispatch(setUserRoleMerchant(userId));
            } else {
                dispatch(push('/user/create_agent'));
                await dispatch(sendUserRole(userId));

            };
        };
    } catch (error) {
        toast.error(error.message);
    }
};

export const verifyUser = (phoneNumber) => async (dispatch, getState) => {
    try {
        const merchappResponse = await axios.get(`
            ${currentAPI}/api/merchantAppIntegration/public/spaces-verify/${phoneNumber}
        `);
        if (merchappResponse.status === 200) {
            dispatch({ type: SET_USER_MERCHAPP_PRESENT, payload: true });

        } else if (merchappResponse.status === 202) {
            dispatch({ type: SET_USER_MERCHAPP_PRESENT, payload: false });
        };
    } catch (error) {
        dispatch({ type: SET_USER_MERCHAPP_PRESENT, payload: false });
    }
};

export const resetMerchappPassword = (phoneNumber, password, token) => async dispatch => {
    try {
        const resetPasswordResponse = await axios.post(
            `${currentAPI}/api/merchantAppIntegration/public/password-reset-spaces`,
            JSON.stringify({
                confirmNewPassword: password,
                newPassword: password,
                phoneNumber
            }),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        if (resetPasswordResponse.status === 200) {
            const merchappSigninRes = await axios.post(
                `${currentAPI}/api/merchantAppIntegration/signin`, {password, username: phoneNumber},
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            if (merchappSigninRes.status === 200) {
                dispatch({ type: SET_USER_MERCHAPP_PRESENT, payload: true });
            }
        };
    } catch (error) {
        console.error(error);
    }
};

export const getRejectedReasons = id => async dispatch => {

    try {
        const reasonsResponse = await axios.get(`
            ${currentAPI}/api/rejectedReasons/byAgentId`, {
                params: {
                    agentId: id,
                }
            });

        if (reasonsResponse.status === 200) {
            dispatch({ type: SAVE_REJECTED_REASONS, payload: reasonsResponse.data });
        }
    } catch (error) {
        console.log(error.message);
    }
};