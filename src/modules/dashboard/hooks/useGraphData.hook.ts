import { useEffect, useState } from "react";
import { useAppSelector } from "../../../core/redux/store";
import { useLazyItemGraphQuery } from "../api";
import { DashboardGraphData, DashboardGraphDataDto, DashboardItemDto } from "../dtos";
import { ChartData } from "chart.js";
import { DashboardItemType } from "../dtos/dashboard-item.dto";
import moment from "moment";
import { theme } from "../../../core/theme";

export const useGraphData = (selectedVital: DashboardItemDto | undefined) => {
	const user = useAppSelector(state => state.authState.activeUser);
	const [getReportData, { data: reportData, isLoading, isError }] = useLazyItemGraphQuery();
	const [latestData, setLatestData] = useState<ChartData<"line"> | undefined>(undefined);

	useEffect(() => {
		if (selectedVital && user) {
			getReportData({
				mrNo: user.PatientMrno ?? "",
				phoneNumber: user.Phone ?? "",
				dashboardItemId: selectedVital.DashboardItemID ?? 0,
			});
		}
	}, [selectedVital, user, getReportData]);

	useEffect(() => {
		if (reportData && reportData.length > 0) {
			const data = transformData(reportData, selectedVital);
			setLatestData(data);
		} else {
			setLatestData(undefined);
		}
	}, [reportData, selectedVital]);


	const transformData = (reportData: DashboardGraphDataDto[], selectedVital: DashboardItemDto | undefined): ChartData<"line"> => {
		if (!selectedVital) {
			return { labels: [], datasets: [] };
		}
		const date = (date: string) => moment(date).format("DD/MMM/YY");
		const dataSystolic = reportData.filter(report => report.Title === "Sys").map(report => Number(report.Value));
		const dataDiastolic = reportData.filter(report => report.Title === "Dia").map(report => Number(report.Value));
		const labelsDataBP = reportData.filter(report => report.Title === "Dia").map(report => date(report.theDate));
		const labels = reportData.map(report => date(report.theDate));
		const dataSingle = reportData.map(report => Number(report.Value));
		const title = selectedVital.DashboardItem;
      
		switch (selectedVital.DashboardItem) {
		case DashboardItemType.BP:
			return {
				labels: labelsDataBP,
				datasets: [
					{
						data: dataSystolic,
						label: "Systolic",
						borderColor: theme.palette.primary.main,
						backgroundColor: theme.palette.primary.contrastText,
						yAxisID: "y1",
					},
					{
						data: dataDiastolic,
						label: "Diastolic",
						borderColor: theme.palette.primary.dark,
						backgroundColor: theme.palette.primary.contrastText,
						yAxisID: "y1",
					},
				],
			};
      
		default:
      
			return {
				labels,
				datasets: [
					{
						data: dataSingle,
						label: title,
						borderColor: theme.palette.primary.dark,
						backgroundColor: theme.palette.primary.contrastText,
					},
				],
			};
		}
	};

	return { latestData, isError, isLoading };
};