import * as Yup from "yup";

interface FormValues {
	p_name: string;
	g_name: string;
	age: string;
	mobile: string;
	address: string;
	gender: string;
	relation: string;
}

// Initial form values
export const addPatientInitialValues: FormValues = {
	p_name: "",
	g_name: "",
	age: "",
	mobile: "",
	address: "",
	gender: "",
	relation: "",
};

// Validation schema
export const addPatientValidationSchema = Yup.object({
	p_name: Yup.string().required("Patient Name is required"),
	g_name: Yup.string().required("Father/Husband Name is required"),
	age: Yup.string()
		.matches(/^\d+$/, "Age must be a number")
		.required("Age is required"),
	mobile: Yup.string()
		.matches(/^\d{11}$/, "Mobile Number must be 11 digits")
		.required("Mobile Number is required"),
	address: Yup.string().required("Address is required"),
	gender: Yup.string().required("Gender is required"),
	relation: Yup.string().required("Relation is required"),
});
