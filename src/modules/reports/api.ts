import { rootApi } from "../../core/redux/api"; // Adjust path as necessary
import { ReportItemDto, ReportsInputDto } from "./dtos";

export const reportsApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getReports: builder.query<ReportItemDto[], ReportsInputDto>({
			query: (payload) => ({
				url: `/PatientPortal/GetPatientReportListByType?PhoneNo=${payload.phoneNumber}&MRNO=${payload.mrNo}&TabID=${payload.tabId}`,
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
				return response.Table.map((item: any) => ({...item, Investigations: item.Investigations.split(" <br/>").filter((i: any) => i)}));
			},	
			providesTags: ["reports"],
		}),
	}),
});

export const {
	useGetReportsQuery,
	useLazyGetReportsQuery,
} = reportsApi;
