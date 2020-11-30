import * as Yup from 'yup';
import {phoneRegExp} from '../../../utils/regexp/phoneRegExp';
import {emailRegExp} from '../../../utils/regexp/emailRegExp';

export const UpdatePersonalDetailsValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .trim()
        .min(2, 'Too Short!')
        .max(20, 'Too long!')
        .required()
        .matches(/^[A-Za-z-]+$/, "Name should contain only letters or dash"),
    lastName: Yup.string()
        .trim()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required()
        .matches(/^[A-Za-z-]+$/, "Last name should contain only letters or dash"),
    msisdn: Yup.string()
        .min(10, "Must be minimum 10 characters")
        .max(11, "Must be maximum 11 characters")
        .matches(phoneRegExp, "Phone Number is not valid"),
    email: Yup.string()
        .matches(emailRegExp, "Email is not valid"),
    houseAddress: Yup.string()
});