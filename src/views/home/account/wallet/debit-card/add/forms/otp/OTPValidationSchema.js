import * as Yup from 'yup';

export const OTPValidationSchema = Yup.object().shape({
    otp: Yup.string()
        .nullable()
        .required('Required')
});