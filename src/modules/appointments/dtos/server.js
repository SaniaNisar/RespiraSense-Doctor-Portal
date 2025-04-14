import express, { json } from "express";
import { sendAppointmentConfirmationEmail } from "./emailService";

const app = express();
app.use(json()); // Parse JSON request body

app.post("/Appointment/AddAppointment", async (req, res) => {
	const {
		PhoneNo,
		MRNO,
		PatientName,
		Father,
		AgeInNumbers,
		AgeCaption,
		Gender,
		Remarks,
		Address,
		StartDateTime,
		DrID,
	} = req.body;

	try {
		// Step 1: Simulate appointment creation (replace this with actual DB logic)
		const createdAppointment = {
			id: new Date().getTime(), // Example unique ID
			PhoneNo,
			MRNO,
			PatientName,
			Father,
			AgeInNumbers,
			AgeCaption,
			Gender,
			Remarks,
			Address,
			StartDateTime,
			DrID,
		};

		// Step 2: Send confirmation email
		await sendAppointmentConfirmationEmail(createdAppointment);

		// Step 3: Respond with created appointment details
		res.status(201).json(createdAppointment);
	} catch (error) {
		console.error("Error processing appointment:", error);
		res.status(500).json({ error: "Failed to process appointment" });
	}
});

export default app;
