import {
	Avatar,
	Box,
	Drawer,
	FormControlLabel,
	Hidden,
	List,
	Switch,
	Typography,
	Theme,
} from "@mui/material";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import Link from "next/link";
import NavbarItem from "./NavbarItem";
import { useNavbar } from "../../../store/admin";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		drawer: {
			width: theme.custom.navbar.width,
			flexShrink: 0,
			whiteSpace: "nowrap",
		},
		paper: {
			width: theme.custom.navbar.width,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		miniPaper: {
			"transition": theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
			"width": theme.custom.navbar.width / 3,
			"overflowX": "hidden",
			"&:hover": {
				width: theme.custom.navbar.width,
			},
		},
		toolbar: {
			...theme.mixins.toolbar,
		},
		navbarHead: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			padding: theme.spacing(0, 0.5),
		},
		title: {
			paddingRight: theme.spacing(1),
		},
	}),
);

export default function AdminNavbar(): React.ReactElement {
	const { navbar, handleClose, handleNavbarFix } = useNavbar();
	const classes = useStyles();
	const theme = useTheme();

	const content = (
		<Box height="100%" display="flex" flexDirection="column">
			<Box className={classes.toolbar}>
				<Box className={classes.navbarHead}>
					{!navbar.isOpen && (
						<Switch
							color="secondary"
							checked={navbar.isFix}
							onChange={handleNavbarFix}
							name="fix"
						/>
					)}
				</Box>
			</Box>

			<List component="nav">
				{navbar.items.map((item) => (
					<NavbarItem {...item} key={item.id} />
				))}
			</List>
		</Box>
	);

	return (
		<>
			{/* Mobile */}
			<Hidden smUp implementation="css">
				<Drawer
					variant="temporary"
					classes={{
						paper: classes.paper,
					}}
					anchor={"right"}
					onClose={handleClose}
					open={navbar.isOpen}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile
					}}
				>
					{content}
				</Drawer>
			</Hidden>
			{/* PC */}
			<Hidden smDown implementation="css">
				<Drawer
					className={`${classes.drawer} ${
						navbar.isFix ? classes.paper : classes.miniPaper
					}`}
					classes={{
						paper: `${navbar.isFix ? classes.paper : classes.miniPaper}`,
					}}
					variant="permanent"
				>
					{content}
				</Drawer>
			</Hidden>
		</>
	);
}
