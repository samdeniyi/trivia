import {
    LOADING,
    FETCH_ALL_PRODUCTS_SUCCESS,
    FETCH_ALL_PRODUCTS_FAILURE,
    FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
    FETCH_RECOMMENDED_PRODUCTS_FAILURE,
    FETCH_POPULAR_PRODUCTS_SUCCESS,
    FETCH_POPULAR_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_CATEGORIES_SUCCESS,
    FETCH_PRODUCTS_CATEGORIES_FAILURE,
    FETCH_SHOPS_SUCCESS,
    FETCH_SHOPS_FAILURE,
    FETCH_PRODUCT_BY_ID_SUCCESS,
    FETCH_PRODUCT_BY_ID_FAILURE,
    FETCH_SHOP_BY_ID_SUCCESS,
    FETCH_SHOP_BY_ID_FAILURE,
    FETCH_AVAILABLE_STATES_SUCCESS,
    FETCH_AVAILABLE_STATES_FAILURE,
    FETCH_PRODUCTS_BY_SHOP_ID_SUCCESS,
    FETCH_PRODUCTS_BY_SHOP_ID_FAILURE,
    FETCH_SHOP_CART,
    FETCH_SHIPPING_OPTIONS,
    SAVE_LAST_ORDER_PLACED,
    SERVICE_CHARGE_PERCENT,
    MERCHBUY_DELIVERY_LOCATION,
    MERCHBUY_ORDER_HISTORY_SUCCESS,
    MERCHBUY_ORDER_HISTORY_FAILURE,
    PROCESSING_ORDER,
    SET_CHOSEN_ORDER_HISTORY,
    FETCH_CHOSEN_ORDER_HISTORY_FAILURE,
    CLEAR_CHOSEN_ORDER_HISTORY
} from "./constants";
import { USER_LOGOUT } from '../../user/constants';

const initialState = {
    isLoading: false,
    processingOrder: false,
    errorMsg: "",
    availableStates: [],
    MerchbuyShops: [],
    MerchbuyProducts: [],
    MerchbuyProductsByShopId: [],
    MerchbuyRecommendedProducts: [],
    MerchbuyPopularProducts: [],
    MerchbuyProductCategeries: [],
    shop: {},
    product: {},
    shopCart: [],
    deliveryLocation: {},
    shippingOptions: [],
    order: {},
    serviceChargePercentage: 0,
    chosenOrderHistory: {},
    orderHistory: []

};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                isLoading: action.payload
            };
        }
       
        case PROCESSING_ORDER: {
            return {
                ...state,
                processingOrder: action.payload
            };
        }
        case CLEAR_CHOSEN_ORDER_HISTORY :
            return {
                    ...state,
                chosenOrderHistory: {}
            }
        case FETCH_CHOSEN_ORDER_HISTORY_FAILURE : {
            return {
                ...state,
                isLoading: false,
                chosenOrderHistory: {},
                errorMsg: action.payload,
            }
        }
        case SET_CHOSEN_ORDER_HISTORY : {
            return {
                ...state,
                isLoading: false,
                chosenOrderHistory: action.payload
            }
        }
        case FETCH_ALL_PRODUCTS_SUCCESS: {
            return {
                ...state,
                MerchbuyProducts: action.payload,
                errorMsg: ""
            };
        }
        case FETCH_ALL_PRODUCTS_FAILURE: {
            return {
                ...state,
                MerchbuyProducts: [],
                errorMsg: action.payload
            };
        }

        case FETCH_RECOMMENDED_PRODUCTS_SUCCESS: {
            return {
                ...state,
                MerchbuyRecommendedProducts: action.payload,
                errorMsg: ""
            };
        }
        case FETCH_RECOMMENDED_PRODUCTS_FAILURE: {
            return {
                ...state,
                MerchbuyRecommendedProducts: [],
                errorMsg: action.payload
            };
        }

        case FETCH_POPULAR_PRODUCTS_SUCCESS: {
            return {
                ...state,
                MerchbuyPopularProducts: action.payload,
                errorMsg: ""
            };
        }
        case FETCH_POPULAR_PRODUCTS_FAILURE: {
            return {
                ...state,
                MerchbuyPopularProducts: [],
                errorMsg: action.payload
            };
        }

        case FETCH_PRODUCTS_CATEGORIES_SUCCESS: {
            return {
                ...state,
                MerchbuyProductCategeries: action.payload,
                errorMsg: ""
            };
        }
        case FETCH_PRODUCTS_CATEGORIES_FAILURE: {
            return {
                ...state,
                MerchbuyProductCategeries: [],
                errorMsg: action.payload
            };
        }

        case FETCH_SHOPS_SUCCESS: {
            return {
                ...state,
                MerchbuyShops: action.payload,
                errorMsg: ""
            };
        }
        case FETCH_SHOPS_FAILURE: {
            return {
                ...state,
                MerchbuyShops: [],
                errorMsg: action.payload
            };
        }

        case FETCH_SHOP_BY_ID_SUCCESS: {
            return {
                ...state,
                shop: action.payload,
                errorMsg: ""
            };
        }
        case FETCH_SHOP_BY_ID_FAILURE: {
            return {
                ...state,
                shop: {},
                errorMsg: action.payload
            };
        }

        case FETCH_PRODUCT_BY_ID_SUCCESS: {
            return {
                ...state,
                product: action.payload,
                errorMsg: ""
            };
        }
        case FETCH_PRODUCT_BY_ID_FAILURE: {
            return {
                ...state,
                errorMsg: action.payload
            };
        }

        case FETCH_AVAILABLE_STATES_SUCCESS: {
            return {
                ...state,
                availableStates: action.payload,
                errorMsg: ""
            };
        }
        case FETCH_AVAILABLE_STATES_FAILURE: {
            return {
                ...state,
                product: [],
                errorMsg: action.payload
            };
        }

        case FETCH_PRODUCTS_BY_SHOP_ID_SUCCESS: {
            return {
                ...state,
                MerchbuyProductsByShopId: action.payload,
                errorMsg: ""
            };
        }
        case FETCH_PRODUCTS_BY_SHOP_ID_FAILURE: {
            return {
                ...state,
                MerchbuyProductsByShopId: [],
                errorMsg: action.payload
            };
        }

        case FETCH_SHOP_CART: {
            return {
                ...state,
                shopCart: action.payload
            };
        }


        case SERVICE_CHARGE_PERCENT: {
            return {
                ...state,
                serviceChargePercentage: action.payload
            };
        }

        case FETCH_SHIPPING_OPTIONS: {
            return {
                ...state,
                shippingOptions: action.payload
            };
        }

        case MERCHBUY_DELIVERY_LOCATION: {
            return {
                ...state,
                deliveryLocation: action.payload
            };
        }

        case SAVE_LAST_ORDER_PLACED: {
            return {
                ...state,
                order: action.payload
            }
        }

        case MERCHBUY_ORDER_HISTORY_SUCCESS: {
            return {
                ...state,
                orderHistory: action.payload,
                errorMsg: ""
            };
        }

        case MERCHBUY_ORDER_HISTORY_FAILURE: {
            return {
                ...state,
                orderHistory: [],
                errorMsg: action.payload
            };
        }

        case USER_LOGOUT: {
            return {
                isLoading: false,
                processingOrder: false,
                errorMsg: "",
                availableStates: [],
                MerchbuyShops: [],
                MerchbuyProducts: [],
                MerchbuyRecommendedProducts: [],
                MerchbuyPopularProducts: [],
                MerchbuyProductCategeries: [],
                shop: {},
                //deliveryLocation: {},
                product: {}
            }
        }

        default: {
            return state;
        }
    }
};

