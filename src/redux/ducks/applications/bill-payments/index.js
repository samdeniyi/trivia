import {
    PAYMENT_LOADING,
    PAYMENT_SUCCESS,
    PAYMENT_ERROR,
    SET_PROVIDERS_ITEMS, SET_PROVIDERS,
} from "./constants";

const initialState = {
    isLoading: false,
    errorMsg: "",
    allProviders : [],
    allProvidersItems: [],
    selectedProvider: {},
    selectedProvidersItems: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_LOADING: {
            return {
                ...state,
                isLoading: true
            };
        }

        case PAYMENT_SUCCESS: {
            return {
                ...state,
                isLoading: false
            };
        }

        case PAYMENT_ERROR: {
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload
            };
        }
        case SET_PROVIDERS_ITEMS : {
            return {
                ...state,
                isLoading: false,
                errorMsg: "",
                allProvidersItems: action.payload

            }
        }
        case SET_PROVIDERS : {
            return {
                ...state,
                isLoading: false,
                errorMsg: "",
                allProvidersItems: [],
                allProviders: action.payload

            }
        }

        default: {
            return state;
        }
    }
};