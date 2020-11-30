
import { push } from "connected-react-router";
import { toast } from "react-toastify";

import {
    MY_SHOP_ORDERS_SUCCESS,
    LOADING_SHOP_ORDER,
    MY_SHOP_ORDERS_FAILURE,
    MY_SHOP_ORDER_BY_ID_SUCCESS,
    MY_SHOP_ORDER_BY_ID_FAILURE,
    MY_SHOP_ORDER_UPDATE_PRODUCTS,
    PROCESS_SHOP_ORDERS_SUCCESS,
    PROCESS_SHOP_ORDERS_FAILURE
} from "../../constants";
import { axios, currentAPI } from "../../../../../../config";

export const getOrders = shop => async dispatch => {
    dispatch({ type: LOADING_SHOP_ORDER });
    const params = {
        branchId: shop.branchId,
        businessId: shop.businessId,
        orderItemStatuses: [2, 4, 5, 7],
        pageNumber: 1,
        pageSize: 100
    };

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const getOrdersResponse = await axios.post(
            `${currentAPI}/api/merchantAppIntegration/orders/Order/search`,
            JSON.stringify(params),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (getOrdersResponse.status === 200) {
            dispatch({
                type: MY_SHOP_ORDERS_SUCCESS,
                payload: getOrdersResponse.data.data || []
            });
        }
    } catch (error) {
        dispatch({ type: MY_SHOP_ORDERS_FAILURE, payload: error.message });
    }  
};

export const getOrderByID = (params, orderObj) => async dispatch => {
    dispatch({ type: LOADING_SHOP_ORDER });
    if(orderObj ===null) {

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const order = await axios.get(
            `${currentAPI}/api/merchantAppIntegration/orders/Order/${params.id}/orderItemStatus/0/branch/${params.branchId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (order.status === 200) {
            dispatch({
                type: MY_SHOP_ORDER_BY_ID_SUCCESS,
                payload: order.data.data
            });
        }
    } catch (error) {
        dispatch({ type: MY_SHOP_ORDER_BY_ID_FAILURE, payload: error.message });
        console.error(error);
    }
} else {
    dispatch({
        type: MY_SHOP_ORDER_UPDATE_PRODUCTS,
        payload: orderObj,
      });
}
};


export const processOrder = (id, orderItems) => async dispatch => {
    dispatch({ type: LOADING_SHOP_ORDER });
    const params = 
      {
        "orderId": id,
        "orderItems": orderItems 
      }

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const processOrderResponse = await axios.post(
            `${currentAPI}/api/merchantAppIntegration/orders/Order/OrderFulfilment/v2`,
            JSON.stringify(params),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (processOrderResponse.status === 200) {
            dispatch({
                type: PROCESS_SHOP_ORDERS_SUCCESS,
                payload: processOrderResponse.data.data
            });
            toast.success(processOrderResponse.data.message);
            dispatch(push('/actions/shop'));
            return true
        }
        return false
    } catch (error) {
        dispatch({ type: PROCESS_SHOP_ORDERS_FAILURE, payload: error.message });
        console.error(error);
    }
    return false
};