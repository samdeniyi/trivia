import { USER_LOGOUT } from '../user/constants';
import {
    IS_ONLINE,
    ADD_PENDING_REQUEST,
    REMOVE_PENDING_REQUEST,
    REMOVE_ALL_PENDING_REQUESTS,
    UPDATE_PENDING_REQUEST,
    UPDATE_PENDING_SALE_CUSTOMER_ID,
    UPDATE_PENDING_SALE_INVENTORY_PRODUCT,
    RESET_OFFLINE_STATUS
} from './constants';

const initialState = {
    wasOffline: false,
    isOffline: false,
    pendingRequests: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case IS_ONLINE: {
            return {
                ...state,
                wasOffline: !action.payload,
                isOffline: action.payload
            };
        }

        case RESET_OFFLINE_STATUS: {
            return {
                ...state,
                wasOffline: false,
                isOffline: false
            }
        }

        case ADD_PENDING_REQUEST: {
            return {
                ...state,
                pendingRequests: state.pendingRequests.concat(action.payload.pendingRequest),
            };
        }

        case UPDATE_PENDING_REQUEST: {
            const requestId = action.payload.requestId;
            const payload   = action.payload.payload;
            
            return {
                ...state,
                pendingRequests: state.pendingRequests.map(request => {
                    if (request.id === requestId) {
                        request.payload = payload;
                    };

                    return request;
                })
            }
        }

        case REMOVE_PENDING_REQUEST: {
            return {
                ...state,
                pendingRequests: state.pendingRequests.filter(request => request.id !== action.payload.id),
            };
        }

        case REMOVE_ALL_PENDING_REQUESTS: {
            return {
                ...state,
                pendingRequests: [],
            };
        }

        case UPDATE_PENDING_SALE_CUSTOMER_ID: {
            const previousId = action.payload.previousId;
            const currentId  = action.payload.currentId;

            return {
                ...state,
                pendingRequests: state.pendingRequests.map(request => {
                    if (request.payload.customerId === previousId) {
                        request.payload.customerId = currentId;
                    };

                    return request;
                })
            };
        }

        case UPDATE_PENDING_SALE_INVENTORY_PRODUCT: {
            const previousInventoryProductId = action.payload.previousInventoryProductId;
            const currentProductId           = action.payload.currentProductId;
            const currentInventoryProductId  = action.payload.currentInventoryProductId;

            return {
                ...state,
                pendingRequests: state.pendingRequests.filter(request => {
                    request.payload.salesItemDetails && 
                    request.payload.salesItemDetails.length > 0 &&
                    request.payload.salesItemDetails.filter(product => {
                        if (product.inventoryProductId === previousInventoryProductId) {
                            product.inventoryProductId = currentInventoryProductId;
                            product.currentProductId   = currentProductId;
                        };

                        return product;
                    });

                    return request;
                })
            }
        }
        /*
            Leave it this way 
            return {} 
            causes undefined error on second login for pendingRequest
        */
        case USER_LOGOUT: {
            return {
                wasOffline: false,
                isOffline: false,
                pendingRequests: []
            }
        }

        default: {
            return state;
        }
    }
};
