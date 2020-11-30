import * as Yup from 'yup';

export const ValidationSchema = Yup.object().shape({
    minPrice: Yup.string()
        .nullable()
        .required('Please, enter Minimum price'),
    maxPrice: Yup.string()
        .nullable()
        .required('Please, enter Maximum Price')
});