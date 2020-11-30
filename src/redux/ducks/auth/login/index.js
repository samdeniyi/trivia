import { LOGGING_USER_IN, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";

const initialState = {
    isLoading: false,
    errorMsg: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGGING_USER_IN: {
            return {
                ...state,
                isLoading: true
            };
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false
            };
        }

        case LOGIN_ERROR: {
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload
            };
        }

        default: {
            return state;
        }
    }
};