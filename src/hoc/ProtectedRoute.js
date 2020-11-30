import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { bool, object, func } from 'prop-types';

export const ProtectedRoute = withRouter(
    ({ component, isAuthenticated }) => {
        return isAuthenticated
            ? <Route render={component} /> 
            : <Redirect to={{ pathname: '/launch' }} />
    }
);

ProtectedRoute.propTypes = {
    isAuthenticated: bool,
    component:       func,
    props:           object,
    location:        object
};