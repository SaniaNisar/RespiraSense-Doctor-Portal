import React from "react";
import AppointmentPageCard from "./AppointmentPageCard";
import { Box, Grid } from "@mui/material";
import { Appointment } from "../dtos/index";

interface AppointmentListProps {
	appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
	return (
		<Grid container spacing={1}>
			{appointments?.map((appointment) => (
				<Grid item xs={12} sm={6} md={4} key={appointment?.AppointmentID}>
					<AppointmentPageCard appointment={appointment} />
				</Grid>
			))}
		</Grid>
	);
};

export default AppointmentList;
