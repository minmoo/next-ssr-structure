import { ThemeOptions, createTheme } from "@mui/material/styles";
import { TthemeType } from "../types";
import { grey, blueGrey } from "@mui/material/colors";

export default function getGreyTheme(type: TthemeType) {
	return createTheme({
		palette: {
			type: type,
			primary: {
				main: grey[600],
			},
			secondary: {
				main: blueGrey["500"],
			},
		},
		custom: {
			navbar: {
				width: 200,
			},
		},
	} as ThemeOptions);
}
