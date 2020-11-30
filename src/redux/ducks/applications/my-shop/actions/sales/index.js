import { 
    LOADING_SHOP, 
    MY_SHOP_ERROR, 
    MY_SHOP_SUCCESS, 
    SAVE_SALE,
    DELETE_SALE,
    UPDATE_SALE,
    UPDATE_SALE_ID,
    UPDATE_PRODUCT_QUANTITY
} from "../../constants";
import { UPDATE_PENDING_REQUEST, REMOVE_PENDING_REQUEST } from "../../../../offline/constants";
import { findOrCreateCustomer, updateCustomerOwingStatus } from "../customers";

import moment from "moment";
import { v4 as uuid } from 'uuid';
import { toast } from "react-toastify";
import { goBack } from "connected-react-router";
import { axios, currentAPI } from "../../../../../../config";
import { insertZero } from "../../../../../../utils/inputs/formatPhoneNumber";
import { addPendingRequest } from "../../../../offline/actions";
import { mixPanel } from '../../../../../../utils/mix-panel/mixPanel';
import { SHOP_SALE_CREATE, SHOP_UPDATE_SALE, SHOP_DELETE_SALE } from '../../../../../../utils/mix-panel/constants';

export const createSale = (
    merchantId, 
    branchId, 
    salesInfo,
    startTime = new Date(),
    type = "NORMAL"
) => async (dispatch, getState) => {
    dispatch({ type: LOADING_SHOP });

    const currentShop = getState().applications.myShop.shops.find(shop => shop.branchId === branchId);
    const currentSales = getState().applications.myShop.sales;
    const salesPersonName = `${getState().user.firstName} ${getState().user.lastName}`;
    const hasCustomerDetails = salesInfo.customerName && salesInfo.customerPhoneNumber;
    const role = getState().user.role;
    const userId = getState().user.userId;
    
    const customerId =
        hasCustomerDetails ?
        await dispatch(findOrCreateCustomer({ 
            customerName: salesInfo.customerName,
            customerPhoneNumber: insertZero(salesInfo.customerPhoneNumber)
        })) : null;

    const SaleDTO = {
        amountCollected: parseInt(parseFloat(salesInfo.paymentAmount).toFixed(1)),
        amountOutstanding: salesInfo.amountDue ? parseInt(parseFloat(salesInfo.amountDue).toFixed(1)) : 0,
        branchId,
        customerId,
        discount: parseInt(salesInfo.discount),
        localSalesDate: moment().utc().toString(),
        localSalesId: 2,
        merchantId: parseInt(merchantId),
        paymentCompleteStatus: (parseInt(parseFloat(salesInfo.paymentAmount)) - parseInt(parseFloat(salesInfo.saleAmount)) === 0),
        profit: salesInfo.profit,
        salesItemDetails: salesInfo.salesItemDetails,
        salesMode: 1,
        salesPersonId: parseInt(merchantId),
        salesPersonName,
        salesRecordTxnReference:(salesInfo.salesRecordTxnReference)? Number(salesInfo.salesRecordTxnReference) : uuid(),
        totalAmount: parseInt(parseFloat(salesInfo.saleAmount).toFixed(1)),
        type
    };

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const createSaleResponse = await axios.post(
            `${currentAPI}/api/merchantAppIntegration/salesRecords/`,
            JSON.stringify(SaleDTO),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (createSaleResponse.status === 200) {
            const { salesRecordViewDto, productQuantityCountList } = createSaleResponse.data.data;
            salesInfo.id = salesRecordViewDto.id;
            
            if (productQuantityCountList && productQuantityCountList.length > 0) {             
                productQuantityCountList.forEach(item => {
                    const product = currentShop.inventory.find(product => 
                        product.inventoryProductId === item.productId
                    );

                    dispatch({ 
                        type: UPDATE_PRODUCT_QUANTITY, 
                        payload: { 
                            shopId:    currentShop.id, 
                            productId: product.id, 
                            quantity:  item.retailQuantity
                        } 
                    });
                });
            };
            
            dispatch({ 
                type: SAVE_SALE, 
                payload: { 
                    branchId, 
                    salesInfo: salesRecordViewDto
                } 
            });
            
            if (hasCustomerDetails) {
                dispatch(updateCustomerOwingStatus(customerId));
            };
            
            mixPanel.track(SHOP_SALE_CREATE, {
                "User ID": userId,
                "Role": role,
                "Time Spent": Math.round((new Date() - startTime) / 1000),
                "Sales ID": salesInfo.id,
                "Sales Type": salesInfo.salesItemDetails ? "Advance Sale" : "Simple Sale",
                "Shop ID": currentShop.id,
                "Total Value": salesInfo.saleAmount,
                "Time": (new Date()).toLocaleDateString(),
                "Complete Sales": salesInfo.fullPay
            })

            toast.success("Sale successfully created");
            dispatch(goBack());
            dispatch({ type: MY_SHOP_SUCCESS });
        };
    } catch (error) {
        if (error.message === "Network Error") {
            dispatch(
                addPendingRequest(
                    "POST", 
                    `${currentAPI}/api/merchantAppIntegration/salesRecords/`, 
                    SaleDTO,
                    [UPDATE_SALE_ID]
                )
            );

            dispatch({ 
                type: SAVE_SALE, 
                payload: { 
                    branchId, 
                    salesInfo: !hasCustomerDetails ? 
                    {
                        ...SaleDTO,
                        id: currentSales.length > 0 ? currentSales[0].salesInfo.id + 1 : 0,
                    }: 
                    { 
                        ...SaleDTO,
                        id: currentSales.length > 0 ? currentSales[0].salesInfo.id + 1 : 0,
                        customer: {
                            id: customerId,
                            name: salesInfo.customerName,
                            phoneNumber: insertZero(salesInfo.customerPhoneNumber),
                            createdDate: moment().utc().toString()
                        }
                    }
                } 
            });

            if (SaleDTO.salesItemDetails && SaleDTO.salesItemDetails.length > 0) {
                SaleDTO.salesItemDetails.forEach(item => {
                    const product = currentShop.inventory
                        .find(product => product.inventoryProductId === item.inventoryProductId);
                    
                    dispatch({ 
                        type: UPDATE_PRODUCT_QUANTITY, 
                        payload: { 
                            shopId: currentShop.id, 
                            productId: product.id, 
                            quantity: (product.quantity === 0) ? 0 : product.quantity - item.quantity 
                        } 
                    });
                });
            };

            if (hasCustomerDetails) {
                dispatch(updateCustomerOwingStatus(customerId));
            };
            dispatch({ type: MY_SHOP_SUCCESS });
            toast.success("Sale successfully created");
            dispatch(goBack());
        } else {
           dispatch({ 
                type: MY_SHOP_ERROR,
                payload: error.message
            });
        };
    };
};

export const updateSale = (
    salesInfo,
    amountToPay
) => async (dispatch, getState) => {
    dispatch({ type: LOADING_SHOP });

    const {
        id,
        salesPersonName, 
        salesRecordTxnReference,
        branchId,
        customer,
        discount,
        localSalesDate,
        localSalesId,
        salesPersonId,
        salesMode,
        merchantId,
        salesItemDetails
    } = salesInfo;

    const amountCollected   = salesInfo.amountCollected + amountToPay;
    const amountOutstanding = salesInfo.totalAmount - amountCollected;
    const paymentCompleteStatus = amountOutstanding > 0 ? false : true;
    const role      = getState().user.role;
    const userId    = getState().user.userId;
    
    const SaleDTO = {
        amountCollected: parseInt(parseFloat(amountCollected).toFixed(1)),
        amountOutstanding: parseInt(parseFloat(amountOutstanding).toFixed(1)),
        branchId,
        discount,
        customerId: customer.id,
        localSalesDate,
        localSalesId,
        merchantId,
        paymentCompleteStatus,
        salesItemDetails,
        salesMode,
        id,
        salesPersonId,
        salesPersonName,
        salesRecordTxnReference,
        totalAmount: parseInt(parseFloat(salesInfo.totalAmount).toFixed(1))
    };

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const updateSaleResponse = await axios.put(
            `${currentAPI}/api/merchantAppIntegration/salesRecords/`,
            JSON.stringify(SaleDTO),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (updateSaleResponse.status === 200) {            
            dispatch({ 
                type: UPDATE_SALE, 
                payload: { 
                    id, 
                    amountCollected, 
                    amountOutstanding, 
                    paymentCompleteStatus  
                } 
            });
            
            customer.id && dispatch(updateCustomerOwingStatus(customer.id));

            mixPanel.track(SHOP_UPDATE_SALE, {
                "User ID": userId,
                "Role": role,
                //"Shop ID": currentShop.id,
                "Online": true,
                "Sales ID": salesInfo.id,
                "Sales Type": salesInfo.salesItemDetails ? "Advance Sale" : "Simple Sale",
                "Total Sales Amount": salesInfo.saleAmount,
                "Full Payment": paymentCompleteStatus
            })

            dispatch({ type: MY_SHOP_SUCCESS });
            dispatch(goBack());
            toast.success("Sale successfully updated");
        };
    } catch (error) {
        if (error.message === "Network Error") {
            const pendingPostRequests = 
                getState().offline.pendingRequests.filter(request => request.method === "POST");

            const findNonCreatedSaleRequest = 
                pendingPostRequests.find(request => request.payload.id === SaleDTO.id);

            if (findNonCreatedSaleRequest) {
                dispatch({
                    type: UPDATE_PENDING_REQUEST,
                    payload: {
                        requestId: findNonCreatedSaleRequest.id,
                        payload: SaleDTO
                    }
                });
            } else {
                dispatch(
                    addPendingRequest(
                        "PUT",
                        `${currentAPI}/api/merchantAppIntegration/salesRecords/`,
                        SaleDTO
                    )
                );
            };

            dispatch({ 
                type: UPDATE_SALE, 
                payload: { 
                    id, 
                    amountCollected, 
                    amountOutstanding, 
                    paymentCompleteStatus  
                } 
            });

            if (customer && customer.id) {
                dispatch(updateCustomerOwingStatus(customer.id));
            };

            mixPanel.track(SHOP_UPDATE_SALE, {
                "User ID": userId,
                "Role": role,
                //"Shop ID": currentShop.id,
                "Online": false,
                "Sales ID": salesInfo.id,
                "Sales Type": salesInfo.salesItemDetails ? "Advance Sale" : "Simple Sale",
                "Total Sales Amount": salesInfo.saleAmount,
                "Full Payment": paymentCompleteStatus
            })

            dispatch({ type: MY_SHOP_SUCCESS });
            dispatch(goBack());
            toast.success("Sale successfully updated");
        } else {
            dispatch({ 
                type: MY_SHOP_ERROR,
                payload: error.response.data.message
            });
        };
    };
};

export const getSales = branchId => async (dispatch, getState) => {
    dispatch({ type: LOADING_SHOP });

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const getSalesResponse = await axios.get(
            `${currentAPI}/api/merchantAppIntegration/salesRecords/branch/${branchId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (getSalesResponse.status === 200) {
            const retrievedSales = getSalesResponse.data.data;
            const savedSales = getState().applications.myShop.sales.filter(sale => sale.branchId === branchId);
            
            if (savedSales.length < retrievedSales.length) {
                retrievedSales.forEach(salesInfo => {
                    dispatch({ 
                        type: SAVE_SALE, 
                        payload: { branchId, salesInfo: salesInfo.salesRecordViewDto }
                    });
                });
            };
            
            dispatch({ type: MY_SHOP_SUCCESS });
        };
    } catch (error) {
        dispatch({ 
            type: MY_SHOP_ERROR,
            payload: error.message
        });
        
        console.error(error);
    }
};

export const deleteSale = id => async (dispatch, getState) => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const userId    = getState().user.userId;
    
        const deleteSaleResponse = await axios.delete(
            `${currentAPI}/api/merchantAppIntegration/salesRecords/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (deleteSaleResponse.status === 200) {
            mixPanel.track(SHOP_DELETE_SALE, {
                "User ID": userId,
                "Sales ID": id
            })
            dispatch({ type: DELETE_SALE, payload: id });
            dispatch(goBack());
        };
    } catch (error) {
        if (error.message === "Network Error") {
            const pendingSalePostRequest = getState().offline.pendingRequests
                .filter(request => request.method === "POST")
                .find(request => request.payload.id === id);
            
            if (pendingSalePostRequest) {
                dispatch({
                    type: REMOVE_PENDING_REQUEST,
                    payload: { id: pendingSalePostRequest.id }
                });
            } else {
                dispatch(
                    addPendingRequest(
                        "DELETE",
                        `${currentAPI}/api/merchantAppIntegration/salesRecords/${id}`
                    )
                )
            };

            dispatch({ type: DELETE_SALE, payload: id });
            dispatch(goBack());
        } else {
            dispatch({ 
                type: MY_SHOP_ERROR,
                payload: error.response.data.message
            });
        };
    };
};

export const uploadContentToBucket = formData => async () => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const uploadContentResponse = await axios.post(
            `${currentAPI}/api/storage/uploadContent`,
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        if (uploadContentResponse.status === 200) {
            return uploadContentResponse.data;
        };
    } catch (error) {
        console.error(error)
    }
};