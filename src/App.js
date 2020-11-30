import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/react';
import { bool, func } from 'prop-types';
import { ProtectedRoute, ErrorBoundary } from './hoc';
import { ClearCache } from './components/cache-cleanup';
import { updateToken, logoutUser } from './redux/ducks/user/actions';
import { routes, protectedRoutes, openRoutes } from './router';
import { setOnlineState } from './redux/ducks/offline/actions';
import ScrollToTop from "./scrollToTop";

const App = ({
	isAuthenticated,
	updateToken,
	logoutUser,
	setOnlineState,
	location
}) => {
	const token = localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'));
	const refreshToken = localStorage.getItem('refreshToken') && JSON.parse(localStorage.getItem('refreshToken')); 
	const expirationTime = token && token.expiresIn - new Date();
	const refreshExpirationTime = refreshToken && refreshToken.expiresIn - new Date();

	const userId      = useSelector(state => state.user.userId);
	const firstName   = useSelector(state => state.user.firstName);
	const lastName    = useSelector(state => state.user.lastName);
	const email       = useSelector(state => state.user.email);
	const phoneNumber = useSelector(state => state.user.msisdn);
	
	useEffect(() => {
		if (process.env.REACT_APP_ENV_NAME === "production") {
			ReactGA.pageview(location.pathname + location.search + location.hash);
		};
	}, [location]);

	useEffect(() => {
		if (process.env.REACT_APP_ENV_NAME === 'development'|| process.env.REACT_APP_ENV_NAME === 'staging' || process.env.REACT_APP_ENV_NAME === 'production' ) {
			if (email && phoneNumber && userId) {
				Sentry.setUser({
					id: userId, 
					username: `${firstName} ${lastName}`,
					email:	email || "user@spaceso2o.com",
					phoneNumber: phoneNumber || "" 
				});
			}
		};
	}, [userId, email, phoneNumber, firstName, lastName]);

	useEffect(() => {
		if ((expirationTime < 0) && (refreshExpirationTime > 0)) {
			updateToken();
		};
	}, [expirationTime, refreshExpirationTime, updateToken]);

	useEffect(() => {
		if ((expirationTime < 0) && (refreshExpirationTime < 0)) {
			logoutUser();
		};
	}, [expirationTime, logoutUser, refreshExpirationTime]);

	useEffect(() => {
		const referralCode = new URL(window.location.href).search.split("=")[1];
		
		if (referralCode && referralCode.length > 0) {
			localStorage.setItem("referralCode", referralCode);
		};
	}, []);

	useEffect(() => {
		window.addEventListener('offline', () => {
			setOnlineState(!navigator.onLine);
		});

		return () => window.removeEventListener('offline');
	}, [setOnlineState]);

	useEffect(() => {
		window.addEventListener('online', () => {
			setOnlineState(!navigator.onLine);
		});

		return () => window.removeEventListener('online');
	}, [setOnlineState]);

	if (process.env.REACT_APP_ENV_NAME === 'development'|| process.env.REACT_APP_ENV_NAME === 'staging' || process.env.REACT_APP_ENV_NAME === 'production' ) {
		return (
			<Sentry.ErrorBoundary fallback={"An error has occured"}>
				<ClearCache />
				<ScrollToTop />
				<Switch>
				{openRoutes.map(route => (
					<Route 
						key={route.path}
						path={route.path}
						exact={route.exact}
						component={route.component}
					/>
				))}
				{protectedRoutes.map(route => (
					<ProtectedRoute
						key={route.path}
						isAuthenticated={isAuthenticated}
						path={route.path}
						component={route.main}
						exact={route.exact}
						public={route.public}
					/>
				))}
				{routes.map(route =>
					isAuthenticated ? (
						<Redirect to="/" key="redirect" />
					) : (
						<Route
							key={route.path}
							path={route.path}
							exact={route.exact}
							component={route.main}
						/>
					)
				)}
				</Switch>
			</Sentry.ErrorBoundary>
		);
	} else {
		return (
			<ErrorBoundary>
				<ClearCache />
				<ScrollToTop />
				<Switch>
				{openRoutes.map(route => (
					<Route 
						key={route.path}
						path={route.path}
						exact={route.exact}
						component={route.component}
					/>
				))}
				{protectedRoutes.map(route => (
					<ProtectedRoute
						key={route.path}
						isAuthenticated={isAuthenticated}
						path={route.path}
						component={route.main}
						exact={route.exact}
						public={route.public}
					/>
				))}
				{routes.map(route =>
					isAuthenticated ? (
						<Redirect to="/" key="redirect" />
					) : (
						<Route
							key={route.path}
							path={route.path}
							exact={route.exact}
							component={route.main}
						/>
					)
				)}
				</Switch>
			</ErrorBoundary>
		);
	};
};

App.propTypes = {
	isAuthenticated: bool,
	updateToken:     func,
	logoutUser:      func,
	setOnlineState:  func
};

const mapStateToProps = ({ user }) => ({
	isAuthenticated: user.isLoggedIn,
});

export default connect(
	mapStateToProps, 
	{ 
		updateToken,
		logoutUser,
		setOnlineState,
	}
)(Sentry.withProfiler(withRouter(App)));
