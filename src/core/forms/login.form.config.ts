import * as Yup from "yup";

interface FormValues {
	operator: string;
	mobile: string;
}

export const loginInitialValues: FormValues = {
	operator: "",
	mobile: "",
};

export const loginValidationSchema = Yup.object({
	operator: Yup.string().required("Operator is required"),
	mobile: Yup.string()
		.matches(/^\d{11}$/, "Mobile Number must be 11 digits")
		.required("Mobile Number is required"),
});
