import {toast} from "react-toastify";
import {axios, currentAPI} from "../../../../../../config";
import {v4 as uuid} from 'uuid';
import {PAYMENT_ERROR, PAYMENT_LOADING, PAYMENT_SUCCESS, SET_PROVIDERS, SET_PROVIDERS_ITEMS} from "../../constants";
import {formatPrice} from "../../../../../../utils/currency/formatPriceWithComma";
import {getMessageFromString} from "../../../../../../utils/errors/getErrorMessage";

export const getCabelProviders = () => async dispatch => {
    dispatch({type: PAYMENT_LOADING});

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const cabelProvidersResponse = await axios.get(
            `${currentAPI}/api/eazymoni/cableTV/getProviders`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (cabelProvidersResponse.status === 200) {
            dispatch({type: SET_PROVIDERS, payload: cabelProvidersResponse.data.responseData});
            return cabelProvidersResponse.data.responseData;
        }
        ;
    } catch (error) {
        dispatch({type: PAYMENT_ERROR, payload: error.message});
        toast.error(error.message);
        console.error(error);
    }
};

export const getSubscriptionPlansByProviderId = tvProviderId => async dispatch => {
    dispatch({type: PAYMENT_LOADING});
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const subscriptionPlansResponse = await axios.get(
            `${currentAPI}/api/eazymoni/cableTV/getTvProviderSubscriptionPlansById?tvProviderId=${tvProviderId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (subscriptionPlansResponse.status === 200) {
            dispatch({type: SET_PROVIDERS_ITEMS, payload: subscriptionPlansResponse.data.responseData});
            return subscriptionPlansResponse.data.responseData;
        }
        ;
    } catch (error) {
        dispatch({type: PAYMENT_ERROR, payload: error.message});
        console.error(error);
    }
};

export const cabelSubscriptionPurchase = (
    amount,
    billerId,
    paymentItemCode,
    requesterId
) => async dispatch => {
    dispatch({type: PAYMENT_LOADING});

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const purchaseResponse = await axios.post(
            `${currentAPI}/api/eazymoni/cableTV/subscriptionPurchase`,
            {
                amount,
                billerId,
                paymentItemCode,
                requesterId,
                transactionRef: uuid()
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        if (purchaseResponse.status === 200) {
            dispatch({type: PAYMENT_SUCCESS});
            toast.success(`You've successfully purchased ${formatPrice(amount)} on ${requesterId}.
              Click here to see details`, {onClick: () => History.push("/actions/transactions/index")});
        }
        ;
    } catch (error) {


        dispatch({type: PAYMENT_ERROR, payload: error.message});
        if(error.request.status === 400){
            console.log(error.response.data.error)
           return toast.error(getMessageFromString(error.response.data.error));
        }
        console.error(error);
        toast.error(error.message);
        ;
    }
};

export const validateCabelCustomer = (
    billerId,
    paymentItemCode,
    requesterId,
    setErrors
) => async dispatch => {
    try {
        dispatch({type: PAYMENT_LOADING});
        const token = JSON.parse(localStorage.getItem('token')).token;

        const validateCustomerResponse = await axios.post(
            `${currentAPI}/api/eazymoni/cableTV/ValidateCustomer`,
            {billerId, paymentItemCode, requesterId},
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        dispatch({type: PAYMENT_SUCCESS});
        if (!(validateCustomerResponse.data.requestSuccess || validateCustomerResponse.data.responseData.fullName)) {
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