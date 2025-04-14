import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Grid,
	MenuItem,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Field, Form } from "formik";
import FormTextField from "../components/form.textfield";
import { AddPatientInputDto } from "../dtos/add.patient.dto";
import {
	addPatientInitialValues,
	addPatientValidationSchema,
} from "../validation/add.patient.form.configs";
import { useGetRelationsQuery, useAddPatientMutation } from "../api";
import { useAppSelector } from "../../../core/redux/store";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { rootApi } from "../../../core/redux/api";

type Props = {
	open: boolean;
	onClose?: () => void;
};

const NewPatientDialogPage: React.FC<Props> = ({ open, onClose }) => {
	const activeUser = useAppSelector((state) => state.authState.activeUser);
	const [searchParams] = useSearchParams();
	const mobile = searchParams.get("mobile") ?? "";
	const {
		data: relationsList,
		error: errorRelationList,
		isLoading: isLoadingRelationList,
		refetch,
	} = useGetRelationsQuery(activeUser?.Phone ?? mobile);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [addPatient, { isLoading, isSuccess, isError, error }] =
		useAddPatientMutation();
	const location = useLocation();
	const shouldShowCancelButton = location.pathname === "/patients/new";

	const handleSubmit = (values: any) => {
		const patientDetail: AddPatientInputDto = {
			patientName: values?.p_name ?? "",
			fatherName: values?.g_name ?? "",
			gender: values?.gender ?? "",
			mobile: values?.mobile ?? activeUser?.Phone ?? "",
			age: values?.age ?? 0,
			address: values?.address ?? "",
			relation: values?.relation ?? "",
		};
		addPatient(patientDetail);
	};

	useEffect(() => {
		if (isSuccess && onClose) {
			onClose();
		}
		if (isSuccess && shouldShowCancelButton) {
			navigate(`/patients?mobile=${mobile}`);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (mobile) {
			refetch();
		}
	}, [mobile]);

	return (
		<Dialog open={open}>
			<DialogTitle>
				<Typography
					sx={{
						fontSize: "18px",
						fontWeight: "bold",
						lineHeight: "26px",
						color: "black",
					}}
				>
					Add Patient
				</Typography>
				<Typography
					sx={{
						fontSize: 11,
						fontWeight: "11px",
						color: "rgba(182, 182, 182, 0.8)",
					}}
				>
					Please fill the following required data to create patient
				</Typography>
			</DialogTitle>
			{!shouldShowCancelButton && (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
					}}
				>
					<CloseIcon />
				</IconButton>
			)}
			<Formik
				initialValues={{
					...addPatientInitialValues,
					mobile: activeUser?.Phone ?? mobile,
				}}
				validationSchema={addPatientValidationSchema}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<DialogContent>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Field
										name="p_name"
										label="Patient Name"
										component={FormTextField}
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										name="g_name"
										label="Father/Husband Name"
										component={FormTextField}
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										name="age"
										label="Age"
										component={FormTextField}
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										name="gender"
										label="Gender"
										component={FormTextField}
										select
									>
										<MenuItem value="Male">Male</MenuItem>
										<MenuItem value="Female">
											Female
										</MenuItem>
										<MenuItem value="In Between">
											In Between
										</MenuItem>
									</Field>
								</Grid>
								<Grid item xs={6}>
									<Field
										value={activeUser?.Phone ?? mobile}
										disabled={true}
										name="mobile"
										label="Mobile Number"
										component={FormTextField}
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										name="address"
										label="Address"
										component={FormTextField}
										multiline
										// rows={4}
									/>
								</Grid>

								<Grid item xs={12}>
									<Field
										name="relation"
										label="Relation"
										component={FormTextField}
										select
									>
										{relationsList?.map(
											(relation, index) => (
												<MenuItem
													key={index}
													value={relation?.Relations}
												>
													{relation?.Relations}
												</MenuItem>
											),
										)}
									</Field>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<Grid container spacing={2}>
								{!shouldShowCancelButton && (
									<Grid item xs={6}>
										<Button
											sx={{
												backgroundColor:
													"rgba(255, 231, 231, 1)",
												height: "42px",
											}}
											onClick={onClose}
											color="primary"
											fullWidth
										>
											Cancel
										</Button>
									</Grid>
								)}
								<Grid item xs={shouldShowCancelButton ? 12 : 6}>
									<Button
										sx={{
											backgroundColor: "primary.main",
											height: "42px",
										}}
										type="submit"
										fullWidth
									>
										<Typography sx={{ color: "white" }}>
											Submit
										</Typography>
									</Button>
								</Grid>
							</Grid>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
};

export default NewPatientDialogPage;
