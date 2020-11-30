import {
    LOADING,
    AGENCY_BANKING_SIGNUP,
    SAVE_AGENCY_BANKING_IDCARD_IMAGES,
    SAVE_AGENCY_BANKING_UTILITY_IMAGES,
    SAVE_AGENCY_BANKING_PASSPORT_IMAGES
} from "../constants";
import {
    NORMAL,
    PROGRESS,
    FAILED,
    SUCCESS
} from '../../../../../components/forms/input/file2'
import { toast } from 'react-toastify';
import { axios, currentAPI } from "../../../../../config";
import { fileToFormData } from "../../../../../utils/files/fileToFormData";
import { goBack } from "connected-react-router";
//import { mixPanel, UPGRADE_AGENT_TO_TIER2, UPGRADE_AGENT_TO_TIER2_UPDATE } from '../../../../../utils/mix-panel/mixPanel';

export const agencyBankingSignup = param => async dispatch => { 
    dispatch(request());
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const agencyBankingSignupResponse = await axios.post(
            `${currentAPI}/api/agencyBankingApplication/`,
            JSON.stringify(param),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch(stoploading());
        if (agencyBankingSignupResponse.status === 200) {
            toast.success("Your application have been submitted.");
            dispatch({
                type: AGENCY_BANKING_SIGNUP,
                payload: agencyBankingSignupResponse.data
            });
            //mixPanel.track(UPGRADE_AGENT_TO_TIER2, { "User ID": param.userId, "Role": role })
            dispatch(goBack());
        }
    } catch (error) {
        dispatch(stoploading());
        toast.error("An error occurred");
        //console.log(error.response.data)
        //console.log(JSON.parse(error.response.data).message)
        //toast.error(error.response.data.message);
        //toast.error(error.data.response.error);
        //toast.error(error.response.data.error);
    }
};

export const updateAgencyBankingSignup = param => async dispatch => { 
    dispatch(request());
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const updateAgencyBankingSignupResponse = await axios.patch(
            `${currentAPI}/api/agencyBankingApplication/`,
            JSON.stringify(param),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch(stoploading());
        if (updateAgencyBankingSignupResponse.status === 200) {
            toast.success("Your application have been updated.");
            dispatch({
                type: AGENCY_BANKING_SIGNUP,
                payload: updateAgencyBankingSignupResponse.data
            });
            //mixPanel.track(UPGRADE_AGENT_TO_TIER2_UPDATE, { "User ID": param.userId, "Role": role })
            dispatch(goBack());
        }
    } catch (error) {
        dispatch(stoploading());
        toast.error("An error occurred");
        //toast.error(error.data.response.error);
        //toast.error(error.response.data.error);
    }
};

export const getAgencyBankingSignupState = () => async dispatch => { 
    dispatch(request());
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const getAgencyBankingSignupState = await axios.get(
            `${currentAPI}/api/agencyBankingApplication/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch(stoploading());
        if (getAgencyBankingSignupState.status === 200) {
            dispatch({
                type: AGENCY_BANKING_SIGNUP,
                payload: getAgencyBankingSignupState.data
            });
        }
    } catch (error) {
        dispatch(stoploading());
        console.log(error)
    }
};

export const saveAgencyBankingIdCardImage = (idCard) => async dispatch => {
    dispatch({
        type: SAVE_AGENCY_BANKING_IDCARD_IMAGES,
        payload: idCard
    });
}

export const saveAgencyBankingUtilityImage = (utilityBill) => async dispatch => {
    dispatch({
        type: SAVE_AGENCY_BANKING_UTILITY_IMAGES,
        payload: utilityBill
    });
}

export const saveAgencyBankingPassportImage = (passportPhoto) => async dispatch => {
    dispatch({
        type: SAVE_AGENCY_BANKING_PASSPORT_IMAGES,
        payload: passportPhoto
    });
}

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

export const uploadFile = (
    label,
    url,
    fileData,
    setState,
    source
) => async (dispatch, getState) => { 
    setState({ state: PROGRESS, progress: 20})

    try {
        const msisdn       = getState().user.msisdn;
        const formData = await fileToFormData(url, fileData);

        setState({ state: PROGRESS, progress: 60})

        const sendUserFileResponse = await axios.post(
            `${currentAPI}/api/storage/uploadAgentDocuments/${encodeURIComponent(msisdn)}/${label}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                cancelToken: source.token
            }
        );

        setState({ state: PROGRESS, progress: 80})

        if (sendUserFileResponse.status === 200) {
            setState({ state: SUCCESS, progress: 0})
            return sendUserFileResponse.data;
        } else {
            setState({ state: FAILED, progress: 0})
            return "";
        }
    } catch (error) {
        if(axios.isCancel(error)){
            setState({ state: NORMAL, progress: 0})
        } else {
            setState({ state: FAILED, progress: 0})
        }
        return "";
    }
};