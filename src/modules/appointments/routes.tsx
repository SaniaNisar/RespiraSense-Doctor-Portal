import React from "react";
import { MainLayout } from "../../core/layouts";
import { DoctorsPage, NewAppointmentDialogPage } from "./pages";
import AppointmentPage from "./pages/AppointmemtsPage";

const routes = [
	{
		path: "appointments",
		element: <MainLayout />,
		children: [
			{ path: "new", element: <NewAppointmentDialogPage /> },
			{ path: "", element: <AppointmentPage /> }
		],
	},
	{
		path: "doctors",
		element: <MainLayout />,
		children: [
			{ path: "", element: <DoctorsPage /> }
		],
	},
];

export default routes;
