import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./core/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./core/routes";
import { Provider } from "react-redux";
import { store } from "./core/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<RouterProvider router={createBrowserRouter(routes.flat())} />
			</Provider>
			<ToastContainer />
		</ThemeProvider>
	);
}

export default App;
