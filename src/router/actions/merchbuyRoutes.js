import React from 'react';
import {
   MerchbuyIndex,
   MerchbuyProductCategories,
   MerchbuyProducts,
   MerchbuyShops,
   MerchbuyPopularProducts,
   MerchbuyRecommendedProducts,
   MerchbuyProductDetails,
   MerchbuyShopDetails,
   CartItems,
   AddedToCartView,
   SuccessfulOrder,
   MerchbuyOrderHistoryList
} from '../../views/actions/merchbuy';
import {addHeaderToRoutes, addFooterToRoutes} from "../../hoc/addHeaderToRoutes";

export const merchbuyRoutes = [
    {
        path: '/actions/merchbuy',
        exact: true,
        main: () => <MerchbuyIndex />,
        public: false
    },
    {
        path: '/actions/merchbuy/product-categories',
        exact: true,
        main: () => <MerchbuyProductCategories />,
        public: false
    },
    {
        path: '/actions/merchbuy/products/:name/:id',
        exact: true,
        main: () => <MerchbuyProducts />,
        public: false
    },
    {
        path: '/actions/merchbuy/popular-products',
        exact: true,
        main: () => <MerchbuyPopularProducts />,
        public: false
    },
    {
        path: '/actions/merchbuy/recommended-products',
        exact: true,
        main: () => <MerchbuyRecommendedProducts />,
        public: false
    },
    {
        path: '/actions/merchbuy/shops',
        exact: true,
        main: () => <MerchbuyShops />,
        public: false
    },
    {
        path: '/actions/merchbuy/product/:id',
        exact: true,
        main: () => <MerchbuyProductDetails />,
        public: false
    },
    {
        path: '/actions/merchbuy/shop/:id',
        exact: true,
        main: () => <MerchbuyShopDetails />,
        public: false
    },
    {
        path: '/actions/merchbuy/cart',
        exact: true,
        main: () => <CartItems />,
        public: false
    },
    {
        path: '/actions/merchbuy/to-cart',
        exact: true,
        main: () => <AddedToCartView />,
        public: false
    },
    {
        path: '/actions/merchbuy/order-success',
        exact: true,
        main: () => <SuccessfulOrder/>,
        public: false
    },
    {
        path: '/actions/merchbuy/order-history',
        exact: true,
        main: () => <MerchbuyOrderHistoryList/>,
        public: false
    }
];
export const merchBuyRoutesWithHeader = addFooterToRoutes(addHeaderToRoutes(merchbuyRoutes));