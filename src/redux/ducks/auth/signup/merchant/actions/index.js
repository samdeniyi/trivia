import axios from "axios";
import { push } from "connected-react-router";
import { currentAPI } from "../../../../../../config";
import { getUserAdditionalInfo, resetMerchappPassword, getUserAgentByReferralCode, getUserData } from "../../../../user/actions";
import { insertZero } from "../../../../../../utils/inputs/formatPhoneNumber";
import { createInactiveRaveWallet } from "../../../../account/wallet/actions/rave-wallet";
import { createWallet } from "../../../../account/wallet/actions/index";

import { getShopFromMerchapp } from "../../../../applications/my-shop/actions/shop";

import {
    CREATING_ACCOUNT,
    CREATING_ACCOUNT_SUCCESS,
    CREATING_ACCOUNT_ERROR,
    SAVE_MERCHANT_BUSINESS_PROFILE,
} from "../constants";

import {
    ACTIVATE_USER_ACCOUNT, 
    SET_USER_LOGIN_STATUS
} from "../../../../user/constants";

import { mixPanel } from '../../../../../../utils/mix-panel/mixPanel';
import { AUTH_PASSWORD_SETUP, AUTH_PROVIDE_BUSINESS } from '../../../../../../utils/mix-panel/constants';

export const createAccount = password => async (dispatch, getState) => {
    dispatch({ type: CREATING_ACCOUNT });

    const phoneNumber  = insertZero(getState().user.msisdn);
    const userId       = getState().user.userId;
    // const firstName    = getState().user.firstName;
    // const lastName     = getState().user.lastName;
    // const email        = getState().user.email;
    // const country      = getState().user.country;
    const referralCode = getState().user.referralCode;
    const isOnMerchApp = getState().user.isOnMerchApp;
    const role = getState().user.role;
    const startTime = new Date();
    
    try {
        const responseSignIn = await axios.post(
            `${currentAPI}/api/authorize/${userId}`,
            { username: phoneNumber, password }
        );

        if (responseSignIn.status === 200) {
            // await dispatch(
            //     sendUserInfoOnSignUp(
            //         userId, 
            //         { 
            //             email, 
            //             firstName, 
            //             lastName,
            //             country,
            //             referralCode: referralCode || ""
            //         }
            //     )
            // );
            
            const responseGenerateToken = await axios.post(
                `${currentAPI}/api/token/generate-token`,
                { password, username: phoneNumber }
            );

            if (responseGenerateToken.status === 200) {
                const tokenData = responseGenerateToken.data;
                
                localStorage.setItem(
                    'token', 
                    JSON.stringify({ 
                        token:     tokenData.token, 
                        expiresIn: tokenData.expiresIn 
                    })
                );
        
                localStorage.setItem(
                    'refreshToken', 
                    JSON.stringify({ 
                        refreshToken: tokenData.refreshToken, 
                        expiresIn:    tokenData.refreshExpiresIn 
                    })
                );
                            
                isOnMerchApp && tokenData  && await dispatch(resetMerchappPassword(phoneNumber, password, tokenData));
                isOnMerchApp  && await dispatch(getShopFromMerchapp(phoneNumber));
                !isOnMerchApp && await dispatch(sendMerchantBusinessProfile(userId, password));
                userId        && await dispatch(getUserAdditionalInfo());
                // tokenData     && await dispatch(createSpacesWallet());
                tokenData     && await dispatch(createWallet());
                tokenData     && await dispatch(createInactiveRaveWallet());
                referralCode  && await dispatch(getUserAgentByReferralCode(referralCode));
                tokenData && await dispatch(getUserData());
                // referralCode  && await dispatch(sendReferralCodeForCommision(referralCode));

                mixPanel.track(AUTH_PASSWORD_SETUP, 
                    { 
                        "Role": role === "ROLE_USER" ? "Merchant" : "Agent",
                        "Time": Math.round((new Date() - startTime) / 1000)
                    }
                )
            
                dispatch({ type: CREATING_ACCOUNT_SUCCESS });
                dispatch({ type: ACTIVATE_USER_ACCOUNT });
                dispatch({ type: SET_USER_LOGIN_STATUS });
                dispatch(push('/'));
            };
        };
    } catch (error) {
        dispatch({
            type: CREATING_ACCOUNT_ERROR,
            payload: error.message
        });
        
        console.error(error);
    };
};

export const saveMerchantBusinessProfile = businessProfile => dispatch => {
    dispatch({ type: SAVE_MERCHANT_BUSINESS_PROFILE, payload: businessProfile });
    dispatch(push('/user/create_pin'));
};

export const sendMerchantBusinessProfile = (userId, password) => async (dispatch, getState) => {
    const businessProfile = getState().auth.signup.merchant.businessProfile;
    businessProfile.password = password;
    businessProfile.referralCode = getState().user.referralCode;

    try {
        const merchAppTelephoneResponse = await axios.put(
            `${currentAPI}/api/users/merchantBusinessData/${userId}`,
            JSON.stringify(businessProfile),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (merchAppTelephoneResponse.status === 200) {
            mixPanel.track(AUTH_PROVIDE_BUSINESS, 
                { 
                    "LGA": businessProfile.lga,
                    "State": businessProfile.state,
                    "Business Categories": businessProfile.businessCategories
                }
            )
            return merchAppTelephoneResponse.data;
        };
    } catch (error) {
        console.error(error);
    }
};

export const sendReferralCodeForCommision = referralCode => async (dispatch, getState) => {
    const generatedByUserID = getState().user.userId;
    
    try {
        await axios.put(
            `${currentAPI}/api/commissions/onboarding`,
            JSON.stringify({
                generatedByUserID,
                referralCode
            }),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error) {
        console.error(error);
    }
};

export const verifyShopName = (businessName, setErrors, type) => async (dispatch) => {
    dispatch({ type: CREATING_ACCOUNT });
    try {
        const verifyShopNameResponse = await axios.post(
            `${currentAPI}/api/merchantAppIntegration/public/verifyShop`,
            { businessName }
        );

        const { code } = verifyShopNameResponse.data;

        if (code === 200) {
            dispatch({ type: CREATING_ACCOUNT_SUCCESS });
            if(type ==="shopName") {
                setErrors({ "shopName": "shop name already taken" })
            }else {
                setErrors({ "businessName": "Business name already taken 1" })
            }
            return false;
        } else if (code === 202) {
            dispatch({ type: CREATING_ACCOUNT_SUCCESS });
            return true;
        };
    } catch (error) {
        console.error(error);
        dispatch({ type: CREATING_ACCOUNT_SUCCESS });
        if(type ==="shopName") {
            setErrors({ "shopName": "shop name already taken" })
        }else {
            setErrors({ "businessName": "Business name already taken 1" })
        }       
        return false;
    }
};


export const setUserRoleMerchant = id => async () => {
    try {
        await axios.put(
            `${currentAPI}/api/users/public/setUserMerchantRole/${id}`
        );
    } catch (error) {
        console.error(error);
    }
};
