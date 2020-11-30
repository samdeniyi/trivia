import React from 'react';
import {
    MyShop,
    SetupShop,
    ShopInventory,
    ProductDetails,
    EditShop,
    Sales,
    SaleDetails,
    OrdersList,
    OrderDetails,
    CustomersList,
    AddCustomer,
    EditCustomerDetails,
    CustomerSales,
    AddSale,
    AddProduct,
    PaymentReminder,
    ShopInventoryEdit
} from '../../views/actions/my-shop';
import {addHeaderToRoutes} from "../../hoc/addHeaderToRoutes";
import {addShopFooter} from "../../hoc/addShopFooter"

export const myShopRoutes = [
    {
        path: '/actions/shop',
        exact: true,
        main: () => <MyShop />,
        public: false
    },
    {
        path: '/actions/shop_setup',
        exact: true,
        main: () => <SetupShop />,
        public: false
    },
    {
        path: '/actions/shop_edit',
        exact: true,
        main: () => <EditShop />,
        public: false
    },
    {
        path: '/actions/shop_inventory',
        exact: true,
        main: () => <ShopInventory />,
        public: false
    },
    {
        path: '/actions/shop_inventory_edit',
        exact: true,
        main: () => <ShopInventoryEdit />,
        public: false
    },
    {
        path: '/actions/shop_product_details',
        exact: true,
        main: () => <ProductDetails />,
        public: false
    },
    {
        path: '/actions/shop_sales',
        exact: true,
        main: () => <Sales />,
        public: false
    },
    {
        path: '/actions/shop_sale_details',
        exact: true,
        main: () => <SaleDetails />,
        public: false
    },
    {
        path: '/actions/shop_sales_add',
        exact: true,
        main: () => <AddSale />,
        public: false
    },
    {
        path: '/actions/shop_products_add',
        exact: true,
        main: () => <AddProduct />,
        public: false
    },
    {
        path: '/actions/shop_orders',
        exact: true,
        main: () => <OrdersList />,
        public: false
    },
    {
        path: '/actions/shop_order_details',
        exact: true,
        main: () => <OrderDetails />,
        public: false
    },
    {
        path: '/actions/shop_customers',
        exact: true,
        main: () => <CustomersList />,
        public: false
    },
    {
        path: '/actions/shop_customers_add',
        exact: true,
        main: () => <AddCustomer />,
        public: false
    },
    {
        path: '/actions/shop_customers_edit',
        exact: true,
        main: () => <EditCustomerDetails />,
        public: false
    },
    {
        path: '/actions/shop_customers_sales',
        exact: true,
        main: () => <CustomerSales />,
        public: false
    },
    {
        path: '/actions/shop_sale_request_payment',
        exact: true,
        main: () => <PaymentReminder />,
        public: false
    }
];
export const myShopRoutesWithHeader = addShopFooter(addHeaderToRoutes(myShopRoutes));