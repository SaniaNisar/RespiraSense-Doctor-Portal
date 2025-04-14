import { Box, Checkbox, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { useDashboardItemsQuery } from "../api";
import { DashboardItemDto } from "../dtos";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
	open: boolean;
	allDashboardItems: DashboardItemDto[];
	userDashboardItems: DashboardItemDto[];
	onAddDashboardItem: (item: DashboardItemDto) => void;
	onRemoveDashboardItem: (item: DashboardItemDto) => void;
	onClose: () => void;
}

const ManageDashboardItemsPopup: React.FC<Props> = ({ 
	open, 
	allDashboardItems, 
	userDashboardItems,
	onAddDashboardItem,
	onRemoveDashboardItem,
	onClose
}) => {

	const onItemChangeHandler = (dashboardItem: DashboardItemDto) => {
		const exists = userDashboardItems.find(uItem => uItem.DashboardItemID === dashboardItem.DashboardItemID) !== undefined;
		if (exists) {
			onRemoveDashboardItem(dashboardItem);
		}
		else {
			onAddDashboardItem(dashboardItem);
		}
	};

	return (
		<Dialog open={open}>
			<DialogTitle>
				<Typography
					sx={{
						fontSize: "18px",
						fontWeight: "bold",
						lineHeight: "26px",
						color: "black",
					}}
				>
					Dashboard Items
				</Typography>
				<Typography
					sx={{
						fontSize: 11,
						fontWeight: "11px",
						color: "rgba(182, 182, 182, 0.8)",
					}}
				>
					Please fill the following required data to create patient
				</Typography>
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={onClose}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
				}}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent>
				{allDashboardItems.map(item => 
					<Box key={item.DashboardItemID} display="flex" alignItems="center" height="30px">
						<Checkbox 
							checked={userDashboardItems.find(uItem => uItem.DashboardItemID === item.DashboardItemID) !== undefined} 
							onChange={() => onItemChangeHandler(item)}
							color="primary" 
						/>
						<Typography>{item.DashboardItem}</Typography>
					</Box>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default ManageDashboardItemsPopup;