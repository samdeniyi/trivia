import { 
    UPDATING_USER_DATA, 
    UPDATE_USER_DATA_SUCCESS, 
    UPDATE_USER_DATA_ERROR 
} from "../constants";
import { toast } from 'react-toastify';
import { axios, currentAPI } from "../../../../../config";
import { SAVE_USER_DATA } from "../../../user/constants";
import { goBack } from "connected-react-router";
import { mixPanel } from '../../../../../utils/mix-panel/mixPanel';
import { SETTINGS_PERSONAL_DETAILS } from '../../../../../utils/mix-panel/constants';

export const updateUserData = userData => async (dispatch, getState) => {
    dispatch({ type: UPDATING_USER_DATA });
    const role   = getState().user.role;
    const userId = getState().user.userId;
 
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const updateUserDataResponse = await axios.patch(
            `${currentAPI}/api/users/`,
            JSON.stringify(userData),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (updateUserDataResponse.status === 200) {
            mixPanel.track(SETTINGS_PERSONAL_DETAILS, {
                "User ID": userId,
                "Role": role
            })

            dispatch({ type: SAVE_USER_DATA, payload: userData });
            dispatch({ type: UPDATE_USER_DATA_SUCCESS });
            dispatch(goBack());
            toast.success("Updated data successfully");
        };
    } catch (error) {
        dispatch({ 
            type: UPDATE_USER_DATA_ERROR,
            payload: error.message
        });
        
        toast.error(error.data.response.error);
    }
};