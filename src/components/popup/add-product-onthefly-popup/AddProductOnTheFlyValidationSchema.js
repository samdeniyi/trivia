import * as Yup from 'yup';
import { containsLettersRegExp } from '../../../utils/regexp/containsLettersRegExp';

export const AddProductOnTheFlyValidationSchema = Yup.object().shape({
    productName:  Yup.string()
        .nullable()
        .required("Required"),
    base64ProductImageString:  Yup.string(),
    productUnit: Yup.string()
        .nullable()
        .matches(containsLettersRegExp, "Unit price cannot contain letters")
        .required("Required"),
    quantity: Yup.string()
        .nullable()
        .matches(containsLettersRegExp, "Quantity cannot contain letters")
        .required("Required")
});