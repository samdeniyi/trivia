import * as Yup from 'yup';
import { phoneRegExp } from '../../../../utils/regexp/phoneRegExp';

export const AirtimeValidationSchema = Yup.object().shape({
    amount: Yup.number()
        .moreThan(0, "Must be greater than 0")
        .required("Required"),
    phoneNumber: Yup.string()
        .nullable()
        .required("Required")
        .matches(phoneRegExp, "Phone number is not valid")
});