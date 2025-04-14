import { CircularProgress, Grid, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useGetDepartmentsQuery } from "../api";
import DepartmentCard from "./DepartmentCard";
import { DepartmentDto } from "../dtos";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
	onDepartmentSelect: (department: DepartmentDto) => void;
};

const DepartmentsList: React.FC<Props> = ({ onDepartmentSelect }) => {
	const [filteredDepartments, setFilteredDepartments] = useState<DepartmentDto[]>([]);
	const { data: departments, isLoading, isSuccess, isError } = useGetDepartmentsQuery({});

	useEffect(() => {
		if (departments) {
			const pulmonologyDept = departments.filter(dept => dept.ID == 40);
			setFilteredDepartments(pulmonologyDept);
		}
	}, [departments]);

	const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (departments) {
			// Search only within filtered Pulmonology department
			const pulmonologyDept = departments.filter(dept => dept.ID == 40);
			setFilteredDepartments(
				pulmonologyDept.filter(department =>
					department.Description.toLowerCase().includes(event.target.value.toLowerCase())
				)
			);
		}
	};

	return (
		<Grid display="flex" flex={1} container spacing={1}>
			<Grid item xs={12} marginX="10px">
				<TextField
					fullWidth
					variant="outlined"
					placeholder="Search Pulmonology..."
					onChange={searchHandler}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
			{isLoading && <CircularProgress />}
			{filteredDepartments?.map(department => 
				<Grid key={department.ID} item xs={2} sm={3} md={3} lg={3}>
					<DepartmentCard department={department} onSelectDepartment={onDepartmentSelect} />
				</Grid>
			)}
			{!isLoading && filteredDepartments.length === 0 && (
				<Grid item xs={12}>
					<p>No departments found.</p>
				</Grid>
			)}
		</Grid>
	);
};

export default DepartmentsList;
