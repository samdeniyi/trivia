import * as Yup from 'yup';
import { phoneRegExp } from '../../../../../utils/regexp/phoneRegExp';
import { emailRegExp } from '../../../../../utils/regexp/emailRegExp';

export const EditCustomerValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Too Short!')
        .max(25, 'Too long!')
        .nullable()
        .required('Required'),
    phoneNumber: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .min(10, "Must be minimum 10 digits length")
        .test(
            'maxLength', 
            "Can be maximum 11 digits (with 0)", 
            function(value) {
                if (value && value.trim().startsWith("0") && value.trim().length > 11) {
                    return false;
                } else return true;
            }
        ).test(
            'minLength', 
            "Can be maximum 11 digits (with 0)", 
            function(value) {
                if (value && !value.trim().startsWith("0") && value.trim().length > 10) {
                    return false;
                } else return true;
            }
        ).nullable().required('Required'),
    email: Yup.string()
        .matches(emailRegExp, "Email is not valid"),
    homeAddress: Yup.object().shape({
        address: Yup.string().when(
            ["homeAddress.address", "homeAddress.state", "homeAddress.lga"], {
                is: (address, state, lga) => (address && (!state || !lga)),
                then: Yup.string("Please, provide your state and lga"),
                otherwise: Yup.string()
            }),
        state: Yup.string().when(
            ["homeAddress.state", "homeAddress.address", "homeAddress.lga"], {
                is: (state, address, lga) => (state && (!address || !lga)),
                then: Yup.string().required("Please, enter your home address and lga"),
                otherwise: Yup.string()
            }),
        lga: Yup.string().when(
            ["homeAddress.lga", "homeAddress.state", "homeAddress.address"], {
                is: (lga, state, address) => (lga && (!state || !address)),
                then: Yup.string().required("Please, enter your home state and address"),
                otherwise: Yup.string()
            })
    }),
    officeAddress: Yup.object().shape({
        address: Yup.string(),
        state: Yup.string().when(
            ["officeAddress.state", "officeAddress.address", "officeAddress.lga"], {
                is: (state, address, lga) => (state && (!address || !lga)),
                then: Yup.string().required("Please, enter your office address and lga"),
                otherwise: Yup.string()
            }),
        lga: Yup.string().when(
            ["officeAddress.lga", "officeAddress.state", "officeAddress.address"], {
                is: (lga, state, address) => (lga && (!state || !address)),
                then: Yup.string().required("Please, enter your office state and address"),
                otherwise: Yup.string()
            })
    }),
    bank: Yup.object().shape({
        name: Yup.string(),
        accountNumber: Yup.string().when(["bank.name", "bank.accountNumber"], {
            is: (bankName, accountNumber) => (accountNumber && !bankName),
            then: Yup.string().required("Please, enter your accountNumber"),
            otherwise: Yup.string()
        })
    })
});