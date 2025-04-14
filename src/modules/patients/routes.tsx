import React from "react";
import { MainLayout } from "../../core/layouts";
import { PatientsListPage } from "./pages";
import NewPatientDialogPage from "./pages/NewPatientDialogPage";

const routes = [
	{
		path: "patients",
		element: <MainLayout />,
		children: [
			{ path: "", element: <PatientsListPage /> },
			{
				path: "new",
				element: <NewPatientDialogPage open={true} />,
			},
		],
	},
];

export default routes;
