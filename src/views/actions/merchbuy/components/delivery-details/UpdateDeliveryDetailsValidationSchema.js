import * as Yup from 'yup';
import { phoneRegExp } from '../../../../../utils/regexp/phoneRegExp';

export const UpdateDeliveryDetailsValidationSchema = Yup.object().shape({
	receiverName: Yup.string()
		.nullable()
		.required("Please, enter the receiver's name"),
	streetAddress: Yup.string()
		.nullable()
		.required("Please, enter the street address"),
	state: Yup.string()
		.nullable()
		.required('Please, select one of the options'),
	lga: Yup.string()
		.nullable()
		.required('Please, select one of the options'),
	msisdn: Yup.string()
		.min(10, "Must be minimum 10 characters")
		.max(11, "Must be maximum 11 characters")
		.matches(phoneRegExp, "Phone Number is not valid")
		.nullable()
		.required('Please, enter a phone number')
});