import * as Yup from 'yup';

export const ElectricityBillValidationSchema = Yup.object().shape({
    paymentType: Yup.string(),
    amount: Yup.number()
        .moreThan(0, "Must be greater than 0")
        .required("Required"),
    meterNumber: Yup.string()
        .nullable()
        .required("Required")
        .min(11, "Must be 11 digits length")
        .max(11, "Must be 11 digits length")
});