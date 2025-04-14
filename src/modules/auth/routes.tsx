import { AuthLayout } from "../../core/layouts";
import { LoginPage, VerifyPage } from "./pages";

const routes = [
	{
		path: "auth",
		element: <AuthLayout />,
		children: [
			{ path: "login", element: <LoginPage /> },
			{ path: "verify", element: <VerifyPage /> },
		],
	},
];

export default routes;
