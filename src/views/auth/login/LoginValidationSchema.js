import * as Yup from 'yup';
import { containsAllCharsExeptNumbers } from '../../../utils/regexp/containsLettersRegExp';

export const LoginValidationSchema = Yup.object().shape({
	password: Yup.string()
		.matches(containsAllCharsExeptNumbers, 'Password cannot contain letters or special characters')
		.nullable()
		.required('Required')
});