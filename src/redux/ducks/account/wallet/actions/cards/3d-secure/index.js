import { USER_WALLET_FAILED } from "../../../constants";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { saveUserDebitCard, verifyTransaction } from "../../index.js";
import { axios, currentAPI } from "../../../../../../../config";

export const waitForOTPVerification = (authUrl, txRef) => async dispatch => {
    try {
        document.querySelector("#frame").setAttribute("src", authUrl);

        const token = JSON.parse(localStorage.getItem('token')).token;

        const waitForOTPVerificationResponse = await axios.get(
            `${currentAPI}/api/rave/wait3dSecureOtpConfirmation?txRef=${encodeURIComponent(txRef)}`,
            {
                headers: {
                    "Authorization": `Bearer Bearer ${token}`
                }
            }
        );

        if (waitForOTPVerificationResponse.status === 200) {
            return waitForOTPVerificationResponse;
        };
    } catch (error) {
        toast.error(error.data.response.error);
        
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.message 
        });
    }
};

export const addCardWith3DSecure = debitCard => async dispatch => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const addCardWith3DSecureResponse = await axios.post(
            `${currentAPI}/api/rave/cards/initialWith3dSecureConfirmation`,
            JSON.stringify(debitCard),
            {
                headers: {
                    "Authorization": `Bearer Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (addCardWith3DSecureResponse.status === 200) {
            const { txRef, authUrl } = addCardWith3DSecureResponse.data;
            const waitResponse = await dispatch(waitForOTPVerification(authUrl, txRef));

            if (waitResponse.data === txRef) {
                localStorage.setItem('txRef', waitResponse.data);

                const { embedToken, cardBrand } = await dispatch(verifyTransaction());

                embedToken && dispatch(saveUserDebitCard({ 
                    cardNumber: debitCard.cardNumber,
                    embedToken,
                    cardBrand
                }));

                localStorage.removeItem('flwRef');
                localStorage.removeItem('txRef');
                
                dispatch(push('/user/wallet_cards_all'));
            };
        };
    } catch (error) {
        toast.error(error.response.data.message);
        
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.message 
        });
    }
};