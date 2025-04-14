import React, { useState } from "react";
import { useAppSelector } from "../../../core/redux/store";
import { useGetAppointmentsByPhoneQuery } from "../api";
import AppointmentList from "../components/AppointmentList";
import { Typography, Box, Tabs, Tab, useMediaQuery } from "@mui/material";
import { Appointment } from "../dtos/index";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import NewAppointmentDialogPage from "./NewAppointmentDialogPage";

const AppointmentPage: React.FC = () => {
	const user = useAppSelector((state) => state.authState.activeUser);
	const { data: appointments, isLoading, isError } = useGetAppointmentsByPhoneQuery(user?.Phone ?? "");
	const [currentTab, setCurrentTab] = useState(0);
	const isSmallOrMedium = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
	const handleTabChange = (
		event: React.ChangeEvent<unknown>,
		newValue: number
	) => {
		setCurrentTab(newValue);
	};

	const [isOpen, setIsOpen] = useState(false);
	const handleOpenDialog = () => setIsOpen(true);
	const handleCloseDialog = () => setIsOpen(false);

	const scheduledAppointments = appointments?.filter((appointment: Appointment) => appointment?.PtStatus === "Booked") ?? [];
	const completedAppointments = appointments?.filter((appointment: Appointment) => appointment?.PtStatus === "Visited") ?? [];
	const cancelledAppointments = appointments?.filter((appointment: Appointment) => appointment?.PtStatus === "Cancelled") ?? [];

	return isLoading ? (
		<Typography>Loading...</Typography>
	) : isError || !appointments ? (
		<Typography>Error loading appointments</Typography>
	) : (
		<>
			<Box p={1}>
				<Tabs value={currentTab} onChange={handleTabChange} variant={isSmallOrMedium ? "fullWidth" : "standard"}>
					<Tab label="Scheduled" />
					<Tab label="Completed" />
					<Tab label="Cancelled" />
				</Tabs>
				{currentTab === 0 && <AppointmentList appointments={scheduledAppointments} />}
				{currentTab === 1 && <AppointmentList appointments={completedAppointments} />}
				{currentTab === 2 && <AppointmentList appointments={cancelledAppointments} />}
			</Box>

			{/* <Box position="fixed" bottom={50} right={30}>
				<Fab color="primary" aria-label="add" onClick={handleOpenDialog} sx={{backgroundColor: "#CF2128",
					color: "#FFE0E1",
					":hover": {
						backgroundColor: "#FFE0E1",
						color: "#CF2128",
					}}}>
					<AddIcon />
				</Fab>
			</Box> */}

			{/* Render the dialog conditionally */}
			{isOpen && (
				<NewAppointmentDialogPage
					{...(isOpen ? { open: true, onClose: handleCloseDialog } : {}) as any} // Bypass TS error
				/>
			)}
		</>
	);
};

export default AppointmentPage;
