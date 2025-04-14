import { red } from "@mui/material/colors";

export const colors = {
	primary: {
		main: "rgba(207, 33, 40, 1)",
		light: "rgba(255, 198, 198, 0.3)",
		dark: "#004ba0",
		contrastText: "#ffffff",
	},
	secondary: {
		main: "#dc004e",
		light: "#ff5983",
		dark: "#9a0036",
		contrastText: "#ffffff",
	},
	error: {
		main: "#f44336",
		light: "#e57373",
		dark: "#d32f2f",
		contrastText: "#ffffff",
	},
	warning: {
		main: "#ffa726",
		light: "#ffb74d",
		dark: "#f57c00",
		contrastText: "#000000",
	},
	info: {
		main: "#2196f3",
		light: "#64b5f6",
		dark: "#1976d2",
		contrastText: "#ffffff",
	},
	success: {
		main: "#4caf50",
		light: "#81c784",
		dark: "#388e3c",
		contrastText: "#ffffff",
	},
	background: {
		default: "rgba(250, 250, 250, 1)",
		// paper: "#ffffff",
	},
	text: {
		primary: "#000000",
		secondary: "rgba(182, 182, 182, 0.8)",
		disabled: "#bdbdbd",
		icon: "#9e9e9e",
		hint: "#9e9e9e",
	},
	action: {
		active: red[300],
		hover: red[300],
		selected: red[300],
		disabled: "rgba(182, 182, 182, 0.2)",
		disabledBackground: "#rgba(182, 182, 182, 0.2)",
		// focus: "rgba(182, 182, 182, 0.2)",
		focus: red[400],
	},
	divider: "#bdbdbd",
};

export default colors;
