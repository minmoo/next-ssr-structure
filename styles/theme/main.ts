import { ThemeOptions, createTheme } from "@mui/material/styles";
import { TthemeType } from "../types";

export default function getMainTheme(type: TthemeType) {
	return createTheme({
		palette: {
			primary: {
				light: "#60ad5e",
				main: "#2e7d32",
				dark: "#005005",
				contrastText: "#fff",
			},
			secondary: {
				light: "#ffc046",
				main: "#ff8f00",
				dark: "#c56000",
				contrastText: "#000",
			},
		},
		custom: {
			navbar: {
				width: 200,
			},
		},
	} as ThemeOptions);
}
