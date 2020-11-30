import * as Yup from 'yup';

export const ValidationSchema = Yup.object().shape({
    REFERALCODES: Yup.string()
        .nullable()
        .test(
            'maxLength', 
            "Can not be minimun of 6 digits", 
            function(value) {
                if (value && value.trim().length < 6) {
                    return false;
                } else return true;
            }
        )
        .required('Please, enter referral code')
});