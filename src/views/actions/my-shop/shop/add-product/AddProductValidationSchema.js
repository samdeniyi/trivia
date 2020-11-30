import * as Yup from 'yup';
import { containsLettersRegExp } from '../../../../../utils/regexp/containsLettersRegExp';

export const AddProductValidationSchema = Yup.object().shape({
    productName: Yup.string()
        .nullable()
        .required('Required'),
    productDescription: Yup.string(),
    base64ProductImageString: Yup.mixed()
        .when('availableAtRetailPrice', {
            is: (availableAtRetailPrice) => availableAtRetailPrice === true,
            then: Yup.string()
            .required('Product image is required!')            
        }),
    localCreatedDate:Yup.number(),
    productCategory: Yup.string()
        .nullable()
        .required('Required'),
    quantity: Yup.string()
        .nullable()
        .required('Required')
        .matches(containsLettersRegExp, "Quantity cannot contain letters"),
    costPrice: Yup.string()
        .nullable()
        .required("Required")
        .matches(containsLettersRegExp, "Price cannot contain letters"),
    productUnit: Yup.string()
        .nullable()
        .required('Required'),
    retailUnitPrice: Yup.string()
        .nullable()
        .required("Required")
        .matches(containsLettersRegExp, "Retail price cannot contain letters"),
    availableAtRetailPrice: Yup.bool(),
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