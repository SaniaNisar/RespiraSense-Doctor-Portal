/* eslint-disable no-mixed-spaces-and-tabs */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Appointment {
	id: number;
	patientName: string;
	date: string;
	time: string;
	// Add other fields as necessary
  }
  
  interface AppointmentsState {
	appointments: Appointment[];
  }

// interface AppointmentDto {
//   PhoneNo: string;
//   MRNO: string;
//   PatientName: string;
//   Father: string;
//   AgeInNumbers: number;
//   AgeCaption: string;
//   Gender: string;
//   Remarks: string;
//   Address: string;
//   StartDateTime: string;
//   DrID: number;
// }

// interface DoctorsState {
//   doctors: any[]; // Replace `any` with `DoctorDto` if you have the type defined
//   appointments: AppointmentDto[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: DoctorsState = {
// 	doctors: [],
// 	appointments: [],
// 	loading: false,
// 	error: null,
// };

// const doctorsSlice = createSlice({
// 	name: "doctors",
// 	initialState,
// 	reducers: {
// 		fetchDoctorsStart(state) {
// 			state.loading = true;
// 			state.error = null;
// 		},
// 		fetchDoctorsSuccess(state, action: PayloadAction<any[]>) {
// 			state.doctors = action.payload;
// 			state.loading = false;
// 		},
// 		fetchDoctorsFailure(state, action: PayloadAction<string>) {
// 			state.error = action.payload;
// 			state.loading = false;
// 		},
// 		setAppointments(state, action: PayloadAction<AppointmentDto[]>) {
// 			state.appointments = action.payload;
// 		},
// 		updateAppointments(state, action: PayloadAction<AppointmentDto>) {
// 			const newAppointment = action.payload;
// 			state.appointments = [...state.appointments, newAppointment]; // Add new appointment to the list
// 		},		
// 	},
// });

const initialState: AppointmentsState = {
	appointments: [],
};
  
const appointmentsSlice = createSlice({
	name: "appointments",
	initialState,
	reducers: {
	  setAppointments: (state, action: PayloadAction<Appointment[]>) => {
			state.appointments = action.payload;
	  },
	  updateAppointments: (state, action: PayloadAction<Appointment>) => {
			state.appointments.push(action.payload); // Add the new appointment
	  },
	},
});
  
export const { setAppointments, updateAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;