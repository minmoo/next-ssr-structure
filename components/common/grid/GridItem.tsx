import { Theme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { Grid, GridProps } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		grid: {},
	}),
);

export default function GridItem(props: GridProps) {
	const { children, ...rest } = props;
	const classes = useStyles();
	return (
		<Grid item={true} className={classes.grid} {...rest}>
			{children}
		</Grid>
	);
}
