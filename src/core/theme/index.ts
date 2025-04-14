import { alpha, createTheme, Theme } from "@mui/material";
import typographyVariants from "./typography/typography.variants";
import colors from "./color/colors";

export const theme = createTheme({
	typography: typographyVariants,
	palette: {
		primary: colors.primary,
		secondary: colors.secondary,
		error: colors.error,
		warning: colors.warning,
		info: colors.info,
		success: colors.success,
		background: colors.background,
		text: colors.text,
		action: colors.action,
		divider: colors.divider,
	},
	components: {
		Column: {
			styleOverrides: {
				root: {
					display: "flex",
					flexDirection: "column",
					width: "100%",
				},
			},
		},

		Row: {
			styleOverrides: {
				root: {
					display: "flex",
					flexDirection: "row",
					width: "100%",
				},
			},
		},

		CustomLoadingButton: {
			styleOverrides: {
				root: ({ theme }: { theme: Theme }) => ({
					height: "48px",
					color: "white",
					width: "100%",
					borderRadius: "6px",
					backgroundColor: theme.palette.primary.main,
					"&:hover": {
						backgroundColor: alpha(theme.palette.primary.main, 0.5),
					},
				}),
			},
		},

		MUICard: {
			styleOverrides: {
				root: ({ theme }: { theme: Theme }) => ({
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-start",
				}),
			},
		},
	},
});
