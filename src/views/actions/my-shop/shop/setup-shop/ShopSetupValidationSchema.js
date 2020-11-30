import * as Yup from 'yup';

export const ShopSetupValidationSchema = Yup.object().shape({
    shopName: Yup.string()
        .nullable()
        .required('Required'),
    streetAddress: Yup.string()
        .nullable()
        .required('Required'),
    countryState: Yup.string()
        .nullable()
        .required('Required'),
    lga: Yup.string()
        .nullable()
        .required('Required'),
    businessCategories: Yup.array().of(Yup.string()).required("Please, choose a business category")
});