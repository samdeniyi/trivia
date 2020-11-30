import React from 'react';

import {
    SelectProvider,
    ElectricityPay
} from '../../views/actions/electricity-bill';

export const electricityPayRoutes = [
    {
        path: '/actions/electricity',
        exact: true,
        main: () => <SelectProvider />,
        public: false
    },
    {
        path: '/actions/electricity_pay',
        exact: true,
        main: () => <ElectricityPay />,
        public: false
    }
];