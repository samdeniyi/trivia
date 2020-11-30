import React from 'react';

import {
    UMAgentIdentityCheck,
    UMAgentRegionSelection,
    UMAgentBankAccount,
    UMAgentGroup
} from '../../views';

export const upgradeMerchantRoutes = [
     {
         path: '/actions/um_agent_region_selection',
         exact: true,
         main: () => <UMAgentRegionSelection />,
         public: false
     },
     {
         path: '/actions/um_agent_identity_check',
         exact: true,
         main: () => <UMAgentIdentityCheck />,
         public: false
     },
     {
         path: '/actions/um_agent_bank_account',
         exact: true,
         main: () => <UMAgentBankAccount />,
         public: false
     },
     {
         path: '/actions/um_agent_group',
         exact: true,
         main: () => <UMAgentGroup />,
         public: false
     }
];