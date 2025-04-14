/* eslint-disable no-mixed-spaces-and-tabs */
import { rootApi } from "../../core/redux/api";
import { AppointmentDateDto, AppointmentSlotDto, DepartmentDto, DoctorDto, SlotInputDto } from "./dtos";
import { SlotsListDto } from "./dtos/slots-list.dto";

export const appointmentsApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getDepartments: builder.query<Array<DepartmentDto>, any>({
			query: () => ({
				url: "/Appointment/GetDepartments",
				method: "GET",
			}),
			onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
				} catch (e) {
					console.log("Error:", e);
				}
			},
			transformResponse: (response: any) => {
				return response.Table;
			},
			providesTags: ["departments"],
		}),
		getDepartmentDoctors: builder.query<DoctorDto[], number>({
			query: departmentId => {
				return {
					url: `/Appointment/GetDepartmentsDoctors?DeptID=${departmentId}`,
					method: "GET"
				};
			},
			transformResponse: (response: any) => {
				return response.Table;
			},
			providesTags: ["doctors"],
		}),
		getAppointmentDates: builder.query<AppointmentDateDto[], number>({
			query: doctorId => ({
				url: `/Appointment/GetAppointmentDatesByDoctors?DoctorID=${doctorId}`,
				method: "GET",
			}),
			transformResponse: (response: any) => {
				console.log(response.Table);
				return response.Table;
			},
			providesTags: ["appointment-dates"],
		}),
		getAppointmentSlots: builder.query<SlotsListDto, SlotInputDto>({
			query: ({ doctorId, date }) => ({
				url: `/Appointment/GetAppointmentSlotsByDoctors?DoctorId=${doctorId}&theDate=${date}`,
				method: "GET",
			}),
			transformResponse: (response: any) => {
				return { morningSlots: response.Table, eveningSlots: response.Table1 };
			},
			providesTags: ["appointment-slots"]
		}),
		fetchDoctors: builder.query<DoctorDto[], void>({
			query: () => {
				return {
					url: "/Appointment/SearchDoctor",
					method: "GET"
				};
			},
			transformResponse: (response: any) => {
				return response.Table;
			},
			providesTags: ["doctors"],
		}),
		getAppointmentsByPhone: builder.query<any, string>({
			query: (phoneNumber) => ({
				url: `Appointment/GetAppointmentList?PhoneNo=${phoneNumber}`,
				method: "GET",
			}),
			transformResponse: (response: any) => {
				return response.Table;
			},
			transformErrorResponse: (error: any) => {
				console.log("ERROR", error);
			},
			providesTags: ["appointment-list"],
		}),
		cancelAppointment: builder.mutation<void, { phoneNumber: string, appointmentId: number, reason: string }>({
			query: ({ phoneNumber, appointmentId, reason }) => ({
				url: `/Appointment/CancelAppointment?PhoneNo=${phoneNumber}&AppointmentID=${appointmentId}&Reason=${reason}`,
				method: "POST",
			}),
			onQueryStarted: async (data, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
				} catch (error) {
					console.error("Failed to cancel appointment:", error);
				}
			},
			invalidatesTags: ["appointment-list"],
		}),
		// New Query to Fetch Doctors
		getDoctors: builder.query<DoctorDto[], void>({
			query: () => ({
				url: "/Appointment/GetDoctors",
				method: "GET",
			}),
			transformResponse: (response: any) => {
				return response.Table;
			},
			providesTags: ["doctors"],
		}),
		addAppointment: builder.mutation<void, {
			PhoneNo: string;
			MRNO: string;
			PatientName: string;
			Father: string;
			AgeInNumbers: string;
			AgeCaption: string;
			Gender: string;
			Remarks: string;
			Address: string;
			StartDateTime: string;
			DrID: number;
		  }>({
		  	query: (appointment) => ({
			  url: `/Appointment/AddAppointment?PhoneNo=${appointment.PhoneNo}&MRNO=${appointment.MRNO}&PatientName=${appointment.PatientName}&Father=${appointment.Father}&AgeInNumbers=${appointment.AgeInNumbers}&AgeCaption=${appointment.AgeCaption}&Gender=${appointment.Gender}&Remarks=${appointment.Remarks}&Address=${appointment.Address}&StartDateTime=${appointment.StartDateTime}&DrID=${appointment.DrID}`,
			  method: "POST",
			  body: appointment,
		  	}),
		  	transformResponse: (response: any) => {
		  		return response.Table || [];  // Ensure to return the right part of the response
			  },
		  	invalidatesTags: ["add-appointment"],
		  }),
	}),
});

export const {
	useCancelAppointmentMutation,
	useGetDepartmentsQuery,
	useGetDepartmentDoctorsQuery,
	useGetAppointmentDatesQuery,
	useLazyGetAppointmentSlotsQuery,
	useFetchDoctorsQuery,
	useGetAppointmentsByPhoneQuery,
	useGetDoctorsQuery, // Export the new query hook
	useAddAppointmentMutation
} = appointmentsApi;