import {
	AppBar,
	Button,
	createStyles,
	IconButton,
	makeStyles,
	Theme,
	Toolbar,
	Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useToolbar } from "../../../store/admin";

const useStyles = makeStyles<Theme>((theme: Theme) =>
	createStyles({
		appBar: {
			[theme.breakpoints.up("sm")]: {
				width: `calc(100% - ${theme.custom.navbar.width}px)`,
				marginLeft: theme.custom.navbar.width,
			},
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		appBarMini: {
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			[theme.breakpoints.up("sm")]: {
				width: `calc(100% - ${theme.custom.navbar.width / 3}px)`,
				marginLeft: theme.custom.navbar.width / 3,
			},
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up("sm")]: {
				display: "none",
			},
		},
		title: {
			flexGrow: 1,
		},
	}),
);

export default function ToolbarHeader(): React.ReactElement {
	const {
		admin,
		session,
		handleNavbarToggle,
		handleSignOut,
		handleSignIn,
	} = useToolbar();
	const classes = useStyles();

	return (
		<AppBar
			position="fixed"
			className={`${admin.navbar.isFix ? classes.appBar : classes.appBarMini}`}
		>
			<Toolbar>
				<IconButton
					edge="start"
					className={classes.menuButton}
					color="inherit"
					aria-label="menu"
					onClick={handleNavbarToggle}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h5" className={classes.title}>
					{admin.toolbar.title}
				</Typography>

				<Button
					color="inherit"
					onClick={session ? handleSignOut : handleSignIn}
				>
					{session ? "Sign Out" : "Sign In"}
				</Button>
			</Toolbar>
		</AppBar>
	);
}
