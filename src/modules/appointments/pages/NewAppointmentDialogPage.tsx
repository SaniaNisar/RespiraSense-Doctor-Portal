import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";
import {
	DateSlotsList,
	DepartmentsList,
	DoctorsListForAppointment,
} from "../components";
import { AppointmentDateDto, AppointmentSlotDto, DepartmentDto, DoctorDto } from "../dtos";
import { useAddAppointmentMutation, useGetAppointmentsByPhoneQuery } from "../api"; // Assuming you have an API hook for fetching appointments
import { useAppSelector, useAppDispatch } from "../../../core/redux/store";
import { setAppointments, updateAppointments } from "../slice"; // Import the action
import { useNavigate, useLocation } from "react-router-dom";

const NewAppointmentDialogPage = ({ isOpen, appointmentId, onClose }: any) => {
	const { activeUser, patients } = useAppSelector((state) => state.authState); // Extract values from Redux
	const dispatch = useAppDispatch();

	const patient = patients[0] || {};

	const [open, setOpen] = useState(true);
	const [department, setDepartment] = useState<DepartmentDto | undefined>(undefined);
	const [doctor, setDoctor] = useState<DoctorDto | undefined>(undefined);
	const [selectedSlot, setSelectedSlot] = useState<string | undefined>(undefined);
	const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
	const [steps, setSteps] = useState(["Select Department", "Select Doctor", "Select Slot"]);
	const [currentStep, changeCurrentStep] = useState(0);
	const navigate = useNavigate();
	const location = useLocation();

	const [createAppointment, { isLoading: isBooking }] = useAddAppointmentMutation();
	const { refetch } = useGetAppointmentsByPhoneQuery(activeUser?.PhoneNo, { refetchOnMountOrArgChange: true });

	// This effect will ensure that appointments are fetched whenever the dialog is opened or closed
	useEffect(() => {
		if (open) {
			refetch(); // Fetch appointments when the dialog is opened
		}
	}, [open, refetch]);

	const moveToDoctors = (department: DepartmentDto) => {
		setDepartment(department);
		setSteps([department.Description, "Select Doctor", "Select Slot"]);
		changeCurrentStep(1);
	};

	const moveToSlots = (doctor: DoctorDto) => {
		setDoctor(doctor);
		setSteps([department?.Description ?? "", doctor.FullName, "Select Slot"]);
		changeCurrentStep(2);
	};

	const handleSlotSelect = (slot: AppointmentSlotDto, date: AppointmentDateDto) => {
		if (slot.isReserved === 1 || slot.SlotStatus === "Booked") {
			console.log("This slot is already reserved or booked:", slot);
			return;
		}

		const dateOnly = date.the_Date.split("T")[0];
		const formattedStartTime = slot.StartTime ? slot.StartTime.trim() : "";
		const fullDateTime = `${dateOnly}T${formattedStartTime}`;

		setSelectedSlot(fullDateTime);
		setSelectedDate(date.the_Date);
	};
	
	const handleBookAppointment = async () => {
		if (!department || !doctor || !selectedSlot || !selectedDate) {
			console.error("Missing required details for booking appointment");
			return;
		}

		const appointmentData = {
			PhoneNo: activeUser?.Phone ?? patient.Phone ?? "",
			MRNO: activeUser?.MrNo ?? patient.PatientMrno ?? "",
			PatientName: activeUser?.Name ?? patient.PatientName ?? "",
			Father: activeUser?.FatherName ?? patient.FatherName ?? "",
			AgeInNumbers: activeUser?.Age ?? patient.AgeInNumbers ?? 0,
			AgeCaption: activeUser?.AgeCaption ?? patient.AgeCaption ?? "Years",
			Gender: activeUser?.Gender ?? patient.Gender ?? "Unknown",
			Remarks: activeUser?.Remarks ?? patient.Remarks ?? "No Remarks",
			Address: activeUser?.Address ?? "N/A",
			StartDateTime: selectedSlot,
			DrID: doctor.ID,
		};

		try {
			// Step 1: Create the appointment
			const newAppointment = await createAppointment(appointmentData).unwrap();
			console.log("Appointment created:", newAppointment);

			// Step 2: Refetch appointments
			await refetch(); // This triggers the refetch for the appointments

			// Step 3: Close the dialog
			setOpen(false);
			changeCurrentStep(3);
			navigate("/appointments");
		} catch (error) {
			console.error("Error booking appointment:", error);
		}
	};

	// Handle the dialog close action (clicking outside)
	const handleCloseDialog = () => {
		setOpen(false);
		changeCurrentStep(0); // Reset the step
	};

	return (
		<Dialog
			open={open}
			fullWidth
			maxWidth="sm"
			onClose={handleCloseDialog} // Close dialog when clicking outside
		>
			<DialogTitle>
				<Typography variant="h6">Book Appointment</Typography>
				<Box sx={{ paddingTop: "10px" }}>
					<Stepper activeStep={currentStep}>
						{steps.map((step, index) => (
							<Step key={index}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
				</Box>
			</DialogTitle>
			<DialogContent>
				{currentStep === 0 && <DepartmentsList onDepartmentSelect={moveToDoctors} />}
				{currentStep === 1 && department && (
					<DoctorsListForAppointment departmentId={department.ID} onSelectDoctor={moveToSlots} />
				)}
				{currentStep === 2 && doctor && (
					<>
						<DateSlotsList doctor={doctor} onSlotSelect={handleSlotSelect} />
						{selectedSlot && (
							<Box sx={{ marginTop: 2, textAlign: "center" }}>
								<Button
									variant="contained"
									color="primary"
									onClick={handleBookAppointment}
									disabled={isBooking}
								>
									{isBooking ? "Booking..." : "Book Appointment"}
								</Button>
							</Box>
						)}
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default NewAppointmentDialogPage;
