import { combineReducers } from 'redux';
import agents       from './agents';
import billPayments from './bill-payments';
import merchants    from './merchants';
import merchlist    from './merchlist';
import myShop       from './my-shop';
import merchbuy     from './merchbuy';
import transactions     from './transactions';



const applications = combineReducers({
    agents,
    merchants,
    merchlist,
    billPayments,
    myShop,
    merchbuy,
    transactions
});

export default applications;