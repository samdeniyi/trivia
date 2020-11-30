import { combineReducers } from 'redux';
import wallet        from './wallet';
import kyc           from './kyc';
import transactions  from './transactions';
import notifications from './notifications';
import agencyBanking from './agency-banking';

const account = combineReducers({
    wallet,
    kyc,
    transactions,
    notifications,
    agencyBanking,
});

export default account;