import { Paper, Typography } from "@mui/material";
import { ReportItemDto } from "../dtos";

type Props = {
	item: ReportItemDto
}

const ReportCard: React.FC<Props> = ({ item }) => {
	return (
		<Paper>
			<Typography>{item.InvoiceNo}</Typography>
		</Paper>
	);
};

export default ReportCard;