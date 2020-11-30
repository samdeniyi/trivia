import {
    LOADING,
    FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
    FETCH_RECOMMENDED_PRODUCTS_FAILURE,
    FETCH_POPULAR_PRODUCTS_SUCCESS,
    FETCH_POPULAR_PRODUCTS_FAILURE,
    FETCH_ALL_PRODUCTS_SUCCESS,
    FETCH_ALL_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_CATEGORIES_SUCCESS,
    FETCH_PRODUCTS_CATEGORIES_FAILURE,
    FETCH_SHOPS_SUCCESS,
    FETCH_SHOPS_FAILURE,
    FETCH_AVAILABLE_STATES_SUCCESS,
    FETCH_AVAILABLE_STATES_FAILURE,
    FETCH_PRODUCT_BY_ID_SUCCESS,
    FETCH_PRODUCT_BY_ID_FAILURE,
    FETCH_SHOP_BY_ID_SUCCESS,
    FETCH_SHOP_BY_ID_FAILURE,
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
} from "../constants";

import { currentAPI, axios } from "../../../../../config";
import { toast } from "react-toastify";
import { push } from "connected-react-router";
import History from "../../../../../utils/History";
import { getWalletBalance } from "../../../account/wallet/actions"

const getWareNextDeliveryLocations = () => async dispatch => {
    dispatch(request());

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const deliveryLocationsResponse = await axios.get(
            `${currentAPI}/api/warenext/delivery/locations`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch(stoploading());
        if (deliveryLocationsResponse.status === 200) {
            // dispatch({
            //     type: FETCH_AVAILABLE_STATES_SUCCESS,
            //     payload: aVailableStatesResponse.data.data
            // });
        }
    } catch (error) {
        dispatch(stoploading());
        // dispatch({
        //     type: FETCH_AVAILABLE_STATES_FAILURE,
        //     payload: error.message
        // });
        toast.error(error.message);
        console.error(error.message);
    }
};

const getWareNextShippingPrices = (params) => async (dispatch) => {
    dispatch(request());
    try {
        //console.log(params)
        const token = JSON.parse(localStorage.getItem("token")).token;
        const shippingPricesResponse = await axios.post(
            `${currentAPI}/api/warenext/delivery/prices`,
            JSON.stringify(params),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        //console.log(shippingPricesResponse)

        dispatch(stoploading());
        if (shippingPricesResponse.status === 200) {
            dispatch({
                type: FETCH_SHIPPING_OPTIONS,
                payload: shippingPricesResponse.data
            });
        }
    } catch (error) {
        console.log(error.message)
        dispatch(stoploading());
    }
};

const createWareNextShippingOrder = params => async dispatch => {
    dispatch(request());
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const shippingOrderResponse = await axios.post(
            `${currentAPI}/api/warenext/delivery`,
            JSON.stringify(params),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        //console.log(shippingOrderResponse)

        dispatch(stoploading());
        if (shippingOrderResponse.status === 200) {
            return shippingOrderResponse.data;
        }
    } catch (error) {
        dispatch(stoploading());
        toast.error(error.message);
    }
};

const trackWareNextShippingOrder = orderNumber => async dispatch => {
    dispatch(request());
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const shopDetialsResponse = await axios.get(
            `${currentAPI}/api/warenext/delivery/track/${orderNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch(stoploading());
        if (shopDetialsResponse.status === 200) {
            // dispatch({
            //     type: FETCH_SHOP_BY_ID_SUCCESS,
            //     payload: shopDetialsResponse.data.data
            // });
        }
    } catch (error) {
        dispatch(stoploading());
        toast.error(error.message);
        console.error(error.message);
    }
};

const updateShippingLocally = data => async dispatch => {
    dispatch({
        type: FETCH_SHIPPING_OPTIONS,
        payload: data
    });
};

const updateDeliveryLocation = params => async dispatch => {
    //dispatch(request());
    try {
        // const token = JSON.parse(localStorage.getItem("token")).token;
        // const updateDeliveryLocationResponse = await axios.post(
        //     `${currentAPI}/api/cart/products`,
        //     JSON.stringify(params),
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     }
        // );

        //dispatch(stoploading());
        //if (updateDeliveryLocationResponse.status === 200) {
            dispatch({
                type: MERCHBUY_DELIVERY_LOCATION,
                //payload: addProductToCartResponse.data.items
                payload: params
            });
            // dispatch(
            //     push({
            //         pathname: "/actions/merchbuy/to-cart",
            //         params
            //     })
            // );
        //}
    } catch (error) {
        //dispatch(stoploading());
        toast.error(error.message);
    }
};

const placeOrder = (params, paymentType) => async dispatch => {
    dispatch({type: PROCESSING_ORDER, payload: true});
    
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const orderResponse = await axios.post(
            `${currentAPI}/api/merchantAppIntegration/orders/Order/process`,
            JSON.stringify(params),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({type: PROCESSING_ORDER, payload: false});
        if (orderResponse.status === 200) {
            const order = {
                id: orderResponse.data.id,
                orderNumber: orderResponse.data.orderNumber,
                email: orderResponse.data.email,
                subTotal: orderResponse.data.subTotal,
                totalPrice: orderResponse.data.totalPrice,
                deliveryFee: orderResponse.data.deliveryFee,
                firstname: orderResponse.data.orderDelivery.firstName,
                lastname: orderResponse.data.orderDelivery.lastName,
                deliveryOption: orderResponse.data.orderDelivery.deliveryOption,
            }

            dispatch({
                type: SAVE_LAST_ORDER_PLACED,
                payload: order
            });

            return {
                status: true,
                message: "",
                paymentType: paymentType,
                order
            };
        }
    } catch (error) {
        dispatch({type: PROCESSING_ORDER, payload: false});
        return {
            status: false,
            message: error.message,
            paymentType: paymentType,
            order: null
        };
    }
};

const payWithWallet = (params) => async dispatch => {
    dispatch({type: PROCESSING_ORDER, payload: true});
        
    const id = params.order.id;
    const totalPrice = params.order.totalPrice;
    const email = params.order.email;
    const subTotal = params.order.subTotal;
    const deliveryFee = params.order.deliveryFee;

    const orderDetail = {
        amount: totalPrice * 100,
        orderId: id,
        client: "MERCHBUY",
        narration: "ORDER|PAYMENT|"+totalPrice+"|"+id
    }

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const paymentDetailResponse = await axios.post(
            `${currentAPI}/api/walletService/payment/pay`,
            JSON.stringify(orderDetail),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({type: PROCESSING_ORDER, payload: false});    
        if (paymentDetailResponse.status === 200) {
            const trxRef = paymentDetailResponse.data.transactionRef;
            const paymentDetail = {
                orderId: id,
                partnerCode: "",
                payment: {
                    deliveryCharge: deliveryFee,
                    email: email,
                    message: "",
                    paymentMethod: 3,
                    redirecturl: "",
                    reference: trxRef,
                    response: "",
                    responseString: "",
                    serviceCharge: 0,
                    status: "",
                    subTotal: subTotal,
                    total: totalPrice,
                    transactionId: trxRef,
                    transactionReference: trxRef
                },
                referralCode: ""
            };
            dispatch(
                sendPaymentDetails(
                    paymentDetail //, response.order.deliveryOption, payload
                )
            );
            dispatch(
                getWalletBalance()
            )
        }
    } catch (error) {
        dispatch({type: PROCESSING_ORDER, payload: false});
        if(error.response && error.response.data){
            //Not enough funds in your wallet. Please top it up.
        }
    }
}

const sendPaymentDetails = (params /*, deliveryOption, payload*/) => async dispatch => {
    dispatch({type: PROCESSING_ORDER, payload: true});
    try {
        //console.log(JSON.stringify(params));
        // if(deliveryOption!== 2) {
        //    const shippingRef = await dispatch(
        //          merchbuyActions.createWareNextShippingOrder(
        //              payload
        //          )
        //      );
        // }

        const token = JSON.parse(localStorage.getItem("token")).token;
        const paymentDetailResponse = await axios.post(
            `${currentAPI}/api/merchantAppIntegration/orders/Order/transaction`,
            JSON.stringify(params),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({type: PROCESSING_ORDER, payload: false});
        if (paymentDetailResponse.status === 200) {
            // History.push("/actions/merchbuy/order-success")
            History.push({
                pathname: '/actions/merchbuy/order-success',
                state: { id: params.orderId }
            });
        }
    } catch (error) {
        dispatch({type: PROCESSING_ORDER, payload: false});
    }
}

const getAVailableStates = () => async dispatch => {
    dispatch(request());

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const aVailableStatesResponse = await axios.get(
            `${currentAPI}/api/merchantBuyIntegration/branches/availableState`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(stoploading());
        if (aVailableStatesResponse.status === 200) {
            dispatch({
                type: FETCH_AVAILABLE_STATES_SUCCESS,
                payload: aVailableStatesResponse.data.data
            });
        }
    } catch (error) {
        dispatch(stoploading());
        dispatch({
            type: FETCH_AVAILABLE_STATES_FAILURE,
            payload: error.message
        });
        toast.error(error.message);
        console.error(error.message);
    }
};

const getProductCategories = () => async dispatch => {
    dispatch(request());

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const ProductCategoriesResponse = await axios.get(
            `${currentAPI}/api/merchantBuyIntegration/product/categories/all`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(stoploading());
        if (ProductCategoriesResponse.status === 200) {
            dispatch({
                type: FETCH_PRODUCTS_CATEGORIES_SUCCESS,
                payload: ProductCategoriesResponse.data.data
            });
        }
    } catch (error) {
        dispatch(stoploading());
        dispatch({
            type: FETCH_PRODUCTS_CATEGORIES_FAILURE,
            payload: error.message
        });
        toast.error(error.message);
        console.error(error.message);
    }
};

const getProductsByProductCategoryID = id => async dispatch => {
    dispatch(request());
    const deliveryLocation =  JSON.parse(localStorage.getItem("deliveryLocation")) || ""

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const ProductsByProductCategoryID = await axios.get(
            `${currentAPI}/api/merchantBuyIntegration/product/list/byProductCategory/${id}?direction=DESC&page=1&pageSize=24&sortBy=_id&state=${deliveryLocation.state}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(stoploading());
        if (ProductsByProductCategoryID.status === 200) {
            dispatch({
                type: FETCH_ALL_PRODUCTS_SUCCESS,
                payload: ProductsByProductCategoryID.data.data.content
            });
        }
    } catch (error) {
        dispatch(stoploading());
        dispatch({ type: FETCH_ALL_PRODUCTS_FAILURE, payload: error.message });
        toast.error(error.message);
        console.error(error);
    }
};

const unsubscribe = () => async dispatch => {
    dispatch({
        type: FETCH_PRODUCT_BY_ID_SUCCESS,
        payload: {}
    });
    dispatch({
        type: FETCH_ALL_PRODUCTS_SUCCESS,
        payload: []
    });
    dispatch({
        type: FETCH_SHOP_BY_ID_SUCCESS,
        payload: {}
    });
}

const searchProductsOnMerchbuy = name => async dispatch => {
    dispatch(request());
    const deliveryLocation =  JSON.parse(localStorage.getItem("deliveryLocation")) || ""
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const products = await axios.get(
            `${currentAPI}/api/merchantBuyIntegration/product/list/all?direction=ASC&page=1&pageSize=7&searchString=${name}&sortBy=_id&state=${deliveryLocation.state}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(stoploading());
        if (products.status === 200) {
          return products.data.data.content
        }
    } catch (error) {
       return []
    }
};

const getAllShops = () => async dispatch => {
    dispatch(request());

    const params = {
        pageSize: 1000,
        page: 1
    };

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const allShops = await axios.get(
            `${currentAPI}/api/merchantBuyIntegration/business/branches/list`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params
            }
        );
        dispatch(stoploading());
        if (allShops.status === 200) {
            dispatch({
                type: FETCH_SHOPS_SUCCESS,
                payload: allShops.data.data.content
            });
        }
    } catch (error) {
        dispatch(stoploading());
        dispatch({ type: FETCH_SHOPS_FAILURE, payload: error.message });
        toast.error(error.message);
        console.error(error);
    }
};

const getPopularProducts = (num, location) => async dispatch => {
    dispatch(request());
    const deliveryLocation =  JSON.parse(localStorage.getItem("deliveryLocation")) || location

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;



        const popularProducts = await axios.get(
            `${currentAPI}/api/merchantBuyIntegration/product/homepage/popularProducts?limit=${num}&state=${deliveryLocation.state}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(stoploading());
        if (popularProducts.status === 200 && popularProducts.data.data !== undefined) {
            dispatch({
                type: FETCH_POPULAR_PRODUCTS_SUCCESS,
                payload: popularProducts.data.data
            });
        }
    } catch (error) {
        dispatch(stoploading());
        dispatch({
            type: FETCH_POPULAR_PRODUCTS_FAILURE,
            payload: error.message
        });
        toast.error(error.message);
        console.error(error);
    }
};

const getRecommendedProducts = (num, location) => async dispatch => {
    dispatch(request());
    const deliveryLocation =  JSON.parse(localStorage.getItem("deliveryLocation")) || location
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const recommendedProducts = await axios.get(
            `${currentAPI}/api/merchantBuyIntegration/product/homepage/recommendedProducts?limit=${num}&state=${deliveryLocation.state}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(stoploading());
        if (recommendedProducts.status === 200 && recommendedProducts.data.data !== undefined) {
            dispatch({
                type: FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
                payload: recommendedProducts.data.data
            });
        }
    } catch (error) {
        dispatch(stoploading());
        dispatch({
            type: FETCH_RECOMMENDED_PRODUCTS_FAILURE,
            payload: error.message
        });
        toast.error(error.message);
        console.error(error);
    }
};

const getShopDetials = id => async dispatch => {
    dispatch(request());

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const shopDetialsResponse = await axios.get(
            `${currentAPI}/api/merchantBuyIntegration/branches/view/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(stoploading());
        if (shopDetialsResponse.status === 200) {
            dispatch({
                type: FETCH_SHOP_BY_ID_SUCCESS,
                payload: shopDetialsResponse.data.data
            });
        }
    } catch (error) {
        dispatch(stoploading());
        dispatch({
            type: FETCH_SHOP_BY_ID_FAILURE,
            payload: error.message
        });
        toast.error(error.message);
        console.error(error.message);
    }
};

const getProductDetials = id => async dispatch => {
    dispatch(request());

    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const productDetialsResponse = await axios.get(
            `${currentAPI}/api/merchantBuyIntegration/product/view/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(stoploading());
        if (productDetialsResponse.status === 200 && productDetialsResponse.data.data.id) {
            dispatch({
                type: FETCH_PRODUCT_BY_ID_SUCCESS,
                payload: productDetialsResponse.data.data
            });
        }
        else {
            dispatch({
                type: FETCH_PRODUCT_BY_ID_FAILURE,
                payload: "An error occured!"
            })
        }
    } catch (error) {
        dispatch(stoploading());
        dispatch({
            type: FETCH_PRODUCT_BY_ID_FAILURE,
            payload: error.message
        });
        toast.error(error.message);
        console.error(error.message);
    }
};

const setInitProductDetials = data => async dispatch => {
            dispatch({
                type: FETCH_PRODUCT_BY_ID_SUCCESS,
                payload: data
            });
        }

const getProductsByShopID = id => async dispatch => {
    dispatch(request());
    const deliveryLocation =  JSON.parse(localStorage.getItem("deliveryLocation")) || ""
    dispatch({
        type: FETCH_PRODUCTS_BY_SHOP_ID_SUCCESS,
        payload: []
    });
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const products = await axios.get(
            `${currentAPI}/api/merchantBuyIntegration/product/list/byBranch/{branchId}?branchId=${id}&direction=DESC&page=1&pageSize=1000&sortBy=_id&state=${deliveryLocation.state}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(stoploading());
        if (products.status === 200) {
            dispatch({
                type: FETCH_PRODUCTS_BY_SHOP_ID_SUCCESS,
                payload: products.data.data.content
            });
        }
    } catch (error) {
        dispatch(stoploading());
        dispatch({
            type: FETCH_PRODUCTS_BY_SHOP_ID_FAILURE,
            payload: error.message
        });
        toast.error(error.message);
        console.error(error);
    }
};

const getShopCart = () => async dispatch => {
    dispatch(request());
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const cart = await axios.get(`${currentAPI}/api/cart/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch(stoploading());
        if (cart.status === 200) {
            dispatch({
                type: SERVICE_CHARGE_PERCENT,
                payload: cart.data.serviceChargePercentage
            })
            dispatch({
                type: FETCH_SHOP_CART,
                payload: cart.data.items
            });
        }
    } catch (error) {
        console.log(error, "error")
        dispatch(stoploading());
        toast.error(error.message);
    }
};

const addProductToCart = params => async dispatch => {
    dispatch(request());
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const addProductToCartResponse = await axios.post(
            `${currentAPI}/api/cart/products`,
            JSON.stringify(params),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (addProductToCartResponse.status === 200) {
            dispatch(stoploading());
            dispatch({
                type: FETCH_SHOP_CART,
                payload: addProductToCartResponse.data.items
            });
            dispatch(
                push({
                    pathname: "/actions/merchbuy/to-cart",
                    params
                })
            );
        }
    } catch (error) {
        dispatch(stoploading());
        toast.error(error.message);
    }
};

const updateCart = params => async dispatch => {
    dispatch(request());
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const updateCartResponse = await axios.put(
            `${currentAPI}/api/cart/`,
            JSON.stringify(params),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (updateCartResponse.status === 200) {
            dispatch(stoploading());
            dispatch(getShopCart());
        }
    } catch (error) {
        dispatch(stoploading());
        toast.error(error.message);
    }
};

const updateCartLocally = data => async dispatch => {
    dispatch({
        type: FETCH_SHOP_CART,
        payload: data
    });
};

const deleteItemFromCart = id => async dispatch => {
    dispatch(request());
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const deleteItemResponse = await axios.delete(
            `${currentAPI}/api/cart/items/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (deleteItemResponse.status === 200) {
            dispatch(stoploading());
            dispatch(getShopCart());
            return true;
        }
    } catch (error) {
        dispatch(stoploading());
        toast.error(error.message);
        return false;
    }
};
const clearOrderHistory = () => ({type: CLEAR_CHOSEN_ORDER_HISTORY});

    const getOrderHistory = () => async dispatch => {
        dispatch(request());
    
        try {
            const token = JSON.parse(localStorage.getItem("token")).token;
            const OrderHistoryResponse = await axios.get(
                `${currentAPI}/api/merchantAppIntegration/orders/Order/history`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            dispatch(stoploading());
            if (OrderHistoryResponse.status === 200) {
                dispatch({
                    type: MERCHBUY_ORDER_HISTORY_SUCCESS,
                    payload: OrderHistoryResponse.data.data
                });
            }
        } catch (error) {
            dispatch(stoploading());
            dispatch({
                type: MERCHBUY_ORDER_HISTORY_FAILURE,
                payload: error.message
            });
            toast.error(error.message);
            console.error(error.message);
        }
    };

    const getOrderHistoryById = id => async dispatch => {
        dispatch(request());
    
        try {
            const token = JSON.parse(localStorage.getItem("token")).token;
            const OrderHistoryResponse = await axios.get(
                `${currentAPI}/api/merchantAppIntegration/orders/Order/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (OrderHistoryResponse.status === 200) {
                dispatch({
                    type: SET_CHOSEN_ORDER_HISTORY,
                    payload: OrderHistoryResponse.data.data
                });
            }
        } catch (error) {
            dispatch({
                type: FETCH_CHOSEN_ORDER_HISTORY_FAILURE,
                payload: error.message
            });
            console.log(error)
            toast.error(error.message);
            console.error(error.message);
        }
    };

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

export const merchbuyActions = {
    clearOrderHistory,
    getWareNextDeliveryLocations,
    getWareNextShippingPrices,
    updateShippingLocally,
    createWareNextShippingOrder,
    trackWareNextShippingOrder,
    getAVailableStates,
    getProductCategories,
    getProductsByProductCategoryID,
    getAllShops,
    getPopularProducts,
    getRecommendedProducts,
    getShopDetials,
    getProductDetials,
    setInitProductDetials,
    getProductsByShopID,
    getShopCart,
    addProductToCart,
    updateCart,
    updateCartLocally,
    updateDeliveryLocation,
    deleteItemFromCart,
    placeOrder,
    searchProductsOnMerchbuy,
    sendPaymentDetails,
    unsubscribe,
    getOrderHistory,
    getOrderHistoryById,
    payWithWallet
};