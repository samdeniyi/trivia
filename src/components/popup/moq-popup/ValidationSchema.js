import * as Yup from 'yup';

export const ValidationSchema = Yup.object().shape({
    moq: Yup.string()
        .nullable()
        .required('Please, enter moq')
});