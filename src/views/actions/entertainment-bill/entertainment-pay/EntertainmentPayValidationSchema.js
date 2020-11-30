import * as Yup from 'yup';

export const EntertainmentPayValidationSchema = Yup.object().shape({
    subscriptionPlan: Yup.string(),
    decoderNumber: Yup.string()
        .nullable()
        .required("Required")
        .min(10, "Must be 10 digits length")
        .max(10, "Must be 10 digits length")
});