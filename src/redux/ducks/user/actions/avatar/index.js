import { SAVE_USER_AVATAR } from '../../constants';

import axios from 'axios';
import { toast } from "react-toastify";
import { fileToFormData } from "../../../../../utils/files/fileToFormData";
import { currentAPI } from '../../../../../config';
import { insertZero, plusToZeroFormat } from "../../../../../utils/inputs/formatPhoneNumber";

export const sendAvatar = avatar => async (dispatch, getState) => {
    const token    = JSON.parse(localStorage.getItem('token')).token;
    
    const userId   = getState().user.userId;
    const formData = await fileToFormData(avatar);
    
    try {
        const sendFileResponse = await axios.post(
            `${currentAPI}/api/storage/${encodeURIComponent(userId)}/uploadAvatar`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (sendFileResponse.status === 200) {
           dispatch(saveAvatar(sendFileResponse.data));
        };
    } catch (error) {
        toast.error((error.message === "Network Error") ? error.message : "Sorry, we couldn't update your avatar, please try again");
    }
};

export const getUserAvatar = () => async (dispatch, getState) => {
    try {
        const phoneNumber = insertZero(getState().user.msisdn);

        const avatarResponse = await axios.get(
            `${currentAPI}/api/storage/downloadAvatar?url=${encodeURIComponent(plusToZeroFormat(phoneNumber))}_avatar.png`
        );
    
        if (avatarResponse.status === 200) {
            dispatch(saveAvatar(avatarResponse.data));
            return avatarResponse.data;
        }
    } catch (error) {
        console.error(error);
    }
};

export const saveAvatar = (avatar) => dispatch => {
    dispatch({ type: SAVE_USER_AVATAR, payload: avatar });
};