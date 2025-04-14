// src/theme-typography.d.ts

import { CSSProperties } from "react";

declare module "@mui/material/styles" {
	interface TypographyVariants {
		p: CSSProperties;
	}

	interface TypographyVariantsOptions {
		p?: CSSProperties;
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		p: true;
	}
}
