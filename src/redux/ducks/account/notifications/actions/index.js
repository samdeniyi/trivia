import { 
    LOADING_NOTIFICATIONS, 
    NOTIFICATIONS_LOADED, 
    LOADING_NOTIFICATIONS_ERROR, 
    SAVE_NOTIFICATIONS,
    TOGGLE_SEEN_STATE 
} from "../constants";
import { axios, currentAPI } from '../../../../../config';

export const toggleSeen = (state, id) => async dispatch => {
    try {
        const token    = JSON.parse(localStorage.getItem('token')).token;
        const newState = state === "READ" ? "UNREAD" : "READ";

        if (newState === "UNREAD") {
           return
        }

        const toggleSeenResponse = await axios.patch(
            `${currentAPI}/api/notification/${id}?newState=${newState}`,
            null,
            {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            }
        );

        if (toggleSeenResponse.status === 200) {
            dispatch({ type: TOGGLE_SEEN_STATE, payload: id });
        };
    } catch (error) {
        console.error(error);
    }
};

export const getNotifications = () => async dispatch => {
    dispatch({ type: LOADING_NOTIFICATIONS });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        
        const getNotificationsResponse = await axios.get(
            `${currentAPI}/api/notification/all`,
            {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            }
        );

        if (getNotificationsResponse.status === 200) {
            dispatch({ type: SAVE_NOTIFICATIONS, payload: getNotificationsResponse.data.notificationItems.reverse() });
            dispatch({ type: NOTIFICATIONS_LOADED });
        };
    } catch (error) {
        console.error(error);

        dispatch({
            type: LOADING_NOTIFICATIONS_ERROR,
            payload: error.message
        })
    }
};