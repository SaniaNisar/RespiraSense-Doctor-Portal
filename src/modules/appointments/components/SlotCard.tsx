import { Box, Button, Typography } from "@mui/material";
import { AppointmentSlotDto } from "../dtos";
import { useState } from "react";

type Props = {
	slot: AppointmentSlotDto;
	selected: boolean;
	onAppointmentSlotSelect: (slot: AppointmentSlotDto) => void;
}

const SlotCard: React.FC<Props> = ({ slot, selected, onAppointmentSlotSelect }) => {
	const [time, timePeriod] = slot.SlotFromTo.split(" - ")[0].split(" ");
	const [appointmentSlot, setAppointmentSlot] = useState<AppointmentSlotDto | undefined>(undefined);

	const buttonClickHandler = () => {
		setAppointmentSlot(slot);
		onAppointmentSlotSelect(slot);
	};

	return (
		<Button 
			sx={{ 
				padding: "0px", 
				margin: "0px",
				borderColor: "primary.main",
				border: selected ? 2 : 0
			}} 
			fullWidth 
			disabled={slot.isReserved === 1}
			onClick={buttonClickHandler}
		>
			<Box display="flex" flex="1" flexDirection="column">
				<Typography 
					variant="h5" 
					sx={{ color: "white", backgroundColor: "primary.main" }} 
				>
					{time}
				</Typography>
				<Typography 
					variant="h5" 
					sx={{ color: "black", backgroundColor: slot.isReserved ? "grey" : "lightgrey" }} 
				>
					{timePeriod}
				</Typography>
			</Box>
		</Button>
	);
};

export default SlotCard;