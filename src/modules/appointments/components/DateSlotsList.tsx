/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import { useGetAppointmentDatesQuery, useLazyGetAppointmentSlotsQuery } from "../api";
import { AppointmentDateDto, AppointmentSlotDto, DoctorDto, SlotType } from "../dtos";
import DateCard from "./DateCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { rootApi } from "../../../core/redux/api";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SlotCard from "./SlotCard";

type Props = {
	doctor: DoctorDto;
	onSlotSelect: (slot: AppointmentSlotDto, date: AppointmentDateDto) => void; // Expect slot and date
  };
  

const DateSlotsList: React.FC<Props> = ({ doctor, onSlotSelect }) => {
	const { data: dates, isLoading: datesLoading } = useGetAppointmentDatesQuery(doctor.ID);
	const [getAppointmentSlots, { data: slotsList, isLoading: slotsLoading }] = useLazyGetAppointmentSlotsQuery();
	const [appointmentDate, setAppointmentDate] = useState<AppointmentDateDto | undefined>(undefined);
	const [appointmentSlot, setAppointmentSlot] = useState<AppointmentSlotDto | undefined>(undefined);
	const [activeSlotType, setActiveSlotType] = useState<SlotType>(SlotType.morning);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(rootApi.util.invalidateTags(["appointment-dates"]));
	}, [doctor]);

	useEffect(() => {
		if (appointmentDate) {
			getAppointmentSlots({ doctorId: doctor.ID, date: appointmentDate.the_Date });
		}
	}, [appointmentDate]);

	const handleSlotTypeChange = (event: React.SyntheticEvent, type: SlotType) => {
		setActiveSlotType(type);
	};

	const handleSlotSelect = (slot: AppointmentSlotDto, date: AppointmentDateDto) => {
		setAppointmentSlot(slot); // Update local state
		onSlotSelect(slot, date); // Pass both slot and date to the parent
		const handleSlotSelect = (slot: AppointmentSlotDto, date: AppointmentDateDto) => {
			// Now handle both slot and date here
			console.log("Selected Slot:", slot);
			console.log("Selected Date:", date);
		  };
	  };

	return (
		<Box>
			{/* Date Cards */}
			<Box
				sx={{
					display: "flex",
					overflowX: "auto",
					whiteSpace: "nowrap",
					padding: "8px",
					flexDirection: "column",
				}}
			>
				<Grid container direction="row" wrap="nowrap" spacing={1}>
					{!datesLoading &&
                        dates?.map((date) => (
                        	<Grid item key={date.ID}>
                        		<Box
                        			sx={{
                        				borderRadius: "6px",
                        				backgroundColor: "lightgray",
                        				textAlign: "center",
                        			}}
                        		>
                        			<DateCard
                        				date={date}
                        				selected={date.the_Date === appointmentDate?.the_Date}
                        				onAppointmentDateSelect={(date) => setAppointmentDate(date)}
                        			// eslint-disable-next-line no-mixed-spaces-and-tabs
                        			/>
                        		</Box>
                        	</Grid>
                        ))}
				</Grid>
			</Box>

			{/* Slots Tabs */}
			<TabContext value={activeSlotType}>
				<Box>
					<TabList onChange={handleSlotTypeChange}>
						<Tab label="Morning" value={SlotType.morning} />
						<Tab label="Evening" value={SlotType.evening} />
					</TabList>
				</Box>

				<Box sx={{ display: "flex" }}>
					{slotsList?.morningSlots.length === 0 &&
                        activeSlotType === SlotType.morning && (
						<Box
							sx={{
								display: "flex",
								flex: 1,
								flexDirection: "row",
								width: "100%",
								justifyContent: "center",
							}}
						>
							<Typography>No morning slots for this date</Typography>
						</Box>
					)}

					<TabPanel sx={{ padding: "8px" }} value={SlotType.morning}>
						<Grid container spacing={1}>
							{slotsList?.morningSlots.map((slot) => (
								<Grid item key={slot.SlotID} xs={3}>
									<SlotCard
										slot={slot}
										selected={slot.SlotID === appointmentSlot?.SlotID}
										onAppointmentSlotSelect={() => {
											if (appointmentDate) {
											  handleSlotSelect(slot, appointmentDate);
											}
										  }}
									/>
								</Grid>
							))}
						</Grid>
					</TabPanel>

					{slotsList?.eveningSlots.length === 0 &&
                        activeSlotType === SlotType.evening && (
						<Box
							sx={{
								display: "flex",
								flex: 1,
								flexDirection: "row",
								width: "100%",
								justifyContent: "center",
							}}
						>
							<Typography sx={{ height: "100%" }}>No evening slots for this date</Typography>
						</Box>
					)}

					<TabPanel sx={{ padding: "8px" }} value={SlotType.evening}>
						<Grid container spacing={1}>
							{slotsList?.eveningSlots.map((slot) => (
								<Grid item key={slot.SlotID} xs={3}>
									<SlotCard
								  slot={slot}
								  selected={slot.SlotID === appointmentSlot?.SlotID}
								  onAppointmentSlotSelect={() => handleSlotSelect(slot, appointmentDate!)} // Pass both slot and date
									/>
							  </Grid>
							  
							))}
						</Grid>
					</TabPanel>
				</Box>
			</TabContext>
		</Box>
	);
};

export default DateSlotsList;