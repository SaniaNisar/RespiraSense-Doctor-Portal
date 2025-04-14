import React from "react";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Button,
	Box,
	Grid,
} from "@mui/material";
import { DoctorDto } from "../dtos";
import { useNavigate } from "react-router-dom";

interface DoctorCardProps {
	doctor: DoctorDto;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
	const navigate = useNavigate(); // Hook to programmatically navigate

	const formatPicPath = (picPath: string) => {
		const baseURL = "https://appointments.shalamarhospital.org.pk";
		return picPath.startsWith("/") ? `${baseURL}${picPath}` : picPath;
	};

	const doctorImage = formatPicPath(doctor.PicPath);

	const handleBookAppointment = () => {
		navigate("/appointments/new"); // Navigate to the new appointment page
	};

	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				minHeight: "375px",
				padding: 2,
				backgroundColor: "#f4f4f4",
				boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
			}}
		>
			<Box display="flex" marginBottom={0}>
				<CardMedia
					component="img"
					sx={{ width: 80, height: 80, borderRadius: "60%", marginLeft: 2, marginRight: 3, objectFit: "cover" }}
					image={doctorImage}
					alt={doctor.FullName || "Unknown Doctor"}
				/>
				<Box>
					<Typography variant="h6" component="div">
						{doctor.FullName || "Unknown Doctor"}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{doctor.Specilality || "N/A"}
					</Typography>
				</Box>
			</Box>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Typography variant="body2" color="text.secondary">
							Experience:
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{doctor.Expr || "N/A"}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant="body2" color="text.secondary">
							Available Days: {doctor.AvailbaleDays || "N/A"}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
			<Button
				variant="contained"
				sx={{
					width: "100%",
					backgroundColor: "#CF2128",
					color: "#FFE0E1",
					":hover": {
						backgroundColor: "#FFE0E1",
						color: "#CF2128",
					},
				}}
				onClick={handleBookAppointment} 
			>
				Book Appointment
			</Button>
		</Card>
	);
};

export default DoctorCard;
