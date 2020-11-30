import {
    LOADING,
    FETCH_ALL_TRANSACTIONS_SUCCESS,
    FETCH__ALL_TRANSACTIONS_FAILURE,
    FETCH_TRANSACTION_DETAILS_SUCCESS,
    FETCH_TRANSACTION_DETAILS_FAILURE,
} from "./constants";
import { USER_LOGOUT } from '../../user/constants';

const initialState = {
    isLoading: false,
    allTransactions: [],
    transactionById: {},
   
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                isLoading: action.payload
            };
        }

        case FETCH_ALL_TRANSACTIONS_SUCCESS: {
            return {
                ...state,
                allTransactions: action.payload,
            };
        }
        case FETCH__ALL_TRANSACTIONS_FAILURE: {
            return {
                ...state,
                allTransactions: [],
            };
        }

        case FETCH_TRANSACTION_DETAILS_SUCCESS: {
            return {
                ...state,
                transactionById: action.payload,
            };
        }
        case FETCH_TRANSACTION_DETAILS_FAILURE: {
            return {
                ...state,
                transactionById: {},
            };
        }
        case USER_LOGOUT: {
            return {
                isLoading: false,
                MerchbuyProductCategeries: [],
                shop: {}
            }
        }
        
        default: {
            return state;
        }
    }
};

