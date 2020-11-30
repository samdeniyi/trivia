import {
    SAVE_SHOP,
    UPDATE_SHOP,
    DELETE_SHOP,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT_QUANTITY,
    UPDATE_PRODUCT_ID,
    UPDATE_INVENTORY_PRODUCT_ID,
    UPDATE_PRODUCT_IMAGE,
    LOADING_SHOP,
    MY_SHOP_SUCCESS,
    MY_SHOP_ERROR,
    MY_SHOP_CATEGORIES,
    FETCH_PRODUCTS_MASTER_LIST,
    NO_PRODUCTS_ON_MASTER_LIST,
    TOGGLE_MERCH_VISIBLE,
    MY_SHOP_PRODUCT_CATEGORIES,
    ADD_INVENTORY,
    BULK_PRICE_UPDATE,
    UPDATE_BANK_ACCOUNT_DETAILS,
    TOGGLE_PAYMENT_OPTIONS,
} from "../../constants";
import {v4 as uuid} from 'uuid';
import {push, goBack} from "connected-react-router";
import {toast} from "react-toastify";
import {axios, currentAPI} from "../../../../../../config";
import {addPendingRequest} from "../../../../offline/actions";
import {
    REMOVE_PENDING_REQUEST,
    UPDATE_PENDING_REQUEST,
    UPDATE_PENDING_SALE_INVENTORY_PRODUCT
} from "../../../../offline/constants";
import { mixPanel } from '../../../../../../utils/mix-panel/mixPanel';
import {
    SHOP_CREATE_SHOP,
    SHOP_UPDATE_SHOP,
    SHOP_CREATE_PRODUCT,
    SHOP_UPDATE_PRODUCT,
    SHOP_UPDATE_PRODUCT_QUANTITY,
    SHOP_DELETE_PRODUCT
} from '../../../../../../utils/mix-panel/constants';
import {getSales} from "../sales";

export const getShops = () => async dispatch => {
    dispatch({type: LOADING_SHOP});

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const getShopsResponse = await axios.get(
            `${currentAPI}/api/shops`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (getShopsResponse.status === 200) {
            const retrievedShops = getShopsResponse.data;

            if (retrievedShops.length) {
                dispatch({type: SAVE_SHOP, payload: retrievedShops});
                dispatch(getSales(retrievedShops[0].branchId));
            }

            dispatch({type: MY_SHOP_SUCCESS});
        }
    } catch (error) {
        dispatch({type: MY_SHOP_ERROR, payload: error.message});
    }
};

export const getShopInfoFromMerchapp = (shopId, branchId) => async dispatch => {
    dispatch({type: LOADING_SHOP});
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const getShopInfoResponse = await axios.get(
            `${currentAPI}/api/merchantAppIntegration/branchInfo/${branchId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (getShopInfoResponse.status === 200) {
            const shopInfo = getShopInfoResponse.data.data;
            dispatch({ 
                type: UPDATE_SHOP, 
                payload: { 
                    shopId, 
                    newData: {
                        shopName: shopInfo.name,
                        businessCategories: shopInfo.businessCategories,
                        //businessCategoryNames: shopInfo.businessCategoryNames,
                        //productCategories: shopInfo.productCategories,
                        //available: shopInfo.available,
                        details: shopInfo.details,
                        imageUrl: shopInfo.imageUrl,
                        base64BranchImageString: shopInfo.base64BranchImageString,
                        slug: shopInfo.slug,
                        businessSlug: shopInfo.businessSlug,
                        location: shopInfo.location,
                        listingOptions: shopInfo.listingOptions,
                        accountDetails: shopInfo.accountDetails,
                        paymentOption: shopInfo.paymentOption,
                    }
                }
            });
            setTimeout(function(){ dispatch({type: MY_SHOP_SUCCESS}); }, 3000);    
        }
    } catch (error) {
        dispatch({type: MY_SHOP_ERROR, payload: error.message});
    }
};

export const getShopFromMerchapp = phoneNumber => async () => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        await axios.post(
            `${currentAPI}/api/shops/sync/${phoneNumber}`,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error(error);
    }
};

export const createShop = (
    shopInfo,
    setErrors,
    setNetworkError
) => async (dispatch, getState) => {
    dispatch({type: LOADING_SHOP});

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const ShopDTO = {...shopInfo};

        const createShopResponse = await axios.post(
            `${currentAPI}/api/shops`,
            JSON.stringify(ShopDTO),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (createShopResponse.status === 200) {
            ShopDTO.id = createShopResponse.data.id;
            ShopDTO.merchantId = createShopResponse.data.merchantId;

            const role = getState().user.role;
            const userId = getState().user.userId;
            mixPanel.track(SHOP_CREATE_SHOP, {
                "User ID": userId,
                "Role": role === "ROLE_USER" ? "Merchant" : "Agent",
                "Shop ID": ShopDTO.id,
                "Business categories": ShopDTO.businessCategories,
                "LGA": ShopDTO.lga,
                "state": ShopDTO.countryState
            })
            dispatch({type: SAVE_SHOP, payload: ShopDTO});
            dispatch(push('/actions/shop'));
            dispatch({type: MY_SHOP_SUCCESS});
            toast.success(`Your shop was successfully created`);
        };
    } catch (error) {
        dispatch({type: MY_SHOP_ERROR, payload: error.message});

        if (error.message === "Network Error") {
            setNetworkError(true);
        } else if (error.response.data.status === "CONFLICT") {
            setErrors({"shopName": "Shop name is already taken"});
        }
        ;
    }
};

export const deleteShop = id => async dispatch => {
    dispatch({type: LOADING_SHOP});

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const deleteShopResponse = await axios.delete(
            `${currentAPI}/api/shops/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (deleteShopResponse.status === 200) {
            dispatch({type: DELETE_SHOP, payload: id});
            dispatch({type: MY_SHOP_SUCCESS});
            dispatch(push('/actions/shop'));
        }
    } catch (error) {
        dispatch({type: MY_SHOP_ERROR, payload: error.message});
        console.error(error);
    }
};

export const updateShop = (shopData, errorType = 0) => async dispatch => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const updateShopResponse = await axios.put(
            `${currentAPI}/api/merchantAppIntegration/public/updateShopDetails`,
            JSON.stringify(shopData),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        
        if (updateShopResponse.status === 200) {
            mixPanel.track(SHOP_UPDATE_SHOP, {
                "Shop ID": shopData.id,
            })
            return updateShopResponse.data;
        };
    } catch (error) {
        dispatch({ type: MY_SHOP_ERROR, payload: error.message });
        if(errorType === 1){
            toast.error(JSON.parse(error.response.data.error).message || "An error occured!");
        } else {
            toast.error("Failed to update shop details")
        }
    }
};

export const editShop = data => async dispatch => {
    dispatch({ type: LOADING_SHOP });    
    const shopData = {
        ...data,
        id: data.branchId,
        businessId: data.businessId
    };
    const resp = await dispatch(updateShop(shopData, 1));
    if(resp){
        dispatch(getShopInfoFromMerchapp(data.id, data.branchId))
        toast.success("Successfully updated your shop details");
        dispatch(push('/actions/shop'));
    }
};

export const toggleListingOptionsVisibility = (shopId, isOnMerchBuy, isOnMerchList) => async (dispatch, getState) => {
    const shop = getState().applications.myShop.shops.find(shop => shop.id === shopId);   
    const shopData = { 
        id: shop.branchId,
        businessId: shop.businessId,
        name: shop.shopName,
        listingOptions: { 
            isOnMerchBuy: isOnMerchBuy, 
            isOnMerchList: isOnMerchList 
        } 
    };

    const resp = await dispatch(updateShop(shopData));
    if(resp){
        dispatch({ 
            type: TOGGLE_MERCH_VISIBLE, 
            payload: { 
                shopId, 
                isOnMerchBuy: resp.data.listingOptions.isOnMerchBuy,
                isOnMerchList: resp.data.listingOptions.isOnMerchList 
            }
        });
        dispatch({ type: MY_SHOP_SUCCESS });
        toast.success("Successfully updated your shop details");
    }
};

export const togglePaymentOptions = (shopId, paymentOption) => async (dispatch, getState) => {
    const shop = getState().applications.myShop.shops.find(shop => shop.id === shopId);
    const shopData = { 
        id: shop.branchId,
        businessId: shop.businessId,
        name: shop.shopName,
        paymentOption: paymentOption,
    };
    const resp = await dispatch(updateShop(shopData));
    if(resp){
        dispatch({ 
            type: TOGGLE_PAYMENT_OPTIONS, 
            payload: { 
                shopId,
                paymentOption: resp.data.paymentOption
            }
        });
        dispatch({ type: MY_SHOP_SUCCESS });
        toast.success("Successfully updated your settlement account");
    }
};

export const updateBankAccountDetails = (shopId, accountDetails) => async (dispatch, getState) => {
    const shop = getState().applications.myShop.shops.find(shop => shop.id === shopId);
    const shopData = { 
        id: shop.branchId,
        businessId: shop.businessId,
        name: shop.shopName,
        accountDetails: accountDetails,
        paymentOption: "BANK",
    };
    const resp = await dispatch(updateShop(shopData));
    if(resp){
        dispatch({ 
            type: UPDATE_BANK_ACCOUNT_DETAILS, 
            payload: { 
                shopId,
                accountDetails: resp.data.accountDetails,
                paymentOption: resp.data.paymentOption
            }
        });
        dispatch({ type: MY_SHOP_SUCCESS });
        toast.success("Successfully updated your shop details");
    }
};

export const addProduct = (
    shopId,
    productInfo,
    setErrors
) => async (dispatch, getState) => {
    dispatch({type: LOADING_SHOP});
    const productData = {...productInfo};
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const addProductResponse = await axios.post(
            `${currentAPI}/api/shops/${shopId}/product`,
            JSON.stringify(productData),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (addProductResponse.status === 200) {
            productData.id = addProductResponse.data.id;
            productData.inventoryProductId = addProductResponse.data.inventoryProductId;
            productData.base64ProductImageString = addProductResponse.data.base64ProductImageString;

            mixPanel.track(SHOP_CREATE_PRODUCT, {
                "Product Name": productData.productName,
                "Cost Price": productData.costPrice,
                "Product Image": productData.base64ProductImageString !== "",
                "Selling Price": productData.retailUnitPrice,
                "Product category": productData.productCategory,
                "Active for Merchbuy": productData.availableAtWholesalePrice,
                "Active for merchlist": productData.availableAtRetailPrice
            })

            dispatch({type: ADD_PRODUCT, payload: {shopId, productData}});
            toast.success(`${productData.productName} was successfully created`);
            dispatch(goBack());
            dispatch({type: MY_SHOP_SUCCESS});
        }
        ;
    } catch (error) {

        if (error.message === "Network Error") {
            const inventory = getState().applications.myShop.shops.find(shop => shop.id === shopId).inventory;
            const isInInventory = inventory.find(product => product.productName === productData.productName);

            if (isInInventory) {
                setErrors({ "productName": 'You already have a product with this name' });
            } else {
                dispatch(
                    addPendingRequest(
                        "POST",
                        `${currentAPI}/api/shops/${shopId}/product`,
                        productData,
                        [
                            UPDATE_PRODUCT_ID, 
                            UPDATE_INVENTORY_PRODUCT_ID, 
                            UPDATE_PENDING_SALE_INVENTORY_PRODUCT,
                            UPDATE_PRODUCT_IMAGE
                        ]
                    )
                );

                productData.id = uuid();
                productData.inventoryProductId = uuid();

                dispatch({type: ADD_PRODUCT, payload: {shopId, productData}});
                dispatch({type: MY_SHOP_SUCCESS});
                toast.success(`${productData.productName} was successfully created`);
                dispatch(goBack());
            };
        } else if (error.response && error.response.status === 400) {
            dispatch({type: MY_SHOP_ERROR, payload: error.message});
            setErrors({"productName": 'You already have a product with this name'});
        } else {
            dispatch({type: MY_SHOP_ERROR, payload: error.message});
        };
    };
};

export const addProductOnTheFly = (shopId, productInfo) => async (dispatch, getState) => {
    dispatch({type: LOADING_SHOP});

    const productData = {
        availableAtRetailPrice: false,
        availableAtWholesalePrice: false,
        cost: productInfo.productUnit,
        costPrice: productInfo.productUnit,
        base64ProductImageString: productInfo.base64ProductImageString,
        moq: null,
        productCategory: "",
        productDescription: "",
        productName: productInfo.productName,
        productUnit: "",
        quantity: productInfo.quantity,
        retailUnitPrice: productInfo.productUnit,
        wholesaleUnitPrice: 0,
        bulkPrices: null
    };

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const addProductOnTheFlyResponse = await axios.post(
            `${currentAPI}/api/shops/${shopId}/product`,
            JSON.stringify(productData),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (addProductOnTheFlyResponse.status === 200) {
            mixPanel.track(SHOP_CREATE_PRODUCT, {
                "Product Name": productData.productName,
                "Cost Price": productData.costPrice,
                "Product Image": productData.base64ProductImageString !== "",
                "Selling Price": productData.retailUnitPrice,
                "Product category": productData.productCategory,
                "Active for Merchbuy": productData.availableAtWholesalePrice,
                "Active for merchlist": productData.availableAtRetailPrice
            })
            productData.id = addProductOnTheFlyResponse.data.id;
            productData.inventoryProductId = addProductOnTheFlyResponse.data.inventoryProductId;
            productData.base64ProductImageString = addProductOnTheFlyResponse.data.base64ProductImageString;

            dispatch({type: ADD_PRODUCT, payload: {shopId, productData}});
            dispatch({type: MY_SHOP_SUCCESS});

            return {
                status: true,
                product: productData
            };
        }
        ;
    } catch (error) {
        if (error.message === "Network Error") {
            dispatch(
                addPendingRequest(
                    "POST",
                    `${currentAPI}/api/shops/${shopId}/product`,
                    productData,
                    [
                        UPDATE_PRODUCT_ID, 
                        UPDATE_INVENTORY_PRODUCT_ID, 
                        UPDATE_PENDING_SALE_INVENTORY_PRODUCT,
                        UPDATE_PRODUCT_IMAGE
                    ]
                )
            );

            productData.id = uuid();
            productData.inventoryProductId = uuid();

            dispatch({type: ADD_PRODUCT, payload: {shopId, productData}});
            dispatch({type: MY_SHOP_SUCCESS});

            return {
                status: true,
                product: productData
            };
        } else if (error.response && error.response.status === 400) {
            dispatch({type: MY_SHOP_ERROR, payload: error.message});

            return {
                status: false,
                product: null,
            };
        } else {
            dispatch({type: MY_SHOP_ERROR, payload: error.message});
        }
        ;
    }
};

export const getInventory = shopId => async dispatch => {
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const getInventoryResponse = await axios.get(
            `${currentAPI}/api/shops/${shopId}/product`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (getInventoryResponse.status === 200) {
            dispatch({
                type: ADD_INVENTORY,
                payload: {
                    shopId,
                    inventory: getInventoryResponse.data
                }
            });
        };
    } catch (error) {
        console.error(error);
    }
};

export const bulkProductPriceUpdate = (
    shopId,
    allInventoriesUpdated
) => async (dispatch, getState) => {
    dispatch({type: LOADING_SHOP});
    try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const updateProductResponse = await axios.put(
            `${currentAPI}/api/inventoryServiceIntegration/product/bulk/pricequantity`,
            JSON.stringify(allInventoriesUpdated),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (updateProductResponse.status === 200) {
            await dispatch(getInventory(shopId))
            dispatch(goBack());
            toast.success("Product updated successfully");
            return true;
        }
    } catch (error) {
        if (error.message === "Network Error") {
            const findPendingBulkPriceUpdateRequest =
                getState().offline.pendingRequests
                    .filter(request => request.method === "PUT")
                    .find(request => request.url === `${currentAPI}/api/inventoryServiceIntegration/product/bulk/pricequantity`);
            
            if (findPendingBulkPriceUpdateRequest) {
                const oldRequest = [...findPendingBulkPriceUpdateRequest.payload] || [];
                allInventoriesUpdated.forEach(element => {
                    const idx = oldRequest.findIndex(
                        x => x.productId === element.productId
                    );
                    if(idx === -1){
                        oldRequest.push(element)
                    } else {
                        oldRequest.splice(idx, 1, element);
                    }
                });
                dispatch({
                    type: UPDATE_PENDING_REQUEST,
                    payload: {
                        requestId: findPendingBulkPriceUpdateRequest.id,
                        payload: oldRequest
                    }
                });
                dispatch({
                    type: BULK_PRICE_UPDATE,
                    payload: {
                        shopId,
                        payload: oldRequest
                    }
                });
            } else {
                dispatch(
                    addPendingRequest(
                        "PUT",
                        `${currentAPI}/api/inventoryServiceIntegration/product/bulk/pricequantity`,
                        allInventoriesUpdated
                    )
                );
                dispatch({
                    type: BULK_PRICE_UPDATE,
                    payload: {
                        shopId,
                        payload: allInventoriesUpdated
                    }
                });
            }
            dispatch(goBack());
            toast.success("Product updated successfully");
            return true;
        } else {
            dispatch({
                type: MY_SHOP_ERROR,
                payload: error.response.data.message
            });

            return false
        };
    };
};

export const updateProduct = (
    shopId,
    productId,
    productDTO
) => async (dispatch, getState) => {
    dispatch({type: LOADING_SHOP});

    const role = getState().user.role;
    const userId = getState().user.userId;

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const updateProductResponse = await axios.put(
            `${currentAPI}/api/shops/${shopId}/product/${productId}`,
            JSON.stringify(productDTO),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (updateProductResponse.status === 200) {
            if (productDTO.quantity) {
                dispatch({
                    type: UPDATE_PRODUCT_QUANTITY,
                    payload: { shopId, productId, quantity: productDTO.quantity }
                });
            }

            productDTO.base64ProductImageString = updateProductResponse.data.base64ProductImageString;

            dispatch({ type: UPDATE_PRODUCT, payload: { shopId, productId, productDTO } });

            mixPanel.track(SHOP_UPDATE_PRODUCT, {
                "User ID": userId,
                "Role": role,
                "Shop ID": shopId,
                "Online": true,
                "Product ID": productId
            })

            dispatch(goBack());
            toast.success("Product updated successfully");
            return true;
        }
    } catch (error) {
        if (error.message === "Network Error") {
            const findNonCreatedProductRequest =
                getState().offline.pendingRequests
                    .filter(request => request.method === "POST")
                    .find(request => request.payload.id === productId);

            const findPendingUpdateRequest =
                getState().offline.pendingRequests
                    .filter(request => request.method === "PUT")
                    .find(request => request.payload.id === productId);

            if (findNonCreatedProductRequest) {
                dispatch({
                    type: UPDATE_PENDING_REQUEST,
                    payload: {
                        requestId: findNonCreatedProductRequest.id,
                        payload: productDTO
                    }
                });
            } else if (findPendingUpdateRequest) {
                dispatch({
                    type: UPDATE_PENDING_REQUEST,
                    payload: {
                        requestId: findPendingUpdateRequest.id,
                        payload: productDTO
                    }
                });
            } else {
                dispatch(
                    addPendingRequest(
                        "PUT",
                        `${currentAPI}/api/shops/${shopId}/product/${productId}`,
                        productDTO
                    )
                );
            };
            dispatch({ type: UPDATE_PRODUCT, payload: { shopId, productId, productDTO } });
            dispatch(goBack());
            toast.success("Product updated successfully");
            return true;
        } else {
            dispatch({
                type: MY_SHOP_ERROR,
                payload: error.response.data.message
            });

            return false
        };
    };
};

export const deleteProduct = (
    shopId,
    productId
) => async (dispatch, getState) => {
    dispatch({type: LOADING_SHOP});

    const role = getState().user.role;
    const userId = getState().user.userId;

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const deleteProductResponse = await axios.delete(
            `${currentAPI}/api/shops/${shopId}/product/${productId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (deleteProductResponse.status === 200 || deleteProductResponse.status === 202) {
            dispatch({ type: DELETE_PRODUCT, payload: { shopId, productId } });
            mixPanel.track(SHOP_DELETE_PRODUCT, {
                "User ID": userId,
                "Role": role,
                "Shop ID": shopId,
                "Online": true,
                "Product ID": productId
            })
            dispatch(goBack());
            toast.success("Product was deleted successfully");
        }
        ;
    } catch (error) {

        if (error.message === "Network Error") {
            const pendingRequests = getState().offline.pendingRequests;
            const pendingProductRequest = pendingRequests
                .find(request =>
                    request.payload.id === productId ||
                    productId === new URL(request.url).href.split('/')[5]
                );

            if (pendingProductRequest) {
                dispatch({
                    type: REMOVE_PENDING_REQUEST,
                    payload: {id: pendingProductRequest.id}
                });
            } else {
                dispatch(
                    addPendingRequest(
                        "DELETE",
                        `${currentAPI}/api/shops/${shopId}/product/${productId}`
                    )
                )
            };
            dispatch({ type: DELETE_PRODUCT, payload: { shopId, productId } });

            mixPanel.track(SHOP_DELETE_PRODUCT, {
                "User ID": userId,
                "Role": role,
                "Shop ID": shopId,
                "Online": false,
                "Product ID": productId
            });

            dispatch(goBack());
            toast.success("Product was deleted successfully");
        } else {
            dispatch({
                type: MY_SHOP_ERROR,
                payload: error.response.data.message
            });
        }
        ;
    }
};

export const updateProductQuantity = (
    shopId,
    productId,
    quantity,
    qtyChng,
    updateType,
    productName
) => async (dispatch, getState) => {
    dispatch({type: LOADING_SHOP});

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const updateQuantityResponse = await axios.put(
            `${currentAPI}/api/shops/${shopId}/product/${productId}/quantity`,
            JSON.stringify({quantity}),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (updateQuantityResponse.status === 200) {
            mixPanel.track(SHOP_UPDATE_PRODUCT_QUANTITY, {
                "Product Name": productName,
                "Product ID": productId,
                "Quantity Change": qtyChng,
                "Update Type": updateType
            })
            dispatch({type: UPDATE_PRODUCT_QUANTITY, payload: {shopId, productId, quantity}});
        }
    } catch (error) {
        if (error.message === "Network Error") {
            const findNonCreatedProductRequest =
                getState().offline.pendingRequests
                    .filter(request => request.method === "POST")
                    .find(request => request.payload.id === productId);

            const findPendingUpdateRequest =
                getState().offline.pendingRequests
                    .filter(request => request.method === "PUT")
                    .find(request => request.payload.id === productId);

            const findPendingQuantityRequest =
                getState().offline.pendingRequests
                    .filter(request => request.method === "PUT")
                    .find(request => productId === new URL(request.url).pathname.split('/')[5]);

            if (findNonCreatedProductRequest) {
                const pendingProduct = getState().applications.myShop.shops
                    .find(shop => shop.id === shopId).inventory
                    .find(product => product.id === productId);

                dispatch({
                    type: UPDATE_PENDING_REQUEST,
                    payload: {
                        requestId: findNonCreatedProductRequest.id,
                        payload: {...pendingProduct, quantity}
                    }
                });
            } else if (findPendingUpdateRequest) {
                const pendingProduct = getState().applications.myShop.shops
                    .find(shop => shop.id === shopId).inventory
                    .find(product => product.id === productId);

                dispatch({
                    type: UPDATE_PENDING_REQUEST,
                    payload: {
                        requestId: findPendingUpdateRequest.id,
                        payload: {...pendingProduct, quantity}
                    }
                });
            } else if (findPendingQuantityRequest) {
                dispatch({
                    type: UPDATE_PENDING_REQUEST,
                    payload: {
                        requestId: findPendingQuantityRequest.id,
                        payload: {quantity}
                    }
                });
            } else {
                dispatch(
                    addPendingRequest(
                        "PUT",
                        `${currentAPI}/api/shops/${shopId}/product/${productId}/quantity`,
                        {quantity}
                    )
                );
            }
            ;

            dispatch({type: UPDATE_PRODUCT_QUANTITY, payload: {shopId, productId, quantity}});
        } else {
            dispatch({
                type: MY_SHOP_ERROR,
                payload: error.response.data.message
            });
        }
    }
};

export const updateProductData = (
    shopId,
    previousId,
    currentId,
    previousInventoryProductId,
    currentInventoryProductId,
    currentImage
) => dispatch => {
    dispatch({
        type: UPDATE_PRODUCT_ID,
        payload: {
            shopId,
            previousId,
            currentId
        }
    });

    dispatch({
        type: UPDATE_INVENTORY_PRODUCT_ID,
        payload: {
            shopId,
            previousInventoryProductId,
            currentInventoryProductId
        }
    });

    dispatch({
        type: UPDATE_PENDING_SALE_INVENTORY_PRODUCT,
        payload: {
            previousInventoryProductId,
            currentProductId: currentId,
            currentInventoryProductId
        }
    });

    dispatch({
        type: UPDATE_PRODUCT_IMAGE,
        payload: {
            shopId,
            currentId,
            currentImage
        }
    });
};

export const createAgentShop = (
    shopInfo,
    setErrors,
    setNetworkError
) => async (dispatch, getState) => {
    dispatch({type: LOADING_SHOP});

    try {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const ShopDTO = {...shopInfo};

        const createShopResponse = await axios.post(
            `${currentAPI}/api/shops/create/agent/shop`,
            JSON.stringify(ShopDTO),
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (createShopResponse.status === 200) {
            ShopDTO.id = createShopResponse.data.id;
            ShopDTO.merchantId = createShopResponse.data.merchantId;

            const role = getState().user.role;
            const userId = getState().user.userId;
            mixPanel.track(SHOP_CREATE_SHOP, {
                "User ID": userId,
                "Role": role === "ROLE_USER" ? "Merchant" : "Agent",
                "Shop ID": ShopDTO.id,
                "Business categories": ShopDTO.businessCategories,
                "LGA": ShopDTO.localGovt,
                "State": ShopDTO.state
            })
            dispatch(getShops());
            dispatch({type: SAVE_SHOP, payload: ShopDTO});
            dispatch(push('/actions/shop'));
            dispatch({type: MY_SHOP_SUCCESS});
            toast.success(`${shopInfo.name} was successfully created`);
        }
        ;
    } catch (error) {
        dispatch({ type: MY_SHOP_ERROR, payload: error.message });
        if (error.message === "Network Error") {
            setNetworkError(true);
        } else if (error.response.data.status === "CONFLICT") {
            setErrors({"shopName": "Shop name is already taken"});
        }
        ;
    }
};

export const getCategories = () => async (dispatch) => {
    try {
        const getCategoriesResponse = await axios.get(
            `${currentAPI}/api/merchantAppIntegration/public/categories/business/all`,
            {}
        );

        if (getCategoriesResponse.status === 200) {
            dispatch({type: MY_SHOP_CATEGORIES, payload: getCategoriesResponse.data});
        }
        ;
    } catch (error) {
        console.error(error);
    }
};

export const searchProductsOnMasterList = (branchId, name) => async dispatch => {
    try {
        const token = JSON.parse(localStorage.getItem("token")).token;

        const MasterList = await axios.get(
            `${currentAPI}/api/inventoryServiceIntegration/masterlist/search-product/${name}?branchId=${branchId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (MasterList.status === 200) {
            dispatch({
                type: FETCH_PRODUCTS_MASTER_LIST,
                payload: MasterList.data.data.slice(0, 10)
            });
        }
    } catch (error) {
        dispatch({type: NO_PRODUCTS_ON_MASTER_LIST, payload: error.message});
    }
};

export const getProductCategories = () => async (dispatch) => {
    try {
        const getCategoriesResponse = await axios.get(
            `${currentAPI}/api/merchantAppIntegration/public/categories/product/all`,
            {}
        );

        if (getCategoriesResponse.status === 200) {
            dispatch({type: MY_SHOP_PRODUCT_CATEGORIES, payload: getCategoriesResponse.data});
        }
        ;
    } catch (error) {
        console.error(error);
    }
};