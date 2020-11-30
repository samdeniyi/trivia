import { combineReducers } from 'redux';
import check          from './check';
import signup         from './signup';
import login          from './login';
import phone          from './phone';
import updateUserData from './update-user-data';
import password       from './password';

const auth = combineReducers({
    phone,
    check,
    login,
    password,
    signup,
    updateUserData
});

export default auth;