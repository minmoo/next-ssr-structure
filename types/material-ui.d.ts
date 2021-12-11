import { Theme, DeprecatedThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
	export interface Theme {
		custom: {
			navbar: {
				width: number;
			};
		};
	}
	// allow configuration using `createMuiTheme`
	export interface ThemeOptions {
		custom: {
			navbar: {
				width: number;
			};
		};
	}
}
