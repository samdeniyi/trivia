import React from 'react';

import {
    SendingAmount,
    SpacesWallets,
    SelectDestination,
    SendToBankAccount,
} from '../../views/actions/send-money';

export const sendMoneyRoutes = [
    {
        path: '/actions/send_money',
        exact: true,
        main: () => <SendingAmount />,
        public: false
    },
    {
        path: '/actions/send_money_destination',
        exact: true,
        main: () => <SelectDestination />,
        public: false
    },
    {
        path: '/actions/spaces_wallets',
        exact: true,
        main: () => <SpacesWallets />,
        public: false
    },
    {
        path: '/actions/send_money_bank',
        exact: true,
        main: () => <SendToBankAccount/>,
        public: false
    },
]