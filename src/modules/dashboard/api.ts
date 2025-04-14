import { rootApi } from "../../core/redux/api";
import { DashboardItemInputDto, DashboardItemDto, DashboardGraphDataDto, GraphItemInputDto, UpsertDashboardItemInputDto, UnreadCountType } from "./dtos/index";

export const dashboardApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		dashboardItems: builder.query<Array<DashboardItemDto>, any>({
			query: () => ({
				url: "Appointment/GetDashboardItemList",
				method: "GET",
			}),
			transformResponse: (response: any) => {
				return response.Table;
			},
			transformErrorResponse: (error: any) => {
				console.log("ERROR", error);
			},
			providesTags: ["dashboard-items"],
		}),
		userDashboardItems: builder.query<Array<DashboardItemDto>, DashboardItemInputDto>({
			query: payload => ({
				url: `/PatientPortal/UsersDashboardItems?PhoneNo=${payload.phoneNumber}&MRNO=${payload.mrNo}`,
				method: "GET",
			}),
			onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
				console.log("asdfasdfasdf");
				try {
					console.log("starting");
					const { data } = await queryFulfilled;
				} catch (e) {
					console.log("error:", e);
				}
			},
			transformResponse: (response: any) => {
				return response.Table;
			},
			providesTags: ["dashboard-user-items"],
		}),
		itemGraph: builder.query<Array<DashboardGraphDataDto>, GraphItemInputDto>({
			query: payload => ({
				url: `/Appointment/GetDashboardItemGraph?PhoneNo=${payload.phoneNumber}&MRNO=${payload.mrNo}&DashboardItemID=${payload.dashboardItemId}`,
				method: "GET",
			}),
			onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					console.log("report data:", data);
				} catch (e) {
					console.log("ee3:", e);
				}
			},
			transformResponse: (response: any) => {
				return response.Table;
			},
			providesTags: ["dashboard-items"],
		}),
		addDashboardItem: builder.mutation<any, UpsertDashboardItemInputDto>({
			query: payload => ({
				url: `/PatientPortal/AddDashboardItem?PhoneNo=${payload.phoneNumber}&MRNO=${payload.mrNo}&DashboardItemId=${payload.dashboardItemId}`,
				method: "POST"
			}),
			invalidatesTags: ["dashboard-items"]
		}),
		removeDashboardItem: builder.mutation<any, UpsertDashboardItemInputDto>({
			query: payload => ({
				url: `/PatientPortal/RemoveDashboardItem?PhoneNo=${payload.phoneNumber}&MRNO=${payload.mrNo}&DashboardItemId=${payload.dashboardItemId}`,
				method: "POST"
			}),
			invalidatesTags: ["dashboard-items"]
		}), unreadCounts: builder.query<UnreadCountType, DashboardItemInputDto>({
			query: ({ phoneNumber, mrNo }) => ({
				url: `/PatientPortal/GetPatientUnSeenReportGroupByTAB?PhoneNo=${phoneNumber}&MRNO=${mrNo}`,
				method: "GET",
			}),
			transformResponse: (response: any): UnreadCountType => {
				const unreadCounts: UnreadCountType = {};
				response.Table.forEach((item: { TabID: number; UnreadCount: number }) => {
					unreadCounts[item.TabID] = item.UnreadCount;
				});
				return unreadCounts;
			},
		}),
	})
});

export const {
	useLazyItemGraphQuery,
	useDashboardItemsQuery,
	useUserDashboardItemsQuery,
	useAddDashboardItemMutation,
	useRemoveDashboardItemMutation,
	useUnreadCountsQuery,
} = dashboardApi;