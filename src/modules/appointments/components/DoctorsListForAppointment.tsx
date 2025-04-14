import React, { ChangeEvent, useEffect, useState } from "react";
import { useGetDepartmentDoctorsQuery } from "../api";
import { DoctorDto } from "../dtos";
import { CircularProgress, Grid, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import DoctorCardForAppointment from "./DoctorCardForAppointment";

type Props = {
	departmentId: number;
	onSelectDoctor: (doctor: DoctorDto) => void;
}

const DoctorsListForAppointment: React.FC<Props> = ({ departmentId, onSelectDoctor }) => {
	const [filteredDoctors, setFilteredDoctors] = useState<DoctorDto[]>([]);
	const { data: doctors, isLoading } = useGetDepartmentDoctorsQuery(departmentId);

	useEffect(() => {
		console.log("doctors:", doctors);
		if (doctors) {
			setFilteredDoctors(doctors);
		}
	}, [doctors]);

	const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (doctors) {
			setFilteredDoctors(
				doctors?.filter(
					doctor =>
						doctor.FullName.toLowerCase().includes(event.target.value.toLowerCase())
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
					placeholder="Search..."
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
			{filteredDoctors?.map(doctor =>
				<Grid key={doctor.ID} item xs={2} sm={3} md={3} lg={3}>
					<DoctorCardForAppointment 
						doctor={doctor} 
						onSelectDoctor={onSelectDoctor}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default DoctorsListForAppointment;