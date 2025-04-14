import { Box, Paper } from "@mui/material";
import { DashboardGraphData, DashboardItemDto } from "../dtos";
import React, { useEffect, useState } from "react";
import { useLazyItemGraphQuery } from "../api";
import { useAppSelector } from "../../../core/redux/store";
import { DashboardItemType, getDashboardItemBackgroundColor, getDashboardItemValueColor } from "../dtos/dashboard-item.dto";

type Props = {
	dashboardItem: DashboardItemDto
}

const VitalCard: React.FC<Props> = ({ dashboardItem }) => {
	const user = useAppSelector((state) => state.authState.activeUser);
	const [getReportData, { data: reportData, isLoading, isError }] = useLazyItemGraphQuery();
	const [latestData, setLatestData] = useState<DashboardGraphData | undefined>(undefined);

	useEffect(() => {
		getReportData({
			mrNo: user?.PatientMrno ?? "",
			phoneNumber: user?.Phone ?? "",
			dashboardItemId: dashboardItem.DashboardItemID
		});
	}, [dashboardItem, user]);

	useEffect(() => {
		if (reportData && reportData.length > 0) {
			if (dashboardItem.DashboardItem === DashboardItemType.BP) {
				setLatestData(
					DashboardGraphData.fromDto(
						reportData[0],
						reportData[1]
					)
				);
			}
			else {
				setLatestData(DashboardGraphData.fromDto(reportData[0]));
			}
		}
		else {
			setLatestData(undefined);
		}
	}, [reportData]);

	return (
		<Box
			display="flex"
			flexDirection="column"
			height="100%"
		>
			<Paper style={{ backgroundColor: getDashboardItemBackgroundColor(dashboardItem.DashboardItem as DashboardItemType), padding: 16, flexGrow: 1 }}>
				<Box
					display="flex"
					flex={1}
				>
					<div style={{ flex: 1 }}></div>
					<div style={{ flex: 1, textAlign: "right" }}>{dashboardItem.DashboardItem}</div>
				</Box>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					padding="30px"
				>
					<div style={{ fontSize: "40px", fontWeight: "bold", color: getDashboardItemValueColor(dashboardItem.DashboardItem as DashboardItemType,  latestData?.isAbnormal) }}>{latestData ? latestData.Value : "-"}</div>
					<div style={{ fontSize: "20px", fontWeight: "bold" }}>{dashboardItem.Unit}</div>
					{latestData && <div>{latestData.formattedDate}</div>}
				</Box>
			</Paper>
		</Box>
	);
};

export default VitalCard;