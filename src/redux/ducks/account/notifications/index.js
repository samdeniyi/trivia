import { 
    LOADING_NOTIFICATIONS, 
    NOTIFICATIONS_LOADED, 
    LOADING_NOTIFICATIONS_ERROR, 
    SAVE_NOTIFICATIONS,
    TOGGLE_SEEN_STATE
} from "./constants";
import { USER_LOGOUT } from '../../user/constants';

const initialState = {
    isLoading: false,
    errorMsg:  "",
    allNotifications: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_NOTIFICATIONS: {
            return {
                ...state,
                isLoading: true
            };
        }

        case NOTIFICATIONS_LOADED: {
            return {
                ...state,
                isLoading: false
            };
        }

        case LOADING_NOTIFICATIONS_ERROR: {
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload
            };
        }

        case SAVE_NOTIFICATIONS: {
            return {
                ...state,
                allNotifications: action.payload
            };
        }

        case TOGGLE_SEEN_STATE: {
            const notificationId = action.payload;

            return {
                ...state,
                allNotifications: state.allNotifications.map(notification => {
                    if (notification.id === notificationId) {
                        notification.state = (notification.state === "READ") ? "UNREAD" : "READ";
                    };

                    return notification;
                })
            };
        }

        case USER_LOGOUT: {
            return {
                isLoading: false,
                errorMsg:  "",
                allNotifications: []
            }
        }

        default: {
            return state;
        }
    }
};