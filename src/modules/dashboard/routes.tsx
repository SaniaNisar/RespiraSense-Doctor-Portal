import React from "react";
import { DashboardPage, GraphPage } from "../dashboard/pages";
import { MainLayout } from "../../core/layouts";

const routes = [
	{
		path: "",
		element: (
			<MainLayout />
		),
		children: [
			{ path: "", element: <DashboardPage /> },
			{ path: "graph", element: <GraphPage /> },
		],
	},
];

export default routes;
