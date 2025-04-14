import React, { useEffect } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import DoctorCard from "./DoctorCard";
import { useFetchDoctorsQuery } from "../api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useDispatch } from "react-redux";
import { rootApi } from "../../../core/redux/api";

const DoctorList: React.FC = () => {
	const { data: doctors, isLoading, error } = useFetchDoctorsQuery();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(rootApi.util.invalidateTags(["doctors"]));
	}, []);

	console.log("Doctors fetched from API:", doctors);

	if (isLoading) {
		return (
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
				<CircularProgress />
				<Typography variant="h6" style={{ marginTop: "10px" }}>
					Loading pulmonologists...
				</Typography>
			</div>
		);
	}

	if (error) {
		const errorMessage =
			(error as FetchBaseQueryError).status === 404
				? "No doctors found at this endpoint."
				: "An unexpected error occurred.";

		return (
			<Typography variant="h6" color="error" style={{ marginTop: "20px" }}>
				Error fetching doctors: {errorMessage}
			</Typography>
		);
	}

	// Filter only pulmonologists
	const pulmonologists = doctors?.filter(
		(doctor) => doctor.Specilality?.trim().toLowerCase() === "pulmonologist"
	);

	if (!pulmonologists || pulmonologists.length === 0) {
		return (
			<Typography variant="h6" style={{ marginTop: "20px" }}>
				No pulmonologists available.
			</Typography>
		);
	}

	return (
		<Grid container spacing={2} sx={{ margin: 0, width: "100%" }}>
			{pulmonologists.map((doctor) => (
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					lg={3}
					key={`${doctor.ID}-${doctor.Seq}`}
					sx={{ display: "flex" }}
				>
					<DoctorCard doctor={doctor} />
				</Grid>
			))}
		</Grid>
	);
};

export default DoctorList;
