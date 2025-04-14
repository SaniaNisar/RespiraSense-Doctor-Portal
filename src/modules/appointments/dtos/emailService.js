import { createTransport } from "nodemailer";

// Configure the transporter
const transporter = createTransport({
	service: "gmail", // Use your email provider, e.g., Gmail, Outlook
	auth: {
		user: "sania.nisar01@gmail.com", // Your email address
		pass: "Sania1060", // App password (for Gmail, generate from account security settings)
	},
});

// Function to send email
const sendAppointmentConfirmationEmail = async (appointmentDetails) => {
	const { PatientName, StartDateTime, Address } = appointmentDetails;

	const mailOptions = {
		from: "sania.nisar01@gmail.", // Sender address
		to: "l216065@lhr.nu.edu.pk", // Recipient address
		subject: "Appointment Confirmation",
		html: `
      <h1>Appointment Confirmation</h1>
      <p>Dear ${PatientName},</p>
      <p>Your appointment has been successfully booked.</p>
      <ul>
        <li><strong>Date and Time:</strong> ${StartDateTime}</li>
        <li><strong>Address:</strong> ${Address}</li>
      </ul>
      <p>Thank you for choosing our services.</p>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("Appointment confirmation email sent successfully.");
	} catch (error) {
		console.error("Error sending email:", error);
	}
};

export default { sendAppointmentConfirmationEmail };
