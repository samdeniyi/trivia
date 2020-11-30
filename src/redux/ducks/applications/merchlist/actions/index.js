import { axios, currentAPI } from "../../../../../config";
import { SAVE_RETRIEVED_ORDERS } from "../constants";

export const merchAppLogin = (userName = "ilya@vigventures.com") => async () => {
    const merchantLoginUserDto = {
        password: "Kobebryant24!",
        userName
    };

    try {
        const merchAppLoginResponse = await axios.post(
            `${currentAPI}/api/merchantListIntegration/merchant/login`,
            JSON.stringify(merchantLoginUserDto)
        );

        if (merchAppLoginResponse.status === 200) {
            localStorage.setItem("merchAppAccessToken", merchAppLoginResponse.data);
            return true;
        };
    } catch (error) {
        console.error(error);
    }
};

export const merchAppGetOrders = referralCode => async () => {
    try {
        const accessToken = localStorage.getItem("merchAppAccessToken");

        const merchAppGetOrdersResponse = accessToken && await axios.post(
            `${currentAPI}/api/merchantListIntegration/getOrders/byReferralCode`,
            JSON.stringify({
                accessToken,
                referralCode
            })
        );

        if (merchAppGetOrdersResponse.status === 200) {
            return merchAppGetOrdersResponse.data;
        };
    } catch (error) {
        console.error(error);
    }
};

export const retrieveMerchlistOrders = () => async (dispatch, getState) => {
    try {
        const loginResponse = await dispatch(merchAppLogin());
        
        if (loginResponse) {
            const referralCode = getState().user.agentCodeToShare;
            const savedOrders  = getState().applications.merchlist.orders;
            const orders       = await dispatch(merchAppGetOrders(referralCode));
            
            if (orders.length > savedOrders.length) {
                dispatch({ type: SAVE_RETRIEVED_ORDERS, payload: orders });
            };
        };
    } catch (error) {
        console.error(error);
    };
};