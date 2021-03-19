import { ThemeOptions, createMuiTheme } from "@material-ui/core";
import { TthemeType } from "../types";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";

export default function getIndigoTheme(type: TthemeType) {
	return createMuiTheme({
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
