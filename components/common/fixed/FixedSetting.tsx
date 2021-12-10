import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useState, ChangeEvent, useContext } from "react";
import {
	Box,
	IconButton,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
	Switch,
	Typography,
	Grid,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { indigo, grey } from "@material-ui/core/colors";
import useLocalStorage from "../../../store/useLocalStorage";
import { THEME, TthemeKey, TthemeType } from "../../../styles/types";

const useStyles = makeStyles<Theme>((theme) =>
	createStyles({
		root: {
			display: "flex",
			position: "fixed",
			top: 180,
			right: 0,
			width: 40,
			background: "rgba(0, 0, 0, 0.3)",
			justifyContent: "center",
			zIndex: 100,
		},
		indigoRadio: {
			"color": indigo[400],
			"&$checked": {
				color: indigo[600],
			},
		},
		greyRadio: {
			"color": grey[400],
			"&$checked": {
				color: grey[600],
			},
		},
		label: {
			color: theme.palette.text.secondary,
		},
		box: {
			right: 50,
			left: "auto",
			padding: "10px",
			position: "absolute",
			display: "inline-block",
			boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
			backgroundColor: theme.palette.background.default,
			minWidth: 130,
		},
		checked: {},
	}),
);

export default function FixedSetting(): React.ReactElement {
	const classes = useStyles();
	const [isOpen, setOpen] = useState(false);
	const [theme, setTheme] = useLocalStorage<TthemeKey>(
		"appTheme",
		THEME.INDIGO,
	);

	const [type, setType] = useLocalStorage<TthemeType>("appThemeType", "light");

	const handleClick = () => {
		setOpen(!isOpen);
	};
	const hadleChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
		setTheme(e.target.value as TthemeKey);
	};

	const handleChangeType = () => {
		setType(type === "light" ? "dark" : "light");
	};

	return (
		<Box className={classes.root}>
			<IconButton onClick={handleClick}>
				<SettingsIcon />
			</IconButton>

			{isOpen && (
				<Box className={classes.box}>
					<FormControl component="fieldset">
						<FormLabel component="legend">
							<Typography color="textPrimary">Theme</Typography>
						</FormLabel>
						<Typography component="div">
							<Grid component="label" container alignItems="center">
								<Grid item xs={3}>
									light
								</Grid>
								<Grid item xs={6}>
									<Switch
										color="secondary"
										checked={type === "light" ? false : true}
										onChange={handleChangeType}
										name="type"
									/>
								</Grid>
								<Grid item xs={3}>
									dark
								</Grid>
							</Grid>
						</Typography>

						<RadioGroup
							aria-label="theme"
							name="theme"
							value={theme}
							onChange={hadleChangeTheme}
						>
							<FormControlLabel
								value="indigo"
								classes={{
									label: classes.label,
								}}
								control={
									<Radio
										classes={{
											root: classes.indigoRadio,
											checked: classes.checked,
										}}
									/>
								}
								label="indigo"
							/>
							<FormControlLabel
								value="grey"
								classes={{
									label: classes.label,
								}}
								control={
									<Radio
										classes={{
											root: classes.greyRadio,
											checked: classes.checked,
										}}
									/>
								}
								label="grey"
							/>
						</RadioGroup>
					</FormControl>
				</Box>
			)}
		</Box>
	);
}
