import { Grid, Typography } from "@mui/material";
import { DashboardItemDto } from "../dtos";
import ManageVitalsCard from "./ManageVitalsCard";
import VitalCard from "./VitalCard";

type Props = {
	dashboardItems: Array<DashboardItemDto>;
	shouldShowDashboardManager: () => void;
}

const VitalsList: React.FC<Props> = ({ dashboardItems, shouldShowDashboardManager }) => {
	return (
		<div>
			<Typography variant="body1" sx={{ padding: "5px" }}>Your Vitals:</Typography>
			<Grid container spacing={1} display="flex" flex={1}>
				{dashboardItems.map(dashboardItem =>
					<Grid
						key={dashboardItem.DashboardItemID}
						item
						xs={6} sm={4} md={4} lg={2}
					>
						<VitalCard dashboardItem={dashboardItem} />
					</Grid>
				)}
				<Grid
					key={0}
					item
					xs={6} sm={4} lg={2}
				>
					<ManageVitalsCard 
						shouldShowDashobardManager={shouldShowDashboardManager} 
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default VitalsList;