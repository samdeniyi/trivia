import React from 'react';
import { 
    LaunchScreen,
    PhoneNumberSignUp, 
    Check, 
    Login,
    ChooseRole,
    MerchantSignUp,
    MerchantBusinessProfile,
    MerchantCreatePin,
    AgentProfileCreation,
    AgentIdentityCheck,
    AgentRegionSelection,
    AgentPinCreation,
    AgentGroup,
    AgentBankAccount,     
} from '../views';

export const routes = [
    { path: '/check', exact: true, main: () => <Check /> },
    { path: '/login', exact: true, main: () => <Login /> },
    { path: '/launch', exact: true, main: () => <LaunchScreen /> },
    { path: '/phone-signup', exact: true, main: () => <PhoneNumberSignUp /> },
    { path: '/user/create_role', exact: true, main: () => <ChooseRole /> },
    { path: '/user/create_user', exact: true, main: () => <MerchantSignUp /> },
    { path: '/user/create_business_profile', exact: true, main: () => <MerchantBusinessProfile /> },
    { path: '/user/create_pin', exact: true, main: () => <MerchantCreatePin /> },
    { path: '/user/create_agent', exact: true, main: () => <AgentProfileCreation /> },
    { path: '/user/create_agent_identity', exact: true, main: () => <AgentIdentityCheck /> },
    { path: '/user/create_agent_region', exact: true, main: () => <AgentRegionSelection /> },
    { path: '/user/create_agent_group', exact: true, main: () => <AgentGroup /> },
    { path: '/user/create_agent_pin', exact: true, main: () => <AgentPinCreation /> },
    { path: '/user/create_agent_bank_account', exact: true, main: () => <AgentBankAccount /> },


];