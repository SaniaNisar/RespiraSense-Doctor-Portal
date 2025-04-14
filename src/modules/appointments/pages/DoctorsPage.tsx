import React from "react";
import { Container, Box } from "@mui/material";
import DoctorList from "../components/DoctorList";

const DoctorPage: React.FC = () => {
	return (
		<Container maxWidth={false} disableGutters sx={{ width: "100%", paddingLeft: 0, paddingRight: 1, marginLeft: 0, marginRight: 0 }}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
					width: "100%",
				}}
			>
				<DoctorList />
			</Box>
		</Container>
	);
};

export default DoctorPage;
