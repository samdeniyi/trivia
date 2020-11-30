import * as Yup from 'yup';

export const KYCAddressValidationSchema = Yup.object().shape({
    streetAddress: Yup.string()
        .nullable()
        .required('Please, enter your residential address'),
    country: Yup.string()
        .nullable()
        .required('Please, enter your country'),
    state: Yup.string()
        .nullable()
        .required('Please, select one of the options'),
    lga: Yup.string()
        .nullable()
        .required('Please, select one of the options')
});