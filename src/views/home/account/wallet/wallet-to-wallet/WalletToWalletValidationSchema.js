import * as Yup from 'yup';
import { containsLettersRegExp } from '../../../../../utils/regexp/containsLettersRegExp';

export const WalletToWalletValidationSchema = Yup.object().shape({
    amount: Yup.string()
        .matches(containsLettersRegExp, "Amount cannot contain letters")
        .required("Required"),
    phoneNumber: Yup.string()
        .matches(containsLettersRegExp, "Cannot contain letters")
        .test(
            'case 1', 
            "Phone number is not valid!", 
            (value) => {
                if (value && value.trim().startsWith("0") && value.trim().length !== 11) {
                    return false;
                } else return true;
            }
        ).test(
            'case 2', 
            "Phone number is not valid!", 
            (value) => {
                if (value &&  !value.trim().startsWith("234") && !value.trim().startsWith("0") && value.trim().length !== 10) {
                    return false;
                } else return true;
            }
        ).test(
            'case 3', 
            "Phone number is not valid!", 
            (value) => {
                if (value &&  value.trim().startsWith("234") && value.trim().length !== 13) {
                    return false;
                } else return true;
            }
        ),
    narration: Yup.string()
});