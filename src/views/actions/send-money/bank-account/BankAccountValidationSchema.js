import * as Yup from 'yup';

export const BankAccountValidationSchema = Yup.object().shape({
    name: Yup.string()
        .nullable()
        .required('Bank name is Required'),
    accountNumber: Yup.string().required('Account number is Required'),
});