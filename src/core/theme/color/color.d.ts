import "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		customGreen: PaletteColor;
		customBlue: PaletteColor;
	}

	interface PaletteOptions {
		customGreen?: PaletteColorOptions;
		customBlue?: PaletteColorOptions;
	}
}
