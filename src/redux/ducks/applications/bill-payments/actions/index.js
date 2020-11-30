import { PAYMENT_LOADING, PAYMENT_ERROR, PAYMENT_SUCCESS } from "../constants";
import { v4 as uuid } from 'uuid';
import { toast } from "react-toastify";
import { insertZero } from "../../../../../utils/inputs/formatPhoneNumber";
import { unparseBalance } from "../../../../../utils/currency/parseBalance";
import { selectServices } from '../../../../../utils/bill-payments/selectServices';
import { currentAPI, axios } from "../../../../../config";
import { updateRaveBalance } from "../../../account/wallet/actions/rave-wallet";
import { formatPrice } from "../../../../../utils/currency/formatPriceWithComma";

export const getAllBillsToPay = types => async dispatch => {
    dispatch({ type: PAYMENT_LOADING });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const billsToPayResponse = await axios.get(
            `${currentAPI}/api/billPayments/bills`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (billsToPayResponse.status === 200) {
            dispatch({ type: PAYMENT_SUCCESS });
            return selectServices(billsToPayResponse.data.data, types);
        };
    } catch (error) {
        dispatch({ type: PAYMENT_ERROR, payload: error.message });
        toast.error(error.message);
        console.error(error);
    }
};

export const validateBillPayment = (code, customer, item_code) => async dispatch => {
    dispatch({ type: PAYMENT_LOADING });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const validateBillServiceRequestDto = {
            code,     // biller_code
            customer, // (phoneNumber, lccAccount, meterNumber)
            item_code //
        };

        const validateBillPayment = await axios.post(
            `${currentAPI}/api/billPayments/validate`,
            JSON.stringify(validateBillServiceRequestDto),
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (validateBillPayment.status === 200) {
            dispatch({ type: PAYMENT_SUCCESS });
            return true;
        };
    } catch (error) {
        dispatch({ type: PAYMENT_ERROR, payload: error.message });
        toast.error(error.message);
        return false;
    }
};

export const createBillPayment = (
    country,
    amount,
    phoneNumber,
    biller_name
) => async dispatch => {
    dispatch({ type: PAYMENT_LOADING });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const customer = insertZero(phoneNumber);
        const billPayRequestDto  = {
            amount,
            country,
            customer,
            recurrence: "ONCE",
            reference: uuid(),
            type: biller_name
        };

        const billPaymentResponse = await axios.post(
            `${currentAPI}/api/billPayments/pay`,
            JSON.stringify(billPayRequestDto),
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (billPaymentResponse.status === 200) {
            const { flw_ref, reference } = billPaymentResponse.data.data;
            const transactionDTO = {
                flwRef: flw_ref,
                orderRef: "null",
                txRef: reference
            };

            dispatch(setBillTransaction(amount, biller_name, transactionDTO));
            dispatch(updateRaveBalance());
            dispatch({ type: PAYMENT_SUCCESS });
            toast.success(`You've successfully sent ${formatPrice(amount)} to ${customer}`);
        };
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: PAYMENT_ERROR, payload: error.message });
    }
};

export const calculateAmountWithFees = (amount, billServiceCategoryId) => async () => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const billPaymentResponse = await axios.get(
            `${currentAPI}/api/billPayments/calculateFullAmountAndFee?amount=${unparseBalance(amount)}&billServiceCategoryId=${billServiceCategoryId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (billPaymentResponse.status === 200) {
            const { amountWithCommission, fee } = billPaymentResponse.data;

            return {
                amountWithCommission,
                fee
            };
        }
    } catch (error) {
        console.error(error);

        return {
            amountWithCommission: 0,
            fee: 0
        };
    }
};

export const setBillTransaction = (
    amount,
    billServiceName,
    transactionDTO
) => async dispatch => {
    dispatch({ type: PAYMENT_LOADING });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const setBillTransactionResponse = await axios.post(
            `${currentAPI}/api/transactions/billsTransaction/${amount}?billServiceName=${billServiceName}`,
            JSON.stringify(transactionDTO),
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (setBillTransactionResponse.status === 200) {
            dispatch({ type: PAYMENT_SUCCESS });
            return setBillTransactionResponse.data;
        };
    } catch (error) {
        dispatch({ type: PAYMENT_ERROR, payload: error.message });
        console.error(error);
    }
};
