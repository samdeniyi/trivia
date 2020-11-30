import * as Yup from 'yup';

export const ValidationSchema = Yup.object().shape({
    coupon: Yup.string()
        .nullable()
        .required('Please, enter coupon code')
});