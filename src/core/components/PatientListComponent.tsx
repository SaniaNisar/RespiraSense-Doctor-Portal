import { FormControl, MenuItem, Select } from "@mui/material";
import { UserDto } from "../../modules/auth/dtos";
import { useEffect, useState } from "react";

type Props = {
	patients: UserDto[];
	onPatientSelect: (patient: UserDto) => void;
	initialSelection: string;
};

const PatientListComponent: React.FC<Props> = ({
	patients,
	initialSelection,
	onPatientSelect,
}) => {
	const [activePatient, setActivePatient] = useState(initialSelection);

	useEffect(() => {
		setActivePatient(initialSelection);
	}, [initialSelection]);

	return (
		<FormControl sx={{ margin: "10px", marginTop: "25px" }}>
			<Select
				value={activePatient}
				onChange={(e) => {
					const mrNo = e.target.value;
					setActivePatient(mrNo);
					onPatientSelect(
						patients.find((p) => p.PatientMrno === mrNo)!,
					);
				}}
			>
				{patients?.map((patient) => (
					<MenuItem
						key={patient.PatientMrno}
						value={patient.PatientMrno}
					>
						{patient.PatientName}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default PatientListComponent;
