import { Box, IconButton, Paper } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import React from "react";

type Props = {
	shouldShowDashobardManager: () => void;
}

const ManageVitalsCard: React.FC<Props> = ({ shouldShowDashobardManager }) => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			height="100%"
			justifyContent="center"
		>
			<Paper sx={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
				<IconButton onClick={shouldShowDashobardManager}>
					<SwapHorizIcon sx={{ fontSize: 80 }}/>
				</IconButton>
			</Paper>
		</Box>
	);
};

export default ManageVitalsCard;