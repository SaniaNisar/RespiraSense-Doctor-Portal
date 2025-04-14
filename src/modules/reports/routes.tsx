import React from "react";
import { MainLayout } from "../../core/layouts";
import { ReportTypesEnum } from "./dtos";
import { ReportTypesListPage, ReportsListPage } from "./pages";

const routes = [
	{
		path: "reports",
		element: <MainLayout />,
		children: [
			{ path: "", element: <ReportTypesListPage /> },
			{ path: "lab", element: <ReportsListPage type={ReportTypesEnum.Lab} /> },
			// { path: "admission", element: <ReportsListPage type={ReportTypesEnum.Admission} /> },
			// { path: "cardiology", element: <ReportsListPage type={ReportTypesEnum.Cardiology} /> },
			// { path: "gastro", element: <ReportsListPage type={ReportTypesEnum.Gastro} /> },
			// { path: "prescription", element: <ReportsListPage type={ReportTypesEnum.Prescription} /> },
			// { path: "radiology", element: <ReportsListPage type={ReportTypesEnum.Radiology} /> },
		],
	},
];

export default routes;
