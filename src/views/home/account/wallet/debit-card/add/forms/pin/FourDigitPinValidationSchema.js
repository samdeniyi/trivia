import * as Yup from 'yup';

export const FourDigitPinValidationSchema = Yup.object().shape({
    pin: Yup.string()
        .nullable()
        .required('Required')
});