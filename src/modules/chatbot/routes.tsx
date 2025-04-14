/*
import React from "react";
import { Route, Routes } from "react-router-dom";
import Chatbot from "./pages/Chatbot";

const ChatbotRoutes = () => {
    return (
        <Routes>
            <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
    );
};

export default ChatbotRoutes;
*/
import React from "react";
import { MainLayout } from "../../core/layouts"; // Use the app's main layout
import Chatbot from "./pages/Chatbot";

const ChatbotRoutes = [
	{
		path: "chatbot",
		element: <MainLayout />, // Ensures consistent layout
		children: [
			{ path: "", element: <Chatbot /> }, // Renders Chatbot inside the layout
		],
	},
];

export default ChatbotRoutes;
export {};
