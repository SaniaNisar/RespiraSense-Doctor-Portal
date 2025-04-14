import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDto } from "./dtos/user.dto";

export type AuthState = {
	patients: UserDto[];
	activeUser: UserDto | undefined;
	token: string | undefined;
};

const initialState: AuthState = {
	patients: [],
	activeUser: undefined,
	token: undefined,
};

export const authSlice = createSlice({
	initialState,
	name: "authSlice",
	reducers: {
		setPatients: (state, action: PayloadAction<UserDto[]>) => {
			state.patients = action.payload;
		},
		changeActiveUser: (
			state,
			action: PayloadAction<UserDto | undefined>,
		) => {
			state.activeUser = action.payload;
		},
		setToken: (state, action: PayloadAction<string | undefined>) => {
			state.token = action.payload;
		},
		setDefaultUser: (
			state,
			action: PayloadAction<UserDto | undefined>,
		) => {},
		resetAuth: (state) => {
			state.patients = [];
			state.activeUser = undefined;
		},
	},
});

export default authSlice.reducer;
