import axios from "axios";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import {
    SENDING_CODE,
    SENDING_CODE_SUCCESS,
    SENDING_CODE_ERROR
} from "../constants";
import { SAVE_USER_ID } from "../../../user/constants";
import { getUserPublicData } from "../../login/actions";
import { resetCounter, setExpired } from "../../../timer/actions";
import { currentAPI } from "../../../../../config";
import { countriesMap } from "../../../../../data/countries";
import { insertCountryCode } from "../../../../../utils/inputs/formatPhoneNumber";
import { mixPanel } from '../../../../../utils/mix-panel/mixPanel';
import { AUTH_ENTER_VALID_OTP } from '../../../../../utils/mix-panel/constants';

export const sendCode = (code, startTime = new Date()) => async (dispatch, getState) => {
    dispatch({ type: SENDING_CODE });

    try {
        const userId = getState().user.userId;
        //const userData = getState().router.location.userData;
        
        const response = await axios.post(
            `${currentAPI}/api/otp/check?code=${code}&userId=${userId}`
        );

        const userData = await dispatch(getUserPublicData(userId));

        if (response.status === 200) {
            mixPanel.track(AUTH_ENTER_VALID_OTP, 
                { 
                    "Time": Math.round((new Date() - startTime) / 1000)
                }
            )
            dispatch({ type: SENDING_CODE_SUCCESS });
            dispatch(resetCounter());
            if (userData === undefined) {
                dispatch(push("/user/create_role"));
            } else if (userData && userData.registrationFinished) {
                dispatch(push("/user/password_set"));
            } else if (userData.roleName === "ROLE_USER") {
                if (userData.firstName !== "") {
                    dispatch(push("/user/create_business_profile"));
                } else {
                    dispatch(push("/user/create_role"));
                }
            } else if (userData.roleName === "ROLE_AGENT") {
                if (userData.bankDataPresent) {
                    dispatch(push("/user/create_agent_group"));
                } else if (userData.documentsUploaded) {
                    dispatch(push("/user/create_agent_bank_account"));
                } else if (userData.country !== "") {
                    dispatch(push("/user/create_agent_identity"));
                } else if (userData.firstName !== "") {
                    dispatch(push("/user/create_agent_region"));
                } else {
                    dispatch(push("/user/create_agent"));
                }
            }
        }
    } catch (error) {
        toast.error(error.response.data.error);

        dispatch({
            type: SENDING_CODE_ERROR,
            payload: error.message
        });
    }
};

export const sendCodeFor403Validation = code => async (dispatch, getState) => {
    dispatch({ type: SENDING_CODE });

    try {
        const userId = getState().user.userId;

        const response = await axios.post(
            `${currentAPI}/api/otp/check?code=${code}&userId=${userId}`
        );

        if (response.status === 200) {
            dispatch({ type: SENDING_CODE_SUCCESS });
            dispatch(resetCounter());
            const history = useHistory();
            history.goBack();
        }
    } catch (error) {
        dispatch({
            type: SENDING_CODE_ERROR,
            payload: error.message
        });
        toast.error(error.response.data.error);
    }
};

export const resendCode = () => async (dispatch, getState) => {
    try {
        const country = getState().user.country;
        const countryCode = countriesMap.get(country).code;
        const msisdn = insertCountryCode(getState().user.msisdn, countryCode);

        const responseResendCode = await axios.get(
            `${currentAPI}/api/otp/send/mobile?msisdn=${encodeURIComponent(
                msisdn
            )}`
        );

        if (responseResendCode.status === 200) {
            dispatch(resetCounter());
        }
    } catch (error) {
        console.error(error);
    }
};

export const sendUssd = () => async (dispatch, getState) => {
    dispatch({ type: SENDING_CODE });

    try {
        const country = getState().user.country;
        const countryCode = countriesMap.get(country).code;
        const msisdn = insertCountryCode(getState().user.msisdn, countryCode);

        const sendUssdCodeResponse = await axios.get(
            `${currentAPI}/api/otp/send/ussd?msisdn=${encodeURIComponent(
                msisdn
            )}`
        );

        if (sendUssdCodeResponse.status === 200) {
            dispatch({ type: SENDING_CODE_SUCCESS });
            dispatch(setExpired(false));
            dispatch({
                type: SAVE_USER_ID,
                payload: sendUssdCodeResponse.data.userId
            });
            toast.success(
                `Your pin code is: ${sendUssdCodeResponse.data.pinCode}`
            );
            dispatch(resetCounter());
        }
    } catch (error) {
        dispatch({ type: SENDING_CODE_ERROR, payload: error.message });
        toast.error(error.response.data.error);
    }
};

export const sendOTPToWhatsapp = msisdn => async (dispatch, getState) => {
    dispatch({ type: SENDING_CODE });

    try {
        const country = getState().user.country;
        const countryCode = countriesMap.get(country).code;
        const msisdn = insertCountryCode(getState().user.msisdn, countryCode);

        const sendWhatsappCodeResponse = await axios.get(
            `${currentAPI}/api/otp/send/whatsapp?msisdn=${encodeURIComponent(
                msisdn
            )}`
        );

        if (sendWhatsappCodeResponse.status === 200) {
            dispatch({ type: SENDING_CODE_SUCCESS });
            dispatch(setExpired(false));
            dispatch(resetCounter());
            toast.success(
                "Your OTP was sent to your Whatsapp account, associated with this phone number"
            );
        }
    } catch (error) {
        dispatch({ type: SENDING_CODE_ERROR, payload: error.message });

        toast.error(
            "Sorry there is an error with sending an OTP to your Whatsapp. Please, choose another option to receive an OTP."
        );
    }
};

export const checkExistingEmail = email => async () => {
    try {
        const checkExistingEmailResponse = await axios.post(
            `${currentAPI}/api/users/validate/email`,
            { email }
        );

        if (checkExistingEmailResponse.status === 200) {
            return checkExistingEmailResponse.data;
        }
    } catch (error) {
        console.error(error);
    }
};

