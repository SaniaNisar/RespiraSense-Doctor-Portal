import { rootApi } from "../../core/redux/api";
import { SetDefaultPatientDto } from "../patients/dtos/set-default-patient.dto";
import { AuthenticateDto, OtpDto, UserDto } from "./dtos";
import { authSlice } from "./slice";

export const authApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		authenticate: builder.mutation<string, AuthenticateDto>({
			query: (payload) => ({
				url: `/PatientPortal/Gen_OTP?DeviceID=${payload.deviceId}&PhoneNo=${payload.mobile}&operatorCode=${payload.operator}`,
				method: "POST",
			}),
			transformResponse: (response: any) => {
				if (response?.Table[0]?.Column1) {
					throw new Error(response.Table[0].Column1);
				}
				return response.Table;
			},
		}),

		verify: builder.mutation<UserDto[], OtpDto>({
			query: (payload) => ({
				url: `/PatientPortal/Login?DeviceID=${payload.deviceId}&PhoneNo=${payload.mobile}&OTP=${payload.otp}&PushToken=${payload.pushToken}`,
				method: "POST",
			}),
			invalidatesTags: ["patient-list"],
			onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
				try {
					const { data: patients } = await queryFulfilled;
					if (patients?.[0]?.PatientMrno) {
						dispatch(authSlice.actions.setPatients(patients));
					}

					const defaultPatient = patients.find(
						(p) => p.isDefaultPatient,
					);
					if (defaultPatient) {
						dispatch(
							authSlice.actions.changeActiveUser(defaultPatient),
						);
						dispatch(
							authSlice.actions.setToken(defaultPatient?.token),
						);
					} else {
						dispatch(
							authSlice.actions.changeActiveUser(patients[0]),
						);
						dispatch(
							authSlice.actions.setToken(patients?.[0]?.token),
						);
					}
				} catch (e) {
					console.log("error:", e);
				}
			},
			transformResponse: (response: any) => {
				if (response?.Table[0]?.Status) {
					throw new Error(response?.Table[0]?.Status);
				}
				return response.Table;
			},
		}),
		setDefaultPatient: builder.mutation<string, SetDefaultPatientDto>({
			query: (payload) => ({
				url: `/PatientPortal/SetDefaultPatient?PhoneNo=${payload?.mobile}&MRNO=${payload?.patientMrno}`,
				method: "POST",
			}),
			onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
			},
			invalidatesTags: ["patient-list"],
			transformResponse: (response: any) => {
				if (response?.Table?.[0]?.Error) {
					throw new Error(response?.Table?.[0]?.Error);
				}
				return response.Table;
			},
		}),
	}),
});

export const {
	useAuthenticateMutation,
	useVerifyMutation,
	useSetDefaultPatientMutation,
} = authApi;
