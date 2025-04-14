import React, { useState } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	Select,
	MenuItem,
	styled,
	Typography,
	FormControl,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { CancelAppointmentDto } from "../dtos";
interface CancelAppointmentDialogProps {
	appointmentId: number;
	isOpen: boolean;
	onClose: () => void;
	onCancel: (data: CancelAppointmentDto) => void;
}
const StyledRescheduleButton = styled(Button)(({ theme }) => ({
	backgroundColor: "#FFE0E1",
	color: "#CF2128",
	":hover": {
		backgroundColor: "#CF2128",
		color: "#FFE0E1",
	},
	margin: "15px"
}));
const CancelAppointmentDialog: React.FC<CancelAppointmentDialogProps> = ({
	appointmentId,
	isOpen,
	onClose,
	onCancel,
}) => {
	const [reason, setReason] = useState("");
	const [error, setError] = useState(false);
	const handleCancelClick = () => {
		if (!reason.trim()) {
			setError(true);
			return;
		}
		const cancelData: CancelAppointmentDto = {
			appointmentId,
			reason,
		};
		onCancel(cancelData);
		onClose();
		setError(false);
		setReason("");
	};
	const handleClose = () => {
		onClose();
		setError(false);
		setReason("");
	};
	const handleReasonChange = (event: SelectChangeEvent<string>) => {
		setReason(event.target.value as string);
		if (event.target.value) {
			setError(false);
		}
	};
	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			fullWidth
			maxWidth="sm"
			sx={{
				"& .MuiDialog-paper": {
					height: "280px", 
				},
			}}
		>
			<DialogTitle>Cancel Appointment</DialogTitle>
			<DialogContent
				sx={{
					maxHeight: "150px",
					overflowY: "hidden",
					margin: "20px",
				}}
			>
				<Typography variant="body2">
					Select Reason
				</Typography>
				<FormControl fullWidth error={error}>
					<Select
						value={reason}
						onChange={handleReasonChange}
						fullWidth
						required
						displayEmpty
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight: 100,
								},
							},
						}}
					>
						<MenuItem value="">
						</MenuItem>
						<MenuItem value="Doctor not available">Doctor not available</MenuItem>
						<MenuItem value="Patient may not visit on this date">
							Patient may not visit on this date
						</MenuItem>
					</Select>
				</FormControl>
				{error && (
					<Typography color="error" variant="body2">
						* Reason required
					</Typography>
				)}
			</DialogContent>
			{/* <DialogActions>
				<Button onClick={handleClose}>Close</Button>
				<StyledRescheduleButton onClick={handleCancelClick} variant="contained">
					Cancel Appointment
				</StyledRescheduleButton>
			</DialogActions> */}
		</Dialog>
	);
};

export default CancelAppointmentDialog;
