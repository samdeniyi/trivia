import * as Yup from 'yup';
import { phoneRegExp } from '../../../../../utils/regexp/phoneRegExp';
import { containsLettersRegExp } from '../../../../../utils/regexp/containsLettersRegExp';

export const AdvancedSaleValidationSchema = Yup.object().shape({
    saleAmount: Yup.string(),
    paymentAmount: Yup.string()
        .matches(containsLettersRegExp, "Payment amount cannot contain letters")
        .required("Required")
        .test(
            'payment-less-than-sale-amount',
            "You cannot pay more than the products cost",
            function(value) {
                const { saleAmount } = this.parent;

                if (Number(value) > Number(saleAmount)) {
                    return false;
                } else return true;
            }
        ),
    amountDue: Yup.string(),
    fullPay: Yup.bool(),
    customerPhoneNumber: Yup.string()
        // .max(14, "Must be maximum 11 digits length")
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
    customerName: Yup.string().when('fullPay', {
        is: false,
        then: Yup.string().nullable().required('Required'),
        otherwise: Yup.string().when(['customerName', 'customerPhoneNumber'], {
            is: (customerName, customerPhoneNumber) => (!customerName && customerPhoneNumber),
            then: Yup.string().required('Customer name is required'),
        })
    }),
    salesItemDetails: Yup.array().nullable()
});