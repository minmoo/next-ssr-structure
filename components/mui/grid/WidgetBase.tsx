import { Grid, GridProps, Typography } from "@mui/material";

interface WidgetBaseProps {
	title: string;
	subTitle: string;
	primaryColor: string;
	secondaryColor: string;
}
const WidgetBase = ({
	children,
	primaryColor,
	secondaryColor,
	title,
	subTitle,
	sx = [],
}: WidgetBaseProps & GridProps) => {
	return (
		<Grid
			item
			container
			justifyContent="center"
			alignItems="stretch"
			sx={[
				{
					borderRadius: "20px",
					overflow: "hidden",
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
		>
			{/* title */}
			<Grid
				item
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				md={4}
				xs={12}
				sx={{
					...(primaryColor && {
						backgroundColor: primaryColor,
					}),
				}}
			>
				<Grid item>
					<Typography variant="h3" color="white">
						{title}
					</Typography>
				</Grid>
				<Grid item sx={{ display: { xs: "none", md: "flex" } }}>
					<Typography variant="body1" color="whitesmoke">
						{subTitle}
					</Typography>
				</Grid>
			</Grid>

			{/* content */}
			<Grid
				item
				md={8}
				xs={12}
				sx={{
					...(secondaryColor && {
						backgroundColor: secondaryColor,
					}),
				}}
			>
				{children}
			</Grid>
		</Grid>
	);
};

export default WidgetBase;
