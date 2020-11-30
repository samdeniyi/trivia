import { 
    LOADING_SHOP, 
    LOADING_SHOP_ORDER,
    MY_SHOP_SUCCESS, 
    MY_SHOP_ERROR, 
    SAVE_SHOP,
    SAVE_SALE,
    DELETE_SHOP,
    UPDATE_SHOP,
    ADD_INVENTORY,
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_ID,
    UPDATE_INVENTORY_PRODUCT_ID,
    UPDATE_PRODUCT_IMAGE,
    DELETE_PRODUCT,
    UPDATE_PRODUCT_QUANTITY,
    TOGGLE_MERCH_VISIBLE,
    DELETE_SALE,
    UPDATE_SALE,
    UPDATE_SALE_ID,
    SAVE_CUSTOMER,
    GET_CUSTOMERS,
    DELETE_CUSTOMER,
    UPDATE_CUSTOMER,
    UPDATE_CUSTOMER_ID,
    UPDATE_CUSTOMER_OWING_STATUS,
    MY_SHOP_CATEGORIES,
    MY_SHOP_ORDERS_SUCCESS,
    MY_SHOP_ORDERS_FAILURE,
    MY_SHOP_ORDER_BY_ID_SUCCESS,
    MY_SHOP_ORDER_BY_ID_FAILURE,
    MY_SHOP_ORDER_UPDATE_PRODUCTS,
    FETCH_PRODUCTS_MASTER_LIST,
    NO_PRODUCTS_ON_MASTER_LIST,
    MY_SHOP_PRODUCT_CATEGORIES,
    PROCESS_SHOP_ORDERS_SUCCESS,
    PROCESS_SHOP_ORDERS_FAILURE,
    BULK_PRICE_UPDATE,
    UPDATE_BANK_ACCOUNT_DETAILS,
    TOGGLE_PAYMENT_OPTIONS
} from "./constants";
import { USER_LOGOUT } from '../../user/constants';

import { sortOrderItems } from "../../../../utils/orders/sortOrderItems"

const initialState = {
    isLoading: false,
    loadingShopOrder: false,
    errorMsg: "",
    shops: [],
    sales: [],
    orders: [],
    customers: [],
    businessCategories: [],
    productsMasterList: [],
    productCategories: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_SHOP: {
            return {
                ...state,
                isLoading: true
            };
        }

        case LOADING_SHOP_ORDER: {
            return {
                ...state,
                loadingShopOrder: true
            };
        }
        
        case MY_SHOP_SUCCESS: {
            return {
                ...state,
                isLoading: false
            };
        }

        case MY_SHOP_ERROR: {
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload
            };
        }

        case SAVE_SHOP: {
            return {
                ...state,
                shops: action.payload
            };
        }

        case BULK_PRICE_UPDATE: {
            const shopId = action.payload.shopId;
            const products = action.payload.payload;
            return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        shop.inventory.map(product => {
                            const foundProduct = products.find(
                                x => x.productId === product.inventoryProductId
                            );
                            if (foundProduct) {
                                product.retailUnitPrice = foundProduct.retailPrice;
                            }
                            return product;
                        });
                    };
                    return shop;
                })
            };
        }

        case ADD_INVENTORY: {
            const shopId    = action.payload.shopId;
            const inventory = action.payload.inventory;

            return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        shop.inventory = inventory;
                    };

                    return shop;
                })
            }
        }

        case UPDATE_SHOP: {
            const shopId = action.payload.shopId;
            const {
                businessCategories,
                //businessCategoryNames,
                //productCategories,
                //available,
                imageUrl,
                details,
                base64BranchImageString,
                slug,
                businessSlug,
                location,
                listingOptions,
                accountDetails,
                paymentOption
            } = action.payload.newData;
        
            return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        //shop.streetAddress = location && location.address;
                        //shop.countryState = location && location.state;
                        //shop.lga = location && location.localGovt;
                        shop.base64BranchImageString = base64BranchImageString;
                        shop.businessCategories = businessCategories;
                        shop.businessSlug = businessSlug;
                        shop.location = location;
                        shop.slug = slug;
                        shop.details = details;
                        shop.imageUrl = imageUrl;
                        shop.listingOptions = listingOptions;
                        shop.accountDetails = accountDetails;
                        shop.paymentOption = paymentOption;
                    };                    
                    return shop;
                })
            };
        }

        case DELETE_SHOP: {
            return {
                ...state,
                shops: state.shops.filter(shop => shop.id !== action.payload)
            };
        }

        case TOGGLE_MERCH_VISIBLE: {
            const shopId = action.payload.shopId;
            const isOnMerchBuy = action.payload.isOnMerchBuy;
            const isOnMerchList = action.payload.isOnMerchList;

            return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        shop.listingOptions = {
                            isOnMerchBuy: isOnMerchBuy,
                            isOnMerchList: isOnMerchList
                        };
                    };

                    return shop;
                })
            };
        }

        case UPDATE_BANK_ACCOUNT_DETAILS: {
            const shopId = action.payload.shopId;
            const accountDetails = action.payload.accountDetails;
            const paymentOption = action.payload.paymentOption;

           return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        shop.accountDetails = accountDetails;
                        shop.paymentOption = paymentOption;
                    };

                    return shop;
                })
            };
        }

        case TOGGLE_PAYMENT_OPTIONS: {
            const shopId = action.payload.shopId;
            const paymentOption = action.payload.paymentOption;

           return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        shop.paymentOption = paymentOption;
                    };

                    return shop;
                })
            };
        }

        case SAVE_SALE: {
            const branchId  = action.payload.branchId;
            const salesInfo = action.payload.salesInfo;
            
            return {
                ...state,
                sales: state.sales.concat({ branchId, salesInfo })
            };
        }

        case UPDATE_SALE: {
            const sales                 = state.sales.slice();
            const saleId                = action.payload.id;
            const amountCollected       = action.payload.amountCollected;
            const amountOutstanding     = action.payload.amountOutstanding;
            const paymentCompleteStatus = action.payload.paymentCompleteStatus;

            return {
                ...state,
                sales: sales.map(sale => {
                    if (sale.salesInfo.id === saleId) {
                        sale.salesInfo.amountCollected = amountCollected;
                        sale.salesInfo.amountOutstanding = amountOutstanding;
                        sale.salesInfo.paymentCompleteStatus = paymentCompleteStatus;
                    };

                    return sale;
                })
            };
        }

        case UPDATE_SALE_ID: {
            const request  = action.payload.request;
            const response = action.payload.response;

            return {
                ...state,
                sales: state.sales.map(sale => {
                    if (sale.id === request.payload.id) {
                        sale.id = response.data.data.salesRecordViewDto.id;
                    };

                    return sale;
                })
            };
        }

        case DELETE_SALE: {
            return {
                ...state,
                sales: state.sales.filter(sale => sale.salesInfo.id !== action.payload)
            };
        }

        case ADD_PRODUCT: {
            const shopId      = action.payload.shopId;
            const productData = action.payload.productData;

            return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        shop.inventory.push(productData);    
                    };

                    return shop;
                })
            };
        }

        case UPDATE_PRODUCT: {
            const shopId    = action.payload.shopId;
            const productId = action.payload.productId;
            const {
                productName,
                productDescription,
                productCategory,
                productUnit,
                costPrice,
                availableAtRetailPrice,
                retailUnitPrice,
                availableAtWholesalePrice,
                wholesaleUnitPrice,
                moq,
                bulkPrices,
                base64ProductImageString
            } = action.payload.productDTO;

            return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        shop.inventory.map(product => {
                            if (product.id === productId) {
                                product.productName = productName;
                                product.productDescription = productDescription;
                                product.productCategory = productCategory;
                                product.costPrice = costPrice;
                                product.productUnit = productUnit;
                                product.costPrice = costPrice;
                                product.availableAtRetailPrice = availableAtRetailPrice;
                                product.retailUnitPrice = retailUnitPrice;
                                product.availableAtWholesalePrice = availableAtWholesalePrice;
                                product.wholesaleUnitPrice = wholesaleUnitPrice;
                                product.moq = moq;
                                product.bulkPrices = bulkPrices;
                                product.base64ProductImageString = base64ProductImageString;
                            };

                            return product;
                        });
                    };

                    return shop;
                })
            };
        }

        case UPDATE_PRODUCT_QUANTITY: {
            const shopId    = action.payload.shopId;
            const productId = action.payload.productId;
            const quantity  = action.payload.quantity;
            
            return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        shop.inventory.map(product => {
                            if (product.id === productId) {
                                product.quantity = quantity;
                            };

                            return product;
                        });
                    };

                    return shop;
                })
            };
        }

        case UPDATE_PRODUCT_ID: {
            const request  = action.payload.request;
            const response = action.payload.response;
            const shopId   = new URL(request.url).pathname.split('/')[3];

            return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        shop.inventory.map(product => {
                            if (product.id === request.payload.id) {
                                product.id = response.data.id;
                            };

                            return product;
                        })
                    };

                    return shop;
                })
            };
        }

        case UPDATE_INVENTORY_PRODUCT_ID: {
            const request  = action.payload.request;
            const response = action.payload.response;
            const shopId   = new URL(request.url).pathname.split('/')[3];

            return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        shop.inventory.map(product => {
                            if (product.inventoryProductId === request.payload.inventoryProductId) {
                                product.inventoryProductId = response.data.inventoryProductId;
                            };

                            return product;
                        })
                    };

                    return shop;
                })
            };
        }

        case UPDATE_PRODUCT_IMAGE: {
            const request  = action.payload.request;
            const response = action.payload.response;
            const shopId    = new URL(request.url).pathname.split('/')[3];

            return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        shop.inventory.map(product => {
                            if (product.id === response.data.id) {
                                product.base64ProductImageString = response.data.base64ProductImageString;
                            };

                            return product;
                        })
                    };

                    return shop;
                })
            };
        }
        
        case DELETE_PRODUCT: {
            const shopId    = action.payload.shopId;
            const productId = action.payload.productId;

            return {
                ...state,
                shops: state.shops.map(shop => {
                    if (shop.id === shopId) {
                        shop.inventory = shop.inventory.filter(product => product.id !== productId);
                    };
                    
                    return shop;
                })
            };
        }

        case SAVE_CUSTOMER: {
            return {
                ...state,
                customers: state.customers.concat(action.payload)
            };
        }

        case GET_CUSTOMERS: {
            return {
                ...state,
                customers: action.payload
            };
        }

        case UPDATE_CUSTOMER: {
            const customerId = action.payload.id;
            const customerInfo = action.payload.customerInfo;

            return {
                ...state,
                customers: state.customers.map(customer => {
                    if (customer.id === customerId) {
                        customer.name = customerInfo.name;
                        customer.phoneNumber = customerInfo.phoneNumber;
                        customer.email = customerInfo.email;

                        customer.homeAddress = {
                            address: customerInfo.homeAddress.address,
                            state: customerInfo.homeAddress.state,
                            lga: customerInfo.homeAddress.lga
                        };

                        customer.officeAddress = {
                            address: customerInfo.officeAddress.address,
                            state: customerInfo.officeAddress.state,
                            lga: customerInfo.officeAddress.lga
                        };

                        customer.bank = {
                            name: customerInfo.bank.name,
                            accountNumber: customerInfo.bank.accountNumber
                        };
                    };

                    return customer;
                })
            };
        }

        case UPDATE_CUSTOMER_ID: {
            const previousId = action.payload.previousId;
            const currentId  = action.payload.currentId;

            return {
                ...state,
                customers: state.customers.map(customer => {
                    if (customer.id === previousId) {
                        customer.id = currentId;
                    };

                    return customer;
                })
            };
        }

        case UPDATE_CUSTOMER_OWING_STATUS: {
            const customerId = action.payload.customerId;
            const status     = action.payload.status;

            return {
                ...state,
                customers: state.customers.map(customer => {
                    if (customer.id === customerId) {
                        customer.owing = status;
                    };

                    return customer;
                })
            };
        }

        case DELETE_CUSTOMER: {
            return {
                ...state,
                customers: state.customers.filter(customer => customer.id !== action.payload)
            };
        }

        case MY_SHOP_CATEGORIES: {
            return {
                ...state,
                businessCategories: action.payload,
            };
        }

        case MY_SHOP_PRODUCT_CATEGORIES: {
            return {
                ...state,
                productCategories: action.payload,
            };
        }

        case MY_SHOP_ORDERS_SUCCESS: {
            return {
                ...state,
                loadingShopOrder: false,
                orders: action.payload,
                errorMsg: ""
            };
        }

        case MY_SHOP_ORDERS_FAILURE: {
            return {
                ...state,
                loadingShopOrder: false,
                orders: [],
                errorMsg: action.payload
            };
        }

        case MY_SHOP_ORDER_BY_ID_SUCCESS: {
            return {
                ...state,
                loadingShopOrder: false,
                orders: state.orders.map(order => {
                    if (order.orderNumber === action.payload.orderNumber && order.orderItems === null) {
                        order.orderItems = sortOrderItems([...action.payload.orderItems]);
                    };

                    return order;
                }),
                errorMsg: ""
            };
        }
        
        case MY_SHOP_ORDER_BY_ID_FAILURE: {
            return {
                ...state,
                loadingShopOrder: false,
                orders: state.orders.map(order => {
                    if (order.orderNumber === action.payload.orderNumber && order.orderItems === null) {
                        order.orderItems = {};
                    };
                    return order;
                }),
                errorMsg: action.payload
            };
        }

        case MY_SHOP_ORDER_UPDATE_PRODUCTS: {
            return {
                ...state,
                loadingShopOrder: false,
                orders: state.orders.map(order => {
                    if (order.orderNumber === action.payload.orderNumber) {
                        order.orderItems = action.payload.orderItems;
                    };

                    return order;
                }),
                errorMsg: ""
            };
        }

        case FETCH_PRODUCTS_MASTER_LIST: {
            return {
                ...state,
                productsMasterList: action.payload
            };
        }

        case NO_PRODUCTS_ON_MASTER_LIST: {
            return {
                ...state,
                productsMasterList: []
            };
        }

        case PROCESS_SHOP_ORDERS_SUCCESS: {
            return {
                ...state,
                loadingShopOrder: false
            };
        }

        case PROCESS_SHOP_ORDERS_FAILURE: {
            return {
                ...state,
                loadingShopOrder: false,
                errorMsg: action.payload
            };
        }

        case USER_LOGOUT: {
            return {
                isLoading: false,
                loadingShopOrder: false,
                errorMsg: "",
                shops: [],
                sales: [],
                orders: [],
                customers: [],
                businessCategories: [],
            }
        }
        
        default: {
            return state;
        }
    }
};