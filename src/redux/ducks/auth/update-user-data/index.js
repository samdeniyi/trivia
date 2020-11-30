import { 
    UPDATING_USER_DATA, 
    UPDATE_USER_DATA_SUCCESS, 
    UPDATE_USER_DATA_ERROR 
} from "./constants";

const initialState = {
    isLoading: false,
    errorMsg: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATING_USER_DATA: {
            return {
                ...state,
                isLoading: true
            };
        }

        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                isLoading: false
            };
        }

        case UPDATE_USER_DATA_ERROR: {
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