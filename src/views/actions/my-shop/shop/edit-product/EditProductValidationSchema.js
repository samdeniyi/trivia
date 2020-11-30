import * as Yup from 'yup';
import { containsLettersRegExp } from '../../../../../utils/regexp/containsLettersRegExp';

export const EditProductValidationSchema = Yup.object().shape({
    productName: Yup.string()
        .nullable()
        .required('Product name is required!'),
    productDescription: Yup.string(),
    productCategory: Yup.string().required('Product category is required!'),
    base64ProductImageString: Yup.mixed()
        .when('availableAtRetailPrice', {
            is: (availableAtRetailPrice) => availableAtRetailPrice === true,
            then: Yup.string()          
        }),
    quantity: Yup.string()
        .nullable()
        .matches(containsLettersRegExp, "Quantity cannot contain letters"),
    costPrice: Yup.string()
        .matches(containsLettersRegExp, "Price cannot contain letters"),
    productUnit: Yup.string(),
    availableAtRetailPrice: Yup.bool(),
    retailUnitPrice: Yup.string().matches(containsLettersRegExp, "Retail price cannot contain letters"),
    availableAtWholesalePrice: Yup.bool(),
    bulkPrices: Yup.object().when('availableAtWholesalePrice', {
        is: true,
        then: Yup.object().shape({
            moq: Yup.string()
                .matches(containsLettersRegExp, "Minimum order price cannot contain letters")
                .nullable()
                .required("Required"),
            price: Yup.string()
                .matches(containsLettersRegExp, "Wholesale price cannot contain letters")
                .nullable()
                .required("Required")
        }),
        otherwise: Yup.object().shape({
            moq: Yup.string().matches(containsLettersRegExp, "Minimum order price cannot contain letters"),
            price: Yup.string().matches(containsLettersRegExp, "Wholesale price cannot contain letters")
        })
    }).nullable()
});