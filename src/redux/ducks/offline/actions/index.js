import {
    IS_ONLINE,
    ADD_PENDING_REQUEST,
    REMOVE_PENDING_REQUEST,
    REMOVE_ALL_PENDING_REQUESTS,
    RESET_OFFLINE_STATUS
} from '../constants';
import { v4 as uuid } from 'uuid';
import { axios } from "../../../../config";

export const setOnlineState = currentOfflineStatus => async (dispatch, getState) => {
    const offlineData = getState().offline;
    const previousOfflineStatus = offlineData.isOffline;

    if (offlineData.status === currentOfflineStatus) return;

    dispatch({ type: IS_ONLINE, payload: currentOfflineStatus });
    
    if (
        previousOfflineStatus === true && 
        currentOfflineStatus === false && 
        offlineData.pendingRequests &&
        offlineData.pendingRequests.length > 0
    ) {
        const pendingRequests = [...offlineData.pendingRequests];
        
        try {
            const token = JSON.parse(localStorage.getItem('token')).token;

            const headers = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };
            
            for (const request of pendingRequests) {
                try {
                    switch (request.method) {
                        case 'POST': {
                            const response = await axios.post(request.url, request.payload, headers);
                            
                            request.rollback.forEach(action => {
                                dispatch({ 
                                    type: action, 
                                    payload: { request, response } 
                                });
                            });

                            break;
                        }
    
                        case 'PUT': {
                            const response = await axios.put(request.url, request.payload, headers);
                            if(response.status === 200){
                                dispatch(removePendingRequest(request.id));
                            }
                            break;
                        }
                        case 'PATCH': {
                            const response = await axios.patch(request.url, request.payload, headers);
                            if(response.status === 200){
                                dispatch(removePendingRequest(request.id));
                            }
                            break;
                        }
                        
                        case 'DELETE': {
                            const response = await axios.delete(request.url, headers);
                            if(response.status === 200){
                                dispatch(removePendingRequest(request.id));
                            }
                            break;
                        }
    
                        default: {
                            break;
                        }
                    };
                } catch (error) {
                    console.error(error);
                    dispatch(removePendingRequest(request.id));
                };
            };
        } catch (error) {
            console.error(error);
        }
    };
};

export const addPendingRequest = (method, url, payload, rollback) => dispatch => {
    const pendingRequest = {
        method,
        url,
        payload,
        rollback,
        id: uuid()
    };

    dispatch({ type: ADD_PENDING_REQUEST, payload: { pendingRequest } });
};

export const removePendingRequest = id => dispatch => {
    dispatch({ type: REMOVE_PENDING_REQUEST, payload: { id } });
};

export const removeAllPendingRequests = () => dispatch => {
    dispatch({ type: REMOVE_ALL_PENDING_REQUESTS });
};

export const resetOfflineStatus = () => dispatch => {
    dispatch({ type: RESET_OFFLINE_STATUS });
};