import * as Yup from 'yup';

export const BankAccountValidationSchema = Yup.object().shape({
    bankName: Yup.string()
                    //.nullable()
                    .required('Bank name is Required')
                    .test('name', "Select a bank", val => val && val !== "Bank"),
    accountNumber: Yup.string()
                    .required('Account number is Required')
                    .test('len','Invalid Account Number', val => val && /^\d+$/.test(val) && val.length === 10),
    accountName: Yup.string().required('Account name is Required')
});