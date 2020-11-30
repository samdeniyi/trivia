import {
    SAVE_AGENTS_MERCHANTS,
    MERCHANT_LAST_SEEN,
    SAVE_MERCHANTS_COMMISSIONS,
    LOADING_MERCHANTS,
    LOAD_MERCHANTS_ERROR,
    LOAD_MERCHANTS_SUCCESS,
    SAVE_MERCHANT_REFERRALS
} from '../constants';

import { currentAPI, axios } from '../../../../../config';
import { getAllCommissions, getUserLastActiveState } from '../../../user/actions';
import { referredCommissions } from '../../../../../utils/filtering/commissions';

export const merchantLastSeen = (id, lastSeen) => dispatch => {
    dispatch({ type: MERCHANT_LAST_SEEN, payload: { id, lastSeen } });
};

export const saveMerchantReferral = referral => dispatch => {
    dispatch({ type: SAVE_AGENTS_MERCHANTS, payload: referral });
};

export const getMerchantReferrals = () => async (dispatch, getState) => {
    dispatch({ type: LOADING_MERCHANTS });
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const getAgentReferralsResponse = await axios.get(
            `${currentAPI}/api/users/getReferrals`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        
        // const merchants = getState().applications.merchants.merchantsList;
        
        let referralsData = 
            getAgentReferralsResponse && 
            getAgentReferralsResponse.data.filter(referral => referral.role.name === "ROLE_USER");
            
        if (referralsData.length) {                 
            referralsData = 
            referralsData.map(async referral => {
                const lastSeen = await dispatch(getUserLastActiveState(referral.id));
                return {
                    id:              referral.id,
                    firstName:       referral.data.firstName,
                    lastName:        referral.data.lastName,
                    createdAt:       referral.createdAt,
                    state:           referral.state,
                    lastSeen,
                    avatar:          referral.data.image || '',
                    msisdn:          referral.data.msisdn,
                    businessProfile: referral.businessData
                };
            });

        const allData =  await Promise.all(referralsData)            
            dispatch({ 
                type: SAVE_AGENTS_MERCHANTS,
                payload: [...allData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            });
        };
        dispatch({ type: LOAD_MERCHANTS_SUCCESS });

    } catch (error) {
        dispatch({ 
            type: LOAD_MERCHANTS_ERROR,
            payload: error.message
        });

        console.error(error.message);
    }
};

export const getReferrals = () => async (dispatch, getState) => {
    dispatch({ type: LOADING_MERCHANTS });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const getReferralsResponse = await axios.get(
            `${currentAPI}/api/users/getReferrals`,
            //`${currentAPI}/api/users/getMerchantsWithActivity`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
       
        if(getReferralsResponse && getReferralsResponse.data.length > 0) {
            let referralsData = getReferralsResponse.data.map(referral => {
                return {
                    id:        referral.id,
                    firstName: referral.data.firstName,
                    lastName:  referral.data.lastName,
                    avatar:    referral.data.avatar || '',
                    msisdn:    referral.data.msisdn,
                    role:      referral.role.name,
                    createdAt: referral.createdAt
                };
            });

            dispatch({ 
                type: SAVE_MERCHANT_REFERRALS, 
                payload: [...referralsData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            });
        };

        dispatch({ type: LOAD_MERCHANTS_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOAD_MERCHANTS_ERROR,
            errorMsg: error.message
        });
    }
};

export const updateMerchantCommissions = () => async (dispatch, getState) => {
    const allCommissions   = await dispatch(getAllCommissions());
    const merchants        = getState().applications.merchants.merchantsList;

    merchants.forEach(merchant => {
        const id = merchant.id;

        const foundCommissions = allCommissions.transactions.filter(transaction => {
            return transaction.commissionDetails.generatedByUserID === id
        });

        const savedMerchantCommissions = 
            (merchant.commissionsList && merchant.commissionsList.length > 0) ? 
            merchant.commissionsList.filter(transaction => {
                return transaction.commissionDetails.generatedByUserID === id
            }) : [];

        if (foundCommissions.length > savedMerchantCommissions.length) {
            const totalCommission = referredCommissions(allCommissions, merchant).totalAmount;

            dispatch({ type: SAVE_MERCHANTS_COMMISSIONS, payload: { id, foundCommissions, totalCommission } })
        };
    });
};