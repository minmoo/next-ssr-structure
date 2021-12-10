import { ThemeOptions, createMuiTheme } from "@material-ui/core";
import { TthemeType } from "../types";
import grey from "@material-ui/core/colors/grey";
import blueGrey from "@material-ui/core/colors/blueGrey";

export default function getGreyTheme(type: TthemeType) {
	return createMuiTheme({
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
