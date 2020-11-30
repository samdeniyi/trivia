import * as Yup from 'yup';
import { phoneRegExp } from '../../../../utils/regexp/phoneRegExp';

export const PhoneNumberSignUpValidationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .min(10, "Must be minimum 10 digits length")
        .test(
            'maxLength', 
            "If starts with 0, can be maximum 11 digits", 
            (value) => {
                if (value && value.trim().startsWith("0") && value.trim().length > 11) {
                    return false;
                } else return true;
            }
        ).test(
            'minLength', 
            "If doesn't start with 0, can be maximum 10 digits", 
            (value) => {
                if (value && !value.startsWith("0") && value.length > 10) {
                    return false;
                } else return true;
            }
        ).nullable().required('Required')
});