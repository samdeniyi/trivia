import {
    SENDING_TELEPHONE,
    SENDING_TELEPHONE_SUCCESS,
    SENDING_TELEPHONE_ERROR
} from "../constants";

import {
    SAVE_USER_TELEPHONE,
    SAVE_USER_ID,
    SAVE_USER_COUNTRY,
    SAVE_USER_NAME, SAVE_USER_AVATAR
} from "../../../user/constants";

import axios from "axios";
import { push } from "connected-react-router";
import { currentAPI } from "../../../../../config";
import { getUserPublicData } from "../../login/actions";
import { verifyUser } from "../../../user/actions/index";

import { setExpired } from "../../../timer/actions";
import { countriesMap } from "../../../../../data/countries";
import {
    insertCountryCode,
    insertZero
} from "../../../../../utils/inputs/formatPhoneNumber";
import { toast } from "react-toastify";
import { mixPanel } from '../../../../../utils/mix-panel/mixPanel';
import { AUTH_ENTER_PHONE_NUMBER } from '../../../../../utils/mix-panel/constants';

export const sendTelephoneOld = (phoneNumber, country) => async dispatch => {
    dispatch({ type: SENDING_TELEPHONE });

    const countryCode = countriesMap.get(country).code;
    const msisdn = insertCountryCode(phoneNumber, countryCode);

    try {
        const response = await axios.get(
            `${currentAPI}/api/otp/send/mobile?msisdn=${encodeURIComponent(
                msisdn
            )}`
        );
        
        const userData = await dispatch(getUserPublicData(response.data.userId));
        
        await dispatch(verifyUser(insertZero(phoneNumber)))

        if (response.status === 200 && response.data.status !== "USER_EXIST") {
            mixPanel.track(AUTH_ENTER_PHONE_NUMBER, 
                {   
                    "Phone Number": phoneNumber
                }
            )
            dispatch({ type: SENDING_TELEPHONE_SUCCESS });
            dispatch({ type: SAVE_USER_ID, payload: response.data.userId });
            dispatch(push("/check"));
        } else if (
            response.status === 200 &&
            response.data.status === "USER_EXIST" &&
            userData.registrationFinished
        ) {
            dispatch({ type: SENDING_TELEPHONE_SUCCESS });
            userData.avatar && dispatch({ type: SAVE_USER_AVATAR, payload: userData.avatar });
            userData.firstName && dispatch({ type: SAVE_USER_NAME, payload: userData });
            dispatch({ type: SAVE_USER_ID, payload: response.data.userId });
            dispatch(push("/login"));
        } else if (
            response.status === 200 &&
            response.data.status === "USER_EXIST" &&
            !userData.registrationFinished
        ) {
            const resetAuthorization = await axios.post(
                `${currentAPI}/api/authorize/reset/${encodeURIComponent(
                    msisdn
                )}`
            );

            if (resetAuthorization.status === 200) {
                await axios.get(
                    `${currentAPI}/api/otp/send/mobile?msisdn=${encodeURIComponent(
                        msisdn
                    )}`
                );
            };

            dispatch({ type: SAVE_USER_NAME, payload: userData });
            dispatch({ type: SENDING_TELEPHONE_SUCCESS });
            dispatch({ type: SAVE_USER_ID, payload: response.data.userId });
            dispatch(push({ pathname: "/check", userData }));
        }
        else {
            localStorage.clear()
            toast.error("An error occured, please try again!");
        }


    } catch (error) {
        if (
            error &&
            error.response &&
            error.response.status === 400 &&
            error.response.status !== "USER_EXIST"
        ) {
            dispatch({ type: SENDING_TELEPHONE_SUCCESS });
            dispatch(setExpired(true));
            dispatch(push("/check"));
        } else {
            dispatch({
                type: SENDING_TELEPHONE_ERROR,
                payload: error.message || "An error occured, please try again!"
            });

            toast.error(error.message || "An error occured, please try again!");
        }
    } finally {
        dispatch({
            type: SAVE_USER_TELEPHONE,
            payload: insertZero(phoneNumber)
        });
        dispatch({ type: SAVE_USER_COUNTRY, payload: country });
    }
};

export const sendTelephone = (phoneNumber, country) => async dispatch => {
    dispatch({ type: SENDING_TELEPHONE });

    const countryCode = countriesMap.get(country).code;
    const msisdn = insertCountryCode(phoneNumber, countryCode);

    try {
        const response = await axios.get(
            `${currentAPI}/api/otp/send/mobile?msisdn=${encodeURIComponent(
                msisdn
            )}`
        );
        
        const userData = await dispatch(getUserPublicData(response.data.userId));

        await dispatch(verifyUser(insertZero(phoneNumber)))

        if (response.status === 200) {
            if (response.data.status === "USER_EXIST") {
                if (userData && userData.registrationFinished) {
                    dispatch({ type: SENDING_TELEPHONE_SUCCESS });
                    userData.avatar && dispatch({ type: SAVE_USER_AVATAR, payload: userData.avatar });
                    userData.firstName && dispatch({ type: SAVE_USER_NAME, payload: userData });
                    dispatch({ type: SAVE_USER_ID, payload: response.data.userId });
                    dispatch(push("/login"));
                } else {
                    const resetAuthorization = await axios.post(
                        `${currentAPI}/api/authorize/reset/${encodeURIComponent(
                            msisdn
                        )}`
                    );
        
                    if (resetAuthorization.status === 200) {
                        await axios.get(
                            `${currentAPI}/api/otp/send/mobile?msisdn=${encodeURIComponent(
                                msisdn
                            )}`
                        );
                    };
        
                    dispatch({ type: SAVE_USER_NAME, payload: userData });
                    dispatch({ type: SENDING_TELEPHONE_SUCCESS });
                    dispatch({ type: SAVE_USER_ID, payload: response.data.userId });
                    dispatch(push({ pathname: "/check", userData }));
                }
            } else {
                mixPanel.track(AUTH_ENTER_PHONE_NUMBER, 
                    {   
                        "Phone Number": phoneNumber
                    }
                )
                dispatch({ type: SENDING_TELEPHONE_SUCCESS });
                dispatch({ type: SAVE_USER_ID, payload: response.data.userId });
                dispatch(push("/check"));
            }
        } else {
            localStorage.clear()
            toast.error("An error occured, please try again!");
        }
    } catch (error) {
        if (
            error &&
            error.response &&
            error.response.status === 400 &&
            error.response.status !== "USER_EXIST"
        ) {
            dispatch({ type: SENDING_TELEPHONE_SUCCESS });
            dispatch(setExpired(true));
            dispatch(push("/check"));
        } else {
            dispatch({
                type: SENDING_TELEPHONE_ERROR,
                payload: error.message || "An error occured, please try again!"
            });

            toast.error(error.message || "An error occured, please try again!");
        }
    } finally {
        dispatch({
            type: SAVE_USER_TELEPHONE,
            payload: insertZero(phoneNumber)
        });
        dispatch({ type: SAVE_USER_COUNTRY, payload: country });
    }
};