import React from 'react';
import {
   TransactionDetails,
   TransactionsIndex
} from '../../views/actions/transactions';

import {addHeaderToRoutes} from "../../hoc/addHeaderToRoutes";

export const transactionRoutes = [
    {
        path: '/actions/transactions/index',
        exact: true,
        main: () => <TransactionsIndex />,
        public: false
    },
    {
        path: '/actions/transactions/details/:id',
        exact: true,
        main: () => <TransactionDetails />,
        public: false
    },
];

export const transactionRoutesWithHeader = addHeaderToRoutes(transactionRoutes)
