import React, { useState } from "react";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";

type FileUploadProps = {
	onUploadSuccess: () => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
	const [file, setFile] = useState<File | null>(null);
	const [uploadStatus, setUploadStatus] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setFile(event.target.files[0]);
			setUploadStatus(null); // Reset previous status
		} else {
			setFile(null);
		}
	};

	const handleFileUpload = async () => {
		if (!file) {
			setUploadStatus("No file selected.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		setLoading(true);
		setUploadStatus("Uploading...");

		try {
			const response = await axios.post("http://localhost:5000/upload-report", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			if (response.status === 200) {
				setUploadStatus("File uploaded successfully!");
				onUploadSuccess(); // Notify parent of successful upload

				// Reset input, close dialog, and reset file state
				setTimeout(() => {
					setOpen(false); // Close dialog
					setFile(null); // Reset file
					setUploadStatus(null); // Clear status
				}, 1500); // Delay to allow user to see the success message
			} else {
				setUploadStatus("File upload failed!");
			}
		} catch (error) {
			setUploadStatus("Error during upload. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Upload Report
			</Button>

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Upload Report</DialogTitle>
				<DialogContent>
					<TextField
						type="file"
						fullWidth
						onChange={handleFileChange}
						inputProps={{ accept: "image/jpeg, image/png, application/pdf, text/csv" }}
					/>
					{uploadStatus && (
						<Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
							{uploadStatus}
						</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary" disabled={loading}>
            Cancel
					</Button>
					<Button
						onClick={handleFileUpload}
						color="primary"
						disabled={loading || !file} // Disable button when loading or no file selected
					>
						{loading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default FileUpload;
