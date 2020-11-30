import {
    SETTING_NEW_PIN,
    SET_NEW_PIN_SUCCESS,
    SET_NEW_PIN_ERROR
} from '../../../auth/password/constants';

import axios from 'axios';
import { push } from 'connected-react-router';
import { currentAPI } from '../../../../../config';
import { toast } from "react-toastify";
import { insertCountryCode, insertZero } from '../../../../../utils/inputs/formatPhoneNumber';
import { countriesMap } from '../../../../../data/countries';
import { mixPanel } from '../../../../../utils/mix-panel/mixPanel';
import { SETTINGS_UPDATE_PIN} from '../../../../../utils/mix-panel/constants';

export const updateUserPassword = (oldPin, newPin) => async (dispatch, getState) => {
    dispatch({ type: SETTING_NEW_PIN });

    try {
        const userId = getState().user.userId;
        const phoneNumber = insertZero(getState().user.msisdn);

        const checkOldPasswordResponse = await axios.post(
            `${currentAPI}/api/token/generate-token`,
            { username: phoneNumber, password: oldPin }
        );

        if (checkOldPasswordResponse.status === 200) {
            const updateUserPasswordResponse = await axios.post(
                `${currentAPI}/api/authorize/${userId}`,
                { username: phoneNumber, password: newPin }
            );

            if (updateUserPasswordResponse.status === 200) {
                dispatch({ type: SET_NEW_PIN_SUCCESS, payload: newPin });

                const responseGenerateToken = await axios.post(
                    `${currentAPI}/api/token/generate-token`,
                    { username: phoneNumber, password: newPin }
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

                    mixPanel.track(SETTINGS_UPDATE_PIN, {
                        "User ID": userId
                    })

                    toast.success("Password updated");
                    dispatch(push('/'));
                };
            };
        };
    } catch (error) {
        if(error.response && error.response.status === 400) {
            dispatch({type: SET_NEW_PIN_ERROR, payload: error.response.data.error});
            toast.error("Incorrect old password");
        } else {
            dispatch({type: SET_NEW_PIN_ERROR, payload: "An error occurred"});
            toast.error("An error occurred");    
        }
    }
};

export const resetPassword = () => async (dispatch, getState) => {
    const country     = getState().user.country;
    const countryCode = countriesMap.get(country).code;
    const msisdn      = insertCountryCode(getState().user.msisdn, countryCode);

    try {
        const resetPasswordResponse =
            await axios.post(`${currentAPI}/api/authorize/reset/${encodeURIComponent(msisdn)}`);

        if (resetPasswordResponse.status === 200) {
            await axios.get(
                `${currentAPI}/api/otp/send/mobile?msisdn=${encodeURIComponent(msisdn)}`
            );
        };
    } catch (error) {
        console.error(error)
    }
};
