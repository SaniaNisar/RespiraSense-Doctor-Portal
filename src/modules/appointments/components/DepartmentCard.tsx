import { Box, Button, Paper, Typography } from "@mui/material";
import { DepartmentDto } from "../dtos";

type Props = {
	department: DepartmentDto;
	onSelectDepartment: (department: DepartmentDto) => void;
}

const DepartmentCard: React.FC<Props> = ({ department, onSelectDepartment }) => {
	return (
		<Box alignItems={"center"}>
			<Button onClick={() => onSelectDepartment(department)}>
				<Box 
					component="img"
					src={`https://appointments.shalamarhospital.org.pk${department.PhotoPath}`}
					width={"100%"}
					height={"100%"}
					borderRadius={"5px"}
				/>
			</Button>
			<Typography sx={{
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
			}} textAlign="center" paddingX="3px">{department.Description}</Typography>
		</Box>
	);
};

export default DepartmentCard;