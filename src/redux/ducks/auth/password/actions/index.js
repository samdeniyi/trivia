import { 
    SETTING_NEW_PIN,
    SET_NEW_PIN_SUCCESS,
    SET_NEW_PIN_ERROR,
    SENDING_FORGOT_OTP,
    SEND_FORGOT_OTP_SUCCESS,
    SEND_FORGOT_OTP_ERROR
} from '../constants';

import { RESET_TIMER } from '../../../timer/constants';

import axios from '../../../../../config/axios';
import { toast } from 'react-toastify';
import { currentAPI } from '../../../../../config/API';
import { push } from 'connected-react-router';
import { insertZero } from '../../../../../utils/inputs/formatPhoneNumber';

export const forgotPasswordCheck = code => async (dispatch, getState) => {
    dispatch({ type: SENDING_FORGOT_OTP });

    try {
        const userId = getState().user.userId;

        const response = await axios.post(
            `${currentAPI}/api/otp/check?code=${code}&userId=${userId}`
        );

        if (response.status === 200) {
            dispatch({ type: SEND_FORGOT_OTP_SUCCESS });
            dispatch({ type: RESET_TIMER });
            dispatch(push('/user/password_set'));
        };
    } catch (error) {
        dispatch({
            type: SEND_FORGOT_OTP_ERROR,
            payload: error.message
        });

        toast.error(error.response.data.error);
    }
};

export const setNewPassword = password => async (dispatch, getState) => {
    dispatch({ type: SETTING_NEW_PIN });
    
    try {
        const userId      = getState().user.userId;
        const phoneNumber = insertZero(getState().user.msisdn);

        const setNewPasswordResponse = await axios.post(
            `${currentAPI}/api/authorize/${userId}`,
            { username: phoneNumber, password }
        );

        if (setNewPasswordResponse.status === 200) {
            dispatch({ type: SET_NEW_PIN_SUCCESS });
            dispatch(push('/login'));
        };
    } catch(error) {
        dispatch({ type: SET_NEW_PIN_ERROR, payload: error.message });
        toast.error(error.response.data.error);
    }
}; 