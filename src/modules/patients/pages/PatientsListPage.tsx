import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useAppSelector } from "../../../core/redux/store";
import { Column } from "../../../core/theme/components/custom.components";
import { useGetPatientsQuery, useRemovePatientMutation } from "../api";
import PatientCard from "../components/patient.card";
import NewPatientDialogPage from "./NewPatientDialogPage";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { rootApi } from "../../../core/redux/api";
import { UserDto } from "../../auth/dtos";
import { RemovePatientInputDto } from "../dtos/remove.patient.input.dtos";

type Props = {
	//
};
const PatientsListPage: React.FC<Props> = () => {
	const [searchParams] = useSearchParams();
	const { activeUser, patients } = useAppSelector((state) => state.authState);
	const [isOpen, setIsOpen] = useState(false);
	const mobile = searchParams.get("mobile") ?? "";
	const { data: _, isSuccess } = useGetPatientsQuery(
		activeUser?.Phone ?? mobile,
	);
	const [removePatient, { isLoading, isSuccess: isRemoved, isError, error }] =
		useRemovePatientMutation();
	const navigate = useNavigate();

	const onClose = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		if (isSuccess && (!patients || patients?.length === 0) && mobile) {
			navigate(`/patients/new?mobile=${activeUser?.Phone ?? mobile}`);
		}
	}, [isSuccess, patients]);

	const addPatient = () => {
		setIsOpen(true);
	};

	const onDelete = async (patient: UserDto) => {
		const payload: RemovePatientInputDto = {
			mobile: patient.Phone ?? "",
			mrNo: patient.PatientMrno ?? "",
		};
		await removePatient(payload);
	};

	return (
		<Column position={"relative"}>
			<Grid container spacing={2} sx={{}}>
				{patients &&
					patients?.map((patient: UserDto) => (
						<Grid
							item
							xs={8}
							sm={6}
							md={6}
							lg={4}
							key={patient?.PatientMrno}
						>
							<PatientCard
								patient={patient}
								onDelete={onDelete}
								isRemoveable={patient?.isRemoveable}
								isDefault={patient?.isDefaultPatient}
							/>
						</Grid>
					))}
			</Grid>
			{/* { <Box position="fixed" bottom={50} right={30}>
				<Fab color="primary" aria-label="add" onClick={addPatient} sx={{backgroundColor: "#CF2128",
					color: "#FFE0E1",
					":hover": {
						backgroundColor: "#FFE0E1",
						color: "#CF2128",
					}}}>
					<AddIcon />
				</Fab>
			</Box> } */}
			<NewPatientDialogPage open={isOpen} onClose={onClose} />
		</Column>
	);
};

export default PatientsListPage;
