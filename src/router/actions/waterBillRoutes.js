import React from 'react';
import { SelectProvider, WaterPay } from '../../views/actions/water-bill';

export const waterBillRoutes = [
    {
        path: '/actions/water',
        exact: true,
        main: () => <SelectProvider />,
        public: false
    },
    {
        path: '/actions/water_pay',
        exact: true,
        main: () => <WaterPay />,
        public: false
    }
];