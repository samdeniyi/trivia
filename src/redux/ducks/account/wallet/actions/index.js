import {
    SENDING_WALLET_DATA,
    USER_WALLET_SUCCESS,
    USER_WALLET_FAILED,
    SAVE_USER_DEBIT_CARD,
    DELETE_USER_DEBIT_CARD, 
    SAVE_WALLET_FUND_AMOUNT,
    SAVE_WALLET_USAGE_MODE,
    UPDATE_WALLET_BALANCE,
    UPDATE_WALLET_STATUS,
    SAVE_USER_BANK_ACCOUNT,
    HIDE_WALLET_BALANCE,
    SAVE_WALLET_TRANSFER_AMOUNT,
    SAVE_WALLET_TRANSFER_DATA,
    SAVE_WALLET_MONEY_RECIPIENTS
} from '../constants';

import { push } from 'connected-react-router';
import { axios, currentAPI, walletAPI } from '../../../../../config';
import { toast } from 'react-toastify';
import { updateRaveBalance } from './rave-wallet';
import { formatPrice } from '../../../../../utils/currency/formatPriceWithComma';

export const updateWalletBalance = () => async (dispatch, getState) => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        
        const updateWalletBalanceResponse = await axios.get(
            `${currentAPI}/api/wallet/balance`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
            
        if (updateWalletBalanceResponse.status === 200) {
            dispatch({ 
                type: UPDATE_WALLET_BALANCE, 
                payload: formatPrice(updateWalletBalanceResponse.data)
            });
        };
    } catch(error) {
        console.error(error);
    }
};

export const updateWalletStatus = status => dispatch => {
    dispatch({ type: UPDATE_WALLET_STATUS, payload: status });
};

export const switchWalletUsageMode = mode => dispatch => {
    dispatch({ type: SAVE_WALLET_USAGE_MODE, payload: mode });
};

export const hideBalance = status => dispatch => {
    dispatch({ type: HIDE_WALLET_BALANCE, payload: status });
};

export const saveLastTransferedRecipient = data => dispatch => {
    dispatch({ type: SAVE_WALLET_MONEY_RECIPIENTS, payload: data });
};

export const saveWalletFundAmount = (
    amount, 
    status, 
    redirect = null
) => dispatch => {
    dispatch({ 
        type: SAVE_WALLET_FUND_AMOUNT, 
        payload: { 
            amount, 
            status 
        } 
    });
    
    if (redirect) dispatch(push(redirect));
};

export const saveWalletTransferAmount = (
    amount, 
    status, 
    redirect = null
) => dispatch => {
    dispatch({ 
        type: SAVE_WALLET_TRANSFER_AMOUNT, 
        payload: { 
            amount, 
            status 
        } 
    });
    
    if (redirect) dispatch(push(redirect));
};

export const saveWalletTransferData = (
    recipientName, 
    message,
    redirect
) => dispatch => {
    dispatch({ 
        type: SAVE_WALLET_TRANSFER_DATA, 
        payload: { 
            recipientName, 
            message 
        } 
    });
    
    if (redirect) dispatch(push(redirect));
};

export const getUserWalletData = () => async (dispatch, getState) => {
    try {
        const userId = getState().user.userId;
        const token = JSON.parse(localStorage.getItem('token')).token;

        const userDataResponse = await axios.get(
            `${currentAPI}/api/users/${userId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (userDataResponse.status === 200) {
            const status = userDataResponse.data.walletSpaces.status;
            dispatch(updateWalletStatus(status));
            // (status === "ACTIVE") && (dispatch(updateRaveBalance()));
            // dispatch(getWalletBalance())
        };
    } catch (error) {
        console.error(error);
    }
};

export const getUserCardData = () => async (dispatch, getState) => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const getUserCardDataResponse = await axios.get(
            `${currentAPI}/api/card/all`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (getUserCardDataResponse.status === 200) {
            const savedCards = getState().account.wallet.cards;
            const cards = getUserCardDataResponse.data;

            if (savedCards.length < cards.length) {
                cards.forEach(card => {
                    dispatch({ type: SAVE_USER_DEBIT_CARD, payload: card.cardData });
                });
            };
        };
    } catch (error) {
        console.error(error)
    }
};

export const getAllBankAccounts = () => async (dispatch, getState) => {
    const token = JSON.parse(localStorage.getItem('token')).token;

    try {
        const getUserBankAccountsResponse = await axios.get(
            `${currentAPI}/api/bankAccount/all`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (getUserBankAccountsResponse.status === 200) {
            const savedBankAccounts = getState().account.wallet.bankAccounts;
            const bankAccounts = getUserBankAccountsResponse.data;

            if (savedBankAccounts.length < bankAccounts.length) {
                bankAccounts.forEach(bankAccount => {
                    dispatch({ 
                        type: SAVE_USER_BANK_ACCOUNT, 
                        payload: {
                            bankAccountId: bankAccount.id,
                            bankAccountDTO: bankAccount.bankAccountData
                        } 
                    });
                });
            };            
        };
    } catch (error) {
        console.error(error)
    }
};

export const addCardInitial = debitCard => async (dispatch, getState) => {
    const storedCards = getState().account.wallet.cards;
    const foundCard = 
        storedCards.find(card => card.last4digits === debitCard.cardNumber.slice(-4));

    if (foundCard) {
        toast.success("You already have this card");

        return {
            suggestedAuth: null,
            valid: false
        }
    };
 
    try {
        dispatch({ type: SENDING_WALLET_DATA });

        const token = JSON.parse(localStorage.getItem('token')).token;

        const initialCardResponse = await axios.post(
            `${currentAPI}/api/rave/cards/initial`,
            JSON.stringify(debitCard),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (
            initialCardResponse.status === 200 &&
            initialCardResponse.data.status === "success"
        ) {
            dispatch({ type: USER_WALLET_SUCCESS });
            const suggestedAuth = initialCardResponse.data.suggestedAuth;

            if (suggestedAuth === "PIN") {
                return {
                    suggestedAuth,
                    valid: true
                };
            } else if (suggestedAuth === "VBVSECURECODE") {                
                return {
                    suggestedAuth,
                    valid: true
                };
            };
        };
    } catch (error) {
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.response.data.message 
        });

        if (error && error.response) {
            toast.error(error.response.data[0]);
        } else {
            toast.error(error.message);
        };
    };
};

export const verifyTransaction = bankAccount => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const txRef = localStorage.getItem("txRef");

        const verifyUrl = bankAccount ? 
            `${currentAPI}/api/rave/bankAccounts/verify` : 
            `${currentAPI}/api/rave/cards/verify`;

        const verifyTransactionResponse = await axios.post(
            verifyUrl,
            JSON.stringify({ txRef }),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
    
        if (verifyTransactionResponse.status === 200) {
            dispatch({ type: USER_WALLET_SUCCESS });
            return verifyTransactionResponse.data;
        };
    } catch (error) {
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.response.data.message 
        });

        if (error && error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        };
    }
};

export const topUpBalance = amount => async () => {
    const token = JSON.parse(localStorage.getItem('token')).token;

    try {
        const topUpBalanceResponse = await axios.post(
            `${currentAPI}/api/transfers/walletTopUpByUserName?amount=${amount}`,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (topUpBalanceResponse.status === 200) {
            return topUpBalanceResponse.data;   
        };
    } catch (error) {
        console.error(error.message);
    }
};

export const chargeWallet = (amount, embedToken) => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const payWithTokenResponse = await axios.post(
            `${currentAPI}/api/rave/cards/tokenizedPayment`,
            JSON.stringify({ 
                amount,
                embeddedToken: embedToken
            }),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
    
        if (
            payWithTokenResponse.status === 200 &&
            payWithTokenResponse.data.status === "success"
        ) {
            localStorage.setItem('txRef', payWithTokenResponse.data.txRef);

            const { status } = await dispatch(verifyTransaction());
            
            if (status === "success") {
                await dispatch(updateRaveBalance());
                localStorage.removeItem('txRef');
                dispatch(saveWalletFundAmount(amount, "success"));
            };
        };
    } catch (error) {
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.message
        });

        if (error.response && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        };
    }
};

export const saveUserDebitCard = cardData => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });
    
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const card = {
            last4digits: cardData.cardNumber.slice(-4),
            embedToken:  cardData.embedToken,
            cardBrand:   cardData.cardBrand
        };

        const saveUserDebitCardResponse = await axios.put(
            `${currentAPI}/api/card/`,
            JSON.stringify(card),
            {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            }
        );

        if (saveUserDebitCardResponse.status === 200) {
            dispatch({ type: USER_WALLET_SUCCESS });
            dispatch({ type: SAVE_USER_DEBIT_CARD, payload: card });
            dispatch(push('/user/wallet_cards_all'));
            toast.success("Your bank card was successfully added");
        };
    } catch (error) {
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.response.data.message 
        });

        if (error && error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        };
    }
};

export const deleteUserDebitCard = index => async (dispatch, getState) => {   
    dispatch({ type: SENDING_WALLET_DATA });
   
    try {     
        const token = JSON.parse(localStorage.getItem('token')).token;
        const cardToken = getState().account.wallet.cards[index].embedToken;

        const deleteUserDebitCardResponse = await axios.delete(
            `${currentAPI}/api/card/${cardToken}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            }
        );

        if (deleteUserDebitCardResponse.status === 200) {
            dispatch({ type: USER_WALLET_SUCCESS });
            dispatch({ type: DELETE_USER_DEBIT_CARD, payload: index });
        };
    } catch(error) {
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.response.data.message 
        });

        if (error && error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        };
    }  
};

export const sendMoneyFromWalletToWallet = (recipientName, amount) => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const payWithTokenResponse = await axios.post(
            `${currentAPI}/api/transfersRave/walletToWallet`,
            JSON.stringify({ 
                amount,
                recipientName
            }),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
    
        if (payWithTokenResponse.status === 200) {
            await dispatch(updateRaveBalance());
            dispatch(saveWalletTransferAmount(amount, "success", '/'));
            toast.success("Your transfer was successfully complete");
        };
    } catch (error) {
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.message
        });

        if (error.response && error.response.data.message) {
            toast.error(error.response.data.error);
        } else {
            toast.error(error.message);
        };
    }
}


export const createWallet = () => async () => {
    const token = JSON.parse(localStorage.getItem('token')).token;

    try {
        const createWalletResponse = await axios.post(
            `${walletAPI}/api/wallet/create`,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (createWalletResponse.status === 200) {
            return true;   
        };
    } catch (error) {
        console.error(error.message);
    }
};

export const activateWallet = () => async () => {
    const token = JSON.parse(localStorage.getItem('token')).token;

    try {
        const activateWalletResponse = await axios.post(
            `${walletAPI}/api/wallet/activate`,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (activateWalletResponse.status === 200) {
            return true;   
        };
    } catch (error) {
        toast.error("wallet cannot be funded at this time, please try again!");
    }
};

export const getWalletBalance = () => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        
        const walletBalanceResponse = await axios.get(
            `${walletAPI}/api/wallet/balance`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
            
        if (walletBalanceResponse.status === 200) {
            dispatch({ 
                type: UPDATE_WALLET_BALANCE, 
                payload: walletBalanceResponse.data
            });
        };
    } catch(error) {
        console.error(error);
    }
};

export const topUpWalletBalance = params => async () => {
    const token = JSON.parse(localStorage.getItem('token')).token;

    try {
        const topUpBalanceResponse = await axios.post(
            `${walletAPI}/api/payment/paystack/topup/create`,
            JSON.stringify(params),
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        if (topUpBalanceResponse.status === 200) {
            return {
                status: true,
                message: "",
                data: topUpBalanceResponse.data
            };  
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message,
            data: null
        };
    }
};

export const verifyWalletPayment = transactionRef => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const verifyResponse = await axios.get(
            `${walletAPI}/api/payment/paystack/topup/verify/${transactionRef}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (verifyResponse.status === 200) {
            if(verifyResponse.data.status === "COMPLETE") {
                dispatch(push('/'))
            }   
        };
    } catch (error) {
        console.error(error);
    }
};

export const WalletToWalletTransfer = params => async (dispatch) => {
    dispatch({ type: SENDING_WALLET_DATA });
    const data ={
        amount: Number(params.amount) * 100,
        name:'0'+ String(params.phoneNumber).slice(-10),
        narration: params.narration
      }
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const WalletToWalletTransferResponse = await axios.post(
            `${walletAPI}/api/wallet/transfer/wallet_to_wallet`,
            JSON.stringify(data),
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (WalletToWalletTransferResponse.status === 200) {
            dispatch({ type: USER_WALLET_SUCCESS });
            if(WalletToWalletTransferResponse.data.status === "success") {
                toast.success(`${formatPrice(params.amount)} has been transfered successfully!`);

                dispatch(push('/'))
            }   
        }
        else {
            dispatch({ type: USER_WALLET_FAILED });
        }
    } catch (error) {
        dispatch({ type: USER_WALLET_FAILED });
        toast.error(error.response.data.message);

    }
};