import { combineReducers } from 'redux';
import merchant from './merchant';
import agent    from './agent';

const signup = combineReducers({
    merchant,
    agent
});

export default signup;