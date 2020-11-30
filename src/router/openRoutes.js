import { TermsAndConditions } from '../views/terms-conditions';
import { PrivacyPolicy } from '../views/privacy-policy';

import { ForgotPassword, SetNewPassword } from '../views';
import { ZendeskWindow } from '../components';

export const openRoutes = [
    {
        path: '/termsAndConditions',
        component: TermsAndConditions,
        exact: true
    },
    {
        path: '/privacyPolicy',
        component: PrivacyPolicy,
        exact: true
    },
    {
        path: '/user/password_forgot',
        component: ForgotPassword,
        exact: true  
    },
    {
        path: '/user/password_set',
        component: SetNewPassword,
        exact: true
    },
    {
        path: '/help',
        component: ZendeskWindow,
        exact: true
    }
];