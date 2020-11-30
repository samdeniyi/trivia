import * as Yup from 'yup';

export const AgentIdentityValidationSchema = Yup.object().shape({
    selectedDocument: Yup.string()
        .nullable()
        .required('Please select one of the options')
});