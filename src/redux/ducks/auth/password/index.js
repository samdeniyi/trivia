import { 
    SETTING_NEW_PIN,
    SET_NEW_PIN_SUCCESS,
    SET_NEW_PIN_ERROR,
    SENDING_FORGOT_OTP,
    SEND_FORGOT_OTP_SUCCESS,
    SEND_FORGOT_OTP_ERROR
} from './constants';

const initialState = {
    isLoading: false,
    errorMessage: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SETTING_NEW_PIN: {
            return {
                ...state,
                isLoading: true
            }
        }

        case SET_NEW_PIN_SUCCESS: {
            return {
                ...state,
                isLoading: false
            }
        }

        case SET_NEW_PIN_ERROR: {
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            }
        }

        case SENDING_FORGOT_OTP: {
            return {
                ...state,
                isLoading: true
            }
        }

        case SEND_FORGOT_OTP_SUCCESS: {
            return {
                ...state,
                isLoading: false
            }
        }

        case SEND_FORGOT_OTP_ERROR: {
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            }
        }

        default: {    
            return state;
        }
    }
};