import * as Yup from 'yup';
import { emailRegExp } from '../../../../utils/regexp/emailRegExp';
import { phoneRegExp } from '../../../../utils/regexp/phoneRegExp';

export const NextOfKinValidationSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(1, 'Too Short!')
		.max(20, 'Too long!')
		.nullable()
		.required('Required'),
	lastName: Yup.string()
		.min(1, 'Too Short!')
		.max(50, 'Too Long!')
		.nullable()
		.required('Required'),
	email: Yup.string()
		.matches(emailRegExp, "Email is not valid")
		.nullable()
		.required('Required'),
	msisdn: Yup.string()
        .nullable()
        .matches(phoneRegExp, "Phone number is not valid")
        .min(11, "Must be minimum 11 characters")
        .max(14, "Must be maximum 14 characters")
        .required('Required'),
	relationShip: Yup.string()
        .nullable()
        .required('Required')
});