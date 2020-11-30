import * as Yup from 'yup';

export const MerchantBusinessProfileValidationSchema = Yup.object().shape({
    businessName: Yup.string()
        .nullable()
        .required('Required'),
    streetAddress: Yup.string()
        .nullable()
        .required('Required'),
    state: Yup.string()
        .nullable()
        .required('Required'),
    lga: Yup.string()
        .nullable()
        .required('Required'),
    businessCategories: Yup.array().of(Yup.string()).required()
});