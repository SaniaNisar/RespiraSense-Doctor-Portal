import { Box, Button, Typography } from "@mui/material";
import { DoctorDto } from "../dtos";

type Props = {
	doctor: DoctorDto;
	onSelectDoctor: (doctor: DoctorDto) => void;
}

const DoctorCardForAppointment: React.FC<Props> = ({ doctor, onSelectDoctor }) => {
	return (
		<Box display="flex" flex={1} flexDirection="column" alignItems={"center"}>
			<Button onClick={() => onSelectDoctor(doctor)}>
				<Box 
					component="img"
					src={doctor.PicPath}
					width={"100%"}
					height="150px"
					borderRadius={"5px"}
					sx={{ objectFit: "cover" }}
				/>
				<Typography sx={{
					position: "absolute",
					bottom: "5px",
					textOverflow: "ellipsis",
					marginX: "20px",
					width: "85%",
					color: "white",
					backgroundColor: "rgba(0, 0, 0, 0.6)"
				}} textAlign="center" paddingX="3px">
					{doctor.FullName}
				</Typography>
			</Button>
			
		</Box>
	);
};

export default DoctorCardForAppointment;