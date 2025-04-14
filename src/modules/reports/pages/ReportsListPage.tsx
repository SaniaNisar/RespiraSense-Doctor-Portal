// ReportsListPage.tsx

import React, { useState, useEffect } from "react";
import { Box, Button, Typography, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import FileUpload from "../components/FileUpload"; // Import the new FileUpload component
import { ReportTypesEnum } from "../dtos";

type Props = {
  type: ReportTypesEnum;
};

const ReportsListPage: React.FC<Props> = ({ type }) => {
	const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

	// Fetch the list of uploaded files on component mount
	useEffect(() => {
		const fetchUploadedFiles = async () => {
			try {
				const response = await axios.get("http://localhost:5000/uploaded-files");
				setUploadedFiles(response.data);
			} catch (error) {
				console.error("Error fetching uploaded files:", error);
			}
		};

		fetchUploadedFiles();
	}, []);

	const handleUploadSuccess = () => {
		// Fetch the uploaded files again after a successful upload
		const fetchUploadedFiles = async () => {
			try {
				const response = await axios.get("http://localhost:5000/uploaded-files");
				setUploadedFiles(response.data);
			} catch (error) {
				console.error("Error fetching uploaded files:", error);
			}
		};

		fetchUploadedFiles();
	};

	return (
		<Box>
			{/* Using the FileUpload component */}
			<FileUpload onUploadSuccess={handleUploadSuccess} />

			{/* Uploaded Files List */}
			<Box mt={4}>
				<Typography variant="h6">Uploaded Files</Typography>
				{uploadedFiles.length === 0 ? (
					<Typography>No files uploaded yet.</Typography>
				) : (
					<List>
						{uploadedFiles.map((file, index) => (
							<ListItem key={index}>
								<ListItemText
									primary={file.name}
									secondary={`Uploaded on: ${new Date(file.date).toLocaleString()}`}
								/>
								<Button
									variant="outlined"
									color="primary"
									href={`http://localhost:5000${file.path}`} // Ensure the URL is correct
									target="_blank"
									rel="noopener noreferrer"
								>
                  View
								</Button>
								<Button
									variant="outlined"
									color="secondary"
									href={`http://localhost:5000/uploaded-files/${file.name}`} // Use exact filename here
									download={file.name} // Adds the download functionality
								>
                  Download
								</Button>
							</ListItem>
						))}
					</List>
				)}
			</Box>
		</Box>
	);
};

export default ReportsListPage;
