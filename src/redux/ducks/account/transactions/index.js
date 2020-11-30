import {
    LOADING_TRANSACTIONS,
    TRANSACTIONS_LOADED,
    TRANSACTIONS_LOAD_ERROR,
    SAVE_TRANSACTIONS
} from './constants';
import { USER_LOGOUT } from '../../user/constants';

const initialState = {
    isLoading: false,
    errorMsg: "",
    transactionsList: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOADING_TRANSACTIONS: {
            return {
                ...state,
                isLoading: true
            };
        }

        case TRANSACTIONS_LOADED: {
            return {
                ...state,
                isLoading: false
            };
        }

        case TRANSACTIONS_LOAD_ERROR: {
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload
            };
        }

        case SAVE_TRANSACTIONS: {
            return {
                ...state,
                transactionsList: action.payload
            };
        }

        case USER_LOGOUT: {
            return {
                isLoading: false,
                errorMsg: "",
                transactionsList: []
            }
        }

        default: {
            return state
        }
    }
};