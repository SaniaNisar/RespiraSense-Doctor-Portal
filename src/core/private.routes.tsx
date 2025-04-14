import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "./redux/store";
// Adjust the import path

export const PrivateRoute = ({ children }: any) => {
	const user = useAppSelector((state) => state.authState.user);
	if (!user?.token) {
		return <Navigate to="/auth/login" />;
	}

	return children;
};

export const AuthRedirectRoute = ({ children }: any) => {
	const user = useAppSelector((state) => state.authState.user);

	if (user?.token) {
		return <Navigate to="/" />;
	}

	return children;
};
