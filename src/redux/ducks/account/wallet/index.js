import {
    SENDING_WALLET_DATA,
    USER_WALLET_SUCCESS,
    USER_WALLET_FAILED,
    SAVE_USER_DEBIT_CARD,
    DELETE_USER_DEBIT_CARD,
    SAVE_USER_BANK_ACCOUNT,
    DELETE_USER_BANK_ACCOUNT,
    SAVE_WALLET_FUND_AMOUNT,
    SAVE_WALLET_USAGE_MODE,
    UPDATE_WALLET_BALANCE,
    UPDATE_WALLET_STATUS,
    HIDE_WALLET_BALANCE,
    SAVE_WALLET_TRANSFER_AMOUNT,
    SAVE_WALLET_TRANSFER_DATA,
    SAVE_WALLET_MONEY_RECIPIENTS,
    GET_AVAILABLE_BANKS,
    SAVE_BENEFICIARY,
    PREPARE_TO_TRANSFER_MONEY,
    WALLET_TRANSACTION_ID,
    WALLET_SUCCESS_PAGE_TRANSACTION_RECORD
} from './constants';
import { USER_LOGOUT } from '../../user/constants';


const initialState = {
    isLoading: false,
    errorMsg: '',
    mode: 'manage',
    status: "INACTIVE",
    balance: 0,
    hideBalance: false,
    fund: {
        amount: 0,
        status: 'notFunding',
        transactionId: '',
    },
    transfer: {
        amount: 0,
        status: 'notTransfered',
        recipientName: undefined,
        message: ''
    },
    cards: [],
    bankAccounts: [],
    recipients: [],
    availableBanks: [],
    beneficiaries: [],
    personForTransfer: {},
    successPageRecord: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SENDING_WALLET_DATA: {
            return {
                ...state,
                isLoading: true
            };
        }

        case USER_WALLET_SUCCESS: {
            return {
                ...state,
                isLoading: false
            };
        }

        case USER_WALLET_FAILED: {
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload
            };
        }

        case UPDATE_WALLET_BALANCE: {
            return {
                ...state,
                balance: action.payload.balance,
                status: action.payload.status

            };
        }

        case UPDATE_WALLET_STATUS: {
            return {
                ...state,
                status: action.payload
            };
        }

        case SAVE_WALLET_FUND_AMOUNT: {
            return {
                ...state,
                fund: {
                    amount:  action.payload.amount,
                    status:  action.payload.status
                }
            };
        }

        case WALLET_TRANSACTION_ID: {
            return {
                ...state,
                fund: {
                    transactionId:  action.payload,
                }
            };
        }

        case SAVE_WALLET_TRANSFER_AMOUNT: {
            return {
                ...state,
                transfer: {
                    ...state.transfer,
                    amount:  action.payload.amount,
                    status:  action.payload.status
                }
            };
        }

        case SAVE_WALLET_TRANSFER_DATA: {
            return {
                ...state,
                transfer: {
                    ...state.transfer,
                    recipientName:  action.payload.recipientName,
                    message:  action.payload.message
                }
            };
        }

        case SAVE_WALLET_USAGE_MODE: {
            return {
                ...state,
                mode: action.payload
            };
        }

        case HIDE_WALLET_BALANCE: {
            return {
                ...state,
                hideBalance: action.payload
            };
        }

        case SAVE_USER_DEBIT_CARD: {
            const { last4digits, embedToken, cardBrand } = action.payload;
            const cards = state.cards.slice();
            
            cards.push({
                last4digits,
                embedToken,
                cardBrand
            });

            return {
                ...state,
                cards 
            };
        }

        case DELETE_USER_DEBIT_CARD: {
            const cards = state.cards.slice();
            cards.splice(action.payload, 1);

            return {
                ...state,
                cards
            };
        }

        case SAVE_USER_BANK_ACCOUNT: {
            const bankAccounts = state.bankAccounts.slice();
            
            const bankAccount = {
                bankAccountId:   action.payload.bankAccountId,
                bankAccountDTO:  action.payload.bankAccountDTO,
            };

            return {
                ...state,
                bankAccounts: bankAccounts.concat(bankAccount)
            };
        }

        case DELETE_USER_BANK_ACCOUNT: {
            return {
                ...state,
                bankAccounts: state.bankAccounts.filter(bankAccount => bankAccount.bankAccountId !== action.payload)
            };
        }

        case SAVE_WALLET_MONEY_RECIPIENTS: {
            return {
                ...state,
                recipients: [
                    ...state.recipients,
                    action.payload,
                ]
            };
        }

        case GET_AVAILABLE_BANKS: {
            return {
                ...state,
                availableBanks: action.payload,
            }
        }

        case SAVE_BENEFICIARY: {
            return {
                ...state,
                beneficiaries: action.payload.data,
            }
        }

        case WALLET_SUCCESS_PAGE_TRANSACTION_RECORD: {
            return {
                ...state,
                successPageRecord: action.payload,
            }
        }

        case PREPARE_TO_TRANSFER_MONEY: {
            return {
                ...state,
                personForTransfer: action.payload,
            }
        }

        case USER_LOGOUT: {
            return {
                isLoading: false,
                errorMsg: '',
                mode: 'manage',
                status: "INACTIVE",
                balance: 0,
                hideBalance: false,
                fund: {
                    amount: 0,
                    status: 'notFunding',
                    transactionId: ''
                },
                transfer: {
                    amount: 0,
                    status: 'notTransfered',
                    recipientName: undefined,
                    message: ''
                },
                cards: [],
                bankAccounts: [],
                recipients: [],
                successPageRecord: {}
            }
        }

        default: {
            return state;
        }
    };
};