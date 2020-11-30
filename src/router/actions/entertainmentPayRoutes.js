import React from 'react';
import {
    SelectProvider,
    EntertainmentPay
} from '../../views/actions/entertainment-bill';

export const entertainmentPayRoutes = [
    {
        path: '/actions/entertainment',
        exact: true,
        main: () => <SelectProvider />,
        public: false
    },
    {
        path: '/actions/entertainment_pay',
        exact: true,
        main: () => <EntertainmentPay />,
        public: false
    }
];