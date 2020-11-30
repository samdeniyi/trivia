import React from "react";
import * as Sentry from '@sentry/react';
import ReactGA from 'react-ga';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/es/integration/react";
import { ConnectedRouter } from "connected-react-router";
import { ToastContainer, toast } from "react-toastify";
import configureStore from "./redux/store";
import History from "./utils/History";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { GlobalStyles } from "./styles";
import "react-toastify/dist/ReactToastify.min.css";
import { mixPanel } from './utils/mix-panel/mixPanel';
import { 
    APP_LAUNCH
 } from './utils/mix-panel/constants';


if (process.env.REACT_APP_ENV_NAME === 'development'|| process.env.REACT_APP_ENV_NAME === 'staging' || process.env.REACT_APP_ENV_NAME === 'production' ) {
    Sentry.init({ 
        environment: process.env.REACT_APP_ENV_NAME,
        dsn: process.env.REACT_APP_SENTRY_KEY,
        release: 'spaces-frontend@' + process.env.npm_package_version
    });

    ReactGA.initialize(process.env.REACT_APP_GA_KEY);
};

export const { store, persistor } = configureStore();

mixPanel.track(APP_LAUNCH, 
    { 
        "Time": (new Date()).toLocaleDateString()
    }
)

render(
    <BrowserRouter>
        <Provider store={store}>
            <ConnectedRouter history={History}>
                <PersistGate loading={null} persistor={persistor}>
                    <GlobalStyles />
                    <App />
                    <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
                </PersistGate>
            </ConnectedRouter>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.register();