import {
	AnyAction,
	combineReducers,
	configureStore,
	Reducer,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authSlice } from "../../modules/auth/slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootApi } from "./api";
  
export const rootReducer = combineReducers({
	[rootApi.reducerPath]: rootApi.reducer,
	authState: authSlice.reducer,
});
  
const appReducer: Reducer = (state: RootState, action: AnyAction) => {
	if (action.type === "authSlice/resetAuth") {
		storage.removeItem("persist:root");
		state = {} as RootState;
	}
	return rootReducer(state, action);
};

const persistedReducer = persistReducer({ key: "root", storage }, appReducer);
  
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST"],
			},
		}).concat(rootApi.middleware),    
});
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
  