import { Theme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Navbar from "../components/common/navbar/AdminNavbar";
import Toolbar from "../components/common/toolbar/AdminToolbar";
import FixedSetting from "../components/common/fixed/FixedSetting";

const useStyles = makeStyles<Theme>((theme) =>
	createStyles({
		root: {
			display: "flex",
		},
		toolbar: {
			...theme.mixins.toolbar,
		},
		wrapper: {
			display: "flex",
			flex: "1 1 auto",
			overflow: "hidden",
		},
		content: {
			height: "100%",
			width: "100%",
			overflow: "auto",
			padding: theme.spacing(7),
			backgroundColor: theme.palette.background.default,
		},
	}),
);

type TadminProps = {
	children: React.ReactNode;
};

export default function Admin({ children }: TadminProps): React.ReactElement {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Toolbar />
			<Navbar />
			<FixedSetting />
			<div className={classes.wrapper}>
				<div className={classes.content}>
					<div className={classes.toolbar} />
					{children}
				</div>
			</div>
		</div>
	);
}
