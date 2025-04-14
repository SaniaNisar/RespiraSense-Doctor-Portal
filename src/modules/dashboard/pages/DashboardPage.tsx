import {
	useAddDashboardItemMutation,
	useDashboardItemsQuery,
	useRemoveDashboardItemMutation,
	useUnreadCountsQuery,
	useUserDashboardItemsQuery,
} from "../api";
import VitalsList from "../components/VitalsList";
import { Box, Grid } from "@mui/material";
import ManageDashboardItemsPopup from "./ManageDashboardItemsPopup";
import { useAppSelector } from "../../../core/redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { rootApi } from "../../../core/redux/api";
import { useDispatch } from "react-redux";
import { UnreadCountType } from "../dtos";
import { UpcomingAppointmentsCard } from "../../appointments/components";
import UploadedReportsList from "../components/UploadedReportsList"; // New Component

const DashboardPage = () => {
	const [showManageDashboardItemsPopup, setShowManageDashboardItemsPopup] = useState(false);
	const user = useAppSelector((state) => state.authState.activeUser);
	const { data: dashboardItems } = useDashboardItemsQuery({});
	const { data: userDashboardItems } = useUserDashboardItemsQuery({
		mrNo: user?.PatientMrno ?? "",
		phoneNumber: user?.Phone ?? "",
	});
	const [addDashboardItem] = useAddDashboardItemMutation();
	const [removeDashboardItem] = useRemoveDashboardItemMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(rootApi.util.invalidateTags(["dashboard-items"]));
	}, []);

	const handleCalendarClick = () => {
		navigate("/appointments?tab=scheduled");
	};

	const { data: unreadCounts } = useUnreadCountsQuery({
		phoneNumber: user?.Phone ?? "",
		mrNo: user?.PatientMrno ?? "",
	});

	const unreadCountsSafe: UnreadCountType = unreadCounts ?? {};

	return (
		<div style={{ paddingLeft: 1, paddingRight: 1 }}>
			{/* Vitals Section */}
			{/* <Box>
				<VitalsList
					dashboardItems={userDashboardItems ?? []}
					shouldShowDashboardManager={() => setShowManageDashboardItemsPopup(true)}
				/>
			</Box> */}

			{/* Upcoming Appointments Section */}
			<Box>
				<Grid container mt={1} alignItems="stretch">
					{/* Upcoming Appointments Section */}
					<Grid item xs={12} md={12}>
						<UpcomingAppointmentsCard
							phoneNumber={user?.Phone ?? ""}
							onCalendarClick={handleCalendarClick}
						/>
					</Grid>

					{/* Uploaded Reports Section */}
					{/* <Grid item xs={12} md={6}>
						<UploadedReportsList />
					</Grid> */}
				</Grid>
			</Box>

			{/* Manage Dashboard Items Popup */}
			<ManageDashboardItemsPopup
				open={showManageDashboardItemsPopup}
				allDashboardItems={dashboardItems ?? []}
				userDashboardItems={userDashboardItems ?? []}
				onAddDashboardItem={(item) =>
					addDashboardItem({
						dashboardItemId: item.DashboardItemID,
						mrNo: user?.PatientMrno ?? "",
						phoneNumber: user?.Phone ?? "",
					})
				}
				onRemoveDashboardItem={(item) =>
					removeDashboardItem({
						dashboardItemId: item.DashboardItemID,
						mrNo: user?.PatientMrno ?? "",
						phoneNumber: user?.Phone ?? "",
					})
				}
				onClose={() => setShowManageDashboardItemsPopup(false)}
			/>
		</div>
	);
};

export default DashboardPage;
