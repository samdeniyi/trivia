import * as Yup from 'yup';
import { emailRegExp } from '../../../../utils/regexp/emailRegExp';
import { phoneRegExp } from '../../../../utils/regexp/phoneRegExp';

export const AgencyBankingValidationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    middleName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    dateOfBirth: Yup.date()
        .typeError("Date is invalid")
        .max(new Date(), "You can't be born in the future!")
        //.nullable()
        .required('Required'),
    gender: Yup.string().required("Required"),
    email:  Yup.string()
        .matches(emailRegExp, "Email is not valid")
        .required("Required"),
    phoneNumber: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .min(11, "Must be minimum 11 digits length")
        .test(
            'case 1', 
            "Phone number is not valid!", 
            (value) => {
                if (value && value.trim().startsWith("0") && value.trim().length !== 11) {
                    return false;
                } else return true;
            }
        )
        .test(
            'case 2', 
            "Phone number is not valid!", 
            (value) => {
                if (value &&  value.trim().startsWith("234") && value.trim().length !== 13) {
                    return false;
                } else return true;
            }
        )
        .test(
            'case 3', 
            "Phone number is not valid!", 
            (value) => {
                if (value &&  !value.trim().startsWith("234") && !value.trim().startsWith("0") /*&& value.trim().length !== 11*/) {
                    return false;
                } else return true;
            }
        )   
        //.nullable()
        .required('Required'),
    streetAddress: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    localGovernmentArea: Yup.string().required("Required"),
    businessName: Yup.string().required("Required"),
    businessMobileNumber: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .min(11, "Must be minimum 11 digits length")
        .test(
            'case 1', 
            "Phone number is not valid!", 
            (value) => {
                if (value && value.trim().startsWith("0") && value.trim().length !== 11) {
                    return false;
                } else return true;
            }
        )
        .test(
            'case 2', 
            "Phone number is not valid!", 
            (value) => {
                if (value &&  value.trim().startsWith("234") && value.trim().length !== 13) {
                    return false;
                } else return true;
            }
        )
        .test(
            'case 3', 
            "Phone number is not valid!", 
            (value) => {
                if (value &&  !value.trim().startsWith("234") && !value.trim().startsWith("0") /*&& value.trim().length !== 11*/) {
                    return false;
                } else return true;
            }
        )   
        //.nullable()
        .required('Required'),
    businessStartDate: Yup.date()
        .typeError("Date is invalid")
        .max(new Date(), "You business cannot be started in the future!")
        //.nullable()
        .required('Required'),
    businessLocation: Yup.string().required("Required"),
    businessRegistrationType: Yup.string().required("Required"),
    bvn: Yup.string()
        .min(11, "BVN should be 11 characters long")
        .max(11, "BVN should be 11 characters long")
        //.nullable()
        .required('Required'),
    highestLevelOfEducation: Yup.string().required("Required"),
    identificationCard: Yup.string().required("Required"),
    identificationNumber: Yup.string().required("Required"),
    billType: Yup.string().required("Required")
});