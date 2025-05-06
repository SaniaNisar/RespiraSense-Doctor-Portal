import React from "react";
import { MainLayout } from "../../core/layouts"; // Use the app's main layout
import Model from "./pages/Model";

const ModelRoutes = [
	{
		path: "model",
		element: <MainLayout />, // Ensures consistent layout
		children: [
			{ path: "", element: <Model /> }, // Renders Chatbot inside the layout
		],
	},
];

export default ModelRoutes;
export{};