import * as Yup from 'yup';
import { containsLettersRegExp } from '../../../utils/regexp/containsLettersRegExp';

export const CodeCheckFormValidationSchema = Yup.object().shape({
    code: Yup.string()
        .matches(containsLettersRegExp, 'PIN cannot contain letters')
        .nullable()
        .required('Required')
});