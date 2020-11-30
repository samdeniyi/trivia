import {toast} from "react-toastify";
import {axios, currentAPI} from "../../../../../../config";
//import {v4 as uuid} from 'uuid';
import History from "../../../../../../utils/History";
import {
    PAYMENT_ERROR,
    PAYMENT_LOADING,
    PAYMENT_SUCCESS,
    SET_PROVIDERS,
    SET_PROVIDERS_ITEMS
} from "../../constants";

import {formatPrice} from "../../../../../../utils/currency/formatPriceWithComma";

export const getUtilityProviders = utility => async dispatch => {

    dispatch({type: PAYMENT_LOADING});

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const utilityProvidersResponse = await axios.get(
            `${currentAPI}/api/eazymoni/utilities/getUtilitiesProviders`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (utilityProvidersResponse.status === 200) {
            let data = utilityProvidersResponse.data.responseData.filter(provider => provider.name.includes(utility));
            dispatch({type: SET_PROVIDERS, payload: data})
            return data
        }
        ;
    } catch (error) {
        dispatch({type: PAYMENT_ERROR, payload: error.message});
        toast.error(error.message);
        console.error(error);
    }
};

export const getUtilitiesProvidersItems = utilityProviderId => async dispatch => {
    dispatch({type: PAYMENT_LOADING})
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const utilitiesItemsResponse = await axios.get(
            `${currentAPI}/api/eazymoni/utilities/getUtilitiesProvidersItems?utilityProviderId=${utilityProviderId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        if (!utilitiesItemsResponse.data.requestSuccessful) {
            dispatch({type: PAYMENT_ERROR, payload: utilitiesItemsResponse.data.message});
            toast.error(utilitiesItemsResponse.data.message)
            return !utilitiesItemsResponse.data
        }
        if (utilitiesItemsResponse.status === 200) {
            dispatch({type: SET_PROVIDERS_ITEMS, payload: utilitiesItemsResponse.data.responseData})
            return utilitiesItemsResponse.data.responseData;
        }
        ;
    } catch (error) {
        dispatch({type: PAYMENT_ERROR, payload: error.message});
        toast.error(error.message);
        console.error(error);
    }
};

export const utilityPayment = (
    amount,
    billerId,
    paymentItemCode,
    requesterId
) => async dispatch => {
    dispatch({type: PAYMENT_LOADING});

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const utilityPaymentResponse = await axios.post(
            `${currentAPI}/api/eazymoni/utilities/makePaymentForUtility`,
            {
                amount,
                billerId,
                paymentItemCode,
                requesterId
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        dispatch({type: PAYMENT_SUCCESS});
        if (!utilityPaymentResponse.data.requestSuccessful) {
            dispatch({type: PAYMENT_ERROR, payload: utilityPaymentResponse.data.message});
            return toast.error(utilityPaymentResponse.data.message)
        }

        if (utilityPaymentResponse.status === 200) {
            toast.success(`You've successfully purchased ${formatPrice(amount)} on ${requesterId}.
            Click here to see details`, {onClick: () => History.push("/actions/transactions/index")});
        }
        ;

    } catch (error) {
        dispatch({type: PAYMENT_ERROR, payload: error.message});
        if (error.request.status === 400) {
            return toast.error("Wallet is not activated");
        }
        toast.error(error.message);
        ;
    }
};

export const validateUtilityCustomer = (
    billerId,
    paymentItemCode,
    requesterId,
    setErrors
) => async dispatch => {
    dispatch({type: PAYMENT_LOADING})

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const validateCustomerResponse = await axios.post(
            `${currentAPI}/api/eazymoni/utilities/validateUtilityCustomer`,
            {billerId, paymentItemCode, requesterId},
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        dispatch({type: PAYMENT_SUCCESS});
        const {requestSuccess, responseData} = validateCustomerResponse.data || {};
        if (!(requestSuccess || responseData.fullName)) {
            dispatch({type: PAYMENT_ERROR, payload: validateCustomerResponse.data.message});
            toast.error("Meter number was not found")
            return false;
        }
        return validateCustomerResponse.data.responseData;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setErrors({name: "Value is not valid"});
        }
        dispatch({type: PAYMENT_ERROR, payload: error.message});
        toast.error(error.message);
        console.error(error);
        return false;
    }
};