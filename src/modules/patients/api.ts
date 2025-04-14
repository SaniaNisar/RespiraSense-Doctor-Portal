import { rootApi } from "../../core/redux/api";
import { UserDto } from "../auth/dtos";
import { authSlice } from "../auth/slice";
import { RelationDto, SelectPatientInputDto } from "./dtos";
import { AddPatientInputDto } from "./dtos/add.patient.dto";
import { RemovePatientInputDto } from "./dtos/remove.patient.input.dtos";

export const authApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getRelations: builder.query<RelationDto[], string>({
			query: (phone) => ({
				url: `/PatientPortal/GetRelationList?PhoneNo=${phone}`,
				method: "GET",
			}),
			transformResponse: (response: any, meta, arg) => {
				if (response !== undefined && response.Table !== undefined) {
					return response.Table;
				}
			},
		}),
		getPatients: builder.query<UserDto[], string>({
			query: (phone) => ({
				url: `/PatientPortal/GetPatientList?PhoneNo=${phone}`,
				method: "GET",
			}),
			onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
				try {
					(await queryFulfilled).meta?.request.url;
					const { data: patients } = await queryFulfilled;

					const defaultPatient = patients?.find(
						(p) => p.isDefaultPatient,
					);

					if (defaultPatient) {
						dispatch(
							authSlice.actions.changeActiveUser(defaultPatient),
						);
						dispatch(authSlice.actions.setPatients(patients));
					} else {
						const updatedPatients = [...patients];
						updatedPatients[0] = {
							...updatedPatients[0],
							isDefaultPatient: true,
						};
						dispatch(
							authSlice.actions.changeActiveUser(
								updatedPatients?.[0],
							),
						);
						dispatch(
							authSlice.actions.setPatients(updatedPatients),
						);
					}
				} catch (e) {
					console.log("ERRORRRRRRR", e);
				}
			},
			transformResponse: (response: any) => {
				if (response !== undefined && response.Table !== undefined) {
					return response.Table;
				}
			},
			providesTags: ["patient-list"],
		}),
		addPatient: builder.mutation<string, AddPatientInputDto>({
			query: (payload) => ({
				url: `/PatientPortal/AddPatient?PhoneNo=${payload.mobile}&PatientName=${payload.patientName}&Father=${payload.fatherName}&AgeInNumbers=${payload.age}&AgeCaption=Years&Gender=${payload.gender}&Relation=${payload.relation}&Address=${payload.address}`,
				method: "GET",
			}),
			invalidatesTags: ["patient-list"],
			onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
				try {
					(await queryFulfilled).meta?.request.url;
					const { data } = await queryFulfilled;
				} catch (e) {
					console.log("error", e);
				}
			},
			transformResponse: (response: any) => {
				console.log("R>E>S ADD", response);
				return response.Table;
			},
		}),
		selectPatient: builder.mutation<string, SelectPatientInputDto>({
			query: (payload) => ({
				url: `/PatientPortal/SetDefaultPatient?PhoneNo=${payload.mobile}&MRNO=${payload.mrNo}`,
				method: "POST",
			}),
			onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
				await queryFulfilled;
			},
			transformResponse: (response: any) => {
				if (response !== undefined && response.Table !== undefined) {
					return response.Table[0];
				}
			},
		}),

		removePatient: builder.mutation<string, RemovePatientInputDto>({
			query: (payload) => ({
				url: `/PatientPortal/RemovePatient?PhoneNo=${payload.mobile}&Mrno=${payload.mrNo}`,
				method: "GET",
			}),
			onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
				try {
					(await queryFulfilled).meta?.request.url;
					const { data } = await queryFulfilled;
				} catch (e) {
					console.log("ERRORRRRRRR", e);
				}
			},
			invalidatesTags: ["patient-list"],
			transformErrorResponse: (error: any) => {
				console.log("ERROR", error);
			},
			transformResponse: (response: any) => {
				console.log("R>E>S", response);
				return response.Table;
			},
		}),
	}),
});

export const {
	useGetPatientsQuery,
	useLazyGetPatientsQuery,
	useSelectPatientMutation,
	useAddPatientMutation,
	useGetRelationsQuery,
	useRemovePatientMutation,
} = authApi;
