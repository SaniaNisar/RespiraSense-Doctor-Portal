import React, { useState } from "react";
import {
	CardContent,
	Typography,
	Avatar,
	Box,
	Button,
	CardProps,
	Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CancelAppointmentDialog from "../pages/CancelAppointmentDialogPage";
import { Appointment, CancelAppointmentDto } from "../dtos";
import { useCancelAppointmentMutation } from "../api"; 
import { useAppSelector } from "../../../core/redux/store";
import { NewAppointmentDialogPage } from "../pages";

const StyledAvatar = styled(Avatar)({
	width: "60px",
	height: "60px",
	borderRadius: "50%",
});
const ContentBox = styled(Box)({
	padding: "15px",
	textAlign: "center",
	position: "relative",
	marginBottom: "5px",
});
const StyledRescheduleButton = styled(Button)(({ theme }) => ({
	width: "100%",
	backgroundColor: "#FFE0E1",
	color: "#CF2128",
	":hover": {
		backgroundColor: "#CF2128",
		color: "#FFE0E1",
	},
}));
export const AppointmentsCard = styled(Card, {
	name: "AppointmentsCard",
	slot: "Root",
	overridesResolver: (props, styles) => [styles.root],
})<CardProps>(() => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	height: "100%",
	overflow: "hidden",
}));

interface AppointmentCardProps {
	appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [cancelAppointment] = useCancelAppointmentMutation();
	const user = useAppSelector((state) => state.authState.activeUser);
	const [isRescheduleOpen, setRescheduleOpen] = useState(false);
	const [appointmentToReschedule, setAppointmentToReschedule] = useState<Appointment | null>(null);

	const [isReBookOpen, setReBookOpen] = useState(false);
	const [appointmentToReBook, setAppointmentToReBook] = useState<Appointment | null>(null);

	const handleOpenDialog = () => {
		setIsDialogOpen(true);
	};

	const handleOpenReschedule = (appointment: Appointment) => {
		setAppointmentToReschedule(appointment);
		setRescheduleOpen(true);
	};

	const handleOpenReBook = (appointment: Appointment) => {
		setAppointmentToReBook(appointment);
		setReBookOpen(true);
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};
	const handleCancelAppointment = async (data: CancelAppointmentDto) => {
		try {
			await cancelAppointment({
				phoneNumber: user?.Phone ?? "",
				appointmentId: appointment.AppointmentID,
				reason: data.reason,
			});
		} catch (error) {
			console.error("Error canceling appointment:", error);
		}
	};

	return (
		<AppointmentsCard>
			<CardContent>
				{/* <StyledAvatar
					src={appointment?.PicPath}
					alt={appointment?.PtName ?? "-"}
				/> */}
				<Typography variant="body2" marginTop="10px" marginBottom="10px">
					{appointment?.PtName ?? "-"}
				</Typography>
				{/* <Typography variant="body2">{appointment?.PtName ?? "-"}</Typography> */}
				<Typography variant="body2">
					Date:{" "}
					{new Date(appointment?.ApptDateTime ?? "").toLocaleString() ?? "-"}
				</Typography>
			</CardContent>
			
			{appointment?.PtStatus === "Booked" && (
				<ContentBox>
					<StyledRescheduleButton variant="contained" onClick={handleOpenDialog}>
						Cancel Appointment
					</StyledRescheduleButton>
					<CancelAppointmentDialog
						appointmentId={appointment?.AppointmentID}
						isOpen={isDialogOpen}
						onClose={handleCloseDialog}
						onCancel={handleCancelAppointment}
					/>
				</ContentBox>
			)}
			{/*
			{/*{appointment?.PtStatus === "Cancelled" && (
				<ContentBox>
					<StyledRescheduleButton variant="contained" onClick={() => handleOpenReschedule(appointment)}>Reschedule Appointment</StyledRescheduleButton>
					{isRescheduleOpen && (
						<NewAppointmentDialogPage
							isOpen={isRescheduleOpen}
							appointmentToReschedule={appointmentToReschedule}
							onClose={() => setRescheduleOpen(false)}
						/>
					)}
				</ContentBox>
				
			)}
			{appointment?.PtStatus === "Visited" && (
				<ContentBox>
					<StyledRescheduleButton variant="contained" onClick={() => handleOpenReBook(appointment)}>Re-Book Appointment</StyledRescheduleButton>
					{isReBookOpen && (
						<NewAppointmentDialogPage
							isOpen={isReBookOpen}
							appointmentToReschedule={appointmentToReBook}
							onClose={() => setReBookOpen(false)}
						/>
					)}
				</ContentBox>
			)}
	 */} 
		</AppointmentsCard>
	);
};

export default AppointmentCard;