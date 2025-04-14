import { styled } from "@mui/material/styles";
import { BoxProps, Card, CardProps, Box as MuiBox } from "@mui/material";
import { LoadingButton } from "@mui/lab";

declare module "@mui/material/styles" {
	interface Components {
		Column?: {
			styleOverrides?: {
				root?: any;
			};
		};
		Row?: {
			styleOverrides?: {
				root?: any;
			};
		};
		CustomLoadingButton?: {
			styleOverrides?: {
				root?: any;
			};
		};

		MUICard?: {
			styleOverrides?: {
				root?: any;
			};
		};
	}
}

export const Row = styled(MuiBox, {
	name: "Row",
	slot: "Root",
	overridesResolver: (props, styles) => [styles.root],
})<BoxProps>(() => ({})) as typeof MuiBox;

export const Column = styled(MuiBox, {
	name: "Column",
	slot: "Root",
	overridesResolver: (props, styles) => [styles.root],
})<BoxProps>(() => ({})) as typeof MuiBox;

export const CustomLoadingButton = styled(LoadingButton, {
	name: "CustomLoadingButton",
	slot: "Root",
	overridesResolver: (props, styles) => [styles.root],
})<BoxProps>(() => ({})) as typeof LoadingButton;

export const MUICard = styled(Card, {
	name: "MUICard",
	slot: "Root",
	overridesResolver: (props, styles) => [styles.root],
})<CardProps>(() => ({})) as typeof Card;
