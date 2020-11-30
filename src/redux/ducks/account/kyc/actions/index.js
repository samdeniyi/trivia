import {
    USER_KYC_UPLOADING,
    USER_KYC_LOADED,
    USER_KYC_FAILED
} from '../constants';
import { goBack } from "connected-react-router";
import { toast } from 'react-toastify';
import { sendUserInfo, getUserAdditionalInfo } from '../../../user/actions';
import { SAVE_USER_REGION, SAVE_USER_ADDRESS } from '../../../user/constants';
import { mixPanel } from '../../../../../utils/mix-panel/mixPanel';
import { SETTINGS_KYC} from '../../../../../utils/mix-panel/constants';

export const sendKYCRegion = regionData => async (dispatch, getState) => {
    dispatch({ type: USER_KYC_UPLOADING });
    const userId = getState().user.userId;
    const role = getState().user.role;

    try {
        const sendKYCRegionResponse = await dispatch(sendUserInfo(regionData));

        if (sendKYCRegionResponse.status === 200) {
            await dispatch(getUserAdditionalInfo());
            dispatch({ type: USER_KYC_LOADED });
            dispatch({ type: SAVE_USER_REGION, payload: regionData });
            mixPanel.track(SETTINGS_KYC, { "User ID": userId, "Role": role })
            dispatch(goBack());
            toast.success("Your region information was successfully updated");
        };
    } catch (error) {
        dispatch({ type: USER_KYC_FAILED, payload: error.message });
        toast.error(error.data.response.error);
    }
};

export const sendKYCAddress = (address) => async (dispatch, getState) => {
    dispatch({ type: USER_KYC_UPLOADING });
    dispatch({ type: SAVE_USER_ADDRESS, payload: address });

    try {
        const houseAddress = getState().account.kyc.houseAddress;
        const sendKYCAddressResponse = await dispatch(sendUserInfo({ houseAddress }));

        if (sendKYCAddressResponse.status === 200) {
            dispatch({ type: USER_KYC_LOADED });
            dispatch(goBack());
            toast.success("Your address was successfully updated");
        };
    } catch (error) {
        dispatch({ type: USER_KYC_FAILED, payload: error.message });
        toast.error(error.data.response.error);
    }
};