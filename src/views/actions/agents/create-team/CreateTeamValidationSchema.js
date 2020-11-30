import * as Yup from 'yup';

export const CreateTeamValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Too Short!')
        .max(14, 'Too long!')
        .nullable()
        .required('Required'),
    description: Yup.string()
});