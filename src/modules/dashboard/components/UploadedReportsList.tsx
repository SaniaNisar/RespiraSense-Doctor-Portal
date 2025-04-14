import React, { useEffect, useState } from "react";
import {
	Box,
	Typography,
	Card,
	CardContent,
	Button,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ReportTypesEnum } from "../../reports/dtos";

const UploadedReportsList: React.FC = () => {
	const navigate = useNavigate(); // Hook for navigation
	const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
	const handleEditReport = () => {
		navigate(`/reports/${ReportTypesEnum.Lab}`);
	};
	// Fetch uploaded files
	useEffect(() => {
		const fetchUploadedFiles = async () => {
			try {
				const response = await axios.get("http://localhost:5000/uploaded-files"); // Replace with your backend API
				const sortedFiles = response.data.sort(
					(a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
				);
				setUploadedFiles(sortedFiles.slice(0, 3)); // Display only the latest 3 reports
			} catch (error) {
				console.error("Error fetching uploaded files:", error);
			}
		};

		fetchUploadedFiles();
	}, []);

	return (
		<Card
			component={Box}
			maxWidth={608}
			borderRadius={2}
			boxShadow={4}
			mt={0}
			sx={{
				height: "100%", // Matches the height of "Upcoming Appointments"
				display: "flex",
				flexDirection: "column",
			}}
		>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					Uploaded Reports
				</Typography>
				{uploadedFiles.length === 0 ? (
					<Typography>No reports uploaded yet.</Typography>
				) : (
					<Box>
						{uploadedFiles.map((file, index) => (
							<Box
								key={file.id}
								display="flex"
								flexDirection="row"
								justifyContent="space-between"
								alignItems="center"
								bgcolor="#f7f7f7"
								borderRadius="8px"
								borderLeft={4}
								borderColor={
									index === 0
										? "#28a745" // Green for latest
										: index === 1
											? "#dc3545" // Red for second
											: index === 2
												? "#ffc107" // Yellow for third
												: "#6c757d" // Gray for others
								}
								p={2}
								mb={index < uploadedFiles.length - 1 ? 2 : 0} // Add margin between items
								sx={{
									height: "100px", // Ensure uniform height for all cards
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									mb: index !== uploadedFiles.length - 1 ? 2 : 0,
									padding: "8px 16px", // Adjust padding to match AppointmentCard
									minHeight: 108, // Set height to align with AppointmentCard
									borderRadius: "8px",
									backgroundColor: "#f7f7f7",
								}}
							>
								<Box display="flex" flexDirection="column" flex="1">
									<Typography variant="body1" fontWeight="bold">
										{file.name}
									</Typography>
									<Typography variant="body2" color="textSecondary">
										Uploaded on: {moment(file.date).format("MMM D, YYYY, h:mm A")}
									</Typography>
								</Box>
								<Button
									variant="contained"
									color="primary"
									size="small"
									onClick={handleEditReport} // Use file.id to identify the report if needed
									sx={{
										fontWeight: "bold",
										textTransform: "none",
										alignSelf: "flex-end", // Align button to the bottom right of the box
									}}
								>
									Edit
								</Button>
							</Box>
						))}
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

export default UploadedReportsList;
