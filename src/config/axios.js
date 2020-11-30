import axios from 'axios';

import { useSelector } from "react-redux";
import { /*currentHost,*/ currentAPI } from './API';
import History from "../utils/History";
import { sendTelephone } from '../redux/ducks/auth/phone/actions';

const fingerprint = require('browser-fingerprint')();

const notSecuredEndpoints = [
	`${currentAPI}/api/token/generate-token`,
	`${currentAPI}/api/token/refresh-token`,
	`${currentAPI}/api/commissions/onboarding`,
	`${currentAPI}/api/users/nextOfKin`,
	`${currentAPI}/api/merchantAppIntegration/public/password-reset-spaces`
];

axios.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token');
		
		if (token && !notSecuredEndpoints.includes(config.url)) {
			config.headers['Authorization'] = `Bearer ${JSON.parse(token).token}`;
			config.headers['Content-Type'] = 'application/json';
			config.headers['fingerprint'] = `${fingerprint}`;
		};

		return config;
	}
);

axios.interceptors.response.use(
	response => response, 
	error => {
		if (error.response && error.response.status === 403) {
			const phoneNumber = useSelector(state => state.user.msisdn);
            const country     = useSelector(state => state.user.country);
			sendTelephone(phoneNumber, country);
			History.push('/otp');
		};

		return Promise.reject(error);
	}
);

export default axios;
