import React, { Suspense, lazy } from 'react';
import { Loader } from '../../components';

import { 
    MerchantDetails,
    MerchantCommissions,
    MerchantAgentDetails,
    MerchantsListing,
    MerchantReferrals,
    MerchantReferralsList
} from '../../views/actions/merchants';

const MerchantsDashboard = lazy(() => import('../../views/actions/merchants/merchants-dashboard'));

export const myMerchantsRoutes = [
    {
        path: '/actions/merchants',
        exact: true,
        main: () => (
            <Suspense fallback={<Loader />}>
                <MerchantsDashboard />
            </Suspense>
        ),
        public: false
    },
    {
        path: '/actions/merchants_listing',
        exact: true,
        main: () => <MerchantsListing />,
        public: false
    },
    {
        path: '/actions/merchant_details',
        exact: true,
        main: () => <MerchantDetails />,
        public: false
    },
    {
        path: '/actions/merchant_commissions',
        exact: true,
        main: () => <MerchantCommissions />,
        public: false
    },
    {
        path: '/actions/merchant_agent',
        exact: true,
        main: () => <MerchantAgentDetails />,
        public: false
    },
    {
        path: '/actions/merchant_referrals',
        exact: true,
        main: () => <MerchantReferrals />,
        public: false
    },
    {
        path: '/actions/merchant_referrals_list',
        exact: true,
        main: () => <MerchantReferralsList />,
        public: false
    }
];