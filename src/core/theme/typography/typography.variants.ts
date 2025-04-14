// typographyVariants.ts

import { TypographyOptions } from "@mui/material/styles/createTypography";

const typographyVariants: TypographyOptions = {
	fontFamily: ["Outfit", "sans-serif"].join(","),
	h1: {},
	h2: {
		fontSize: "24px",
		fontWeight: "600",
		textAlign: "left",
	},
	h3: {
		fontSize: "20px",
		fontWeight: "500",
		textAlign: "left",
	},
	h4: {},
	h5: {},
	h6: {
		fontWeight: "400",
		fontSize: "16px",
		lineHeight: "24px",
		// textAlign: "center",
	},
	p: {},
	body1: {},
	body2: {},
	button: {},
	caption: {},
	overline: {},
};

export default typographyVariants;
