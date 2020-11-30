import * as Yup from 'yup';

export const WaterPayValidationSchema = Yup.object().shape({
    amount: Yup.number()
        .nullable()
        .moreThan(0, "Must be greater than zero")
        .required("Required"),
    meterNumber: Yup.string()
        .nullable()
        .required("Required")
        .min(11, "Must be 11 digits length")
        .max(11, "Must be 11 digits length")
});