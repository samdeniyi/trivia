import * as Yup from 'yup';
import { containsAllCharsExeptNumbers } from '../../../../../utils/regexp/containsLettersRegExp';

export const AgentPinCreationValidationSchema = Yup.object().shape({
    password: Yup.string()
        .matches(containsAllCharsExeptNumbers, 'Password cannot contain letters or special characters')
        .nullable()
        .required('Required'),
    confirmPassword: Yup.string()
        .matches(containsAllCharsExeptNumbers, 'Password cannot contain letters or special characters')
        .nullable()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});