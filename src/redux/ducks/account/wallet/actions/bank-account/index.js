import {
    SAVE_USER_BANK_ACCOUNT,
    DELETE_USER_BANK_ACCOUNT,
    SENDING_WALLET_DATA,
    USER_WALLET_SUCCESS,
    USER_WALLET_FAILED,
    GET_AVAILABLE_BANKS,
    SAVE_BENEFICIARY,
    PREPARE_TO_TRANSFER_MONEY,
    WALLET_TRANSACTION_ID,
    WALLET_SUCCESS_PAGE_TRANSACTION_RECORD
} from "../../constants";

import { verifyTransaction } from "../index";
import { toast } from "react-toastify";
import { push, goBack } from "connected-react-router";
import { axios, currentAPI } from "../../../../../../config";
import { countriesMap } from "../../../../../../data/countries";
import { raveErrorsTypes } from "../../../../../../utils/errors/raveErrorTypes";
import { getUserAdditionalInfo } from "../../../../../../redux/ducks/user/actions";
import { mixPanel } from "../../../../../../utils/mix-panel/mixPanel";
import { SETTINGS_BANK_DETAILS } from "../../../../../../utils/mix-panel/constants";

export const sendBankAccount = bankAccountDTO => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });
    const token = JSON.parse(localStorage.getItem("token")).token;
    const param = {
        accountBank: bankAccountDTO.accountBank,
        accountNumber: bankAccountDTO.accountNumber
      }
    try {
        const sendBankAccountResponse = await axios.put(
            `${currentAPI}/api/bankAccount/save`,
            JSON.stringify(param),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (sendBankAccountResponse.status === 200) {
            const bankAccountId = sendBankAccountResponse.data.id;
            dispatch(saveBankAccount(bankAccountDTO, bankAccountId));
            dispatch({ type: USER_WALLET_SUCCESS });
            if(bankAccountDTO.accountBank !== "011" ||
              bankAccountDTO.accountBank !== "058") {
                dispatch(push("/user/account_verified"));
            }
        }
    } catch (error) {
        dispatch({
            type: USER_WALLET_FAILED,
            payload: error.response.data.message
        });

        toast.error(error.response.data.message);
    }
};

export const sendBankDetails = bankAccountDTO => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });
    const token = JSON.parse(localStorage.getItem("token")).token;
    const param = {
        accountBank: bankAccountDTO.accountBank,
        accountNumber: bankAccountDTO.accountNumber
      }
    try {
        const saveBankAccountResponse = await axios.put(
            `${currentAPI}/api/bankAccount/save`,
            JSON.stringify(param),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (saveBankAccountResponse.status === 200) {
            const bankAccountId = saveBankAccountResponse.data.id;
            dispatch(saveBankAccount(bankAccountDTO, bankAccountId));
            dispatch({ type: USER_WALLET_SUCCESS });
        }
    } catch (error) {
        dispatch({
            type: USER_WALLET_FAILED,
            payload: error.response.data.message
        });

        toast.error(error.response.data.message);
    }
};

export const saveBankAccount = (bankAccountDTO, bankAccountId) => dispatch => {
    dispatch({
        type: SAVE_USER_BANK_ACCOUNT,
        payload: { bankAccountDTO, bankAccountId }
    });
};

export const deleteBankAccount = bankAccountId => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });
    const token = JSON.parse(localStorage.getItem("token")).token;

    try {
        const deleteBankAccountResponse = await axios.delete(
            `${currentAPI}/api/bankAccount/id?bankAccountId=${bankAccountId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (deleteBankAccountResponse.status === 200) {
            dispatch({
                type: DELETE_USER_BANK_ACCOUNT,
                payload: bankAccountId
            });
            dispatch({ type: USER_WALLET_SUCCESS });
        }
    } catch (error) {
        toast.error(error.data.response.error);
        dispatch({ type: USER_WALLET_FAILED, payload: error.message });
    }
};

export const getAvailableBanks = () => async (dispatch, getState) => {
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const country = getState().user.country;

        const availableBanksResponse = await axios.get(
            `${currentAPI}/api/rave/banks?countryCode=${country}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (availableBanksResponse.status === 200) {
            dispatch({
                type: GET_AVAILABLE_BANKS,
                payload: availableBanksResponse.data
            });
        }

        return availableBanksResponse.data;
    } catch (error) {
        console.error(error);
    }
};

export const getAvailableBanksNoAuth = () => async (dispatch, getState) => {
    const country = getState().user.country;
    try {
        const availableBanksResponse = await axios.get(
            `${currentAPI}/api/rave/public/banks?countryCode=${country || "NG"}`
        );

        if (availableBanksResponse.status === 200) {
            dispatch({
                type: GET_AVAILABLE_BANKS,
                payload: availableBanksResponse.data
            });
        }

        return availableBanksResponse.data;
    } catch (error) {
        console.error(error);
    }
};

export const AddBankDetailsOnRegistration = data => async (
    dispatch,
    getState
) => {
    const userId = getState().user.userId;
    try {
        const addBankDetailsResponse = await axios.put(
            `${currentAPI}/api/users/public/bankData/${userId}`,
            data
        );

        if (addBankDetailsResponse.status === 200) {
            dispatch(push("/user/create_agent_group"));
        }
    } catch (error) {
        toast.error(error.response.data.message);
        console.error(error);
    }
};

export const AddBankDetailsOnUpgrade = data => async (dispatch, getState) => {
    const userId = getState().user.userId;
    try {
        const addBankDetailsResponse = await axios.put(
            `${currentAPI}/api/users/public/bankData/${userId}`,
            data
        );

        if (addBankDetailsResponse.status === 200) {
            dispatch(push("/actions/um_agent_group"));
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

export const updateAgentBankData = data => async (dispatch, getState) => {
    const userId = getState().user.userId;
    try {
        const addBankDetailsResponse = await axios.put(
            `${currentAPI}/api/users/public/bankData/${userId}`,
            data
        );

        if (addBankDetailsResponse.status === 200) {
            await dispatch(getUserAdditionalInfo());

            mixPanel.track(SETTINGS_BANK_DETAILS, {
                "User ID": userId
            });

            dispatch(goBack());
            toast.success("Your bank data was successfully updated");
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

export const addBankAccount = (accountBank, accountNumber) => async (
    dispatch,
    getState
) => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const amount = Number(getState().account.wallet.fund.amount);
        const country = getState().user.country;
        const currency = countriesMap.get(country).currency.code;
        const bankAccountDTO = {
            accountBank: accountBank,
            accountNumber,
            amount,
            currency,
            redirectUrl:
               "https://"+ window.location.hostname + "/user/wallet_transaction_success"
        };

        const addBankAccountResponse = await axios.post(
            `${currentAPI}/api/rave/bankAccounts/directDebit`,
            JSON.stringify(bankAccountDTO),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (addBankAccountResponse.status === 200) {
            const {
                txRef,
                flwRef,
                validateInstructions,
                authurl
            } = addBankAccountResponse.data.data;
            txRef && localStorage.setItem("txRef", txRef);
            flwRef && localStorage.setItem("flwRef", flwRef);
            validateInstructions.instruction &&
                toast.warn(validateInstructions.instruction);
            localStorage.setItem(
                "bankAccountDTO",
                JSON.stringify(bankAccountDTO)
            );
            dispatch({ type: USER_WALLET_SUCCESS });
            return { status: true, authurl, txRef, flwRef, amount, bankAccountDTO };
        }
    } catch (error) {
        dispatch({
            type: USER_WALLET_FAILED,
            payload: error.response.data.message
        });

        toast.error(
            error.response.data[0] ||
                JSON.parse(error.response.data.error).message
        );
    }
};

export const saveTransactionRecord = (txRef, flwRef, amount, bank, bankAcc) => async (
    dispatch
) => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const transactionData = {
            amount,
            flwRef,
            status: "PENDING",
            transactionType: "CREDIT",
            txRef
        };

        const transactionResponse = await axios.post(
            `${currentAPI}/api/transactionsRave/save`,
            JSON.stringify(transactionData),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (transactionResponse.status === 200) {
            dispatch({
                type: WALLET_TRANSACTION_ID,
                payload: transactionResponse.data
            });
            dispatch({ type: USER_WALLET_SUCCESS });
            if(bank) {
               const bankAccountDTO = {
                    accountBank: bank,
                    accountNumber: bankAcc
                  }
                dispatch(sendBankDetails(bankAccountDTO))
            }
            return true;
        }
    } catch (error) {
        dispatch({
            type: USER_WALLET_FAILED,
            payload: error.response.data.message
        });

        toast.error("An error occured while saving your transaction!");
    }
};

export const getTransactionById = () => async (
    dispatch,
    getState
) => {
    dispatch({ type: SENDING_WALLET_DATA });

    const id = getState().account.wallet.fund.transactionId;
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const transferStatusResponse = await axios.get(
            `${currentAPI}/api/transactionsRave/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (transferStatusResponse.status === 200) {
            dispatch({ type: USER_WALLET_SUCCESS });
            dispatch({
                type: WALLET_SUCCESS_PAGE_TRANSACTION_RECORD,
                payload: transferStatusResponse.data
            })
        }
    } catch (error) {
        dispatch({
            type: USER_WALLET_FAILED,
            payload: error.response.data.message
        });

        toast.error("An error occured while fetching transaction record!");
    }
};

export const verifyBankAccount = (otp, isExisted) => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const flwRef = localStorage.getItem("flwRef");
        const bankAccountDTO = JSON.parse(
            localStorage.getItem("bankAccountDTO")
        );

        const verifyBankAccountResponse = await axios.post(
            `${currentAPI}/api/rave/bankAccounts/validateCharge`,
            JSON.stringify({
                otp,
                transaction_reference: flwRef
            }),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (
            verifyBankAccountResponse.status === 200 &&
            (verifyBankAccountResponse.data.status === "successful" ||
                verifyBankAccountResponse.data.status === "success")
        ) {
            dispatch({ type: USER_WALLET_SUCCESS });

            if (verifyBankAccountResponse.data.data.status === "failed") {
                toast.error(
                    verifyBankAccountResponse.data.data.chargeResponseMessage
                );
            } else {
                const verifyResponse = await dispatch(verifyTransaction(true));
                if (
                    verifyResponse &&
                    (verifyResponse.status === "successful" ||
                        verifyResponse.status === "success")
                ) {
                    localStorage.removeItem("txRef");
                    localStorage.removeItem("flwRef");
                    if (!isExisted) {
                        dispatch(sendBankAccount(bankAccountDTO));
                    }

                    localStorage.removeItem("bankAccountDTO");
                }
            }
        }
    } catch (error) {
        dispatch({
            type: USER_WALLET_FAILED,
            payload: error.response.data.message
        });
        console.log("errors");

        toast.error(
            raveErrorsTypes[error.response.data.error] ||
                error.response.data.message
        );
    }
};

export const payWithBankAccount = accountData => async (dispatch, getState) => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const addBankAccountResponse = await axios.post(
            `${currentAPI}/api/rave/bankAccounts/directDebit`,
            accountData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (addBankAccountResponse.status === 200) {
            const {
                txRef,
                flwRef,
                validateInstructions
            } = addBankAccountResponse.data.data;
            txRef && localStorage.setItem("txRef", txRef);
            flwRef && localStorage.setItem("flwRef", flwRef);
            toast.warn(validateInstructions.instruction);
            localStorage.setItem("bankAccountDTO", JSON.stringify(accountData));
            dispatch({ type: USER_WALLET_SUCCESS });
            return true;
        }
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

export const validateBankAccount = (
    destbankcode,
    recipientaccount
) => async dispatch => {
    // dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const verifyBankAccountResponse = await axios.post(
            `${currentAPI}/api/rave/bankAccounts/validate`,
            JSON.stringify({
                destbankcode,
                recipientaccount
            }),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (verifyBankAccountResponse.status === 200) {
            dispatch({ type: USER_WALLET_SUCCESS });
        }
    } catch (error) {
        dispatch({
            type: USER_WALLET_FAILED,
            payload: error.response.data.message
        });

        console.log(error, "error");

        toast.error(
            raveErrorsTypes[error.response.data.error] ||
                error.response.data.message
        );
    }
};

export const transferFromWalletToBankAccount = data => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const transferToBankAccountResponse = await axios.post(
            `${currentAPI}/api/transfersRave/fromWalletToBankAccountByUserName`,
            JSON.stringify({
                ...data
            }),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (transferToBankAccountResponse.status === 200) {
            dispatch(prepareToTransferMoney({}));
            setTimeout(() => {
                dispatch(
                    getTransactionStatus(
                        transferToBankAccountResponse.data.id,
                        transferToBankAccountResponse.data.reference
                    )
                );
                dispatch({ type: USER_WALLET_SUCCESS });
            }, 5000);
        }
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

export const getTransactionStatus = (id, reference) => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });

    const params = { id, reference };

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const transferStatusResponse = await axios.get(
            `${currentAPI}/api/rave/bankAccounts/recipient`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params
            }
        );

        if (transferStatusResponse.status === 200) {
            dispatch({ type: USER_WALLET_SUCCESS });
            const {
                transferStatus,
                transferCompleteMessage
            } = transferStatusResponse.data;
            if (transferStatus === "FAILED") {
                toast.error(transferCompleteMessage);
                dispatch(push("/actions/send_money"));
            }
            if (transferStatus === "SUCCESS") {
                toast.success(transferCompleteMessage);
                dispatch(push("/"));
            }
            if (transferStatus === "PENDING" || transferStatus === "NEW") {
                toast.success("Transaction was successfully created");
                dispatch(push("/"));
            }
        }
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

export const saveBeneficiary = (
    account_bank,
    account_number
) => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const saveBeneficiaryResponse = await axios.post(
            `${currentAPI}/api/bankBeneficiaries/save`,
            JSON.stringify({
                account_bank,
                account_number
            }),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (saveBeneficiaryResponse.status === 200) {
            dispatch({ type: USER_WALLET_SUCCESS });
        }
    } catch (error) {
        dispatch({
            type: USER_WALLET_FAILED,
            payload: error.response
        });

        toast.error(
            raveErrorsTypes[error.response] || error.response.data.message
        );
    }
};

export const getBeneficiaries = () => async dispatch => {
    dispatch({ type: SENDING_WALLET_DATA });
    const params = {
        page: 1
    };

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const saveBeneficiaryResponse = await axios.get(
            `${currentAPI}/api/bankBeneficiaries/all`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params
            }
        );

        if (saveBeneficiaryResponse.status === 200) {
            dispatch({ type: USER_WALLET_SUCCESS });
            dispatch({
                type: SAVE_BENEFICIARY,
                payload: saveBeneficiaryResponse.data
            });
        }
    } catch (error) {
        dispatch({
            type: USER_WALLET_FAILED,
            payload: error.response
        });

        toast.error(
            raveErrorsTypes[error.response] || error.response.data.message
        );
    }
};

export const prepareToTransferMoney = data => async dispatch => {
    dispatch({ type: PREPARE_TO_TRANSFER_MONEY, payload: data });
};
