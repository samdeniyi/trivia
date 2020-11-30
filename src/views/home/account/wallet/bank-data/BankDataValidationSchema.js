import * as Yup from 'yup';
import Moment from 'moment';

Yup.addMethod(Yup.date, 'format', function (formats, parseStrict) {
    return this.transform(function (value, originalValue) {
        value = Moment(originalValue, formats, parseStrict);
        return value.isValid() ? value.toDate() : new Date('');
    });
});

export const BankDataValidationSchema = Yup.object().shape({
    bvn: Yup.string()
        .min(11, "BVN should be 11 characters long")
        .max(11, "BVN should be 11 characters long")
        .nullable()
        .required('Required'),
    dob: Yup.date()
        .format('DD/MM/YYYY', true)
        .typeError("Date is invalid")
        .max(new Date(), "You can't be born in the future!")
        .nullable()
        .required('Required')
});