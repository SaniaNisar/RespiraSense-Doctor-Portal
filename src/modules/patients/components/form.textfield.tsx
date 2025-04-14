import React from "react";
import { TextField } from "@mui/material";
import { FieldProps, getIn } from "formik";

interface FormTextFieldProps extends FieldProps {
	label: string;
	type?: string;
	multiline?: boolean;
	rows?: number;
	select?: boolean;
	children?: React.ReactNode;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
	field,
	form,
	label,
	type = "text",
	multiline = false,
	rows = 1,
	select = false,
	children,
	...props
}) => {
	const errorText =
		getIn(form.touched, field.name) && getIn(form.errors, field.name);
	return (
		<TextField
			fullWidth
			label={label}
			type={type}
			multiline={multiline}
			rows={rows}
			select={select}
			{...field}
			{...props}
			error={form.touched[field.name] && Boolean(form.errors[field.name])}
			helperText={errorText ? errorText : ""}
		>
			{children}
		</TextField>
	);
};

export default React.memo(FormTextField);
