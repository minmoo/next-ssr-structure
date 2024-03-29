import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { Theme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import MoneyIcon from "@mui/icons-material/Money";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: "100%",
		},
		avatar: {
			backgroundColor: theme.palette.primary.main,
			height: 56,
			width: 56,
		},
	}),
);

export default function MiniCard() {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardContent>
				<GridContainer justify="space-between" spacing={3}>
					<GridItem>
						<Typography color="textSecondary" gutterBottom variant="h6">
							MiniCard Title
						</Typography>
						<Typography color="textPrimary" gutterBottom variant="h3">
							Value
						</Typography>
					</GridItem>
					<GridItem>
						<Avatar className={classes.avatar}>
							<MoneyIcon />
						</Avatar>
					</GridItem>
				</GridContainer>
				<Box mt={2} display="flex" alignItems="center">
					<Typography variant="body2">MiniCard Body Content</Typography>
					<Typography color="textSecondary" variant="caption">
						MiniCard sub Body Content
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}
