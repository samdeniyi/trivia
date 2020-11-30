import React from 'react';

import {
    SelectProvider,
    TransportationPay
} from '../../views/actions/transportation-bill';

export const transportationPayRoutes = [
    {
        path: '/actions/transportation',
        exact: true,
        main: () => <SelectProvider />,
        public: false
    },
    {
        path: '/actions/transportation_pay',
        exact: true,
        main: () => <TransportationPay />,
        public: false
    }
];