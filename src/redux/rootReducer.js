import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { 
    user,
    auth,
    timer,
    account,
    applications,
    offline,
} from './ducks';

export default history => 
    combineReducers({
        router: connectRouter(history),
        auth,
        user,
        timer,
        account,
        applications,
        offline,
    });