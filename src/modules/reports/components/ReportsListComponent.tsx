import React, { useEffect, useState } from "react";
import { useLazyGetReportsQuery } from "../api";
import { ReportTypesEnum } from "../dtos";
import { useAppSelector } from "../../../core/redux/store";
import { UserDto } from "../../auth/dtos";
import { Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography, List, ListItem, ListItemText } from "@mui/material";
import { rootApi } from "../../../core/redux/api";
import { useDispatch } from "react-redux";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

type Props = {
  type: ReportTypesEnum;
};

const ReportsListComponent: React.FC<Props> = ({ type }) => {
	const [getReports, { data: reports, isLoading }] = useLazyGetReportsQuery();
	const user = useAppSelector((state) => state.authState.activeUser) as UserDto;
	const dispatch = useDispatch();
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); // Track uploaded files

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", sortable: false },
		{ field: "Date", headerName: "Date", flex: 1 },
		{ field: "InvoiceNo", headerName: "Invoice #", flex: 1 },
		{
			field: "Investigations",
			headerName: "Report",
			flex: 5,
			sortable: false,
			renderCell: (params) => params.value.map((v: string) => <Chip key={v} sx={{ marginRight: "5px" }} label={v} />),
		},
		{ field: "Department", headerName: "Department", flex: 1 },
		{ field: "Doctor", headerName: "Doctor", flex: 1 },
	];

	useEffect(() => {
		dispatch(rootApi.util.invalidateTags(["reports"]));
	}, []);

	useEffect(() => {
		if (reports) {
			setRows(reports.map((report, id) => ({ ...report, id: ++id })));
		}
	}, [reports]);

	useEffect(() => {
		getReports({
			phoneNumber: user.Phone ?? "",
			mrNo: user.PatientMrno ?? "",
			tabId: typeToTabId(type),
		});
	}, [type, user]);

	const typeToTabId = (type: ReportTypesEnum) => {
		switch (type) {
		case ReportTypesEnum.Lab:
			return 0;
		case ReportTypesEnum.Admission:
			return 1;
		case ReportTypesEnum.Cardiology:
			return 2;
		case ReportTypesEnum.Gastro:
			return 3;
		case ReportTypesEnum.Prescription:
			return 4;
		case ReportTypesEnum.Radiology:
			return 5;
		default:
			return -1;
		}
	};

	const handleClickOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setSelectedFile(null); // Reset file state on close
	};

	const handleUploadFile = async () => {
		if (!selectedFile) {
			return;
		}

		const formData = new FormData();
		formData.append("file", selectedFile);

		try {
			const response = await fetch("/api/upload-report", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				const result = await response.json();
				setUploadedFiles([...uploadedFiles, result.filePath]); // Add new file URL to the list
				setOpenDialog(false);
			} else {
				alert("File upload failed.");
			}
		} catch (error) {
			alert("Error uploading file.");
		}
	};

	return (
		<Box>
			<Box display="flex" flex={1} justifyContent="center">
				{isLoading && <CircularProgress />}
			</Box>

			{/* "+" Button to open the dialog */}
			<Box display="flex" justifyContent="flex-end" marginBottom={2}>
				<Button variant="contained" color="primary" onClick={handleClickOpenDialog}>+</Button>
			</Box>

			{/* DataGrid Component */}
			<DataGrid
				rowSelection={false}
				rows={rows}
				columns={columns}
				getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row")}
				sx={{
					"& .MuiDataGrid-row.Mui-selected": {
						outline: "none",
						backgroundColor: "inherit",
					},
					"& .MuiDataGrid-row:hover": {
						backgroundColor: "inherit",
					},
					"& .odd-row": {
						backgroundColor: "#f5f5f5",
					},
					"& .even-row": {
						backgroundColor: "#ffffff",
					},
				}}
			/>

			{/* Dialog for adding a report or uploading a file */}
			<Dialog open={openDialog} onClose={handleCloseDialog}>
				<DialogTitle>Add New Report</DialogTitle>
				<DialogContent>
					<Typography variant="body1">Choose a file to upload:</Typography>
					<input
						type="file"
						onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
						accept="application/pdf, image/jpeg, image/png"
					/>
					{selectedFile && (
						<Typography variant="body2" color="textSecondary">{selectedFile.name}</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="primary">Cancel</Button>
					<Button onClick={handleUploadFile} color="primary">Upload</Button>
				</DialogActions>
			</Dialog>

			{/* Display uploaded files */}
			<Box marginTop={3}>
				<Typography variant="h6">Uploaded Files:</Typography>
				<List>
					{uploadedFiles.map((filePath, index) => (
						<ListItem key={index}>
							<ListItemText
								primary={<a href={filePath} target="_blank" rel="noopener noreferrer">{filePath}</a>}
							/>
						</ListItem>
					))}
				</List>
			</Box>
		</Box>
	);
};

export default ReportsListComponent;
