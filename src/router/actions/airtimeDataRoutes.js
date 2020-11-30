import React from 'react';
import { 
    SelectProvider,
    AirtimePay
} from '../../views/actions/airtime-and-data';

export const airtimeDataRoutes = [
    {
        path: '/actions/airtime',
        exact: true,
        main: () => <SelectProvider />,
        public: false
    },
    {
        path: '/actions/airtime_pay',
        exact: true,
        main: () => <AirtimePay />,
        public: false
    }
];