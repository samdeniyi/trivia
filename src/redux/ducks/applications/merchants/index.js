import {
    SAVE_AGENTS_MERCHANTS,
    MERCHANT_LAST_SEEN,
    SAVE_MERCHANTS_COMMISSIONS,
    LOADING_MERCHANTS,
    LOAD_MERCHANTS_SUCCESS,
    LOAD_MERCHANTS_ERROR,
    SAVE_MERCHANT_REFERRALS
} from './constants';
import { USER_LOGOUT } from '../../user/constants';

const initialState = {
    isLoading: false,
    errorMsg:  "",
    merchantsList: [],
    merchantsReferral: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_MERCHANTS: {
            return {
                ...state,
                isLoading: true
            };
        }
        
        case LOAD_MERCHANTS_SUCCESS: {
            return {
                ...state,
                isLoading: false
            };
        }

        case LOAD_MERCHANTS_ERROR: {
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload
            };
        }

        case SAVE_AGENTS_MERCHANTS: {
            return {
                ...state,
                merchantsList: action.payload
            };
        }

        case SAVE_MERCHANT_REFERRALS: {
            return {
                ...state,
                merchantsReferral: action.payload
            };
        }

        case MERCHANT_LAST_SEEN: {
            return {
                ...state,
                merchantsList: state.merchantsList.map(merchant => {
                    if (merchant.id === action.payload.id) {
                        merchant.lastSeen = action.payload.lastSeen
                    };

                    return merchant;
                })
            };
        }

        case SAVE_MERCHANTS_COMMISSIONS: {
            const merchantId = action.payload.id;
            const foundCommissions = action.payload.foundCommissions;
            const totalCommission = action.payload.totalCommission;

            return {
                ...state,
                merchantsList: state.merchantsList.map(merchant => {
                    if (merchant.id === merchantId) {
                        merchant.commissionsList = foundCommissions;
                        merchant.commission = totalCommission;
                    };

                    return merchant;
                })
            };
        }

        case USER_LOGOUT: {
            return {
                isLoading: false,
                errorMsg:  "",
                merchantsList: [],
                merchantsReferral: []
            }
        }

        default: {
            return state;
        }
    }
};