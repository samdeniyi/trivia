import * as Yup from 'yup';

export const BankAccountValidationSchema = Yup.object().shape({
    accountNumber: Yup.string()
		.nullable()
    .required('Required'),
    bank: Yup.string()
        .nullable()
        .required("Required")
});