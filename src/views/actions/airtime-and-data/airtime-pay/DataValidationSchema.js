import * as Yup from 'yup';
import { phoneRegExp } from '../../../../utils/regexp/phoneRegExp';

export const DataValidationSchema = Yup.object().shape({
    dataPlan: Yup.string()
        .nullable()
        .required("Required"),
    phoneNumber: Yup.string()
        .nullable()
        .required("Required")
        .matches(phoneRegExp, "Phone number is not valid")
});