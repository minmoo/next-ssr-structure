import { Theme } from "@mui/material";

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		"@global": {
			"*": {
				boxSizing: "border-box",
				margin: 0,
				padding: 0,
			},
			"html": {
				"-webkit-font-smoothing": "antialiased",
				"-moz-osx-font-smoothing": "grayscale",
				"height": "100%",
				"width": "100%",
			},
			"body": {
				backgroundColor: "#f4f6f8",
				height: "100%",
				width: "100%",
			},
			"a": {
				textDecoration: "none",
			},
			"#__next": {
				"height": "100%",
				"width": "100%",
				"&>:nth-child(1)": {
					height: "100%",
				},
			},
		},
	}),
);

export default function GlobalStyles() {
	useStyles();

	return null;
}
