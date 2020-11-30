import * as Yup from 'yup';

export const EditShopValidationSchema = Yup.object().shape({
    shopName: Yup.string()
        .nullable()
        .required('Required'),
    base64BranchImageString: Yup.mixed(),
    address: Yup.string()
    .nullable()
    .required('Required'),
    state: Yup.string()
    .nullable()
    .required('Required'),
    localGovt: Yup.string()
    .nullable()
    .required('Required'),
    phoneNumber: Yup.string().required('Required')
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
    businessCategories: Yup.array().of(Yup.string()).required()
});


