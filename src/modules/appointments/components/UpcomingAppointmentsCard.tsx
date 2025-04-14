import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useGetAppointmentsByPhoneQuery } from "../api";
import { Appointment } from "../dtos/index";
import AppointmentCard from "./AppointmentCard";

interface AppointmentsListProps {
	phoneNumber: string;
	onCalendarClick: () => void;
}

const UpcomingAppointmentsCard: React.FC<AppointmentsListProps> = ({ phoneNumber, onCalendarClick }) => {
	const { data: appointments, isLoading } = useGetAppointmentsByPhoneQuery(phoneNumber);
	const bookedAppointments = appointments
		?.filter((appointment: Appointment) => appointment?.PtStatus === "Booked")
		.slice(0, 3);
	if (isLoading) return <Typography>Loading....</Typography>;
	return (
		<Card component={Box} maxWidth={608} borderRadius={2} boxShadow={4}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					Upcoming Appointments
				</Typography>
				{bookedAppointments?.map((appointment: Appointment, index: number) => (
					<Box
						key={appointment?.AppointmentID}
						sx={{
							mb: index !== bookedAppointments.length - 1 ? 1 : 0, // Add margin between items but not for the last one
							pb: index !== bookedAppointments.length - 1 ? 1 : 0, // Add padding-bottom for spacing effect
						}}
					>
						<AppointmentCard
							key={appointment?.AppointmentID}
							appointment={appointment}
							index={index}
							onCalendarClick={onCalendarClick}
						/>
					</Box>
				))}
			</CardContent>
		</Card>
	);
};

export default UpcomingAppointmentsCard;
