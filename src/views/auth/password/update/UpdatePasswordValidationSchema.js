import * as Yup from 'yup';
import { containsAllCharsExeptNumbers } from '../../../../utils/regexp/containsLettersRegExp';

export const UpdatePasswordValidationSchema = Yup.object().shape({
    oldPin: Yup.string()
        .nullable()
        .required('Required')
        .matches(containsAllCharsExeptNumbers, 'Password cannot contain letters and special characters'),
    newPin: Yup.string()
        .nullable()
        .required('Required')
        .matches(containsAllCharsExeptNumbers, 'Password cannot contain letters and special characters')
});