import * as Yup from 'yup';

export const TransportationBillValidationSchema = Yup.object().shape({
    amount: Yup.number()
        .moreThan(0, "Should be greater than 0")
        .nullable()
        .required("Required"),
    lccNumber: Yup.string()
        .nullable()
        .required("Required")
});