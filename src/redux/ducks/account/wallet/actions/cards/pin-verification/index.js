import { currentAPI, axios } from "../../../../../../../config";
import { SENDING_WALLET_DATA, USER_WALLET_SUCCESS, USER_WALLET_FAILED } from "../../../constants";
import { verifyTransaction, saveUserDebitCard } from "../../index";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { raveErrorsTypes } from "../../../../../../../utils/errors/raveErrorTypes";

export const sendDebitCardWithPin = (debitCard, pin) => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const cardWithPinResponse = await axios.post(
            `${currentAPI}/api/rave/cards/initialWithPinConfirmation`,
            JSON.stringify({ ...debitCard, pin }),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (
            cardWithPinResponse.status === 200 &&
            cardWithPinResponse.data.status === "success"
        ) {
            localStorage.setItem("flwRef", cardWithPinResponse.data.flwRef);
            dispatch({ type: USER_WALLET_SUCCESS });
            return true;
        };
    } catch (error) {
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.message 
        });

        toast.error(
            raveErrorsTypes[error.response.data.error] ||
            error.response.data.message
        );
    }
};

export const sendOTPAndVerifyWallet = (debitCard, otp) => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const flwRef = localStorage.getItem('flwRef');

        const sendWalletOTP = await axios.post(
            `${currentAPI}/api/rave/cards/validateCharge`,
            JSON.stringify({
                otp,
                transaction_reference: flwRef
            }),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (
            sendWalletOTP.status === 200 && 
            sendWalletOTP.data.status === "success"
        ) {  
            dispatch({ type: USER_WALLET_SUCCESS });
            localStorage.setItem('txRef', sendWalletOTP.data.txRef);

            const { embedToken, cardBrand } = await dispatch(verifyTransaction());

            embedToken && dispatch(saveUserDebitCard({ 
                cardNumber: debitCard.cardNumber,
                embedToken,
                cardBrand
            }));

            localStorage.removeItem('flwRef');
            localStorage.removeItem('txRef');

            dispatch(push('/user/wallet_cards_all'));
            dispatch({ type: USER_WALLET_SUCCESS });
        };
    } catch (error) {
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.response.data.message
        });

        toast.error(
            raveErrorsTypes[error.response.data.error] ||
            error.response.data.message
        );
    }
};