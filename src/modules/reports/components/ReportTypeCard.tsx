import { Box, Button, Paper, Typography } from "@mui/material";
import icons from "../../../assets/images/icons/report-types";
import { ReportTypesEnum } from "../dtos";

type Props = {
	title: string;
	iconUrl: string;
	type: ReportTypesEnum;
	onSelectReportType: (type: ReportTypesEnum) => void;
	unreadCount?: number; // Optional unread count
}

const ReportTypeCard: React.FC<Props> = ({ title, iconUrl, type, onSelectReportType, unreadCount }) => {
	return (
		<Box display="flex" flexDirection="row" justifyContent="center">
			<Paper sx={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
				<Button
					onClick={() => onSelectReportType(type)}
					sx={{ display: "flex", flex: 1, width: "100%", padding: "20px" }}>
					<Box>
						<img src={icons[iconUrl]} />
						<Typography sx={{ color: "black", textAlign: "center" }}>{title}</Typography>
						{unreadCount && unreadCount > 0 && (
							<Box
								sx={{
									position: "absolute",
									top: 8,
									right: 8,
									width: 22,
									height: 22,
									borderRadius: "50%",
									backgroundColor: "red",
									color: "white",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "15px",
									fontWeight: "bold",
								}}
							>
								{unreadCount}
							</Box>
						)}
					</Box>
				</Button>
			</Paper>
		</Box>
	);
};

export default ReportTypeCard;
