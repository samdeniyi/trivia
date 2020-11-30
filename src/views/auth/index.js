import Check from './check';
import Login from './login';
import PhoneNumberSignUp from './phone';
import { ForgotPassword, UpdatePassword, SetNewPassword } from './password';
import {OTPVALIDATION403}  from './permission';

import { 
    MerchantSignUp, 
    MerchantCreatePin, 
    MerchantBusinessProfile,
    AgentProfileCreation,
    AgentIdentityCheck,
    AgentRegionSelection,
    AgentGroup,
    AgentBankAccount,
    AgentPinCreation,
    ChooseRole
} from './signup';

export {
    PhoneNumberSignUp,
    Check,
    ChooseRole,
    MerchantSignUp, 
    MerchantCreatePin, 
    MerchantBusinessProfile,
    AgentProfileCreation,
    AgentIdentityCheck,
    AgentRegionSelection,
    AgentBankAccount,
    AgentGroup,
    AgentPinCreation,
    Login,
    ForgotPassword,
    UpdatePassword,
    SetNewPassword,
    OTPVALIDATION403
};