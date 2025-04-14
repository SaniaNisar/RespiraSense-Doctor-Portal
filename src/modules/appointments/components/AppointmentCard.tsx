import React from "react";
import { Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Appointment } from "../dtos/index";
import moment from "moment";

interface AppointmentCardProps {
	appointment: Appointment;
	index: number;
	onCalendarClick: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, index, onCalendarClick }) => {
	return (
		<Box
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			bgcolor="#f7f7f7"
			borderRadius="8px"
			borderLeft={4}
			borderColor={
				index === 0
					? "#28a745"
					: index === 1
						? "#dc3545"
						: index === 2
							? "#ffc107"
							: "#6c757d"
			}
			p={2}
			mb={0}
		>
			<Box display="flex" flexDirection="column">
				<Typography variant="body1" fontWeight="bold">
					{moment(appointment?.ApptDateTime).format("ddd, MMM D, YYYY")}
				</Typography>
				<Typography variant="body1" fontWeight="bold">
					{moment(appointment?.ApptDateTime).format("h:mm A")}
				</Typography>
				<Typography variant="h6" margin={0}>
					{appointment?.PtStatus}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{appointment?.PtName}
				</Typography>
			</Box>
			<CalendarTodayIcon
				fontSize="large"
				color="action"
				sx={{ cursor: "pointer" }}
				onClick={onCalendarClick}
			/>
		</Box>
	);
};

export default AppointmentCard;
