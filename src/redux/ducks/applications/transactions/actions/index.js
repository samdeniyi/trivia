import {
    LOADING,
    FETCH_ALL_TRANSACTIONS_SUCCESS,
    FETCH__ALL_TRANSACTIONS_FAILURE,
    FETCH_TRANSACTION_DETAILS_SUCCESS,
    FETCH_TRANSACTION_DETAILS_FAILURE,
} from "../constants";

import { walletAPI, axios } from "../../../../../config";
import { toast } from "react-toastify";



const getAllTransactions = () => async dispatch => {
    dispatch(request());

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const allTransactionsResponse = await axios.get(
            `${walletAPI}/api/transactionList/currentUser?dir=DESC&page=1&size=1000&sortby=createdAt`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(stoploading());
        if (allTransactionsResponse.status === 200) {
            dispatch({
                type: FETCH_ALL_TRANSACTIONS_SUCCESS,
                payload: allTransactionsResponse.data.content
            });
        }
    } catch (error) {
        dispatch(stoploading());
        dispatch({
            type: FETCH__ALL_TRANSACTIONS_FAILURE,
            payload: error.message
        });
        toast.error(error.message);
        console.error(error.message);
    }
};

const getTransactionDetials = id => async dispatch => {
    dispatch(request());

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const transactionDetialsResponse = await axios.get(
            `${walletAPI}/api/transactionList/details/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(stoploading());
        if (transactionDetialsResponse.status === 200) {
            dispatch({
                type: FETCH_TRANSACTION_DETAILS_SUCCESS,
                payload: transactionDetialsResponse.data
            });
        }
    } catch (error) {
        dispatch(stoploading());
        dispatch({
            type: FETCH_TRANSACTION_DETAILS_FAILURE,
            payload: error.message
        });
        toast.error(error.message);
        console.error(error.message);
    }
};


function request() {
    return {
        type: LOADING,
        payload: true
    };
}

function stoploading() {
    return {
        type: LOADING,
        payload: false
    };
}

export const transactionActions = {
    getAllTransactions,
    getTransactionDetials,

};