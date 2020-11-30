import {
    CREATING_AGENT_ACCOUNT,
    CREATING_AGENT_ACCOUNT_SUCCESS,
    CREATING_AGENT_ACCOUNT_ERROR,
    LOADING
} from "./constants";

const initialState = {
    isLoading: false,
    errorMsg: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                isLoading: action.payload
            };
        }
        case CREATING_AGENT_ACCOUNT: {
            return {
                ...state,
                isLoading: true
            };
        }

        case CREATING_AGENT_ACCOUNT_SUCCESS: {
            return {
                ...state,
                isLoading: false
            };
        }

        case CREATING_AGENT_ACCOUNT_ERROR: {
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