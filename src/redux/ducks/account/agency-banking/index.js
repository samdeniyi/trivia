import {
    LOADING,
    AGENCY_BANKING_SIGNUP,
    SAVE_AGENCY_BANKING_IDCARD_IMAGES,
    SAVE_AGENCY_BANKING_UTILITY_IMAGES,
    SAVE_AGENCY_BANKING_PASSPORT_IMAGES
} from "./constants";
import { USER_LOGOUT } from '../../user/constants';

const initialState = {
    isLoading: false,
    agencyBankDetails: {},
    idCard: undefined,
    utilityBill: undefined,
    passportPhoto: undefined
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                isLoading: action.payload
            };
        }

        case SAVE_AGENCY_BANKING_IDCARD_IMAGES: {
            return {
                ...state,
                idCard: action.payload
            }
        }

        case SAVE_AGENCY_BANKING_UTILITY_IMAGES: {
            return {
                ...state,
                utilityBill: action.payload
            }
        }

        case SAVE_AGENCY_BANKING_PASSPORT_IMAGES: {
            return {
                ...state,
                passportPhoto: action.payload
            }
        }

        case AGENCY_BANKING_SIGNUP: {
            return {
                ...state,
                agencyBankDetails: action.payload,
            };
        }

        case USER_LOGOUT: {
            return {
                isLoading: false,
                agencyBankDetails: {},
            }
        }
        
        default: {
            return state;
        }
    }
};