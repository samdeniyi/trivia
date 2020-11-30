import * as Yup from 'yup';
import { emailRegExp } from '../../../../../utils/regexp/emailRegExp';

export const UserSignUpValidationSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(1, 'Too Short!')
		.max(20, 'Too long!')
		.nullable()
		.required('Required')
        .matches(/^[A-Za-z-]+$/, "Name should contain only letters or dash"),
	lastName: Yup.string()
		.min(1, 'Too Short!')
		.max(50, 'Too Long!')
		.nullable()
		.required('Required')
        .matches(/^[A-Za-z-]+$/, "Last name should contain only letters or dash"),
	email: Yup.string()
		.matches(emailRegExp, "Email is not valid")
		.nullable(),
	referralCode: Yup.string()
		.min(1, 'Too Short')
		.max(12, 'Too long')
});