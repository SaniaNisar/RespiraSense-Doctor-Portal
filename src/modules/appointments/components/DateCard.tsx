import moment from "moment";
import { AppointmentDateDto } from "../dtos";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
	date: AppointmentDateDto;
	selected: boolean;
	onAppointmentDateSelect: (date: AppointmentDateDto) => void;
}

const DateCard: React.FC<Props> = ({ date, selected, onAppointmentDateSelect }) => {
	const [appointmentDate, setAppointmentDate] = useState<AppointmentDateDto | undefined>(undefined);

	useEffect(() => {
		setAppointmentDate(date);
	}, [date]);

	const buttonClickHandler = () => {
		setAppointmentDate(date);
		onAppointmentDateSelect(date);
	};

	const extractDay = (dateString: string) => {
		return moment(dateString).format("D");
	};

	const extractMonth = (dateString: string) => {
		return moment(dateString).format("MMM");
	};

	return (
		<Button sx={{ 
			borerWidth: "4px", 
			padding: 0, 
			margin: 0, 
			width: "100px",
			borderColor: "primary.main",
			border: selected ? 2 : 0
		}} onClick={buttonClickHandler}>
			<Box display="flex" flex="1" flexDirection="column">
				<Typography sx={{ 
					textAlign: "center", 
					backgroundColor: "primary.main", 
					color: "white", 
					padding: "10px" }} variant="h2">{extractMonth(appointmentDate?.the_Date ?? "")}</Typography>
				<Typography sx={{ color: "black" }} variant="h4">{extractDay(appointmentDate?.the_Date ?? "")}</Typography>
			</Box>
		</Button>
	);
};

export default DateCard;