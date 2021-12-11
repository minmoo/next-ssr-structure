import { Theme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { Grid, GridProps } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		grid: {
			width: "unset", //상속값이 있으면 상속값 없으면 초기값 사용
		},
	}),
);

export default function GridContainer(props: GridProps) {
	const { children, ...rest } = props;
	const classes = useStyles();
	return (
		<Grid container={true} className={classes.grid} {...rest}>
			{children}
		</Grid>
	);
}
