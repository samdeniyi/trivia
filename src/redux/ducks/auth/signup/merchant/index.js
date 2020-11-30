import {
    CREATING_ACCOUNT,
    CREATING_ACCOUNT_SUCCESS,
    CREATING_ACCOUNT_ERROR,
    SAVE_MERCHANT_BUSINESS_PROFILE,
} from "./constants";

const initialState = {
    isLoading: false,
    errorMsg: "",
    businessProfile: {
        businessName: "",
        streetAddress: "",
        state: "",
        lga: "",
        businessCategories: []
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATING_ACCOUNT: {
            return {
                ...state,
                isLoading: true
            };
        }

        case CREATING_ACCOUNT_SUCCESS: {
            return {
                ...state,
                isLoading: false
            };
        }

        case SAVE_MERCHANT_BUSINESS_PROFILE: {
            const { 
                businessName, 
                streetAddress,
                state,
                lga,
                businessPhoneNumber,
                email,
                businessCategories
            } = action.payload;

            return {
                ...state,
                businessProfile: {
                    ...state.businessProfile,
                    businessName,
                    streetAddress,
                    state,
                    businessPhoneNumber,
                    email,
                    lga,
                    businessCategories
                }
            };
        }

        case CREATING_ACCOUNT_ERROR: {
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