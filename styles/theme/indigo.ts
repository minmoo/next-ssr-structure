import { ThemeOptions, createTheme } from "@mui/material/styles";
import { TthemeType } from "../types";
import { indigo, pink } from "@mui/material/colors";

export default function getIndigoTheme(type: TthemeType) {
	return createTheme({
		palette: {
			type: type,
			primary: {
				main: indigo[500],
			},
			secondary: {
				main: pink["A400"],
			},
		},
		custom: {
			navbar: {
				width: 200,
			},
		},
	} as ThemeOptions);
}
