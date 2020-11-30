import { createStore, applyMiddleware, compose } from 'redux';
import * as Sentry from "@sentry/react";
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import History from '../utils/History';
import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user', 'account', 'applications', 'offline']
};

const persistedReducer = persistReducer(persistConfig, rootReducer(History));
const middlewares = 
    (process.env.NODE_ENV === 'production') ? 
        applyMiddleware(thunkMiddleware, routerMiddleware(History)) : 
        composeWithDevTools(applyMiddleware(thunkMiddleware, routerMiddleware(History)));

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
            // Optionally pass options
          });

export default function configureStore() {
    const store = createStore(persistedReducer, compose(middlewares, sentryReduxEnhancer));
    const persistor = persistStore(store);
    return { store, persistor };
};