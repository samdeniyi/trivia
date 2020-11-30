import { SAVE_TRANSACTIONS } from '../constants';
import { currentAPI } from '../../../../../config';
import axios from 'axios';

export const saveTransactions = transactions => dispatch => {
    dispatch({ type: SAVE_TRANSACTIONS, payload: transactions });
};

export const getWalletTransactions = () => async (dispatch, getState) => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const getWalletTransactionsResponse = await axios.get(
            `${currentAPI}/api/transactionsRave/rave/wallet/all`,
            {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            }
        );

        if (getWalletTransactionsResponse.status === 200) {
            const savedTransactions    = getState().account.transactions.transactionsList;
            const receivedTransactions = getWalletTransactionsResponse.data;

            if (savedTransactions.length < receivedTransactions.length) {
                dispatch({ 
                    type: SAVE_TRANSACTIONS, 
                    payload: getWalletTransactionsResponse.data
                });
            };
        };
    } catch(error) {
        console.error(error.message);
    }
};