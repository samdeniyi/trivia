import * as Yup from 'yup';
import { phoneRegExp } from '../../../../../utils/regexp/phoneRegExp';
import { containsLettersRegExp } from '../../../../../utils/regexp/containsLettersRegExp';

export const SimpleSaleValidationSchema = Yup.object().shape({
    saleAmount: Yup.string()
        .matches(containsLettersRegExp, "Payment amount cannot contain letters")
        .required("Required"),
    fullPay: Yup.bool(),
    paymentAmount: Yup.string().matches(containsLettersRegExp, "Payment amount cannot contain letters"),
    amountDue: Yup.string(),
    customerPhoneNumber: Yup.string()
        .matches(containsLettersRegExp, "Cannot contain letters")
        .when('fullPay', {
            is: false,
            then: Yup.string()
                .matches(phoneRegExp, "Phone Number is not valid")
                .required('Required'),
            otherwise: Yup.string().when(['customerName', 'customerPhoneNumber'], {
                is: (customerName, customerPhoneNumber) => (customerName && !customerPhoneNumber),
                then: Yup.string().required('Customer phone is required'),
            })
        }).test(
            'maxLength', 
            "Can be maximum 11 digits (with 0)", 
            (value) => {
                if (value && value.trim().startsWith("0") && value.trim().length > 11) {
                    return false;
                } else return true;
            }
        ).test(
            'minLength', 
            "Can be maximum 11 digits (with 0)", 
            (value) => {
                if (value && !value.trim().startsWith("0") && value.trim().length > 10) {
                    return false;
                } else return true;
            }
        ),
    customerName: Yup.string().when('fullPay', {
        is: false,
        then: Yup.string().nullable().required('Required'),
        otherwise: Yup.string().when(['customerName', 'customerPhoneNumber'], {
            is: (customerName, customerPhoneNumber) => (!customerName && customerPhoneNumber),
            then: Yup.string().required('Customer name is required'),
        })
    })
});