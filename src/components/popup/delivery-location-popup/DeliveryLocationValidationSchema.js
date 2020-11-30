import * as Yup from 'yup';

export const DeliveryLocationValidationSchema = Yup.object().shape({
    state: Yup.string()
        .nullable()
        .required('Please, select one of the options'),
    lga: Yup.string()
        .nullable()
        .required('Please, select one of the options')
});