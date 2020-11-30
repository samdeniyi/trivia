import {
    SENDING_TELEPHONE,
    SENDING_TELEPHONE_SUCCESS,
    SENDING_TELEPHONE_ERROR
} from "./constants";

const initialState = {
    isLoading: false,
    errorMsg: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SENDING_TELEPHONE: {
            return {
                ...state,
                isLoading: true
            };
        }

        case SENDING_TELEPHONE_SUCCESS: {
            return {
                ...state,
                isLoading: false
            };
        }

        case SENDING_TELEPHONE_ERROR: {
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