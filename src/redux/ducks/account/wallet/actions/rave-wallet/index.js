import { toast } from "react-toastify";
import { axios, currentAPI } from "../../../../../../config";
import { countriesMap } from "../../../../../../data/countries";
import { insertZero } from '../../../../../../utils/inputs/formatPhoneNumber';
import { getUserWalletData, updateWalletStatus, saveWalletFundAmount } from "../index";
import { thirdPartyError } from "../../../../../../utils/errors/thirdPartyError";
import { raveErrorsTypes } from "../../../../../../utils/errors/raveErrorTypes";
import { formatPrice } from "../../../../../../utils/currency/formatPriceWithComma";

import { 
    UPDATE_WALLET_STATUS,
    UPDATE_WALLET_BALANCE, 
    SENDING_WALLET_DATA, 
    USER_WALLET_SUCCESS, 
    USER_WALLET_FAILED 
} from "../../constants";

export const createSpacesWallet = () => async dispatch => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const createSpacesWallet = await axios.post(
            `${currentAPI}/api/wallet/create/spaces/internal`,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (createSpacesWallet.status === 200) {
            dispatch({ type: UPDATE_WALLET_STATUS, payload: createSpacesWallet.data.status });
            dispatch({ type: UPDATE_WALLET_BALANCE, payload: createSpacesWallet.data.balance });
        };
    } catch (error) {
        console.error(error);
    };
};

export const createInactiveRaveWallet = () => async () => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const createRaveWallet = await axios.post(
            `${currentAPI}/api/wallet/create/rave/internal`,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (createRaveWallet.status === 200) {
            return createRaveWallet.data;
        };
    } catch (error) {
        console.error(error);
    }
};

export const sendUserBankData = сustomerInfo => async (dispatch, getState) => {
    dispatch({ type: SENDING_WALLET_DATA });

    const bankDataDTO = {
        bvn: сustomerInfo.bvn,
        dob: сustomerInfo.dob
    };

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const country   = getState().user.country;
        const firstName = getState().user.firstName;
        const lastName  = getState().user.lastName;
        const email     = getState().user.email;
        const msisdn    = insertZero(getState().user.msisdn);

        const customerDTO = {
            bvn: bankDataDTO.bvn,
            currency: countriesMap.get(country).currency.code,
            date_of_birth: bankDataDTO.dob,
            email_address: email,
            first_name: firstName,
            last_name: lastName,
            mobile_number: msisdn
        };

        const sendUserBankDataResponse = await axios.post(
            `${currentAPI}/api/wallet/checkKYC`,
            JSON.stringify(bankDataDTO),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (sendUserBankDataResponse.status === 200) {
            dispatch({ type: USER_WALLET_SUCCESS });
            await dispatch(createActivatedRaveWalletOnSpaces(customerDTO));
        };
    } catch (error) {
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.response.data.message 
        });

        toast.error(
            error.response.data.message ||
            raveErrorsTypes[error.response.data.message] ||
            thirdPartyError(error, ": ", 'error').message 
        );
    }
};

export const createActivatedRaveWalletOnSpaces = customerDTO => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const createSpacesWalletResponse = await axios.post(
            `${currentAPI}/api/wallet/create/rave/external`,
            JSON.stringify(customerDTO),
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        
        if (createSpacesWalletResponse.status === 200) {
            dispatch(updateWalletStatus("ACTIVE"));
            dispatch(updateRaveBalance());
            dispatch({ type: USER_WALLET_SUCCESS });
            return createSpacesWalletResponse.data;
        };
    } catch (error) {
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.response.data.message 
        });
        
        toast.error("We are unable to verify the BVN. Submit correct information to proceed");
    }
};

export const findCustomerOnRave = (type, value) => async () => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const findCustomerResponse = await axios.post(
            `${currentAPI}/api/raveWalletExternal/findCustomer`,
            JSON.stringify({ type, value }),
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (findCustomerResponse.status === 200) {
            return findCustomerResponse.data;
        };
    } catch (error) {
        toast.error(error.message);
    }
};

export const topUpRaveBalance = amount => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const raveTopUpResponse = await axios.post(
            `${currentAPI}/api/transfersRave/credit?amount=${amount}`,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (raveTopUpResponse.status === 200) {
            await dispatch(getUserWalletData());
            dispatch({ type: USER_WALLET_SUCCESS }); 
            dispatch(saveWalletFundAmount(amount, "success"));
        };
    } catch (error) {
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.message 
        });
    };
};

export const createRaveCustomer = customerDTO => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });
    
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const createRaveCustomerResponse = await axios.post(
            `${currentAPI}/api/raveWalletExternal/createCustomer`,
            JSON.stringify(customerDTO),
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (createRaveCustomerResponse.status === 200) {          
            dispatch({ type: USER_WALLET_SUCCESS });
            return createRaveCustomerResponse.data
        };
    } catch (error) {
        toast.error(thirdPartyError(error).response_message);
        
        dispatch({ 
            type: USER_WALLET_FAILED, 
            payload: error.message 
        });
    };
};


export const updateRaveBalance = () => async (dispatch, getState) => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        
        const updateRaveBalanceResponse = await axios.get(
            `${currentAPI}/api/wallet/rave/wallet/balance`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
            
        if (updateRaveBalanceResponse.status === 200) {
            dispatch({ 
                type: UPDATE_WALLET_BALANCE, 
                payload: formatPrice(updateRaveBalanceResponse.data)
            });
        };
    } catch(error) {
        console.error(error);
    }
};