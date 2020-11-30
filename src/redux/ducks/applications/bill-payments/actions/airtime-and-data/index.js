import { toast } from "react-toastify";
import { axios, currentAPI } from "../../../../../../config";
import { formatPrice } from "../../../../../../utils/currency/formatPriceWithComma";
import { v4 as uuid } from 'uuid';
import { PAYMENT_ERROR, PAYMENT_LOADING, PAYMENT_SUCCESS } from "../../constants";

export const getAirtimeProviders = () => async dispatch => {
    dispatch({ type: PAYMENT_LOADING });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const airtimeProvidersResponse = await axios.get(
            `${currentAPI}/api/eazymoni/airtime/getAirtimeProviders`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (airtimeProvidersResponse.status === 200) {
            dispatch({ type: PAYMENT_SUCCESS });
            return airtimeProvidersResponse.data.responseData;
        };
    } catch (error) {
        dispatch({ type: PAYMENT_ERROR, payload: error.message });
        toast.error(error.message);
        console.error(error);
    }
};

export const purchaseAirtime = (
    amount,
    billerId,
    paymentItemCode = null,
    phoneNumber
) => async dispatch => {
    dispatch({ type: PAYMENT_LOADING });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const airtimePurchaseResponse = await axios.post(
            `${currentAPI}/api/eazymoni/airtime/AirtimePlanPurchase`,
            {
                amount,
                billerId,
                paymentItemCode,
                requesterId: phoneNumber
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (airtimePurchaseResponse.status === 200) {
            dispatch({ type: PAYMENT_SUCCESS });
            toast.success(`You've successfully purchased ${formatPrice(amount)} on ${phoneNumber}`);
        };
    } catch (error) {
        dispatch({ type: PAYMENT_ERROR, payload: error.message });
        console.error(error);

        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        };
    }
};

export const getDataPlans = billerId => async () => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const getDataPlansResponse = await axios.get(
            `${currentAPI}/api/eazymoni/dataPlan/getDataPlanProviderById?billerId=${billerId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (getDataPlansResponse.status === 200) {
            return getDataPlansResponse.data.responseData;
        };
    } catch (error) {
        console.error(error);
    }
};

export const purchaseDataPlan = (
    amount,
    billerId,
    paymentItemCode,
    phoneNumber
) => async dispatch => {
    dispatch({ type: PAYMENT_LOADING });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const dataPlanPurchase = await axios.post(
            `${currentAPI}/api/eazymoni/dataPlan/Purchase`,
            {
                amount,
                billerId,
                paymentItemCode,
                requesterId: phoneNumber,
                transactionRef: uuid()
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (dataPlanPurchase.status === 200) {
            dispatch({ type: PAYMENT_SUCCESS });
            toast.success(`You've successfully purchased ${formatPrice(amount)} on ${phoneNumber}`);
        };
    } catch (error) {
        dispatch({ type: PAYMENT_ERROR, payload: error.message });
        console.error(error);

        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        };
    }
};