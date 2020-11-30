import * as Yup from 'yup';
import valid from 'card-validator';
import { containsLettersRegExp } from '../../../../../../../../utils/regexp/containsLettersRegExp';

export const AddDebitCardValidationSchema = Yup.object().shape({
    cardNumber: Yup.string()
        .matches(containsLettersRegExp, 'Credit card should not contain letters')
        .min(16, "Credit card should be at least 16 digits long")
        .max(20, "Credit card should be at maximum 20 digits long")
        .nullable()
        .required('Required'),
    expirationDate: Yup.string()
        .matches(containsLettersRegExp, 'Expiration date should not contain letters')
        .nullable()
        .required('Required')
        .test(
            "expirationDate", 
            "Your card is already expired",
            value => valid.expirationDate(value).isValid
        ),
    cvv: Yup.string()
        .matches(containsLettersRegExp, 'Expiration date should not contain letters')
        .min(3, "CVV should be at least 3 digits long")
        .max(4, "CVV should be maximum 4 digits long")
        .nullable()
        .required('Required')
        .test(
            "cvv", 
            "CVV is not valid",
            value => valid.cvv(value).isValid
        )
});