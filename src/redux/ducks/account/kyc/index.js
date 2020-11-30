import { 
    USER_KYC_UPLOADING,
    USER_KYC_LOADED,
    USER_KYC_FAILED,
    LOADING
} from './constants';

const initialState = {
    isLoading: false,
    errorMsg: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                isLoading: action.payload
            };
        }
        case USER_KYC_UPLOADING: {
            return {
                ...state,
                isLoading: true
            };
        }

        case USER_KYC_LOADED: {
            return {
                ...state,
                isLoading: false
            };
        }

        case USER_KYC_FAILED: {
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