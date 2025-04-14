import { Box } from "@mui/material";
import { ReportTypesList } from "../components";
import reportTypes from "../../dashboard/data/report-types";
import { useNavigate } from "react-router-dom";
import { ReportTypesEnum } from "../dtos";
import { useUnreadCountsQuery } from "../../dashboard/api"; // Import the hook for fetching unread counts
import { useAppSelector } from "../../../core/redux/store";
import { UnreadCountType } from "../../dashboard/dtos/index";

const ReportTypesListPage = () => {
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.authState.activeUser); // Get the user info

	// Fetch unread counts using the query hook
	const { data: unreadCounts } = useUnreadCountsQuery({
		phoneNumber: user?.Phone ?? "",
		mrNo: user?.PatientMrno ?? ""
	});
	const unreadCountsSafe: UnreadCountType = unreadCounts ?? {}; // Ensure a safe fallback

	const showReport = (type: ReportTypesEnum) => {
		navigate(`/reports/${type}`);
	};

	return (
		<Box>
			<ReportTypesList
				reportTypes={reportTypes}
				onSelectReportType={showReport}
				unreadCounts={unreadCountsSafe} // Pass the unread counts here
			/>
		</Box>
	);
};

export default ReportTypesListPage;
