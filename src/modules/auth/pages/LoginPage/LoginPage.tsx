import {
	alpha,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { operators } from "../../dtos/operators";
import { useAuthenticateMutation } from "../../api";
import { v4 as uuidv4 } from "uuid";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../../common/helper";
import { Field, Form, Formik } from "formik";
import {
	loginInitialValues,
	loginValidationSchema,
} from "../../../../core/forms/login.form.config";
import formTextfield from "../../../patients/components/form.textfield";
import { AuthenticateDto } from "../../dtos";
import {
	Column,
	CustomLoadingButton,
	Row,
} from "../../../../core/theme/components/custom.components";

const LoginPage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [operator, setOperator] = useState("");
	const [mobile, setMobile] = useState("");
	const [authenticate, { isLoading, isSuccess, isError, error }] =
		useAuthenticateMutation();
	const deviceId = useMemo(() => uuidv4(), []);

	useEffect(() => {
		if (isSuccess) {
			navigate(
				`/auth/verify?mobile=${mobile}&deviceId=${deviceId}&operator=${operator}`,
			);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError) {
			notify((error as any).message);
		}
	}, [isError]);

	const handleSubmit = (values: any) => {
		const params = {
			operator: values?.operator,
			mobile: values?.mobile,
			deviceId,
		};
		setMobile(values?.mobile);
		setOperator(values?.operator);
		authenticate(params);
	};

	return (
		<Column width={"100%"} margin={"10px"} justifyContent={"space-between"}>
			<Column marginBottom={"48px"}>
				<Row
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						justifyContent: "center",
						alignItems: "center",
						flexWrap: { xs: "wrap", md: "nowrap" },
						textAlign: { xs: "center", md: "inherit" },
						marginBottom: "2px"
					}}
				>
					<Typography
						variant="h2"
						sx={{
							fontSize: { xs: "1.5rem", sm: "2rem", md: "1.8rem", lg: "2rem" }, // Reduce font size for medium screens
							whiteSpace: { xs: "normal", md: "nowrap", lg: "nowrap" }, // Allow wrapping on medium screens
						}}
					>
						Welcome back to
					</Typography>
					<Typography
						variant="h2"
						color="primary.main"
						sx={{
							fontSize: { xs: "1.5rem", sm: "2rem", md: "1.8rem", lg: "2rem" },
							marginLeft: { xs: 0, md: 1 },
							marginRight: { xs: 0, md: 1 },
							whiteSpace: { xs: "normal", md: "nowrap", lg: "nowrap" }, // Allow wrapping only for medium screens
						}}
					>
						RespiraSense
					</Typography>
					<Typography
						variant="h2"
						sx={{
							fontSize: { xs: "1.5rem", sm: "2rem", md: "1.8rem", lg: "2rem" },
							whiteSpace: { xs: "normal", md: "nowrap", lg: "nowrap" }, // Ensure no wrapping on larger screens but allow for medium
						}}
					>
						Doctor Portal
					</Typography>
				</Row>
				<Typography
					variant="h6"
					color={"text.secondary"}
					textAlign={"center"}
				>
					Enter the following details to continue
				</Typography>
			</Column>

			<Formik
				initialValues={loginInitialValues}
				validationSchema={loginValidationSchema}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<Form style={{ width: "100%" }} onSubmit={handleSubmit}>
						<Grid item xs={12}>
							<Field
								name="operator"
								label="Operator"
								component={formTextfield}
								select
							>
								{operators.map((operator, index) => (
									<MenuItem key={index} value={operator?.id}>
										{operator?.title ?? " "}
									</MenuItem>
								))}
							</Field>
						</Grid>
						<Grid
							item
							xs={12}
							marginBottom={"30px"}
							marginTop={"30px"}
						>
							<Field
								name="mobile"
								label="Mobile Number"
								component={formTextfield}
							/>
						</Grid>
						<CustomLoadingButton
							loading={isLoading}
							loadingPosition="center"
							type="submit"
						>
							Login
						</CustomLoadingButton>
					</Form>
				)}
			</Formik>
		</Column>
	);
};

export default LoginPage;
