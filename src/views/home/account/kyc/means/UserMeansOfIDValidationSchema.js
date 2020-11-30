import * as Yup from 'yup';

export const UserMeansOfIDValidationSchema = Yup.object().shape({
    selectedDocument: Yup.string()
        .nullable()
        .required('Please select one of the options')
});