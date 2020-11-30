import { UPDATE_PENDING_REQUEST, REMOVE_PENDING_REQUEST, UPDATE_PENDING_SALE_CUSTOMER_ID } from "../../../../offline/constants";
import { 
    LOADING_SHOP, 
    MY_SHOP_SUCCESS, 
    MY_SHOP_ERROR, 
    SAVE_CUSTOMER,
    GET_CUSTOMERS,
    DELETE_CUSTOMER,
    UPDATE_CUSTOMER,
    UPDATE_CUSTOMER_ID,
    UPDATE_CUSTOMER_OWING_STATUS
} from "../../constants";

import { v4 as uuid } from 'uuid';
import { axios, currentAPI } from "../../../../../../config";
import { push } from "connected-react-router";
import { insertZero } from "../../../../../../utils/inputs/formatPhoneNumber";
import { toast } from "react-toastify";
import { addPendingRequest } from "../../../../offline/actions";
import { mixPanel } from '../../../../../../utils/mix-panel/mixPanel';
import { SHOP_ADD_CUSTOMER, SHOP_DELETE_CUSTOMER } from '../../../../../../utils/mix-panel/constants';

export const getCustomers = () => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const getCustomersResponse = await axios.get(
            `${currentAPI}/api/customers/`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (getCustomersResponse.status === 200) {
            
            dispatch({ type: GET_CUSTOMERS, payload: getCustomersResponse.data.content });
        };
    } catch (error) {
        console.error(error);
    }
};

export const addCustomer = (
    customerInfo, 
    redirect = '/actions/shop_customers'
) => async (dispatch, getState) => {
    dispatch({ type: LOADING_SHOP });    

    const userId = getState().user.userId;
       
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const addCustomerResponse = await axios.post(
            `${currentAPI}/api/customers/`,
            JSON.stringify(customerInfo),
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (addCustomerResponse.status === 200) {
            customerInfo.id = addCustomerResponse.data.id;
            customerInfo.createdDate = addCustomerResponse.data.createdDate;

            mixPanel.track(SHOP_ADD_CUSTOMER, {
                "User ID": userId,
                "Customer ID": customerInfo.id
            })
            dispatch(getCustomers())
            dispatch({ type: MY_SHOP_SUCCESS });
            toast.success("customers' information has been successfully saved!");
            redirect && dispatch(push(redirect));
            return addCustomerResponse.data.id;
        };
    } catch (error) {
        if (error.message === "Network Error") {
            dispatch(
                addPendingRequest(
                    "POST", 
                    `${currentAPI}/api/customers/`, 
                    customerInfo,
                    [UPDATE_CUSTOMER_ID, UPDATE_PENDING_SALE_CUSTOMER_ID]
                )
            );
            
            customerInfo.id = uuid();
            customerInfo.createdDate = new Date();

            mixPanel.track(SHOP_ADD_CUSTOMER, {
                "User ID": userId,
                "Customer ID": customerInfo.id
            })

            dispatch({ type: SAVE_CUSTOMER, payload: customerInfo });
            redirect && dispatch(push(redirect));
            return customerInfo.id;
        } else {
            dispatch({ type: MY_SHOP_ERROR, payload: error.message });
            console.error(error);
        };       
    };
};

export const updateCustomer = (id, customerInfo) => async (dispatch, getState) => {
    dispatch({ type: LOADING_SHOP }); 

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        
        const updateCustomerResponse = await axios.put(
            `${currentAPI}/api/customers/${id}`,
            JSON.stringify(customerInfo),
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (updateCustomerResponse.status === 200) {
            dispatch({ type: MY_SHOP_SUCCESS });
            dispatch({ type: UPDATE_CUSTOMER, payload: { id, customerInfo } });
            dispatch(push('/actions/shop_customers'));
            toast.success("Successfully updated customers' info");
        };
    } catch (error) {
        if (error.message === "Network Error") {
            const pendingPostRequests = 
                getState().offline.pendingRequests.filter(request => request.method === "POST");

            const findNonCreatedCustomerRequest = 
                pendingPostRequests.find(request => request.payload.id === customerInfo.id);

            if (findNonCreatedCustomerRequest) {
                dispatch({
                    type: UPDATE_PENDING_REQUEST,
                    payload: {
                        requestId: findNonCreatedCustomerRequest.id,
                        payload: customerInfo
                    }
                });
            } else {
                dispatch(
                    addPendingRequest(
                        "PUT",
                        `${currentAPI}/api/customers/${id}`,
                        customerInfo
                    )
                );
            };
            
            dispatch({ type: MY_SHOP_SUCCESS });
            dispatch({ type: UPDATE_CUSTOMER, payload: { id, customerInfo } });
            dispatch(push('/actions/shop_customers'));
            toast.success("Successfully updated customers' info");
        } else {
            dispatch({ 
                type: MY_SHOP_ERROR,
                payload: error.response.data.message
            });

            toast.error("Sorry, customer cannot be updated");
        };
    };
};

export const deleteCustomer = id => async (dispatch, getState) => {
    dispatch({ type: LOADING_SHOP });   
    const userId = getState().user.userId;
   
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        
        const deleteCustomerResponse = await axios.delete(
            `${currentAPI}/api/customers/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (deleteCustomerResponse.status === 204) {
            mixPanel.track(SHOP_DELETE_CUSTOMER, {
                "User ID": userId,
                "Customer ID": id
            })
            dispatch({ type: DELETE_CUSTOMER, payload: id });
            dispatch({ type: MY_SHOP_SUCCESS });
            dispatch(push('/actions/shop_customers'));
        };
    } catch (error) {
        if (error.message === "Network Error") {
            const pendingRequests = getState().offline.pendingRequests;
            const pendingCustomerPostRequest = pendingRequests
                .filter(request => request.method === "POST")
                .find(request => request.payload.id === id);
            
            if (pendingCustomerPostRequest) {
                dispatch({
                    type: REMOVE_PENDING_REQUEST,
                    payload: { id: pendingCustomerPostRequest.id }
                });
            } else {
                dispatch(
                    addPendingRequest(
                        "DELETE",
                        `${currentAPI}/api/customers/${id}`
                    )
                )
            };

            dispatch({ type: DELETE_CUSTOMER, payload: id });
            dispatch({ type: MY_SHOP_SUCCESS });
            dispatch(push('/actions/shop_customers'));
        } else {
            dispatch({ 
                type: MY_SHOP_ERROR,
                payload: error.response.data.message
            });
        };
    }
};

export const findOrCreateCustomer = customerInfo => async (dispatch, getState) => {
    let customerId;

    try {
        const customers = getState().applications.myShop.customers;
        const existingCustomer = 
            customers.find(customer => customer.phoneNumber === customerInfo.customerPhoneNumber);
        
        if (existingCustomer) {
            customerId = existingCustomer.id;
        } else {
            customerId = await dispatch(addCustomer({ 
                name: customerInfo.customerName, 
                phoneNumber: insertZero(customerInfo.customerPhoneNumber)
            }, null));
        };
    } catch (error) {
        if (error.message === "Network Error") {
            dispatch(
                addPendingRequest(
                    "POST", 
                    `${currentAPI}/api/customers/`, 
                    customerInfo,
                    [UPDATE_CUSTOMER_ID, UPDATE_PENDING_SALE_CUSTOMER_ID]
                )
            );
            
            customerInfo.id = uuid();
            customerId = customerInfo.id;

            dispatch({ type: SAVE_CUSTOMER, payload: customerInfo }); 
        } else {
            throw new Error("Sorry, customer wasn't found");
        };
    };

    return customerId;
};

export const updateCustomerOwingStatus = customerId => (dispatch, getState) => {
    const sales     = getState().applications.myShop.sales;
    const customers = getState().applications.myShop.customers;

    const customerOwingStatus = customers.find(customer => customer.id === customerId).owing;
    const customerActivities = sales
        .map(sale => sale.salesInfo)
        .filter(sale => sale.customer && sale.customer.id === customerId);
        
    if (customerOwingStatus && customerActivities.every(sale => sale.amountOutstanding === 0)) {
        dispatch({
            type: UPDATE_CUSTOMER_OWING_STATUS, 
            payload: { customerId, status: !customerOwingStatus }
        });
    } else if (!customerOwingStatus && customerActivities.some(sale => sale.amountOutstanding > 0)) {
        dispatch({ 
            type: UPDATE_CUSTOMER_OWING_STATUS, 
            payload: { customerId, status: !customerOwingStatus }
        });
    };
};