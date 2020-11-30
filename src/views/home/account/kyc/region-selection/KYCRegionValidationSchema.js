import * as Yup from 'yup';

export const KYCRegionValidationSchema = Yup.object().shape({
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