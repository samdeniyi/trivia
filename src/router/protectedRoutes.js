import React, { lazy, Suspense } from 'react';
import { Loader } from '../components';

import { myAgentsRoutes }          from './actions/myAgentsRoutes';
import { myMerchantsRoutes }       from './actions/myMerchantsRoutes';
import { airtimeDataRoutes }       from './actions/airtimeDataRoutes';
import { electricityPayRoutes }    from './actions/electricityPayRoutes';
import { transportationPayRoutes } from './actions/transportationRoutes';
import { entertainmentPayRoutes }  from './actions/entertainmentPayRoutes';
import { myShopRoutesWithHeader}   from './actions/myShopRoutes';
import { merchBuyRoutesWithHeader}  from './actions/merchbuyRoutes';
import { transactionRoutesWithHeader} from './actions/transactionRoutes';

import { sendMoneyRoutes }         from './actions/sendMoneyRoutes';
import { upgradeMerchantRoutes }   from './actions/upgradeMerchantRoute';

import {
    Home,
    Notifications,
    UpdatePassword,
    UpdateUserData,
    AccountSettings,
    DebitCardPage,
    AddDebitCard,
    BankDataPage,
    KYCPage,
    KYCMeansOfID,
    KYCRegionSelection,
    KYCAddressPage,
    FundWallet,
    AddBankAccount,
    ChoosePayment,
    ReferralPage,
    WithdrawalSettings,
    NextOfKin,
    TransactionDetails,
    PerformanceOrdersList,
    PerformanceOrderDetails,
    KYCAgentBankData,
    OTPVALIDATION403,
    SuccessPage,
    WalletToWallet,
    AccountVerified,
    AgencyBankingSignup
} from '../views';

const PerformancePage  = lazy(() => import("../views/home/performance/performance-page"));
const TransactionsPage = lazy(() => import("../views/home/transactions/transactions-page"));

export const protectedRoutes = [
    {
        path: ['/', '/home'],
		exact: true,
		main: () => <Home />,
		public: false,
    },
    {
        path: '/user/notifications',
        exact: true,
        main: () => <Notifications />,
        public: false
    },
    {
        path: '/user/update_data',
        exact: true,
        main: () => <UpdateUserData />,
        public: false
    },
    {
        path: '/user/account_next_of_kin',
        exact: true,
        main: () => <NextOfKin />,
        public: false
    },
    {
        path: '/user/account_settings',
        exact: true,
        main: () => <AccountSettings />,
        public: false
    },
    {
        path: '/user/account_kyc',
        exact: true,
        main: () => <KYCPage />,
        public: false
    },
    {
        path: '/user/account_kyc_means',
        exact: true,
        main: () => <KYCMeansOfID />,
        public: false
    },
    {
        path: '/user/account_kyc_region',
        exact: true,
        main: () => <KYCRegionSelection />,
        public: false
    },
    {
        path: '/user/account_kyc_address',
        exact: true,
        main: () => <KYCAddressPage />,
        public: false
    },
    {
        path: '/user/account_kyc_bank_data',
        exact: true,
        main: () => <KYCAgentBankData />,
        public: false
    },
    {
        path: '/user/account_bank_data',
        exact: true,
        main: () => <BankDataPage />,
        public: false
    },
    {
        path: '/user/password_update',
        exact: true,
        main: () => <UpdatePassword />,
        public: false
    },
    {
        path: '/user/wallet_cards_all',
        exact: true,
        main: () => <DebitCardPage />,
        public: false
    },
    {
        path: '/user/wallet_cards_add',
        exact: true,
        main: () => <AddDebitCard />,
        public: false
    },
    {
        path: '/user/wallet_fund',
        exact: true,
        main: () => <FundWallet />,
        public: false
    },
    {
        path: '/user/wallet_choose_payment',
        exact: true,
        main: () => <ChoosePayment />,
        public: false
    },
    {
        path: '/user/wallet_withdrawal_settings',
        exact: true,
        main: () => <WithdrawalSettings />,
        public: false
    },
    {
        path: '/user/wallet_add_bank_account',
        exact: true,
        main: () => <AddBankAccount />,
        public: false
    },
    {
        path: '/user/wallet_transaction_success',
        exact: true,
        main: () => <SuccessPage />,
        public: false
    },
    {
        path: '/user/wallet_to_wallet',
        exact: true,
        main: () => <WalletToWallet />,
        public: false
    },
    {
        path: '/user/account_verified',
        exact: true,
        main: () => <AccountVerified />,
        public: false
    },
    {
        path: '/user/account_agency_banking_signup',
        exact: true,
        main: () => <AgencyBankingSignup />,
        public: false
    },
    {
        path: '/user/account_referral',
        exact: true,
        main: () => <ReferralPage />,
        public: false
    },
    {
        path: '/user/wallet_transactions',
        exact: true,
        main: () => (
            <Suspense fallback={<Loader />}>
                <TransactionsPage />
            </Suspense>
        ),
        public: false
    },
    {
        path: '/user/wallet_transaction_details',
        exact: true,
        main: () => <TransactionDetails />,
        public: false
    },
    {
        path: '/user/performance',
        exact: true,
        main: () => (
            <Suspense fallback={<Loader />}>
                <PerformancePage />
            </Suspense>
        ),
        public: false
    },
    {
        path: '/user/performance_orders',
        exact: true,
        main: () => <PerformanceOrdersList />,
        public: false
    },
    {
        path: '/user/performance_order_details',
        exact: true,
        main: () => <PerformanceOrderDetails />,
        public: false
    },
    { path: '/permission/new-device/',
     exact: true,
     main: () => <OTPVALIDATION403 /> },

    ...myAgentsRoutes,
    ...myMerchantsRoutes,
    ...airtimeDataRoutes,
    ...electricityPayRoutes,
    ...transportationPayRoutes,
    ...entertainmentPayRoutes,
    ...myShopRoutesWithHeader,
    ...merchBuyRoutesWithHeader,
    ...sendMoneyRoutes,
    ...upgradeMerchantRoutes,
    ...transactionRoutesWithHeader
];