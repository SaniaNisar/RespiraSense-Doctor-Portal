import { Grid } from "@mui/material";
import ReportTypeCard from "./ReportTypeCard";
import { ReportTypesEnum } from "../dtos";
import { UnreadCountType } from "../../dashboard/dtos/index";

type Props = {
	reportTypes: Array<{ tabId: number; icon: string; title: string; type: ReportTypesEnum }>;
	unreadCounts: UnreadCountType;
	onSelectReportType: (type: ReportTypesEnum) => void;
}

const ReportTypesList: React.FC<Props> = ({ reportTypes, onSelectReportType, unreadCounts }) => {
	// Map unread counts from object to a Map for easy access
	const unreadCountsMap = new Map<number, number>(
		Object.entries(unreadCounts).map(([tabId, unreadCount]) => [Number(tabId), unreadCount])
	);

	// Filter only "Lab" report types
	const filteredReportTypes = reportTypes.filter((report) => report.type === ReportTypesEnum.Lab);

	return (
		<Grid container spacing={1} display="flex" flex={1}>
			{filteredReportTypes.map(({ tabId, icon, title, type }) => (
				<Grid 
					key={tabId}
					item 
					xs={6} sm={4} md={4} lg={2}
				>
					<ReportTypeCard 
						type={type} 
						title={title}
						iconUrl={icon} 
						onSelectReportType={onSelectReportType} 
						unreadCount={unreadCountsMap.get(tabId) && unreadCountsMap.get(tabId)! > 0 ? unreadCountsMap.get(tabId) : undefined}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default ReportTypesList;
