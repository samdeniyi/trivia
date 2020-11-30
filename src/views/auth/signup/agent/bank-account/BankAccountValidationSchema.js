import * as Yup from 'yup';
import { containsLettersRegExp } from '../../../../../utils/regexp/containsLettersRegExp';

export const BankAccountValidationSchema = Yup.object().shape({
    accountNumber: Yup.string()
    .matches(containsLettersRegExp, "Account number cannot contain letters")
    .test('len', 'Account Number must be exactly 10 characters', val => val.length === 10)
		.nullable()
		.required('Required'),
    bankName: Yup.string()
     .nullable()
    .required("Required")
});