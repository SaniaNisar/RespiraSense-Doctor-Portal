import React, { useEffect } from "react";
import { UserDto } from "../../modules/auth/dtos";
import PatientListComponent from "./PatientListComponent";
import { useDispatch } from "react-redux";
import { authSlice } from "../../modules/auth/slice";
import { useSetDefaultPatientMutation } from "../../modules/auth/api";
import { SetDefaultPatientDto } from "../../modules/patients/dtos/set-default-patient.dto";
import { notify } from "../../common/helper";

type Props = {
	patients: UserDto[];
	initialSelection: string;
};
const PatientListContainer: React.FC<Props> = ({
	patients,
	initialSelection,
}) => {
	const dispatch = useDispatch();
	const [setDefaultPatient, { isLoading, isSuccess, isError, error }] =
		useSetDefaultPatientMutation();

	useEffect(() => {
		if (isError) {
			notify((error as any)?.message ?? error);
		}
	}, [isSuccess, isError]);

	const onPatientSelect = async (patient: UserDto) => {
		dispatch(authSlice.actions.changeActiveUser(patient));
		const params: SetDefaultPatientDto = {
			mobile: patient?.Phone ?? "",
			patientMrno: patient.PatientMrno ?? "",
		};
		await setDefaultPatient(params);
	};

	return (
		<PatientListComponent
			patients={patients}
			initialSelection={initialSelection}
			onPatientSelect={onPatientSelect}
		/>
	);
};

export default PatientListContainer;
